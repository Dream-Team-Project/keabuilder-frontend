import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RowService } from './row.service';
import { GeneralService } from './general.service';
import { StyleService } from './style.service';
import { SectionService } from './section.service';
import { CdkDropList } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  public elementConnect: CdkDropList[] = [];

  distroyDialogue = new Subject<any>();
  elementObj:any = { id: '', name: '', content: {}, setting: false, type: 'element', itemstyle: false, item_alignment: {desktop:'', tablet_h:'auto', tablet_v:'auto', mobile:'auto'}, style: {desktop:'', tablet_h:'', tablet_v:'', mobile:''}, hide: {desktop:false, tablet_h:false, tablet_v:false, mobile:false} };
  element_index = 0;
  selectedElements: any = [];
  elementList:any = {
    // heading
    heading: { content: { name: 'heading',
    html: '<h2>Heading goes here</h2>',
    size: 38,
    editor: false,
    },
    iconCls: 'fas fa-heading' },
    // heading
    // text
    text: { content: { name: 'text',
    html: '<p>Kea Builder is named after the parrot Kea. Kea is one of the smartest birds on earth. The Kea is a species of largest parrot in the family Nestoridae found in the forested and alpine regions of the South Island of New Zealand.</p>',
    size: 16,
    editor: false,
    },
    iconCls: 'fas fa-font' },
    // text
    // image
    image: { content: { name: 'image', src: '' }, iconCls: 'far fa-image' },
    // image
    // button
    button: { content: { name: 'button', size: 14, btntype: 'regular', text: 'Read More', subtext: '', subfont_size:'80%', link: '#no-link', target: '_self' }, iconCls: 'fas fa-toggle-off' },
    // button
    // menu
    menu: { content: { name: 'menu', size: 16, items:[]}, iconCls: 'fas fa-external-link-alt' },
    // menu
    // divider
    // divider: { content: { name: 'divider'}, iconCls: 'fas fa-grip-lines' },
    // divider
    // form
    // form: { content: { name: 'form'}, iconCls: 'fab fa-wpforms' },
    // form
    // code block
    // code: { content: { name: 'code', html: ''}, iconCls: 'fas fa-code' },
    // code block
    // checkout form
    // append
    // checkout form
  };
  menuItemObj:any = {id: '', name: 'Item', type: 'item', link: '#', dropdown: [], chngName: false, style: {desktop:'', tablet_h:'', tablet_v:'', mobile:''}, hide: {desktop: false, table_h: false, tablet_v: false, mobile: false}}
  preMenuItems:any = ['Home','About','Blog','Contact'];
  defaultHeadings:any = [];
  defaultTexts:any = [];
  defaultButtons:any = [];
  constructor(private _general: GeneralService, private _row: RowService, private _style: StyleService, private _section: SectionService) {
  }

  getDialogueEvent(): Observable<any> {
    return this.distroyDialogue.asObservable();
  }

  setMenu(element:any, menu:any) {
    element.data_id = menu.id;
    element.items = JSON.parse(JSON.stringify(menu.items));
    return element;
  }

  addElement(element: any) {
    if(element.name == 'menu') {
      if(element?.itemset) delete element?.itemset;
      else {
        element = this.setMenu(element, JSON.parse(JSON.stringify(this._general.menus[0])));
      }
    }
    var tempObj = JSON.parse(JSON.stringify(this.elementObj));
    tempObj.content = JSON.parse(JSON.stringify(element));
    var respS:any = {'font-size': tempObj.content.name == 'heading' ? '24px' : '14px'};
    if(element.name == 'form') {
      respS = {'width': '100%'};
      tempObj.content.style = {
        desktop: this._style.defaultStyling(tempObj), 
        tablet_h:'',
        tablet_v:respS,
        mobile:respS}
    }
    else {
    tempObj.content.style = {
      desktop: this._style.defaultElementStyling(tempObj), 
      tablet_h:'',
      tablet_v:respS,
      mobile:respS}
    }
    if(element.name == 'menu') {
      tempObj.itemstyle = true;
      tempObj.content.item = {
        style: {
          desktop: this._style.defaultStyling(tempObj), 
          tablet_h:'',
          tablet_v:respS,
          mobile:respS}
        }
      tempObj.itemstyle = false;
    }
    if(element.form) return tempObj;
    this.appendElement(tempObj, this.element_index);
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

