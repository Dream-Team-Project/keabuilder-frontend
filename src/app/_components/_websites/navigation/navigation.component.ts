import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { StyleService } from 'src/app/_services/_builder/style.service';
import { ImageService } from 'src/app/_services/image.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from 'src/app/_services/navigation.service';

@Component({
  selector: 'app-website-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class WebsiteNavigationComponent {

  menus:any = [];
  menuobj:any = '';
  menuItemObj:any = '';
  dragBoxAnime:any = {open: false, close: false};
  selectedMenu:any;
  selectedMenuItem:any;
  putLink:boolean = false;
  webpages:Array<any> = [];
  funnels:Array<any> = [];
  selWebPage:string = '';
  fetching:any = {
    menu: true,
    web: true,
    funnel: true
  }
  custom:any = {page_name: 'Custom Link', page_path: '#'};
  prevmenuitem:any = {};
  delmenu:any;
  action:any;

  constructor(private _navigationService : NavigationService,public _general: GeneralService,  public _style: StyleService, public _image: ImageService, private dialog: MatDialog) { 
    this.fetchMenus(); 
    this.getAllWebPages();
    this.getAllFunnels();
  }

  openDialog(templateRef: TemplateRef<any>, menu:any) {
    this.delmenu = menu;
    this.dialog.open(templateRef);
  }

  refreshPages(val:string) {
    val == 'website' ? this.getAllWebPages() : this.getAllFunnels();
  }

  fetchMenus() {
    this.fetching.menu = true;
    this._general.fetchMenus().then(data=> {
      this.menus = data;
      this.menuobj = '';
      this.fetching.menu = false;
      if(this.action) this.openSB(false);
    })
  }

  getAllWebPages() {
    this.fetching.web = true;
    this._general.webPageService.getWebpages().subscribe(web=>{
      this.webpages = web.data;
      this.fetching.web = false;
  });
  }

  getAllFunnels() {
    this.fetching.funnel = true;
    this._general.funnelService.getallfunnelandstep().subscribe(data=>{
      var steps = data.data;
      this.funnels = data.data2;
      if(steps?.length>0){
        this.funnels.forEach((fp:any, findex:number)=>{
          fp.steps = [];
          steps.forEach((s:any, sindex:number)=>{
            if(fp.uniqueid == s.funnelid) fp.steps.push(s);
            if(findex == this.funnels.length-1 && sindex == steps.length-1) this.fetching.funnel = false;
          })
        })
      }else{
        this.fetching.funnel = false;
      }
    })
  }

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.menuobj.items, event.previousIndex, event.currentIndex);
    } else {
      let data = event.item.data;
      this.menuItemObj = {id: '', name: data.page_name, type: 'item', link: data.page_path == '#' ? '#' : this._general.active_domain+data.page_path, target: '_self', setting: false}
      this.appendMenuItem(this.menuItemObj, event.currentIndex);
    }
  }

  // menu

  toggleItemSetting(item:any) {
    item.setting = !item.setting;
    if(JSON.stringify(item) != JSON.stringify(this.prevmenuitem)) {
      this.prevmenuitem.setting = false;
    }
    if(!item.name) item.name = 'Link';
    if(!this.prevmenuitem.name) this.prevmenuitem.name = 'Link';
    if(!item.link) item.link = '#';
    if(!this.prevmenuitem.link) item.link = '#';
    this.prevmenuitem = item;
  }

  createNew() {
    this.menuobj = {id: '',uniqueid:'', name: '', type: 'menu', items: []};
    this.menuobj.uniqueid = this._general.makeid(20);
  }

  selectMenu(menu:any) {
    let temp = JSON.parse((JSON.stringify(menu)));
    temp.items = this._general.decodeJSON(temp.items);
    this.menuobj = temp;
  }

  saveMenu(menu:any) {
    let menuobj = JSON.parse(JSON.stringify(menu));
    if(menuobj.name && menuobj.items.length != 0) {
      if(!this.action) this.action = 'saved';
      this.fetching.menu = true;
      menuobj.items = this._general.encodeJSON(menuobj.items);
      this._navigationService.addNavigation(menuobj).subscribe((resp:any)=>{
        resp.success ? this.fetchMenus() : this.openSB(true);
      })   
    }
    else {
      var msg = !menuobj.name ? 'Menu name should not be empty' : 'Atlease one menu item should be added';
    this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
    }
  }

  duplicateMenu(menuobj:any) {
    this.action = 'duplicated';
    var tempmenu = JSON.parse(JSON.stringify(menuobj));
    tempmenu.uniqueid = this._general.createBlockId(tempmenu);
    tempmenu.name = tempmenu.name + ' copy';
    tempmenu.items.forEach((item:any, index:number)=>{
      item.uniqueid = this._general.createBlockId(item);
      if(index == tempmenu.items.length-1) {
        this.saveMenu(tempmenu);
      }
    })
  }

  deleteMenu() {
    this.action = 'deleted';
    this.fetching.menu = true;

    this._navigationService.deleteNavigation(this.delmenu.id).subscribe((resp:any)=>{
      resp.success ? this.fetchMenus() : this.openSB(true);
    })
  }

  // menu

  // menu items

  redirectLink(link:string) {
    window.open(link, '_blank');
  }

  addMenuItem(item:any, mi: number) {
    var tempObj = JSON.parse(JSON.stringify(item));
    this.appendMenuItem(tempObj, mi);
  }

  duplicateMenuItem(item:any, mi: number) {
    var tempObj = JSON.parse(JSON.stringify(item));
    this.appendMenuItem(tempObj, mi);
  }

  deleteMenuItem(mi: number) {
    this.menuobj.items.splice(mi, 1);
  }

  appendMenuItem(tempObj:any, mi: number) {
    tempObj.id = this._general.createBlockId(tempObj);
    this.menuobj.items.splice(mi, 0, tempObj);
  }

  // menu items

  openSB(alert:any) {
    var msg = alert ? 'Server Error' : 'Menu has been '+this.action;
    this._general.openSnackBar(alert, msg, 'OK', 'center', 'top');
    this.action = '';
  }

}
