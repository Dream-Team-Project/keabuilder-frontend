import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy, ChangeDetectionStrategy, Input, ElementRef, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { SectionService } from '../_services/_builder/section.service';
import { RowService } from '../_services/_builder/row.service';
import { ColumnService } from '../_services/_builder/column.service';
import { ElementService } from '../_services/_builder/element.service';
import { StyleService } from '../_services/_builder/style.service';
import { NgxMatColorPickerInput } from '@angular-material-components/color-picker';
import { GeneralService } from '../_services/_builder/general.service';
import { ImageService } from '../_services/image.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-builder-setting',
  templateUrl: './builder-setting.component.html',
  styleUrls: ['./builder-setting.component.css', '../builder/builder.component.css', '../builder/material.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BuilderSettingComponent implements AfterViewInit, OnDestroy {

  connectWtParent:boolean = false;
  rippleClr:string = 'rgb(217 201 153 / 30%)';
  searchTglCls:any;
  searchInp = {
    deep: '',
    tab: ''
  }
  searchType:string = '';
  waitTill:boolean = true;

  @Output('openImageDialog') openImageDialog: EventEmitter<any> = new EventEmitter();
  @Input()
  set DialogToggle(val: any) {
    if(this.connectWtParent) {
      this.openDialog();
    }
    else this.connectWtParent = true;
  }   

  @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput | any;

  @ViewChild(TemplateRef)
  _dialogTemplate!: TemplateRef<any>;

  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;

  dragBoxAnime:any = {open: false, close: false};
  backToRow:boolean = false;

  constructor(
    // builder services start
    public _style: StyleService,
    public _section: SectionService,
    public _row: RowService,
    public _column: ColumnService,
    public _element: ElementService,
    public _general: GeneralService,
    public _image: ImageService,
    // builder services end
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef) {
      this._general.getAllFunnels();
      this._row.getDialogueEvent().subscribe(()=>{
        this.overlayRefDetach(false);
      })
      this._element.getDialogueEvent().subscribe(()=>{
        this.overlayRefDetach(false);
      })
   }

   drop(event: CdkDragDrop<any>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this._section.savePageSession();
  }  

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.backdropClick().subscribe(() => {
      if(!this._general.minimize) this.overlayRefDetach(!this._general.blockSelection);
    });
  }

  // drag drop box

  overlayRefDetach(update: boolean) {
    if(this._general.imgSelection) {
      this.openImageDialog.emit(false);
    }
    else if(this.backToRow) {
        this.resetDialog(update);
        this.openDialog();
    }
    else {
      this.dragBoxAnime.close = true;
      setTimeout(()=>{
        this.resetDialog(update);
      },200);
    }
  }

  resetDialog(update: boolean) {
    this._overlayRef.detach();
    if(update && this._general.selectedBlock) {
      this._style.updateStyle();
    }
    else if(this.backToRow) {
      this._general.selectedBlock = this._row.selectedRow;
      this._style.blockSetting(this._general.selectedBlock);
    }
    else this._general.selectedBlock='';
    this.dragBoxAnime.close = false;
    this._general.showEditor = false;
    this._general.selectedTab = '';
    this._general.setExpPanelStep(0);
    this._style.setItemStyle = false;
    this.searchInp.deep = '';
    this.searchInp.tab = '';
    this.searchType = '';
    this.searchTglCls = '';
    if(this._general.blockSelection == '') this._section.savePageSession();
  }
  
  ngOnDestroy() {
    this._overlayRef.dispose();
    this._general.imgSelection = false;
    this._general.showEditor = false;
    this._general.selectedTab = '';
  }

  openDialog() {
    this.backToRow ? this.backToRow = false : this.dragBoxAnime.open = true;
    this._overlayRef.attach(this._portal);
    setTimeout(()=>{
      this.dragBoxAnime.open = false;
    },200)
  }

  openImgDialog() {
    this._image.imageSelectionAllow = true;
    this._image.imgMatTabIndex = 1;
    this.openImageDialog.emit(true);
  }

  // drag drop box
  
  moveBackToRow(savecolumn:boolean) {
    this.backToRow = true;
    this.dragBoxAnime.open = false;
    this._general.showBackToRowOption=false;
    if(savecolumn) {
      this._style.updateStyle();
    };
    this.overlayRefDetach(false);
  }

  searchToggle(value:string) {
    if(this.waitTill) {
      this.waitTill = false;
      var temp = this.searchType != value;
      if(temp) {
        var isEmpty = this.searchType == '';
        this.searchType = value;
        if(isEmpty) this.searchTglCls = 'open';
      }
      else this.searchTglCls = 'close';
      setTimeout(()=>{
        if(!temp) this.searchType = '';
        this.searchTglCls = '';
        this.searchInp.tab = '';
        this.searchInp.deep = '';
        this.waitTill = true;
      }, 200)
    }
  }

  searchingDeep(val:string) {
    return val?.toLowerCase().indexOf(this.searchInp.deep.toLowerCase()) >= 0;
  }

  searchingTab(val:string) {
    return val?.toLowerCase().indexOf(this.searchInp.tab.toLowerCase()) >= 0;
  }

}

