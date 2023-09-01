import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy, ChangeDetectionStrategy, Input, ElementRef, OnChanges, SimpleChanges, EventEmitter, Output} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgxMatColorPickerInput } from '@angular-material-components/color-picker';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SectionService } from 'src/app/_services/_builder/section.service';
import { RowService } from 'src/app/_services/_builder/row.service';
import { ColumnService } from 'src/app/_services/_builder/column.service';
import { ElementService } from 'src/app/_services/_builder/element.service';
import { StyleService } from 'src/app/_services/_builder/style.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-builder-setting',
  templateUrl: './builder-setting.component.html',
  styleUrls: ['./builder-setting.component.css', '../builder/builder.component.css', '../../material.component.css'],
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
  code_block_ht:string = '200px';
  searchText:string = '';

  @Output('saveEmailSession') saveEmailSession: EventEmitter<any> = new EventEmitter();
  @Output('openImageDialog') openImageDialog: EventEmitter<any> = new EventEmitter();
  @Input()
  set DialogToggle(val: any) {
    if(this.connectWtParent) this.openDialog();
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
      if(this._general.blockSelection) this.overlayRefDetach(!this._general.blockSelection);
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
    this._style.setDropDownStyle = {
      main: false,
      item: false
    }
    this.searchInpClear();
    this.searchText = '';
    this.searchType = '';
    this.searchTglCls = '';
    if(this._general.blockSelection == '') {
      this._section.savePageSession();
      this.saveEmailSession.emit(true);
    }
  }
  
  ngOnDestroy() {
    this._overlayRef.dispose();
    this._general.imgSelection = false;
    this._general.showEditor = false;
    this._general.selectedTab = '';
  }

  openDialog() {
    this._general.pageSaved = false;
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
        this.searchInpClear();
        this.waitTill = true;
      }, 200)
    }
  }

  isText(en:string) {
    return en == 'input' || en == 'label' || en == 'option' || en == 'icon' || en == 'text' || en == 'heading' || en == 'button' || this._style.setItemStyle || this._style.setDropDownStyle.item;
  }

  searchingDeep(val:string) {
    return val?.toLowerCase().indexOf(this.searchInp.deep.toLowerCase()) >= 0;
  }

  searchingTab(val:string) {
    return val?.toLowerCase().indexOf(this.searchInp.tab.toLowerCase()) >= 0;
  }

  searchInpClear() {
    this.searchInp.deep = '';
    this.searchInp.tab = '';
  }

  isElementExist(ele:any) {
    if(ele == 'menu') {
      return this._general.menus.length != 0;
    }
    else if(ele == 'form') {
      return this._general.forms.length != 0;
    }
    return true;
  }
}

