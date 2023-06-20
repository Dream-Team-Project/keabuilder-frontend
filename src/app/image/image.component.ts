import { Component, OnInit, Input, ViewChild, TemplateRef, ElementRef, ViewContainerRef } from '@angular/core';
import { GeneralService } from '../_services/_builder/general.service';
import { ImageService } from '../_services/image.service';
import { StyleService } from '../_services/_builder/style.service';
import { FormService } from '../_services/_crm/form.service';
import { MatDialog } from '@angular/material/dialog';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css', '../builder/builder.component.css', '../builder/material.component.css']
})

export class ImageComponent implements OnInit {

  connectWtParent:boolean = false;
  delimage:any;

  @ViewChild('imgdialog')
  _dialogTemplate!: TemplateRef<any>;

  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;

  dragBoxAnime:any = {open: false, close: false};

  @Input()
  set DialogImageToggle(val: any) {
    if(this.connectWtParent) {
      this.openDialog();
    }
    else this.connectWtParent = true;
  }   

  constructor(public _general:GeneralService, public _image:ImageService, public _style:StyleService, private _form:FormService, private dialog: MatDialog, private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.backdropClick().subscribe(() => {
      if(!this._general.minimize) this.closeDialog();
    });
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

  openImgDelDialog(templateRef: TemplateRef<any>, img:any) {
    this.delimage = img;
    this.dialog.open(templateRef);
  }     

  openDialog() {
    this._image.showEditImgContainer = false;
    this.dragBoxAnime.open = true;
    this._overlayRef.attach(this._portal);
    setTimeout(()=>{
      this.dragBoxAnime.open = false;
    },200)
  }  

  closeDialog() {
    this.dragBoxAnime.close = true;
    setTimeout(()=>{
      this._overlayRef.detach();
      this.dragBoxAnime.close = false;
    },200);
  }

  imgActive(img:any) {
    var src = !img.ext_link ? this._image.uploadImgPath + img.path : img.path;
    if (this._general.selectedTab == 'background') return this._style.background_image.name == src;
    else if(this._general.selectedBlock.type == 'main') return this._general.meta_img == src;
    else return this._style.image_src == src;
  }

  imgSelection(img:any) {
    if(this._image.imageSelectionAllow) {
      this._style.addImage(img); 
      if(this._form.selEle) this._form.selEle.src = this._style.image_src;
      this.closeDialog();
    }
    else this._image.editImage(img);
  }

}
