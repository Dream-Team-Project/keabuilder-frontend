import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RowService } from './row.service';
import { GeneralService } from './general.service';
import { StyleService } from './style.service';
import { SectionService } from './section.service';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  distroyDialogue = new Subject<any>();
  elementObj:any = { id: '', content: {}, setting: false, type: 'element', itemstyle: false, item_alignment: {desktop:'', tablet_h:'auto', tablet_v:'auto', mobile:'auto'}, style: {desktop:'', tablet_h:'', tablet_v:'', mobile:''}, hide: {desktop:false, tablet_h:false, tablet_v:false, mobile:false} };
  element_index = 0;
  selectedElements: any = [];
  elementList: Array<any> = [
    // heading
    { content: { name: 'heading',
    html: '<h2>Heading Goes Here</h2>',
    editor: false,
    },
    iconCls: 'fas fa-heading' },
    // heading
    // text
    { content: { name: 'text',
    html: '<p>Kea Builder is named after the parrot Kea. Kea is one of the smartest birds on earth. The Kea is a species of largest parrot in the family Nestoridae found in the forested and alpine regions of the South Island of New Zealand.</p>',
    editor: false,
  },
    iconCls: 'fas fa-pen' },
    // text
    // image
    { content: { name: 'image', src: '' }, iconCls: 'fas fa-image' },
    // image
    // button
    { content: { name: 'button', text: 'Read More', subtext: 'Sub Text', subfont_size:'80%', link: '#', target: '_self' }, iconCls: 'fas fa-font' },
    // button
    // menu
    { content: { name: 'menu', items:[]}, iconCls: 'fas fa-font' }, // it should be on the first position
    // menu
    // form
    { content: { name: 'form', items:[]}, iconCls: 'fab fa-wpforms' },
    // form
  ];
  menuItemObj:any = {id: '', name: 'Item', type: 'item', link: '#', dropdown: [], chngName: false, style: {desktop:'', tablet_h:'', tablet_v:'', mobile:''}, hide: {desktop: false, table_h: false, tablet_v: false, mobile: false}}
  preMenuItems:any = ['Home','About','Blog','Contact'];
  constructor(private _general: GeneralService, private _row: RowService, private _style: StyleService, private _section: SectionService) {
  }

  getDialogueEvent(): Observable<any> {
    return this.distroyDialogue.asObservable();
  }

  setDataId_items(element:any, menu:any) {
    element.data_id = menu.id;
    element.items = JSON.parse(JSON.stringify(menu.items));
    return element;
  }

  addElement(element: any) {
    if(element.name == 'menu') {
      var fm = JSON.parse(JSON.stringify(this._general.menus[0]));
      element = this.setDataId_items(element, fm);
    }
    var tempObj = JSON.parse(JSON.stringify(this.elementObj));
    tempObj.content = JSON.parse(JSON.stringify(element));
    var respS = {'font-size': tempObj.content.name == 'heading' ? '24px' : '14px'};
    tempObj.content.style = {
      desktop: this._style.defaultElementStyling(tempObj), 
      tablet_h:'',
      tablet_v:respS,
      mobile:respS}
    if(element.name == 'menu') {
      tempObj.itemstyle = true;
      tempObj.content.item = {
        style: {
          desktop: this._style.defaultStyling(tempObj), 
          tablet_h:'',
          tablet_v:respS,
          mobile:respS}
        }
      }
    var objSA =  this._style.defaultStyling(tempObj);
    tempObj.style.desktop = objSA;
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
    this._section.savePageSession();
  }

  appendElement(tempObj: any, index: number) {
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.setting = false;
    this.selectedElements.splice(index + 1, 0, tempObj);
    this._section.savePageSession();
  }
}

