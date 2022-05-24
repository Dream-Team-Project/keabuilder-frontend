import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy} from '@angular/core';
import { Options } from 'sortablejs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarService } from '../_services/navbar.service';
import { SectionService } from '../_services/_builderService/section.service';
import { RowService } from '../_services/_builderService/row.service';
import { ColumnService } from '../_services/_builderService/column.service';
import { ElementService } from '../_services/_builderService/element.service';
import { StyleService } from '../_services/_builderService/style.service';
import { GeneralService } from '../_services/_builderService/general.service';
import { NgxMatColorPickerInput } from '@angular-material-components/color-picker';


@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css','./material.component.css'],
})


export class BuilderComponent implements OnInit, AfterViewInit {

showEditor:boolean = false;
DialogParentToggle:boolean = false;

  @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput | any;

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
    private _snackBar: MatSnackBar) {
      this._nav.hide();
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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
