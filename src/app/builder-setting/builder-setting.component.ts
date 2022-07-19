import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy, ChangeDetectionStrategy, Input, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Options } from 'sortablejs';
import { NavbarService } from '../_services/navbar.service';
import { SectionService } from '../_services/_builderService/section.service';
import { RowService } from '../_services/_builderService/row.service';
import { ColumnService } from '../_services/_builderService/column.service';
import { ElementService } from '../_services/_builderService/element.service';
import { StyleService } from '../_services/_builderService/style.service';
import { NgxMatColorPickerInput } from '@angular-material-components/color-picker';
import { GeneralService } from '../_services/_builderService/general.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-builder-setting',
  templateUrl: './builder-setting.component.html',
  styleUrls: ['./builder-setting.component.css', '../builder/builder.component.css', '../builder/material.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BuilderSettingComponent implements AfterViewInit, OnDestroy {

  connectWtParent:boolean = false;

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
  imgBoxAnime:any = {open: false, close: false};
  backToRow:boolean = false;

  constructor(
    private _nav: NavbarService,
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

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.backdropClick().subscribe(() => {
      this.overlayRefDetach(!this._general.blockSelection);
    });
  }

  openImgSelBox() {
      this.imgBoxAnime.open = true;
      this._general.imgSelection = true;
    setTimeout(()=>{
      this.imgBoxAnime.open = false;
    },200)
  }

  closeImgSelBox() {
      this.imgBoxAnime.close = true;
    setTimeout(()=>{
      this._general.imgSelection = false;
      this.imgBoxAnime.close = false;
      this._image.showEditImgContainer = false;
      this._image.imgMatTabIndex = 1;
    },200)
  }

  // drag drop box

  overlayRefDetach(update: boolean) {
    if(this.backToRow) {
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

  // builder options

  builderColumnOptions: Options = {
    group: 'column',
    scroll: true,
    sort: true,
    handle: '.kb-handle-column',
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      this._column.filterCls(this._row.selectedRow);
    },
    onAdd: (event: any) => {
      this._column.filterCls(this._row.selectedRow);
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  };  

  // builder options

  // menu options

  builderMenuOptions: Options = {
    group: 'menu',
    scroll: true,
    sort: true,
    handle: '.kb-handle-menu',
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  };  

  // menu options

}

