import { Component, OnInit,TemplateRef } from '@angular/core';
import { FileUploadService } from '../_services/file-upload.service';
import { ImageService } from '../_services/image.service';
import { GeneralService } from '../_services/_builder/general.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
              private _snackBar: MatSnackBar,
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
          this.forms = [];
          this.nodata = false;
          this.forms = data.data;
          data.data.forEach((element:any) => {
            element.thumbnail = 'keaimage-form-'+element.uniqueid+'-screenshot.png';
            this.forms.push(element);
          });
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
          console.log(data);

          if(data.found==1){
            this.pathcheck = true;
            this._snackBar.open('Form path must be Unique!', 'OK');
          }
          
          if(data.found==0){
            this._snackBar.open('Form has been successfully created!', 'OK');
            this._general.redirectToBuilder(data.uniqueid, 'form');
          }

        }
      });
      
    }

  }

  onformUpdate(){
      if(this.userFormControl.status=='VALID' && this.userFormControl2.status=='VALID'){

          var obj = {name:this.form.formname, path: this.form.formpath, uniqueid:this.selecteduid};
          this.fileUploadService.shortupdateform(obj).subscribe({
            next: data => {
              console.log(data);
    
              if(data.found==1){
                this.pathcheck = true;
                this._snackBar.open('Form path must be Unique!', 'OK');
              }
              
              if(data.found==0){
                this._snackBar.open('Form has been update successfully!', 'OK');
                this.hidepopupsidebar();
                this.fetformdata();
              }
    
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
        this.fileUploadService.shortupdateform(obj).subscribe({
          next: data => {
            if(data.found==0){
              this._snackBar.open('Name update successfully!', 'OK');
              this.fetformdata();
            }
          }
        }); 
      }else{
        this._snackBar.open("Name must be at least 3 characters!", 'OK');
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
            console.log(datagen);

            if(datagen.data==1){
              this.fileUploadService.deleteimage('keaimage-form-'+page.uniqueid+'-screenshot.png').subscribe({
                next: data => {
                  // console.log(data);
                  this._snackBar.open('Form Deleted Successfully!', 'OK');
                  this.fetformdata();
                }
              });
            }
            
            this._snackBar.open('Form Deleted Successfully!', 'OK');
            this.fetformdata();
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
    this.form.pagepath = (event.target.value).replaceAll(" ", "-").toLowerCase();
  }

  pathuniqueremove(){
    this.pathcheck = false;
  }

  duplicateform(datadup:any){
    var obj = {uniqueid:datadup.uniqueid};
    this.fileUploadService.duplicateform(obj).subscribe({
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
                      this._snackBar.open('Form Duplicate successfully!', 'OK');
                    }
                  });
                }else{
                  this.fetformdata();
                  this._snackBar.open('Form Duplicate successfully!', 'OK');
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
    // console.log(SearchValue);
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
    console.log(obj);
    this.fileUploadService.searchformquery(obj).subscribe({
      next: data => {
        console.log(data);
        this.searching = false;
        this.adjustdata(data);
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
