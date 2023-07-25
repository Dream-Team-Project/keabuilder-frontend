import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MailerService } from 'src/app/_services/mailer.service';
import { AddressService } from 'src/app/_services/_crm/address.service';
import { CampaignService } from 'src/app/_services/_crm/campaign.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ListService } from 'src/app/_services/_crm/list.service';
import { NgxCaptureService } from 'ngx-capture';
import { ImageService } from 'src/app/_services/image.service';
import { FormService } from 'src/app/_services/_crm/form.service';
import { EmailService } from 'src/app/_services/_crm/email.service';

@Component({
  selector: 'app-crm-campaign-builder',
  templateUrl: './campaign-builder.component.html',
  styleUrls: ['./campaign-builder.component.css']
})
export class CrmCampaignBuilderComponent implements OnInit {

  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  @ViewChild('campaignbody', { static: false }) screen: any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  subjectControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  preheadertextControl = new FormControl('',[Validators.minLength(3)]);
  emailfromControl = new FormControl('',[Validators.minLength(3),Validators.email]);
  testemailControl = new FormControl('', [Validators.required, Validators.email]);
  addressnameControl = new FormControl('', [Validators.required,Validators.minLength(3)]);
  companynameControl = new FormControl('', [Validators.required,Validators.minLength(3)]);
  addressline1Control = new FormControl('', [Validators.required,Validators.minLength(3)]);
  cityControl = new FormControl('', [Validators.required]);
  stateControl = new FormControl('', [Validators.required]);
  zipControl = new FormControl('', [Validators.required]);
  testemail = '';
  sendoptn = false;
  lists:any = [];
  alladdress:any = [];
  genaddress:any = {id:'',name:'',company_name:'',country:'',address_1:'',address_2:'',city:'',state:'',zip:''};
  fullcampobj:any = {name:'',lists:'',preheader_text:'',emailfrom:'',sendoption:'',senddate:'',emailid:'', addressid:'', timezone:'', recurring:''};
  uniqueid:any = '';
  campstatus = 'Draft';
  showmytime:any = '';
  filteredtimezone:any=[];
  filteredcountry:any=[];
  selectedLists:any = [];
  filteredTempIds:any = {
    lists: [],
  };
  filteredOptions:any = {
    lists: [],
  };
  emails:any=[];
  filteredemails:any=[];
  emailid:any='';
  singleemail:any={id:'',user_id:'',uniqueid:'',name:'',subject:'',body:''};

  constructor(public _general:GeneralService,
        private _listService :ListService,
        private _snackBar: MatSnackBar, 
        public dialog: MatDialog, 
        private MailerService: MailerService,
        public _addressService: AddressService,
        private route: ActivatedRoute,
        private _campaignService: CampaignService,
        private router: Router,
        private captureService: NgxCaptureService,
        public _image:ImageService,
        public _form: FormService,
        private email:EmailService,
      ) { 

      this.route.paramMap.subscribe((params: ParamMap) => {
        this.uniqueid = params.get('uniqueid');
      });

  }
 
