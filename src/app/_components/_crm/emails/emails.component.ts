import { Component, ElementRef, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { EmailService } from 'src/app/_services/_crm/email.service';

@Component({
  selector: 'app-crm-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css']
})
export class CrmEmailsComponent implements OnInit {

  // @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  
  validate = {
    name: new FormControl('',[Validators.required]),
    subject: new FormControl('',[Validators.required]),
  }
  emails:any[] = [];
  toggleview = true;
  shortwaiting = true;
  email: any = {
    name: '',
    subject:'',
    body:'',
    json:'',
  };

  delemail:any;
  nodata = true;
  fetching:boolean = true;
  error=false;
  errormessage:any;
  
 
  constructor(private _file: FileUploadService,
              public _email:EmailService,
              public _image: ImageService,
              public _general: GeneralService,
              public dialog: MatDialog, 
              ) {
                  this.toggleview = _general.getStorage('email_toggle');
               }

  ngOnInit(): void {
    this.fetchData();
    setTimeout(() => {
      this.shortwaiting = false;
    }, 1000)
    
  }

  fetchData(){
    this.fetching = true;
    this.fetchEmails();
     this.fetching = false;
  }
  
  fetchEmails(){
    this._email.fetchemails().subscribe((resp:any)=>{
        this.adjustdata(resp.data);
    })
  }


  createemailtemplate() {
    this._email.addemail(this.email).subscribe((data:any) => {
        var msg, err = data.success==0;
        if(err){
          msg = 'Server Error';
          this.error=true;
          this.errormessage='Name must be unique';
        }
        else {
          msg = 'Email Template has been successfully created!';
          this._general.redirectToBuilder(data.uniqueid, 'email');
        }
        // this._general.openSnackBar(err, msg, 'OK', 'center', 'top');
      }); 
  }

  rename(data:any, inp:any){
    var newname = inp.value;
    if(data.name !== newname) {
      if(newname.length>3){
        data.name = newname;
        this._email.updateemail(data).subscribe((data:any) => {
            var msg, err = data.success==0;
            if(err){
              msg = 'Server Error';
            }
            else {
              msg = 'Email tempalte name updated successfully!';
              this.fetchEmails();
            }
            this._general.openSnackBar(err, msg, 'OK', 'center', 'top');
        }); 
      }else{
      this._general.openSnackBar(true, 'Email template name must be at least 3 characters!', 'OK', 'center', 'top');
        inp.value = data.name;
      }
    }
  }

  deleteemail(email:any){
    email.deleting = true;
    this._email.deleteemail(email.id).subscribe((data:any) => {        
          var genscrn = 'keaimage-email-'+email.uniqueid+'-screenshot.png';
          this._file.validateimg(genscrn).subscribe({
            next: datagen => {
          if(datagen.data==1){
            this._file.deleteimage('keaimage-form-'+email.uniqueid+'-screenshot.png').subscribe({
              next: data => {
                this._general.openSnackBar(false, 'Email Template Deleted Successfully!', 'OK', 'center', 'top');
                this.fetchEmails();
              }
            });
          }
          else {
            this._general.openSnackBar(false, 'Email template Deleted Successfully!', 'OK', 'center', 'top');
            this.fetchEmails();
          }
        }
      })
    });
  }

  openDialog(templateRef: TemplateRef<any>, email:any ): void {
    this.delemail = email;
    var dialog  = this.dialog.open(templateRef);
    dialog.afterClosed().subscribe((data:any) => {
      this.validate.name.reset();
      this.error=false;
      this.errormessage='';
    })
  }

  duplicateemail(email:any){
    // console.log(email)
    var datadup = JSON.parse(JSON.stringify(email));
    datadup.olduid = email.uniqueid;
    datadup.uniqueid = this._general.makeid(20);
    // var regex = new RegExp(email.uniqueid, 'g');
    // var decode = this._general.decodeData(datadup.appendstyle);
    // var newapsty = decode.replace(regex, datadup.uniqueid);
    // datadup.appendstyle = this._general.encodeData(newapsty);
    this._email.duplicateemail(datadup).subscribe({
      next: (data:any) => {
              if(data.uniqueid!=''){
                var oldimg = 'keaimage-email-'+email.uniqueid+'-screenshot.png';
                this._file.validateimg(oldimg).subscribe({
                  next: datagen => {
                    if(datagen.data==1){
                      var imgobj  = {oldname:oldimg, newname:'keaimage-email-'+datadup.uniqueid+'-screenshot.png'};
                      this._file.copyimage(imgobj).subscribe({
                        next: data => {
                          this.fetchEmails();
                          this._general.openSnackBar(false, 'Email Template Duplicated Successfully!', 'OK', 'center', 'top');
                        }
                      });
                    }else{
                      this.fetchEmails();
                      this._general.openSnackBar(false, 'Email Template Duplicated Successfully!', 'OK', 'center', 'top');
                    }
      
                  }
                });
              }
            }
    });
  }

  searchemails(search: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
    }
    this._email.searchemails(obj).subscribe((resp:any)=>{
      this.adjustdata(resp.data);
    });
  }

  adjustdata(data:any){
    this.fetching = false;
    this.emails = [];
    this.nodata = data.length == 0;
    this.emails = data;
  }

  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('email_toggle',this.toggleview);
  }

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}
  
}
