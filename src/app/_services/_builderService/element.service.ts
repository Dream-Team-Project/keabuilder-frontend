import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RowService } from './row.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  distroyDialogue = new Subject<any>();
  elementObj = {id: 0, content: {}, style: '', setting: false, type: 'element'};
  element_index = 0;
  selectedElements:any = [];
  elementList:Array<any> = [{content:{name: 'text', html:'<p>Kea Builder is named after the parrot Kea. Kea is one of the smartest birds on earth. The Kea is a species of largest parrot in the family Nestoridae found in the forested and alpine regions of the South Island of New Zealand.</p>'}, iconCls: 'fas fa-font'},
  {content:{name: 'image', src:''}, iconCls: 'fas fa-image'}];
  uploadImgPath = './assets/images/builder/upload_images/';

  constructor(private _general: GeneralService, private _row: RowService ) { }

  getDialogueEvent():Observable<any> {
    return this.distroyDialogue.asObservable();
  }

  addElement(element: any) {
    var tempObj = JSON.parse(JSON.stringify(this.elementObj));
    tempObj.content = element;
    this.appendElement(tempObj, this.element_index);
    this._row.selectedRow.columnSetting = false;
    this.distroyDialogue.next(void 0);
    this._general.blockSelection = '';
  }

  duplicateElement(element: any, index: any) {
    var tempObj = JSON.parse(JSON.stringify(element));
    this.appendElement(tempObj, index);
  }

  deleteElement(elements: any[], index: any) {
      elements.splice(index, 1);
  }

  appendElement(tempObj: any, index: number) {
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.setting = false;
    this.selectedElements.splice(index+1, 0, tempObj);
  }
}

