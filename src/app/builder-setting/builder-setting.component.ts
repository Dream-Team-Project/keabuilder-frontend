import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy, ChangeDetectionStrategy, Input} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Options } from 'sortablejs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarService } from '../_services/navbar.service';
import { SectionService } from '../_services/_builderService/section.service';
import { RowService } from '../_services/_builderService/row.service';
import { ColumnService } from '../_services/_builderService/column.service';
import { ElementService } from '../_services/_builderService/element.service';
import { StyleService } from '../_services/_builderService/style.service';
import { NgxMatColorPickerInput } from '@angular-material-components/color-picker';
import { GeneralService } from '../_services/_builderService/general.service';

@Component({
  selector: 'app-builder-setting',
  templateUrl: './builder-setting.component.html',
  styleUrls: ['./builder-setting.component.css', '../builder/builder.component.css', '../builder/material.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BuilderSettingComponent implements AfterViewInit, OnDestroy {

  showEditor:boolean = false;
  connectWParent:boolean = false;

  @Input()
  set DialogToggle(val: any) {
    if(this.connectWParent) {
      this.openDialog();
    }
    else this.connectWParent = true;
  }   

  @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput | any;

  @ViewChild(TemplateRef)
  _dialogTemplate!: TemplateRef<any>;

  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;


  constructor(
    private _nav: NavbarService,
    // builder services start
    public _style: StyleService,
    public _section: SectionService,
    public _row: RowService,
    public _column: ColumnService,
    public _element: ElementService,
    public _general: GeneralService,
    // builder services end
    private _overlay: Overlay,
    private _snackBar: MatSnackBar,
    private _viewContainerRef: ViewContainerRef) {
      this._nav.hide();
      this._row.getDialogueEvent().subscribe(()=>{
        this.overlayRefDetach();
      })
      this._element.getDialogueEvent().subscribe(()=>{
        this.overlayRefDetach();
      })
   }

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.backdropClick().subscribe(() => {
      this.overlayRefDetach();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // drag drop box

  overlayRefDetach() {
    this._overlayRef.detach();
    this.showEditor = false;
  }
  
  ngOnDestroy() {
    this._overlayRef.dispose();
    this.showEditor = false;
  }

  openDialog() {
    this._overlayRef.attach(this._portal);
  }

  detectTabChange() {
    if(this._general.selectedBlock.type == 'element') {
        this.showEditor = false;
    }
  }

  // drag drop box

  // builder options

  builderColumnOptions: Options = {
    group: 'column',
    scroll: true,
    sort: true,
    handle: '.kb-handle-column',
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      // console.log(event);
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  };  

  // builder options

}

