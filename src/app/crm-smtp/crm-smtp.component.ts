import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CrmSmtpService } from '../_services/_crmservice/crm-smtp.service';

@Component({
  selector: 'app-crm-smtp',
  templateUrl: './crm-smtp.component.html',
  styleUrls: ['./crm-smtp.component.css']
})
export class CrmSmtpComponent implements OnInit {

  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }

  email = new FormControl('', [Validators.required]);
  smtp = new FormControl('', [Validators.required]);
  apiid = new FormControl('', [Validators.required]);
  apikey = new FormControl('', [Validators.required]);
  emailfrom:any;
  smtp_type:any;
  api_key:any;
  api_id:any;


  allsmtpdata:any = [];
  constructor(private crmSmtpService: CrmSmtpService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog, 
              ) { }

  ngOnInit(): void {
    this.fetchcrmsmtp();
   
  }
  fetchcrmsmtp(){
    this.crmSmtpService.getsmtpdetails().subscribe({
      next: data => {
        // console.log(data.data);
        if(data.data.length!=0){
         this.allsmtpdata=data.data[0]; 
        }
        else{
          this.allsmtpdata=[];
        }
      }
    });
  }

  addnewsmtp(){
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
  addsmtpdetails(){
    if(this.email.status=='VALID' && this.smtp.status=='VALID' && this.apiid.status=='VALID' && this.apikey.status=='VALID'){
      console.log(this.allsmtpdata.length==0)
     if(this.allsmtpdata.length==0){
        this.crmSmtpService.addsmtpdetails({emailfrom:this.emailfrom,smtp_type:this.smtp_type,api_id:this.api_id,api_key:this.api_key}).subscribe({
          next: data => {
            // console.log(data);
            
              this.hidepopupsidebar();
              this.fetchcrmsmtp();
            
          }
        });
      }
      else{
        this._snackBar.open('Delete previous SMTP data from database!', 'OK');
      }
      }else{
        this._snackBar.open('Something went Wrong!!', 'OK');
      }

    

  }
  deletesmtp(smtp:any){
    this.crmSmtpService.deletesmtpdetails({uniqueid:smtp.uniqueid}).subscribe({
      next: data => {
        this.fetchcrmsmtp();
      }
    });
  }
  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
  }

 

  removespecialchar(data:any){

    var qr = data.indexOf("www.");
    var qr2 = data.indexOf("http://");
    var qr3 = data.indexOf("https://");
    var qr4 = data.indexOf("http://www.");
    var qr5 = data.indexOf("https://www.");
    var qr6 = data.indexOf(" ");
    var dm;
    if(qr>=0 && qr==0){
      dm = data.split('www.');
      return dm[1];
    }else if(qr2>=0 && qr2==0){
      dm = data.split('http://');
      return dm[1];
    }else if(qr3>=0 && qr3==0){
      dm = data.split('https://');
      return dm[1];
    }else if(qr4>=0 && qr4==0){
      dm = data.split('http://www.');
      return dm[1];
    }else if(qr5>=0 && qr5==0){
      dm = data.split('https://www.');
      return dm[1];
    }else if(qr6>=0){
      dm = data.replace(/\s/g, "");
      return dm;
    }else{
      return data;
    }

  }

  datecusfilter(value:any){
    var dt = new Date(value);
    var text1 = dt.toDateString();    
    var text2 = dt.toLocaleTimeString();
    return text1+' '+text2;
  }



}
