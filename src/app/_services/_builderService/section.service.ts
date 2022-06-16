import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  testObj:any = {id: '', type: 'section', rowArr: [
    {id: 'kb-row-5419236692', type: 'row', columnArr: [
      {id: '', type: 'column', elementArr: [
        { id: '', content: { name: 'text',
        html: '<p>Kea Builder is named after the parrot Kea. Kea is one of the smartest birds on earth. The Kea is a species of largest parrot in the family Nestoridae found in the forested and alpine regions of the South Island of New Zealand.</p>',
        editor: false,
        style: '',
      }, style: '', setting: false, type: 'element' }
      ], name: '', chngName: false, style: '', }
    ], setting: false, columnSetting: true, rowSize: '', style: ''}], 
    setting: false, style: ''};
  sections:Array<any> = [];
  sectionObj:any = {id: '', type: 'section', rowArr: [], setting: false, style: ''};
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
