import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SettingService } from 'src/app/_services/_crm/setting.service';
import { AddressService } from 'src/app/_services/_crm/address.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';

@Component({
  selector: 'app-crm-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class CrmSettingsComponent implements OnInit {

  email = new FormControl('', [Validators.required]);
  smtp = new FormControl('', [Validators.required]);
  apiid = new FormControl('', [Validators.required]);
  apikey = new FormControl('', [Validators.required]);

  companynameControl = new FormControl('', [Validators.required,Validators.minLength(3)]);
  addressline1Control = new FormControl('', [Validators.required,Validators.minLength(3)]);
  cityControl = new FormControl('', [Validators.required]);
  stateControl = new FormControl('', [Validators.required]);
  zipControl = new FormControl('', [Validators.required]);

  emailfrom:any;
  smtp_type:any;
  api_key:any;
  api_id:any;
  showmytime:any = '';
  timezone:any='';
  genaddress:any = {company_name:'',country:'',address_1:'',address_2:'',city:'',state:'',zip:''};
  allsmtpdata:any = [];
  filteredtimezone:any=[];
  filteredcountry:any=[];
  constructor(private _settingService: SettingService,
              public dialog: MatDialog, 
        public _addressService: AddressService,
         public _general: GeneralService,) { }

  ngOnInit(): void {
    this.fetchsmtp();
  }
  fetchsmtp(){
    this._settingService.singlesetting().subscribe({
      next: data => {
        console.log(data.data[0]);
        if(data.data.length!=0){
         this.allsmtpdata=data.data[0]; 
         this.timezone=this.allsmtpdata?.global_timezone?this.allsmtpdata?.global_timezone:this.timezone;
        }
        else{
          this.allsmtpdata=[];
        }
       
      }
    });
  }

  addsmtpdetails(){
    if(this.email.status=='VALID' && this.smtp.status=='VALID' && this.apiid.status=='VALID' && this.apikey.status=='VALID'){
     if(!this.allsmtpdata?.smtp_type){
        this._settingService.addsetting({emailfrom:this.emailfrom,smtp_type:this.smtp_type,api_id:this.api_id,api_key:this.api_key}).subscribe({
          next: data => {
            if(data.success==true){
              this.fetchsmtp();
              var msg =  'Settings has been saved';
              this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
            }
            else{
              var msg =  'Server Error';
              this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
            }
         
          }
        });
      }
      else{
        var msg =  'Delete previous SMTP data from database!';
        this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
      }
      }else{
        var msg =  'Something went wrong';
              this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
      }

    

  }
  deletesmtp(smtp:any){
    let obj={id:smtp.id,uniqueid:smtp.uniqueid,smtp_type:'',emailfrom:'',api_id:'',api_key:''}
    this._settingService.updatesetting(obj).subscribe({
      next: data => {
        if(data.success==true){
          this.fetchsmtp();
          var msg =  'Settings has been remove';
          this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
        }
        else{
          this.fetchsmtp();
          var msg =  'Server Error';
          this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
        }
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
  gettimezone(event:any){
    var timez = event.source.triggerValue;
    this.showmytime = this.viewmytimezone(timez);
  }

  viewmytimezone(timez:any){
    const date = new Date();

    var dt = date.toLocaleString('en-US', {
        timeZone: timez,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });

      return dt;
  }
  getcountrynm(event:any){
  
    this.genaddress.country = event.source.triggerValue;

  }
  sendaddress(){
    var nwaddress = this.genaddress;
    if(this.companynameControl.status=='VALID' && this.addressline1Control.status=='VALID'){

      if(nwaddress.company_name!=''&& nwaddress.country!='' && nwaddress.address_1!='' && nwaddress.city!='' && nwaddress.state!='' && nwaddress.zip!=''){

        this._addressService.addaddress(nwaddress).subscribe({
          next: data => {
              // console.log(data);
              if(data.success==1){
                this.genaddress = {company_name:'',country:'',address_1:'',address_2:'',city:'',state:'',zip:''};
                var msg =  'Address save successfully!';
               this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
                this.dialog.closeAll();

              }else{
                var msg =  'Server Error!';
               this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
              }
          }
        });

      }else{
        var msg =  'Incorrect Address Details!';
               this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
      }
      
    }else{
      var msg =  'All fields are required!';
      this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
    }

  }
  Settimezone(){
    console.log(this.timezone)
    let obj={global_timezone:this.timezone};
    this._settingService.globaltimezone(obj).subscribe((data:any)=>{
      if(data.success==true){
        var msg =  'Global TimeZone Set Successfully';
        this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
      }
      else{
        var msg =  'server error!';
        this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
      }
    })
   
   
  }
  filtertimezoneData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredtimezone = this._general.timezone?.filter((option:any) => option?.name.toLowerCase().includes(value.toLowerCase()));
  }
  filtercountryData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredcountry= this._addressService.country?.filter((option:any) => option?.name.toLowerCase().includes(value.toLowerCase()));
  }

}
