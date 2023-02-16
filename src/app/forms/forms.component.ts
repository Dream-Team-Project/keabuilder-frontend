import { Component, OnInit,TemplateRef } from '@angular/core';
import { FileUploadService } from '../_services/file-upload.service';
import { ImageService } from '../_services/image.service';
import { GeneralService } from '../_services/_builder/general.service';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  validate = {
    name: new FormControl('', [Validators.required]),
    relink: new FormControl('', [Validators.pattern(this.urlPattern)]),
  }
  forms:any[] = [];
  toggleview = true;
  shortwaiting = true;
  selstatusshow = 'all';
  form: any = {
    name: '',
  };
  searching:boolean = false;
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  delform:any;
  nodata = true;
  updatemode = false;
  fetching:boolean = true;
  selecteduid:any = [];

  constructor(private _file: FileUploadService,
              public _image: ImageService,
              public _general: GeneralService,
              public dialog: MatDialog, 
              ) {
                  this.toggleview = _general.getStorage('form_toggle');
                  this.fetformdata();
               }

  ngOnInit(): void {
    setTimeout(() => {
      this.shortwaiting = false;
    }, 1000);
  }

  fetformdata(){
    this.fetching = true;
    this._file.fetchforms().subscribe({
      next: data => {
        this.adjustdata(data);
        this.fetching = false;
      }
    });
  }

  newform(value:any, data:any){
   if(value=='update'){
      this.updatemode = true;
      this.form = JSON.parse(JSON.stringify(data));
      this.selecteduid = data.uniqueid;
  }else{
      this.updatemode = false;
      this.form.name = '';
    }
    this.openSidebar();
  }

  openSidebar(){
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.open = false;
    },this.sidebar.animtime)
  }

  hidepopupsidebar(){
    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
    },this.sidebar.animtime)
  }

  onformSubmit(): void {
    if(!this.validate.name.invalid && !this.validate.relink.invalid){
      this._file.saveform(this.form).subscribe({
        next: data => {
          var msg, err = data.success==0;
          if(err){
            msg = 'Server Error';
          }
          else {
            msg = 'Form has been successfully created!';
            this._general.redirectToBuilder(data.uniqueid, 'form');
          }
          this._general.openSnackBar(err, msg, 'OK', 'center', 'top');
        }
      });  
    }
  }

  onformUpdate(){
      if(!this.validate.name.invalid && !this.validate.relink.invalid){
          this._file.updateform(this.form).subscribe({
            next: data => {
              var msg, err = data.success==0;
              if(err){
                msg = 'Server Error';
              }
              else {
                msg = 'Form has been update successfully!';
                this.hidepopupsidebar();
                this.fetformdata();
              }
              this._general.openSnackBar(err, msg, 'OK', 'center', 'top');
            }
          }); 
      }
  }

  rename(data:any, inp:any){
    var newname = inp.value;
    if(data.name !== newname) {
      if(newname.length>3){
        data.name = newname;
        this._file.updateform(data).subscribe({
          next: data => {
            var msg, err = data.success==0;
            if(err){
              msg = 'Server Error';
            }
            else {
              msg = 'Name update successfully!';
              this.hidepopupsidebar();
              this.fetformdata();
            }
            this._general.openSnackBar(err, msg, 'OK', 'center', 'top');
          }
        }); 
      }else{
      this._general.openSnackBar(true, 'Name must be at least 3 characters!', 'OK', 'center', 'top');
        inp.value = data.name;
      }
    }

  }

  deleteme(form:any){
    form.deleting = true;
    this._file.deleteform(form.id).subscribe({
      next: data => {        
        var genscrn = 'keaimage-form-'+form.uniqueid+'-screenshot.png';
        this._file.validateimg(genscrn).subscribe({
          next: datagen => {
            if(datagen.data==1){
              this._file.deleteimage('keaimage-form-'+form.uniqueid+'-screenshot.png').subscribe({
                next: data => {
                  this._general.openSnackBar(false, 'Form Deleted Successfully!', 'OK', 'center', 'top');
                  this.fetformdata();
                }
              });
            }
            else {
              this._general.openSnackBar(false, 'Form Deleted Successfully!', 'OK', 'center', 'top');
              this.fetformdata();
            }
          }
        });

      }
    });
  }

  openDialog(templateRef: TemplateRef<any>, form:any ): void {
    this.delform = form;
    this.dialog.open(templateRef);
  }

  duplicateform(form:any){
    var datadup = JSON.parse(JSON.stringify(form));
    datadup.olduid = form.uniqueid;
    datadup.uniqueid = this._general.makeid(20);
    var regex = new RegExp(form.uniqueid, 'g');
    var decode = this._general.decodeData(datadup.appendstyle);
    var newapsty = decode.replace(regex, datadup.uniqueid);
    datadup.appendstyle = this._general.encodeData(newapsty);
    this._file.duplicateform(datadup).subscribe({
      next: data => {
          if(data.uniqueid!=''){
            var oldimg = 'keaimage-form-'+form.uniqueid+'-screenshot.png';
            this._file.validateimg(oldimg).subscribe({
              next: datagen => {
                if(datagen.data==1){
                  var imgobj  = {oldname:oldimg, newname:'keaimage-form-'+datadup.uniqueid+'-screenshot.png'};
                  this._file.copyimage(imgobj).subscribe({
                    next: data => {
                      this.fetformdata();
                      this._general.openSnackBar(false, 'Form Duplicated Successfully!', 'OK', 'center', 'top');
                    }
                  });
                }else{
                  this.fetformdata();
                  this._general.openSnackBar(false, 'Form Duplicated Successfully!', 'OK', 'center', 'top');
                }
  
              }
            });
          }
      }
    });
  }

  searchform(event: Event) {
    this.searching = true;
    var SearchValue = (event.target as HTMLInputElement).value;
    this.selstatusshow = 'all';
    var obj = {search:SearchValue,type:'search'};
    this._file.searchformquery(obj).subscribe({
      next: data => {
        this.adjustdata(data);
        this.searching = false;
      }
    });
  }
  
  applykbfilter(){
    this.searching = true;
    var obj:any = {order:this.selstatusshow, type:'filter'};
    this._file.searchformquery(obj).subscribe({
      next: data => {
        this.searching = false;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  adjustdata(resp:any){
    this.forms = [];
    this.nodata = resp.data.length == 0;
    this.forms = resp.data;
  }

  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('form_toggle',this.toggleview);
  }

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}

}
