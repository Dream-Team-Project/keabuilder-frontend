import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RowService } from './row.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  distroyDialogue = new Subject<any>();
  elementObj:any = { id: '', content: {}, style: '', setting: false, type: 'element' };
  element_index = 0;
  selectedElements: any = [];
  elementList: Array<any> = [
    // heading
    { content: { name: 'heading',
    html: '<h2>Heading Goes Here</h2>',
    editor: false,
    style: '',
    },
    iconCls: 'fas fa-heading' },
    // heading
    // text
    { content: { name: 'text',
    html: '<p>Kea Builder is named after the parrot Kea. Kea is one of the smartest birds on earth. The Kea is a species of largest parrot in the family Nestoridae found in the forested and alpine regions of the South Island of New Zealand.</p>',
    editor: false,
    style: '',
  },
    iconCls: 'fas fa-pen' },
    // text
    // image
    { content: { name: 'image', src: '' }, iconCls: 'fas fa-image' },
    // image
    // button
    { content: { name: 'button', text: 'Read More', subtext: 'Sub Text', subfont_size:'80%', link: '#' }, iconCls: 'fas fa-font' }
    // button
  ];

  constructor(private _general: GeneralService, private _row: RowService) { }

  getDialogueEvent(): Observable<any> {
    return this.distroyDialogue.asObservable();
  }

  addElement(element: any) {
    var tempObj = JSON.parse(JSON.stringify(this.elementObj));
    tempObj.content = JSON.parse(JSON.stringify(element));
    this.appendElement(tempObj, this.element_index);
    this._row.selectedRow.columnSetting = false;
    this.distroyDialogue.next(void 0);
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
    if(tempObj.content.name == 'button') {
      if(!tempObj.style) {
        tempObj.content.style = {
          'padding': '4px 16px',
          'font-weight': 600,
          'font-size': '14px',
          'color': '#fff',
          'background-color': '#1BC5BD',
          'border-width': '2px',
          'border-color': '#1BC5BD',
          'border-style': 'solid',
          'border-radius': '5px', 
          'transition': '0.2s ease-in-out',  
        }
      }
    }
    this.selectedElements.splice(index + 1, 0, tempObj);
  }
}

