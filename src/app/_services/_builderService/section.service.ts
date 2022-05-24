import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  sections:Array<any> = [];
  sectionObj = {id: 0, type: 'section', rowArr: [], setting: false, style: ''};
  selectedSectionRows = [];

  constructor(private _general: GeneralService) { 
    this.addSection(0);
  }
  
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
  }

}
