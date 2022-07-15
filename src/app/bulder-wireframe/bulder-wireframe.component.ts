import { Component, OnInit } from '@angular/core';
import { Options } from 'sortablejs';
import { SectionService } from '../_services/_builderService/section.service';
import { RowService } from '../_services/_builderService/row.service';
import { ColumnService } from '../_services/_builderService/column.service';
import { ElementService } from '../_services/_builderService/element.service';
import { StyleService } from '../_services/_builderService/style.service';
import { GeneralService } from '../_services/_builderService/general.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-bulder-wireframe',
  templateUrl: './bulder-wireframe.component.html',
  styleUrls: ['./bulder-wireframe.component.css']
})
export class BulderWireframeComponent implements OnInit {
  get = false
  DialogParentToggle:boolean = false;
  navtimeStyle:any = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '32px',
    height: '32px'
  }
  
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
  ) {
   }

  ngOnInit(): void {
  }

  openDialog(e:any) {
    this.DialogParentToggle = !this.DialogParentToggle;
  }

    // builder options

    builderSectionOptions: Options = {
      group: 'section',
      scroll: true,
      sort: true,
      handle: '.kb-handle-section',
      // dragoverBubble: false,
      // fallbackOnBody: false,
      // draggable: ".class",
      scrollSensitivity: 100,
      animation: 300,
      onUpdate: (event: any) => {
        this._section.savePageSession();
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
        this._section.savePageSession();
      },
      onStart: function (/**Event*/evt) {
        // console.log(evt.oldIndex);  // element index within parent
      },
      onChoose: function (/**Event*/evt) {
        // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
      },
    };  

    builderColumnOptions: Options = {
      group: {
        name: 'column',
        pull: false,
        put: false,
      },
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
  
    builderElementOptions: Options = {
      group: 'element',
      scroll: true,
      sort: true,
      handle: '.kb-handle-element',
      scrollSensitivity: 100,
      animation: 300,
      onUpdate: (event: any) => {
        this._section.savePageSession();
      },
      onAdd: (event: any) => {
        this._section.savePageSession();
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
