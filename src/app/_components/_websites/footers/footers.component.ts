import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-website-footers',
  templateUrl: './footers.component.html',
  styleUrls: ['./footers.component.css']
})
export class WebsiteFootersComponent {
  
  @ViewChild('createdialog') createdialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  validate = {
    name: new FormControl('', [Validators.required]),
  }
  toggleview = true;
  footers:any[] = [];
  fetching:boolean = true;
  delfooter:any;
  action:any;
  footer:any = {uniqueid: '', name: ''};
  datafooter:any;
  footerslength:any;
  pagefooters:any;


  constructor(
        public _image: ImageService,
        public _general: GeneralService,
        private dialog: MatDialog
        ) { 
          this.toggleview = _general.getStorage('footer_toggle');
          this.fetch();
        }

  ngOnInit(): void {
  }
  
  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('footer_toggle',this.toggleview);
  }

  openDialog(templateRef: TemplateRef<any>) {
    var dialog = this.dialog.open(templateRef);
    dialog.afterClosed().subscribe((data:any)=>{
      this.validate.name.reset();
    })
  }       

  fetch() {
    this.fetching = true;
    this.getpagefooters({pageIndex:0,pageSize:20});
    // this._general.fetchFooters().then(data=>{
    //   this.setFooters(data);
    //   if(this.action) this.openSB(false);
    // });
  }
  getpagefooters(event:any){
    this.fetching = true;
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
    this._general.pageFooters(obj).then(data=>{
      this.setFooters(data.data);
      this.footerslength=data.footers;
      if(this.action) this.openSB(false);
    });
 }

  rename(footer:any, inp:any) {
    var footname = inp.value;
    if(footer.name !== footname) {
      if(footname.length > 3) {
        footer.name = footname;
        this._general._file.updatefooter(footer).subscribe(resp=>{
          if(resp.success) {
            this.action = 'renamed';
            this.fetch();
          }
          else {
            this.openSB(true);
          }
        });
      }
      else {
        var msg = "Name must be at least 3 characters!";
        this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
        inp.value = footer.name;
      }
    }
  }

  create() {
    if(!this.validate.name.invalid) {
      this.fetching = true;
      this.footer.uniqueid = this._general.makeid(20);
      this._general._file.savefooter(this.footer).subscribe(resp=>{
        if(resp.success) {
          this.redirectToBuilder(this.footer);
          this.footer.name = '';
        }
        else this.openSB(true);
        resp.success ? this.redirectToBuilder(this.footer) : this.openSB(true);
        this.fetching = false;
      });
    }
    else this.openDialog(this.createdialog);
  }

  redirectToBuilder(footer:any) {
    this._general.redirectToBuilder(footer.uniqueid, 'footer');
  }

  duplicate(footer:any) {
    var dobj = JSON.parse(JSON.stringify(footer));
    dobj.uniqueid = this._general.makeid(20);
    var obj = {
      oldpath: 'kb-footer-'+footer.uniqueid+'.php',
      path: 'kb-footer-'+dobj.uniqueid+'.php',
    }
    this.fetching = true;
    this._general._file.savefooter(dobj).subscribe((resp:any)=>{
      if(resp.success) {
        var imgobj  = {
          oldname: this._general.getSSPath('footer-'+footer.uniqueid), 
          newname: this._general.getSSPath('footer-'+dobj.uniqueid)
        };
        this._general._file.copyimage(imgobj).subscribe(resp=>{});
        this.action = 'duplicated';
        this.fetch();
      }
      else this.openSB(true);
      this.fetching = false;
    })
  }

  delete(footer:any) {
    footer.deleting = true;
    this._general._file.deletefooter(footer.id).subscribe((resp:any)=>{
      if(resp.success) {
        this.action = 'deleted';
        this.fetch();
      }
      else this.openSB(true);
      footer.deleting = false;
    })
  }

  searchfooters(search: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      filter: filter?.value,
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 20,
    }
    this._general._file.searchfooters(obj).subscribe((resp:any)=>{
      this.setFooters(resp.data);
    });
  }

  setFooters(data:any) {
    this.footers = data;
    this.fetching = false;
  }

  openSB(alert:any) {
    var msg = alert ? 'Server Error' : 'Footer has been '+this.action;
    this._general.openSnackBar(alert, msg, 'OK', 'center', 'top');
    this.action = '';
  }

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}
  
}
