import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GeneralService } from '../_services/_builder/general.service';
import { StyleService } from '../_services/_builder/style.service';
import { ImageService } from '../_services/image.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

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

  constructor(public _general: GeneralService,  public _style: StyleService, public _image: ImageService, private dialog: MatDialog) { 
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
      let i = 0;
      var steps = data.data;
      this.funnels = data.data2;
      console.log(data);
      if(data.data?.length>0){
        this.funnels.forEach((fp:any)=>{
          let j = 0;
          if(!fp.step_pages) fp.steps = [];
          steps.forEach((s:any)=>{
            if(fp.id == s.funnelid) {
              fp.steps.push(s);
            }
            if(i == this.funnels.length-1 && j == steps.length-1) {
              this.fetching.funnel = false;
            }
            j++;
          })
            i++;
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
      this.menuItemObj = {id: '', name: data.page_name, type: 'item', link: data.page_path == '#' ? '#' : this._general.subdomain+data.page_path, target: '_self', setting: false}
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
    this.menuobj = {id: '', name: '', type: 'menu', items: []};
    this.menuobj.id = this._general.createBlockId(this.menuobj);
  }

  selectMenu(menu:any) {
    this.menuobj = JSON.parse((JSON.stringify(menu)));
  }

  saveMenu(menuobj:any) {
    if(menuobj.name && menuobj.items.length != 0) {
      if(!this.action) this.action = 'saved';
      this.fetching.menu = true;
      var count = 0;
      var m = menuobj;
      var ul = document.createElement('UL');
      ul.id = m.id;
      ul.setAttribute('data-name',m.name);
      ul.className = 'kb-menu';
      m.items.forEach((i:any)=>{
        var li:any = document.createElement('LI');
        var a =  document.createElement('A');
        a.id = i.id;
        a.setAttribute('href', i.link);
        a.setAttribute('target', i.target);
        a.innerHTML = i.name;
        li.innerHTML = a.outerHTML;
        ul.innerHTML = ul.innerHTML + li.outerHTML;
        if(count == m.items.length-1) {
          var obj = {
            id: m.id,
            html: ul.outerHTML,
          }
          this._general.fileUploadService.saveFile(obj, 'menus').subscribe((resp:any)=>{
             resp.success ? this.fetchMenus() : this.openSB(true);
          })
        }
        count++;
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
    var count = 0;
    tempmenu.id = this._general.createBlockId(tempmenu);
    tempmenu.name = tempmenu.name + ' copy';
    tempmenu.items.forEach((item:any)=>{
      item.id = this._general.createBlockId(item);
      if(count == tempmenu.items.length-1) {
        this.saveMenu(tempmenu);
      }
      count++;
    })
  }

  deleteMenu() {
    this.action = 'deleted';
    this.fetching.menu = true;
    this._general.fileUploadService.deleteFile(this.delmenu.id, 'menus').subscribe((resp:any)=>{
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
