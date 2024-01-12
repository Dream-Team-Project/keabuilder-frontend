import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-website-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class WebsiteHeadersComponent {

  @ViewChild('createdialog') createdialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  validate = {
    name: new FormControl('', [Validators.required]),
  }
  toggleview = true;
  fetching:boolean = true;
  headers:any[] = [];
  delheader:any;
  action:any;
  header:any = {uniqueid: '', name: ''};
  dataheader:any;
  error=false;
  errormessage:any='';
  headerslength:any;
  pageheaders:any;
  filter:any='';

  constructor(
        public _image: ImageService,
        public _general: GeneralService,
        private dialog: MatDialog
        ) { 
          this.toggleview = _general.getStorage('header_toggle');
          this.fetch();
        }
  
  ngOnInit(): void {
  }

  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('header_toggle',this.toggleview);
  }

  openDialog(templateRef: TemplateRef<any>) {
    var dialog = this.dialog.open(templateRef);
    dialog.afterClosed().subscribe((data:any)=>{
      this.validate.name.reset();
    })
  }     

  fetch() {
    this.fetching = true;
    this.getpageheaders({pageIndex:0,pageSize:20});
  }
  getpageheaders(event:any){
    this.fetching = true;
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
    this._general.pageHeaders(obj).then(data=>{
      this.setHeaders(data.data);
      this.headerslength=data.headers;
      if(this.action) this.openSB(false);
    });
 }
  rename(header:any, inp:any) {
    var headname = inp.value;
    if(header.name !== headname) {
      if(headname.length > 3){
        header.name = headname;
        this._general._file.updateheader(header).subscribe(resp=>{
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
        inp.value = header.name;
      }
    }
  }

  create() {
    if(!this.validate.name.invalid) {
      this.fetching = true;
      this.header.uniqueid = this._general.makeid(20);
      this._general._file.saveheader(this.header).subscribe(resp=>{
        if(resp.success) {
          this.redirectToBuilder(this.header);
          this.header.name = '';
        }
        else this.openSB(true);
        resp.success ? this.redirectToBuilder(this.header) : this.openSB(true);
        this.fetching = false;
      });
    }
    else this.openDialog(this.createdialog);
  }

  redirectToBuilder(header:any) {
    this._general.redirectToBuilder(header.uniqueid, 'header');
  }

  duplicate(header:any) {
    var dobj = JSON.parse(JSON.stringify(header));
    dobj.uniqueid = this._general.makeid(20);
    this.fetching = true;
    this._general._file.saveheader(dobj).subscribe((resp:any)=>{
      if(resp.success) {
        var imgobj  = {
          oldname: this._general.getSSPath('header-'+header.uniqueid), 
          newname: this._general.getSSPath('header-'+dobj.uniqueid)
        };
        this._general._file.copyimage(imgobj).subscribe(resp=>{});
        this.action = 'duplicated';
        this.fetch();
      }
      else this.openSB(true);
      this.fetching = false;
    })
  }

  delete(header:any) {
    header.deleting = true;
    this._general._file.deleteheader(header.id).subscribe((resp:any)=>{
      if(resp.success) {
        this.action = 'deleted';
        this.fetch();
      }
      else this.openSB(true);
      header.deleting = false;
    })
  }

  searchheaders(search: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      filter: filter?.value || this.filter,
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 20,
    }
    this._general._file.searchheaders(obj).subscribe((resp:any)=>{
      this.setHeaders(resp.data);
    });
  }

  setHeaders(data:any) {
    this.headers = data;
    this.fetching = false;
  }

  openSB(alert:any) {
    var msg = alert ? 'Server Error' : 'Header has been '+this.action;
    this._general.openSnackBar(alert, msg, 'OK', 'center', 'top');
    this.action = '';
  }

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}
  
}
