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
  fetching:boolean = true;
  headers:any[] = [];
  delheader:any;
  action:any;
  header:any = {uniqueid: '', name: ''};

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

  openDialog(templateRef: TemplateRef<any>) {
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

  rename(header:any, inp:any) {
    var headname = inp.value;
    if(header.name !== headname) {
      if(headname.length > 3){
        header.name = headname;
        this._general.fileUploadService.updateheader(header).subscribe(resp=>{
          if(resp.success) {
            this.action = 'renamed';
            this.openSB(false);
          }
          else {
            this.openSB(true);
          }
        });
      }
      else {
        var msg = "Name must be at least 3 characters!";
        this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
        inp.value = header.name;
      }
    }
  }

  create() {
    this.header.uniqueid = this._general.makeid(20);
    var obj:any = {
      id: 'kb-header-'+this.header.uniqueid,
      html: ''
    };
    this._general.fileUploadService.saveFile(obj, 'headers').subscribe(e=>{
      this._general.fileUploadService.saveheader(this.header).subscribe(resp=>{
        if(resp.success) {
          this.edit(this.header);
          this.header.name = '';
        }
        else this.openSB(true);
        resp.success ? this.edit(this.header) : this.openSB(true);
      });
    });
  }

  edit(header:any) {
    this._general.redirectToBuilder(header.uniqueid, 'header');
  }

  duplicate(header:any) {
    var dobj = JSON.parse(JSON.stringify(header));
    dobj.name = dobj.name + ' copy';
    dobj.uniqueid = this._general.makeid(20);
    var obj = {
      oldpath: 'kb-header-'+header.uniqueid+'.php',
      path: 'kb-header-'+dobj.uniqueid+'.php',
    }
    this._general.fileUploadService.copyFile(obj, 'headers').subscribe(resp=>{
      if(resp.success) {
        this._general.fileUploadService.saveheader(dobj).subscribe((resp:any)=>{
          this.fetch();
          console.log(resp);
        })
        var imgobj  = {
          oldname: this._general.getSSPath('header-'+header.uniqueid), 
          newname: this._general.getSSPath('header-'+dobj.uniqueid)
        };
        this._general.fileUploadService.copyimage(imgobj).subscribe(resp=>{});
        this.action = 'duplicated';
      }
      else this.openSB(true);
    });
  }

  delete() {
    this._general.fileUploadService.deleteheader(this.delheader.id).subscribe((resp:any)=>{
      this._general.fileUploadService.deleteFile('kb-header-'+this.delheader.uniqueid, 'headers').subscribe(resp=>{
        console.log(resp);
        if(resp.success) {
          this.action = 'deleted';
          this.fetch();
        }
        else this.openSB(true);
      });
    })
  }

  openSB(alert:any) {
    var msg = alert ? 'Server Error' : 'Header has been '+this.action;
    this._general.openSnackBar(alert, msg, 'OK', 'center', 'top');
    this.action = '';
  }
  
}
