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


  constructor(private fileUploadService: FileUploadService,
              public _image: ImageService,
              public _general: GeneralService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog, 
              ) { }
              
  kbforms:any[] = [];
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
  selecteduid:any = [];

  ngOnInit(): void {

   this.fetformdata();

    setTimeout(() => {
      this.shortwaiting = false;
    }, 1500);

  }

  fetformdata(){
    this.fileUploadService.fetchforms().subscribe({
      next: data => {
        // console.log(data);
        if(data.data?.length!=0){
          this.kbforms = [];
          this.nodata = false;
          data.data.forEach((element:any) => {
            element.thumbnail = 'keaimage-form-'+element.uniqueid+'-screenshot.png';
            this.kbforms.push(element);
          });
        }else{
          this.nodata = true;
        }
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

  datecusfilter(value:any){
    var dt = new Date(value);
    var text1 = dt.toDateString();    
    var text2 = dt.toLocaleTimeString();
    return text1+' '+text2;
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

  changeformname(data:any, newname:any){
    var pglength = newname.length;
    if(newname!='' && pglength>3){

      var obj = {name:newname, path: data.path, uniqueid:data.uniqueid};
      this.fileUploadService.shortupdateform(obj).subscribe({
        next: data => {

          if(data.found==0){
            this._snackBar.open('Name update successfully!', 'OK');
          }
          
        }
      });
      
    }else{
      if(pglength<3){
        this._snackBar.open("Name must be at least 3 characters!", 'OK');
      }else{
        this._snackBar.open("Name Can't be blank!", 'OK');
      }
      this.fetformdata();
    }

  }

  deleteme(page:any){
 
    this.fileUploadService.deleteform(page.id).subscribe({
      next: data => {
        console.log(data);
         this.fetformdata();
        this._snackBar.open('Form Deleted Successfully!', 'OK');
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

  duplicateform(data:any){
    var obj = {uniqueid:data.uniqueid};
    this.fileUploadService.duplicateform(obj).subscribe({
      next: data => {
        // console.log(data);

          this._snackBar.open('Form Duplicate successfully!', 'OK');
          this.fetformdata();

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
    this.kbforms = [];
    this.nodata = false;
    data.data.forEach((element:any) => {
      element.thumbnail = 'keaimage-form-'+element.uniqueid+'-screenshot.png';
      this.kbforms.push(element);
    });
  }

}
