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

  forms:any[] = [];
  toggleview = true;
  shortwaiting = true;
  selstatusshow = 'all';
  form: any = {
    formname: null,
    formpath: null,
  };
  userFormControl = new FormControl('',[Validators.required]);
  userFormControl2 = new FormControl('',[Validators.required]);
  searching:boolean = false;
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  pathcheck = false;
  delform:any;
  nodata = true;
  updatemode = false;
  fetching:boolean = true;
  selecteduid:any = [];

  constructor(private fileUploadService: FileUploadService,
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
    this.fileUploadService.fetchforms().subscribe({
      next: data => {
        if(data.data?.length!=0){
          this.adjustdata(data);
        }else this.nodata = true;
        this.fetching = false;
      }
    });
  }

  openform(path:any){
    var url = window.origin+'/form/'+path;
      window.open(url, '_blank');
  }

  newform(value:any, data:any){
   if(value=='update'){
      this.updatemode = true;
      this.form.formname = data.name;
      this.form.formpath = data.path;
      this.selecteduid = data.uniqueid;
  }else{
      this.updatemode = false;
      this.form.formname = '';
      this.form.formpath = '';
    }
    this.openSidebar();
    this.pathcheck = false;
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
    if(this.userFormControl.status=='VALID' && this.userFormControl2.status=='VALID'){
      var obj = {name:this.form.formname, path: this.form.formpath};
      this.fileUploadService.saveform(obj).subscribe({
        next: data => {
          var msg, err = data.found==1;
          if(err){
            this.pathcheck = true;
            msg = 'Form path must be unique!';
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
      if(this.userFormControl.status=='VALID' && this.userFormControl2.status=='VALID'){
          var obj = {name:this.form.formname, path: this.form.formpath, uniqueid:this.selecteduid};
          this.fileUploadService.updateform(obj).subscribe({
            next: data => {
              console.log(data);
              var msg, err = data.found==1;
              if(err){
                this.pathcheck = true;
                msg = 'Form path must be unique!';
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
        var obj = {name:newname, path: data.path, uniqueid:data.uniqueid};
        this.fileUploadService.updateform(obj).subscribe({
          next: data => {
            if(data.found==0){
              this._general.openSnackBar(false, 'Name update successfully!', 'OK', 'center', 'top');
              this.fetformdata();
            }
          }
        }); 
      }else{
      this._general.openSnackBar(true, 'Name must be at least 3 characters!', 'OK', 'center', 'top');
        inp.value = data.name;
      }
    }

  }

  deleteme(page:any){
 console.log(page);
    this.fileUploadService.deleteform(page.id).subscribe({
      next: data => {
        console.log(data);
        
        var genscrn = 'keaimage-form-'+page.uniqueid+'-screenshot.png';
            
        this.fileUploadService.validateimg(genscrn).subscribe({
          next: datagen => {
            if(datagen.data==1){
              this.fileUploadService.deleteimage('keaimage-form-'+page.uniqueid+'-screenshot.png').subscribe({
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

  openDialog(templateRef: TemplateRef<any>, page:any ): void {

    this.delform = page;
    this.dialog.open(templateRef);

  }

  changemyname(event:any){
    // console.log(event.target.value);
    this.form.formpath = (event.target.value).replaceAll(" ", "-").toLowerCase();
  }

  pathuniqueremove(){
    this.pathcheck = false;
  }

  duplicateform(datadup:any){
    this.fileUploadService.duplicateform(datadup).subscribe({
      next: data => {
          if(data.uniqueid!=''){
            var genscrn = 'keaimage-form-'+datadup.uniqueid+'-screenshot.png';
            this.fileUploadService.validateimg(genscrn).subscribe({
              next: datagen => {
                if(datagen.data==1){
                  var imgobj  = {oldname:'keaimage-form-'+datadup.uniqueid+'-screenshot.png', newname:'keaimage-form-'+data.uniqueid+'-screenshot.png'};
                  this.fileUploadService.copyimage(imgobj).subscribe({
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
    this.fileUploadService.searchformquery(obj).subscribe({
      next: data => {
        console.log(data);
        this.searching = false;
        this.adjustdata(data);
      }
    });
  }
  
  applykbfilter(){
    this.searching = true;
    var obj:any = {order:this.selstatusshow, type:'filter'};
    this.fileUploadService.searchformquery(obj).subscribe({
      next: data => {
        this.searching = false;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  adjustdata(data:any){
    this.forms = [];
    this.nodata = false;
    this.forms = data.data;
  }

  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('form_toggle',this.toggleview);
  }

}
