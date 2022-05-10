import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  sections:Array<any> = [];
  sectionObj = {id: 0, type: 'section', rowArr: [], setting: false, style: ''};
  selectedSectionRows = [];
  allBlocksIds:Array<number> = [];

  constructor() { 
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

  appendSection(build: { id: number; type: string; rowArr: never[]; setting: boolean; style: string; }, index: number) {
    var tempObj = JSON.parse(JSON.stringify(build));
    tempObj.id = this.createBlockId(tempObj);
    this.sections.splice(index+1, 0, tempObj);
    if(this.sections[index+1] != undefined) {
      this.sections[index+1].rowArr.forEach((item1: { id: any; columnArr?: any; })=>{
      item1.id = this.createBlockId(item1);
      item1.columnArr.forEach((item2: { id: any; elementArr?: any; })=>{
        item2.id = this.createBlockId(item2);
        item2.elementArr.forEach((item3: { id: any; })=>{
          item3.id = this.createBlockId(item3);
        })
      })
      })
    }
  }

  createBlockId(temp: { id: number; }):any {
    temp.id = Math.floor(Math.random() * 10000000000);
    if(this.allBlocksIds.includes(temp.id)) {
      return this.createBlockId(temp);
    }
    this.allBlocksIds.push(temp.id);
    return temp.id;
  }
}
