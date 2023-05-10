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
  elementObj: any = {id: '', name: '',  type: 'element', content: {}, setting: false, 
                    item_alignment: {desktop: '', tablet_h: 'auto', tablet_v: 'auto', mobile: 'auto'}, 
                    redirection: {link: '', target: '_self' },
                    style: {desktop: '', tablet_h: '', tablet_v: '', mobile: '', hover: ''}, 
                    hide: {desktop: false, tablet_h: false, tablet_v: false, mobile: false}};
  element_index = 0;
  selectedElements: any = [];
  elementList: any = {
    // heading
    heading: {
      content: {
        name: 'heading',
        html: `<h2>Heading goes here</h2>`,
        size: 38,
        editor: false,
      }, iconCls: 'fas fa-heading'},
    // heading
    // text
    text: {
      content: {
        name: 'text',
        html: `<p>Kea Builder is named after the parrot Kea. Kea is one of the smartest birds on earth. The Kea is a species of largest parrot in the family Nestoridae found in the forested and alpine regions of the South Island of New Zealand.</p>`,
        size: 16,
        editor: false,
      }, iconCls: 'fas fa-font'},
    // text
    // image
    image: { content: { name: 'image', src: '' }, iconCls: 'far fa-image'},
    // image
    // video
    video: {
      content: {
        name: 'video',
        type: 'video',
        iframe: '<iframe width="560" height="315" src="http://localhost:4200/assets/videos/movie.mp4" title="Video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        src: 'http://localhost:4200/assets/videos/movie.mp4',
        autoplay: false,
        muted: false,
        loop: false,
        controls: true
      }, iconCls: 'fas fa-video'},
    // video
    // button
    button: { 
      content: { 
        name: 'button', size: 14, btntype: 'regular', 
        text: 'Read More', subtext: '', subfont_size: '80%', 
        link: '#no-link', target: '_self' 
      }, iconCls: 'fas fa-toggle-off'},
    // button
    // menu
    menu: { content: { name: 'menu', size: 16, items: []}, iconCls: 'fas fa-bars'},
    // menu
    // divider
    divider: { content: { name: 'divider' }, iconCls: 'fas fa-minus'},
    // divider
    // form
    form: { content: { name: 'iframe', type: 'form', src: '', height: '' }, iconCls: 'fab fa-wpforms'},
    // form
    // code block
    code: { content: { name: 'code', html: ``}, iconCls: 'fas fa-code' },
    // code block
    // icon
    icon: { content: { name: 'icon', html: `<i class="fa-solid fa-icons"></i>`, size: 18,}, iconCls: 'fa-solid fa-icons' },
    // icon
    // checkout form
    // append
    // checkout form
  };
  preMenuItems: any = ['Home', 'About', 'Blog', 'Contact'];
  defaultIcons: any = [
    {name: 'fa-solid fa-house', type: 'solid'},
    {name: 'fa-solid fa-user', type: 'solid'},
    {name: 'fa-regular fa-user', type: 'regular'},
    {name: 'fa-brands fa-facebook', type: 'brand'},
    {name: 'fa-brands fa-square-facebook', type: 'brand'},
    {name: 'fa-brands fa-twitter', type: 'brand'},
  ]
  default: any = {
    headings: [],
    texts: [],
    buttons: [],
    dividers: [],
    videos: [],
    checkouts: [],
    codes: [],
  }
  constructor(private _general: GeneralService, private _row: RowService, private _style: StyleService, private _section: SectionService) {
  }
  getDialogueEvent(): Observable<any> {
    return this.distroyDialogue.asObservable();
  }

  setMenu(element: any, menu: any) {
    element.data_id = menu.id;
    element.items = JSON.parse(JSON.stringify(menu.items));
    return element;
  }

  setIframe(element: any, adata: any) {
    element.data_id = adata.uniqueid;
    element.src = window.origin + '/fetch-form/' + adata.user_id + '/' + adata.uniqueid;
    return element;
  }

  addElement(element: any) {
    if (element.btntype == 'upsell' || element.btntype == 'downsell') {
      var proId = this._general.step_products[0];
      element.productid = proId ? proId.uniqueid : '';
    }
    else if (element.name == 'menu') {
      if (element?.itemset) delete element?.itemset;
      else element = this.setMenu(element, JSON.parse(JSON.stringify(this._general.menus[0])));
    }
    else if (element.name == 'iframe' && element.type == 'form') {
      if (element?.itemset) delete element?.itemset;
      else element = this.setIframe(element, JSON.parse(JSON.stringify(this._general.forms[0])));
    }
    var tempObj = JSON.parse(JSON.stringify(this.elementObj));
    tempObj.content = JSON.parse(JSON.stringify(element));
    if (element.name != 'iframe' && element.name != 'code') {
      var respS: any = { 'font-size': tempObj.content.name == 'heading' ? '24px' : '14px' };
      if(element.name == 'menu') {
        tempObj.content.style = {
          desktop: this._style.defaultStyling(tempObj),
          tablet_h: '',
          tablet_v: '',
          mobile: ''
        }
        tempObj.dropdownstyle = true;
        tempObj.content.style.dropdown = this._style.defaultStyling(tempObj);
        delete tempObj.dropdownstyle;
      }
      else if (element.name == 'form' || element.name == 'divider') {
        respS = { 'width': '100%'};
        tempObj.content.style = {
          desktop: this._style.defaultStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
      }
      else {
        tempObj.content.style = {
          desktop: this._style.defaultElementStyling(tempObj),
          tablet_h: '',
          tablet_v: respS,
          mobile: respS
        }
      }
      if (element.items) {
        tempObj.itemstyle = true;
        var eleS = this._style.defaultElementStyling(tempObj);
        tempObj.content.item = {
          style: {
            desktop: eleS,
            tablet_h: '',
            tablet_v: respS,
            mobile: respS,
          }
        }
        if(element.name == 'menu') tempObj.content.item.style.dropdown = eleS;
        delete tempObj.itemstyle;
        console.log(tempObj);
      }
      if (element.form) return tempObj;
    }
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

