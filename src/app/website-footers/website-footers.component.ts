import { Component, OnInit, TemplateRef } from '@angular/core';
import { ImageService } from '../_services/image.service';
import { GeneralService } from '../_services/_builder/general.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-website-footers',
  templateUrl: './website-footers.component.html',
  styleUrls: ['./website-footers.component.css']
})
export class WebsiteFootersComponent {

  toggleview = true;
  shortwaiting = true;
  footers:any[] = [];
  fetching:boolean = true;
  prevName:string = '';
  delfooter:any;
  action:any;

  constructor(
        public _image: ImageService,
        public _general: GeneralService,
        private dialog: MatDialog
        ) { 
            this.fetch();
        }

  openDialog(templateRef: TemplateRef<any>, menu:any) {
    this.delfooter = menu;
    this.dialog.open(templateRef);
  }     

  fetch() {
    this.fetching = true;
    this._general.fetchFooters().then(data=>{
      this.footers = data;
      this.fetching = false;
      if(this.action) this.openSB(false);
    });
  }

  rename(obj:any) {
    var prevname = this.prevName;
    if(prevname != obj.name) {
      var parser = new DOMParser();
      var html:any = parser.parseFromString(obj.html, 'text/html');
      var footer:any = html.querySelector('FOOTER');
      footer.setAttribute('data-name',obj.name);
      obj.html = footer.outerHTML;
      console.log(obj);
      this._general.fileUploadService.saveFile(obj, 'footers').subscribe(resp=>{
        if(resp.success) {
          this.action = 'renamed';
          this.openSB(false);
        }
        else {
          this.openSB(true);
          footer.name = prevname;
        }
      });
    }
  }

  create() {
    var obj:any = {id: '', html: '', type: 'footer'};
    obj.id = this._general.createBlockId(obj);
    obj.html = '<footer id="'+obj.id+'" data-name="Footer '+(this.footers.length+1)+'"></footer>';
    this._general.fileUploadService.saveFile(obj, 'footers').subscribe(resp=>{
      resp.success ? this.edit(obj.id) : this.openSB(true);
    });
  }

  edit(id:any) {
    this._general.redirectToBuilder(id.split('footer-')[1], 'footer');
  }

  duplicate(fobj:any) {
    var obj = JSON.parse(JSON.stringify(fobj));
    obj.id = this._general.createBlockId(obj);
    var parser = new DOMParser();
    var html:any = parser.parseFromString(obj.html, 'text/html');
    var footer:any = html.querySelector('FOOTER');
    footer.id = obj.id;
    footer.setAttribute('data-name',obj.name+' copy');
    obj.html = footer.outerHTML;
    this._general.fileUploadService.saveFile(obj, 'footers').subscribe(resp=>{
      if(resp.success) {
        var imgobj  = {oldname:fobj.thumbnail, newname:'keaimage-'+obj.id.split('kb-')[1]+ '-screenshot.png'};
        this._general.fileUploadService.copyimage(imgobj).subscribe(resp=>{});
        this.action = 'duplicated';
        this.fetch();
      }
      else this.openSB(true);
    });
  }

  delete() {
    this._general.fileUploadService.deleteFile(this.delfooter.id, 'footers').subscribe(resp=>{
      if(resp.success) {
        this.action = 'deleted';
        this.fetch();
      }
      else this.openSB(true);
    });
  }

  openSB(alert:any) {
    if(alert) this._general.openSnackBarAlert('Server Error', 'OK', 'center', 'top');
    else this._general.openSnackBar('Footer has been '+this.action, 'OK', 'center', 'top');
    this.action = '';
  }
  
}
