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
  delfooter:any;
  action:any;
  footer:any = {uniqueid: '', name: ''};

  constructor(
        public _image: ImageService,
        public _general: GeneralService,
        private dialog: MatDialog
        ) { 
          this.toggleview = _general.getStorage('footer_toggle');
          this.fetch();
        }
  
  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('footer_toggle',this.toggleview);
  }

  openDialog(templateRef: TemplateRef<any>) {
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

  rename(footer:any, inp:any) {
    var footname = inp.value;
    if(footer.name !== footname) {
      if(footname.length > 3) {
        footer.name = footname;
        this._general.fileUploadService.updatefooter(footer).subscribe(resp=>{
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
        inp.value = footer.name;
      }
    }
  }

  create() {
    this.footer.uniqueid = this._general.makeid(20);
    var obj:any = {
      id: 'kb-footer-'+this.footer.uniqueid,
      html: ''
    }
    this._general.fileUploadService.saveFile(obj, 'footers').subscribe(e=>{
      this._general.fileUploadService.savefooter(this.footer).subscribe(resp=>{
        console.log('hello');
        if(resp.success) {
          this.edit(this.footer);
          this.footer.name = '';
        }
        else this.openSB(true);
        resp.success ? this.edit(this.footer) : this.openSB(true);
      });
    });
  }

  edit(footer:any) {
    this._general.redirectToBuilder(footer.uniqueid, 'footer');
  }

  duplicate(footer:any) {
    var dobj = JSON.parse(JSON.stringify(footer));
    dobj.name = dobj.name + ' copy';
    dobj.uniqueid = this._general.makeid(20);
    var obj = {
      oldpath: 'kb-footer-'+footer.uniqueid+'.php',
      path: 'kb-footer-'+dobj.uniqueid+'.php',
    }
    this._general.fileUploadService.copyFile(obj, 'footers').subscribe(resp=>{
      if(resp.success) {
        this._general.fileUploadService.savefooter(dobj).subscribe((resp:any)=>{
          this.fetch();
        })
        var imgobj  = {
          oldname: this._general.getSSPath('footer-'+footer.uniqueid), 
          newname: this._general.getSSPath('footer-'+dobj.uniqueid)
        };
        this._general.fileUploadService.copyimage(imgobj).subscribe(resp=>{});
        this.action = 'duplicated';
      }
      else this.openSB(true);
    });
  }

  delete() {
    this._general.fileUploadService.deletefooter(this.delfooter.id).subscribe((resp:any)=>{
      this._general.fileUploadService.deleteFile('kb-footer-'+this.delfooter.uniqueid, 'footers').subscribe(resp=>{
        if(resp.success) {
          this.action = 'deleted';
          this.fetch();
        }
        else this.openSB(true);
      });
    })
  }

  openSB(alert:any) {
    var msg = alert ? 'Server Error' : 'Footer has been '+this.action;
    this._general.openSnackBar(alert, msg, 'OK', 'center', 'top');
    this.action = '';
  }
  
}
