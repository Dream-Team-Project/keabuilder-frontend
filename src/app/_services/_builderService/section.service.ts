import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { StyleService } from './style.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  sections:any = [];
  sectionObj:any = {id: '', type: 'section', rowArr: [], setting:false, style: {desktop:'', tablet_h:'', tablet_v:'', mobile:''}, hide: {desktop:false, tablet_h:false, tablet_v:false, mobile:false}};
  selectedSectionRows = [];

  pageSession:any = {undo: 0, redo: 0}
  pageSessionArr:any = [];
  undoToggle:boolean = true;

  constructor(private _general: GeneralService, private _style:StyleService) { 
    var respS = {padding: '30px 0px'};
    this.sectionObj.style = {
      desktop: this._style.defaultStyling(this.sectionObj),
      tablet_h: '',
      tablet_v: respS,
      mobile: respS,
    }
    this.addSection(0);
  }

  // session storage

  savePageSession() {
    var sessionStr = JSON.stringify(this.sections).replace(/"setting":true/g, '"setting":false');
    if(this.pageSessionArr[this.pageSessionArr.length-1] != sessionStr && this.pageSessionArr[this.pageSession.undo] != sessionStr) {
      this.pageSessionArr.push(sessionStr);
      this.pageSession.undo = this.pageSessionArr.length-1; 
      this.pageSession.redo = this.pageSessionArr.length; 
    }
  }

  undo() {
    var sObj = this.pageSessionArr[this.pageSession.undo-1];
    if(sObj != undefined) {
      this.sections = JSON.parse(sObj);
      this.pageSession.undo--;
      this.pageSession.redo--;
    }
  }

  redo() {
    var sObj = this.pageSessionArr[this.pageSession.redo];
    if(sObj != undefined) {
      this.sections = JSON.parse(sObj);
      this.pageSession.undo++;
      this.pageSession.redo++;
    }
  }
  
  // session storage

  addSection(index: number) {
    this.appendSection(this.sectionObj, index);
  }

  duplicateSection(section: any, index: number) {
    this.appendSection(section, index);
    this.selectedSectionRows = [];
    this.selectedSectionRows = section.rowArr;
  }

  deleteSection(index: number) {
    this.sections.splice(index, 1);
    this.savePageSession();
  }

  appendSection(section: { id: number; type: string; rowArr: never[]; setting: boolean; style: string; }, index: number) {
    var tempObj = JSON.parse(JSON.stringify(section));
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.setting = false;
    this.sections.splice(index+1, 0, tempObj);
    if(this.sections[index+1] != undefined) {
      this.sections[index+1].rowArr.forEach((item1: { id: any; columnArr?: any; })=>{
      item1.id = this._general.createBlockId(item1);
      item1.columnArr.forEach((item2: { id: any; elementArr?: any; })=>{
        item2.id = this._general.createBlockId(item2);
        item2.elementArr.forEach((item3: { id: any; })=>{
          item3.id = this._general.createBlockId(item3);
        })
      })
      })
    }
    this.savePageSession();
  }

}