  ngOnInit(): void {
    this.fetchdata();
    if(this.fullcampobj.timezone=='Default' || !this.fullcampobj.timezone ) this.showmytime='Default';
    else{
      this.showmytime = this.viewmytimezone(this.fullcampobj.timezone);
    }
    this.showmytime = this.viewmytimezone(this.fullcampobj.timezone);
  }
  fetchdata(){
    this.fetchcampaign();
    this.fetchList();
    this.fetchAddress();
    this.fetchEmails();
    
  }
 fetchcampaign(){
  this._campaignService.singlecampaign(this.uniqueid).subscribe({
    next: data => {
        if(data.data?.length!=0){
          data.data.forEach((element:any) => {
            this.fullcampobj.name = element.name;
            this.fullcampobj.preheader_text = element.preheader_text;
            this.fullcampobj.emailfrom = element.emailfrom;
            this.fullcampobj.sendoption = element.sendoption;
            this.fullcampobj.id=element.id;
            // this.sendoptn = element.sendoption == 'immediately' || element.sendoption == '' ? false : true;
            this.fullcampobj.senddate = element.senddate;
            this.fullcampobj.list = element.list;
            this.fullcampobj.addressid = element.addressid;
            this.fullcampobj.timezone = element.timezone;
            this.selectedLists=element.temp_lists;
            this.filteredTempIds.lists=element.listid;
            this.fullcampobj.recurring=element.recurring;
            this.campstatus = element.publish_status == 1 ? 'Publish' : 'Draft';
            if(element.timezone=='Default' || !element.timezone) this.showmytime='Default';
            else{
              this.showmytime = this.viewmytimezone(element.timezone);
            }
            this.emailid=element.emailid;
            this.fetchsingleemail();
          });

        }else{
          this.router.navigate(['/crm/campaigns'],{relativeTo: this.route});
        }
    }
  });
  }
 fetchList(){
  this._listService.fetchlists().subscribe({
    next: data => {
        this.lists = data.data;
    }
  });
 }
 fetchAddress(){
  this._addressService.fetchaddress().subscribe({
    next: data => {
        this.alladdress = data.data;
    }
  });
 }
 fetchEmails(){
  this.email.fetchemails().subscribe((data:any)=>{
    this.emails=data.data;
  })
}
 fetchsingleemail(){
  if(this.emailid){
  this.email.getsingleemail({uniqueid:this.emailid}).subscribe((data:any)=>{
    if(data.success==true){
    this.singleemail.id=data.data[0].id;
    this.singleemail.uniqueid=data.data[0].uniqueid;
    this.singleemail.name=data.data[0].name;
    this.singleemail.subject=data.data[0].subject;
    this.singleemail.body=data.data[0].body;
    }
  })
}
}
 campaigndraft(){
  this.fullcampobj.emailid=this.singleemail?.uniqueid;
  this.fullcampobj.lists=this.filteredTempIds.lists.toString();
    this.fullcampobj.uniqueid = this.uniqueid;
    this.fullcampobj.publish_status = 0;
    var getobj = this.fullcampobj;
    if(this.preheadertextControl.status=='VALID' && this.emailfromControl.status=='VALID'){
      if(getobj.name!='' && getobj.preheader_text!='' && getobj.emailfrom!='' && getobj.list!='' && getobj.addressid!='' && getobj.sendoption!='' && getobj.emailid!=''){
        if(this.singleemail.subject!='' && this.singleemail.body!=''){
        this._campaignService.updatecampaign(getobj).subscribe({
          next: data => {
              if(data.success==true){
                this.campstatus = 'Draft';
                this.captureService.getImage(this.screen.nativeElement, true).subscribe(e=>{
                  var file:any = this._image.base64ToFile(e, 'campaign-'+this.uniqueid+'-screenshot.png');
                  this._general._file.upload(file).subscribe(
                    (event: any) => {
                      if (typeof (event) === 'object') {
                        var msg =  'Campaign Update Successfully!!';
                        this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
                        this.router.navigate(['/crm/campaigns'],{relativeTo: this.route});
                       
                      }
                    })
                })
              }
          }
        });    
      }
      else{
        this._snackBar.open('Please select Email Template !', 'OK');
      }
      }
    else{
      this._snackBar.open('Missing Campaign details!!', 'OK');
    }
    }
  else{
    this._snackBar.open('Missing Campaign details!!', 'OK');
  }

  }

 publishcampaign(){
  this.fullcampobj.emailid=this.singleemail.uniqueid;
    this.fullcampobj.lists=this.filteredTempIds.lists.toString();
    this.fullcampobj.uniqueid = this.uniqueid;
    this.fullcampobj.publish_status = 1;
    var getobj = this.fullcampobj;
    if(this.preheadertextControl.status=='VALID' && this.emailfromControl.status=='VALID'){
      
      if(getobj.name!='' && getobj.preheader_text!='' && getobj.emailfrom!='' && getobj.list!='' && getobj.addressid!='' && getobj.sendoption!='' && getobj.emailid!=''){

        if(this.singleemail.subject!='' && this.singleemail.body!=''){

          this._campaignService.updatecampaign(getobj).subscribe({
            next: data => {
                if(data.success==true){
                    this.campstatus = 'Publish';
                this.captureService.getImage(this.screen.nativeElement, true).subscribe(e=>{
                  var file:any = this._image.base64ToFile(e, 'campaign-'+this.uniqueid+'-screenshot.png');
                  this._general._file.upload(file).subscribe(
                    (event: any) => {
                      if (typeof (event) === 'object') {
                        var msg =  'Campaign Publish Successfully!!';
                        this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
                        this.router.navigate(['/crm/campaigns'],{relativeTo: this.route});
                       
                      }
                    })
                })      
                  }
                }
              }); 
              
        }else{
          this._snackBar.open("Please select Email tempalte!", 'OK');
        }
        
      }else{
        this._snackBar.open('Missing Campaign details!!', 'OK');
      }
      
    }

  }

