import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy, ChangeDetectionStrategy, Input, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { GeneralService } from '../_services/_builder/general.service';
import { StyleService } from '../_services/_builder/style.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit, OnDestroy {

  @ViewChild(TemplateRef) _dialogTemplate!: TemplateRef<any>;
  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;

  menuObj:any = {id: '', name: 'New Menu', type: 'menu', items: []};
  menuItemObj:any = {id: '', name: 'New Item', type: 'item', link: ''};
  dragBoxAnime:any = {open: false, close: false};
  selectedMenu:any;
  selectedMenuItem:any;
  putLink:boolean = false;
  webpages:Array<any> = [];
  selWebPage:string = '';

  constructor(public _general: GeneralService,  public _style: StyleService,  private _overlay: Overlay, private _viewContainerRef: ViewContainerRef) { 
  }

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.backdropClick().subscribe(() => {
      this.overlayRefDetach();
    });
  }
  ngOnDestroy() {
    this._overlayRef.dispose();
  }
  openDialog(menu:any) {
    this.selectedMenu = menu;
    this.dragBoxAnime.open = true;
    this._overlayRef.attach(this._portal);
    setTimeout(()=>{
      this.dragBoxAnime.open = false;
    },200)
  }
  overlayRefDetach() {
    this.dragBoxAnime.close = true;
    setTimeout(()=>{
      this._overlayRef.detach();
      this.dragBoxAnime.close = false;
      this.putLink = false;
      this.selectedMenuItem = '';
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
