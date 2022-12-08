import { Component, OnInit, TemplateRef } from '@angular/core';
import { ImageService } from '../_services/image.service';
import { GeneralService } from '../_services/_builder/general.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-website-headers',
  templateUrl: './website-headers.component.html',
  styleUrls: ['./website-headers.component.css']
})
export class WebsiteHeadersComponent {

  toggleview = true;
  shortwaiting = true;
  headers:any[] = [];
  fetching:boolean = true;
  prevName:string = '';
  delheader:any;
  action:any;

  constructor(
        public _image: ImageService,
        public _general: GeneralService,
        private dialog: MatDialog
        ) { 
          this.toggleview = _general.getStorage('header_toggle');
          this.fetch();
        }
  
  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('header_toggle',this.toggleview);
  }

  openDialog(templateRef: TemplateRef<any>, menu:any) {
    this.delheader = menu;
    this.dialog.open(templateRef);
  }     

  fetch() {
    this.fetching = true;
    this._general.fetchHeaders().then(data=>{
      this.headers = data;
      this.fetching = false;
      if(this.action) this.openSB(false);
    });
  }

  rename(obj:any) {
    var prevname = this.prevName;
    if(prevname != obj.name) {
      var parser = new DOMParser();
      var html:any = parser.parseFromString(obj.html, 'text/html');
      var header:any = html.body.children[0];
      header.setAttribute('data-name',obj.name);
      obj.html = header.outerHTML;
      this._general.fileUploadService.saveFile(obj, 'headers').subscribe(resp=>{
        if(resp.success) {
          this.action = 'renamed';
          this.openSB(false);
        }
        else {
          this.openSB(true);
          header.name = prevname;
        }
      });
    }
  }

  create() {
    var obj:any = {id: '', html: '', type: 'header'};
    obj.id = this._general.createBlockId(obj);
    obj.html = '<div id="'+obj.id+'" data-name="Header '+(this.headers.length+1)+'"></div>';
    this._general.fileUploadService.saveFile(obj, 'headers').subscribe(resp=>{
      resp.success ? this.edit(obj.id) : this.openSB(true);
    });
  }

  edit(id:any) {
    this._general.redirectToBuilder(id.split('header-')[1], 'header');
  }

  duplicate(hobj:any) {
    var obj = JSON.parse(JSON.stringify(hobj));
    obj.id = this._general.createBlockId(obj);
    var parser = new DOMParser();
    var html:any = parser.parseFromString(obj.html, 'text/html');
    var header:any = html.body.children[0];
    header.id = obj.id;
    header.setAttribute('data-name',obj.name+' copy');
    obj.html = header.outerHTML;
    this._general.fileUploadService.saveFile(obj, 'headers').subscribe(resp=>{
      if(resp.success) {
        var imgobj  = {oldname:hobj.thumbnail, newname:'keaimage-'+obj.id.split('kb-')[1]+ '-screenshot.png'};
        this._general.fileUploadService.copyimage(imgobj).subscribe(resp=>{});
        this.action = 'duplicated';
        this.fetch();
      }
      else this.openSB(true);
    });
  }

  delete() {
    this._general.fileUploadService.deleteFile(this.delheader.id, 'headers').subscribe(resp=>{
      if(resp.success) {
        this.action = 'deleted';
        this.fetch();
      }
      else this.openSB(true);
    });
  }

  openSB(alert:any) {
    if(alert) this._general.openSnackBarAlert('Server Error', 'OK', 'center', 'top');
    else this._general.openSnackBar('Header has been '+this.action, 'OK', 'center', 'top');
    this.action = '';
  }
  
}
