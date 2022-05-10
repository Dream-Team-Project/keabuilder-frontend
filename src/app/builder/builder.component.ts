import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import { Options } from 'sortablejs';
import { NavbarService } from '../_services/navbar.service';
import { SectionService } from '../_services/_builderService/section.service';
import { RowService } from '../_services/_builderService/row.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(TemplateRef)
  _dialogTemplate!: TemplateRef<any>;
  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;

  elementObj = {id: 0, type: 'element', content: {}, setting: false, style: ''};
  rowSelection:boolean = false;
  selectedElements:Array<any> = [];
  selectedBlock:any = '';
  selectedColumn:any = '';
  selectedRow:any = '';


  constructor(
    private _nav: NavbarService,
    public _section: SectionService,
    public _row: RowService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef) {
    this._nav.hide();
   }

  ngOnInit(): void {
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

  // drag drop box

  overlayRefDetach() {
    this._overlayRef.detach();
    this.selectedRow = '';
  }
  
  ngOnDestroy() {
    this._overlayRef.dispose();
  }

  openDialog() {
    this._overlayRef.attach(this._portal);
  }

  // drag drop box

  // builder options

  builderSectionOptions: Options = {
    group: 'section',
    scroll: true,
    sort: true,
    handle: '.kb-handle-section',
    // dragoverBubble: false,
    // fallbackOnBody: false,
    // draggable: "."+this.dragCls,
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

  builderRowOptions: Options = {
    group: 'row',
    scroll: true,
    sort: true,
    handle: '.kb-handle-row',
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

  builderElementOptions: Options = {
    group: 'element',
    scroll: true,
    sort: true,
    handle: '.kb-handle-element',
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