 sendatestemail(){

  let getobj=this.fullcampobj;
    if(this.testemailControl.status=='VALID'){
      
      if(this.singleemail.subject!='' && this.singleemail.body!='' && this.testemail!='' && getobj.addressid!=''){

        getobj.preheader_text = getobj.preheader_text!=''? getobj.preheader_text+' - ' : '';
      
        var maildata = {tomailid: this.testemail,preheader:getobj.preheader_text, subject: this.singleemail.subject,replyto:getobj.emailfrom, html: this.singleemail.body, addressid:getobj.addressid};
        this.MailerService.sendmailcampaign(maildata).subscribe({
          next: data1 => {
            this.dialog.closeAll();
              this._snackBar.open('Email Sent Successfully!', 'OK');
          }
        });

      }else{
        this._snackBar.open('Please fix the errors!', 'OK');
      }

    }else{
      this._snackBar.open('Incorrect Email Address!!', 'OK');
    }


  }

  // sendchange(event:any){
  //   this.sendoptn = event == 'specifictime' ? true:false;
  // }

  sendaddress(){
    // console.log(this.genaddress);
    var nwaddress = this.genaddress;
    if(this.addressnameControl.status=='VALID' && this.companynameControl.status=='VALID' && this.addressline1Control.status=='VALID'){

      if(nwaddress.name!='' && nwaddress.company_name!='' && nwaddress.country!='' && nwaddress.address_1!='' && nwaddress.city!='' && nwaddress.state!='' && nwaddress.zip!=''){

        this._addressService.addaddress(nwaddress).subscribe({
          next: data => {
              // console.log(data);
              if(data.success==1){
                this.genaddress = {company_name:'',country:'',address_1:'',address_2:'',city:'',state:'',zip:''};
                this._snackBar.open('User Address added Successfully!', 'OK');
                // this.alladdress = data.fulldata;
                this.fetchAddress();
                this.dialog.closeAll();

              }else{
                this._snackBar.open('Something went wrong!', 'OK');
              }
          }
        });

      }else{
        this._snackBar.open('Incorrect Address Details!!', 'OK');
      }
      
    }else{
      this._snackBar.open('All fields are required!!', 'OK');
    }

  }
  
  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
  }

  getcountrynm(event:any){
    this.genaddress.country = event.source.value;

  }

  gettimezone(event:any){
    this.genaddress.timezone = event.source.value;
    var timez = event.source.value;
    if( event.source.value=='Default') this.showmytime='Default'
    else{
    this.showmytime = this.viewmytimezone(timez);
    }
  }

  viewmytimezone(timez:any){
    let timezn=(timez=='Default'|| !timez) ?'Asia/Kolkata':timez;
    const date = new Date();
    var dt = date.toLocaleString('en-US', {
        timeZone: timezn,
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

  dateToday(): Date {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    return new Date(year, month, day, hour, minute);
  }
  filtertimezoneData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredtimezone = this._general.timezone?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }
  filtercountryData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredcountry= this._addressService.country?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }
   // start list actions

   filterListData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.lists = this.lists.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedList(event:any, searchListInp:any): void {
    this.selectedLists.push(event.option.value);
    this.filteredTempIds.lists.push(event.option.value.uniqueid);
    searchListInp.value = '';
    this.filterListData('');
  }

  removeSelectedList(index:number): void {
    this.selectedLists.splice(index, 1);
    this.filteredTempIds.lists.splice(index, 1);
  }

  // end list actions
  filteremailData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredemails=this.emails?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  getemaildata(email:any){
    if(email){
    this.singleemail.id=email.id;
    this.singleemail.uniqueid=email.uniqueid;
    this.singleemail.name=email.name;
    this.singleemail.subject=email.subject;
    this.singleemail.body=email.body;
    }
  }
}
