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
  menuItemObj:any = {id: '', name: 'New Item', type: 'item', link: '', hide: {desktop: false, table_h: false, tablet_v: false, mobile: false}};
  dragBoxAnime:any = {open: false, close: false};
  selectedMenu:any;
  selectedMenuItem:any;
  putLink:boolean = false;
  webpages:Array<any> = [];
  selWebPage:string = '';

  constructor(public _general: GeneralService,  public _style: StyleService,  private _overlay: Overlay, private _viewContainerRef: ViewContainerRef) { 
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
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
    this.appendMenu(this.menuObj);
  }

  duplicateMenu(menu:any) {
    this.appendMenu(menu);
  }

  deleteMenu(m:any) {
    this._general.menus.splice(m, 1);
  }

  appendMenu(menuobj: any) {
    var menu = JSON.parse((JSON.stringify(menuobj)));
    menu.id = this._general.createBlockId(menu);
    this._general.menus.unshift(menu);
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
    item.name = 'New Item';
    this.appendMenuItem(menu, item, mi);
  }

  duplicateMenuItem(menu:any, item:any, mi: number) {
    this.appendMenuItem(menu, item, mi);
  }

  deleteMenuItem(menu:any, mi: number) {
    menu.splice(mi, 1);
  }

  appendMenuItem(menu: any, item:any, mi: number) {
    var tempObj = JSON.parse(JSON.stringify(item));
    tempObj.id = this._general.createBlockId(item);
    menu.splice(mi+1, 0, tempObj);
  }

  // menu items

}
