import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../_services/_builder/general.service';
import { StyleService } from '../_services/_builder/style.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  menus:any = [];
  menuObj:any = {id: '', name: 'New Menu', type: 'menu', items: []};
  menuItemObj:any = {id: '', name: 'New Item', type: 'item', link: '', target: { name: 'same tab', value: '_self' }};
  dragBoxAnime:any = {open: false, close: false};
  selectedMenu:any;
  selectedMenuItem:any;
  putLink:boolean = false;
  webpages:Array<any> = [];
  selWebPage:string = '';

  constructor(public _general: GeneralService,  public _style: StyleService) { 
    _general.getMenus().then(data=> {
      this.menus = data;
    })
    _general.webPageService.getWebpages().subscribe(web=>{
      this.webpages = web.data;
    });
    _general.funnelService.getallfunnelandstep().subscribe(funnel=>{
      console.log(funnel.data);
    })
  }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }  

  // menu

  addMenu() {
    var menu = JSON.parse((JSON.stringify(this.menuObj)));
    this.appendMenu(menu, -1);
  }

  duplicateMenu(menu:any, m:number) {
    var menu = JSON.parse((JSON.stringify(menu)));
    this.appendMenu(menu, m);
  }

  deleteMenu(id:any, m:any) {
    this._general.deletedMenuIds.push(id);
    this._general.menus.splice(m, 1);
  }

  appendMenu(menuobj: any, m:number) {
    menuobj.id = this._general.createBlockId(menuobj);
    this._general.menus.splice(m+1, 0, menuobj);
  } 

  // menu

  // menu items

  chngLink(item:any) {
    this._general.webPageService.getWebpages().subscribe(pages=>{
      this.webpages = pages.data;
    });
    this.selectedMenuItem = item;
    this.putLink = !this.putLink;
  }

  redirectLink(link:string) {
    window.open(link, '_blank');
  }

  addMenuItem(menu:any, item:any, mi: number) {
    var tempObj = JSON.parse(JSON.stringify(item));
    this.appendMenuItem(menu, tempObj, mi);
  }

  duplicateMenuItem(menu:any, item:any, mi: number) {
    var tempObj = JSON.parse(JSON.stringify(item));
    this.appendMenuItem(menu, tempObj, mi);
  }

  deleteMenuItem(menu:any, mi: number) {
    menu.splice(mi, 1);
  }

  appendMenuItem(menu: any, tempObj:any, mi: number) {
    tempObj.id = this._general.createBlockId(tempObj);
    menu.splice(mi+1, 0, tempObj);
  }

  // menu items

}
