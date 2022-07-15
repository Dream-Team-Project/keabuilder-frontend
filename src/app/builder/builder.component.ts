import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import { Options } from 'sortablejs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarService } from '../_services/navbar.service';
import { SectionService } from '../_services/_builderService/section.service';
import { RowService } from '../_services/_builderService/row.service';
import { ColumnService } from '../_services/_builderService/column.service';
import { ElementService } from '../_services/_builderService/element.service';
import { StyleService } from '../_services/_builderService/style.service';
import { GeneralService } from '../_services/_builderService/general.service';
import { ImageService } from '../_services/image.service';
import { NgxMatColorPickerInput } from '@angular-material-components/color-picker';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css','./material.component.css'],
})


export class BuilderComponent implements OnInit, AfterViewInit {

DialogParentToggle:boolean = false;

  @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput | any;

  showNavFrom:string = 'bottom';


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
    private _snackBar: MatSnackBar) {
      this._nav.hide();
   }

  ngOnInit(): void {
    document.getElementById('kb-bootstrap-stylesheet')?.remove();
  }

  ngAfterViewInit() {
  }

  onDragEnded(event:any) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    let x = boundingClientRect.x - parentPosition.left;
    let y = boundingClientRect.y - parentPosition.top;
    if(-1*y > screen.height/1.5) {
      this.showNavFrom = 'top';
    }
    else if(screen.width/2 + x < 70) {
      this.showNavFrom = 'left';
    }
    else if(screen.width/2 - x < 100) {
      this.showNavFrom = 'right';
    }
    else {
      this.showNavFrom = 'below';
    }
    // console.log('x: ' + x, 'y: ' + y);     
    // console.log('width: ' + screen.width, 'height: ' + screen.height);
  }
  
  getPosition(el:any) {
    let x = 0;
    let y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  elementDblClk(element: any, event:any) {
    if(element.content.name == 'text' || element.content.name == 'heading') {
      this._general.showInlineEditor = true;
      element.content.editor = true;
      this._general.selectedBlock = element;
    }
    else {
      this._general.blockSelection = '';
      this._general.selectedBlock = element;
      this._style.blockSetting(element);
      this.openDialog(event)
    }
  }

  // drag drop box

  openDialog(e:any) {
      this.DialogParentToggle = !this.DialogParentToggle;
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
