import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../_services/navbar.service';
import { UserService } from '../_services/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Options } from 'sortablejs';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit {

  sections:Array<any> = [
    {
      name: 'Section A',
      items: [{name: 'Row A', 
              items: [{name: 'Column A', 
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}, 
                      {name: 'Column B',
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}, 
                      {name: 'Column C',
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}, 
                      {name: 'Column D',
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}] 
              }]
    },
    {
      name: 'Section B',
      items: [{name: 'Row A', 
              items: [{name: 'Column A', 
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}, 
                      {name: 'Column B',
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}, 
                      {name: 'Column C',
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}, 
                      {name: 'Column D',
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}] 
              }]
    },
    {
      name: 'Section C',
      items: [{name: 'Row A', 
              items: [{name: 'Column A', 
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}, 
                      {name: 'Column B',
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}, 
                      {name: 'Column C',
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}, 
                      {name: 'Column D',
                      items: [{name: 'Element A'}, {name: 'Element B'}, {name: 'Element C'}, {name: 'Element D'}]}] 
              }]
    },
  ];

  constructor(public _nav: NavbarService, public _user: UserService) {
    this._nav.hide();
   }

  ngOnInit(): void {
  }

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

}
