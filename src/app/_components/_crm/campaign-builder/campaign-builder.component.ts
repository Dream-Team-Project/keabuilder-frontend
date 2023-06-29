import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmailService } from 'src/app/_services/mailer.service';
import { AddressService } from 'src/app/_services/_crm/address.service';
import { CampaignService } from 'src/app/_services/_crm/campaign.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ListService } from 'src/app/_services/_crm/list.service';

@Component({
  selector: 'app-crm-campaign-builder',
  templateUrl: './campaign-builder.component.html',
  styleUrls: ['./campaign-builder.component.css']
})
export class CrmCampaignBuilderComponent implements OnInit {

  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  subjectControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  preheadertextControl = new FormControl('',[Validators.minLength(3)]);
  emailfromControl = new FormControl('',[Validators.minLength(3),Validators.email]);
  testemailControl = new FormControl('', [Validators.required, Validators.email]);
  companynameControl = new FormControl('', [Validators.required,Validators.minLength(3)]);
  addressline1Control = new FormControl('', [Validators.required,Validators.minLength(3)]);
  cityControl = new FormControl('', [Validators.required]);
  stateControl = new FormControl('', [Validators.required]);
  zipControl = new FormControl('', [Validators.required]);
  testemail = '';
  fullcampobj:any = {name:'',lists:'',subject:'',preheader_text:'',emailfrom:'',sendoption:'',senddate:'',emailbody:'', addressid:'', timezone:'',};
  sendoptn = false;

  lists:any = [];
  alladdress:any = [];
  genaddress:any = {company_name:'',country:'',address_1:'',address_2:'',city:'',state:'',zip:''};

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
  constructor(public _general:GeneralService,
        private _listService :ListService,
        private _snackBar: MatSnackBar, 
        public dialog: MatDialog, 
        private emailService: EmailService,
        public _addressService: AddressService,
        private route: ActivatedRoute,
        private _campaignService: CampaignService,
        private router: Router,
        
      ) { 

      this.route.paramMap.subscribe((params: ParamMap) => {
        this.uniqueid = params.get('uniqueid');
      });

  }
 
  ngOnInit(): void {
    this.fetchcampaign();
    this.fetchList();
    this.fetchAddress();
    if(this.fullcampobj.timezone=='Default' || !this.fullcampobj.timezone ) this.showmytime='Default';
    else{
      this.showmytime = this.viewmytimezone(this.fullcampobj.timezone);
    }
    this.showmytime = this.viewmytimezone(this.fullcampobj.timezone);
  }
 fetchcampaign(){
  this._campaignService.singlecampaign(this.uniqueid).subscribe({
    next: data => {
        if(data.data?.length!=0){
          data.data.forEach((element:any) => {
            this.fullcampobj.name = element.name;
            this.fullcampobj.subject = element.subject;
            this.fullcampobj.preheader_text = element.preheader_text;
            this.fullcampobj.emailfrom = element.emailfrom;
            this.fullcampobj.sendoption = element.sendoption;
            this.fullcampobj.emailbody = element.emailbody;
            this.fullcampobj.id=element.id;
            this.sendoptn = element.sendoption == 'immediately' || element.sendoption == '' ? false : true;
            this.fullcampobj.senddate = element.senddate;
            this.fullcampobj.list = element.list;
            this.fullcampobj.addressid = element.addressid;
            this.fullcampobj.timezone = element.timezone;
            this.selectedLists=element.temp_lists;
            this.filteredTempIds.lists=element.listid;
            this.campstatus = element.publish_status == 1 ? 'Publish' : 'Draft';
            console.log(this.fullcampobj);
            if(element.timezone=='Default' || !element.timezone) this.showmytime='Default';
            else{
              this.showmytime = this.viewmytimezone(element.timezone);
            }
            

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
 campaigndraft(){
  this.fullcampobj.lists=this.filteredTempIds.lists.toString();
    this.fullcampobj.uniqueid = this.uniqueid;
    this.fullcampobj.publish_status = 0;
    var getobj = this.fullcampobj;
    if(this.subjectControl.status=='VALID' && this.preheadertextControl.status=='VALID' && this.emailfromControl.status=='VALID'){
      
      if(getobj.name!='' && getobj.list!='' && getobj.subject!='' && getobj.addressid!='' && getobj.sendoption!=''){
        // console.log(this.fullcampobj);
        this._campaignService.updatecampaign(getobj).subscribe({
          next: data => {
              console.log(data);
              if(data.success==true){
                  this.campstatus = 'Draft';
                  this._snackBar.open('Campaign Update Successfully!!', 'OK');
                  this.router.navigate(['/crm/campaigns'],{relativeTo: this.route});
              }
          }
        });    

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
    console.log(this.fullcampobj);
    this.fullcampobj.lists=this.filteredTempIds.lists.toString();
    this.fullcampobj.uniqueid = this.uniqueid;
    this.fullcampobj.publish_status = 1;
    var getobj = this.fullcampobj;
    if(this.subjectControl.status=='VALID' && this.preheadertextControl.status=='VALID' && this.emailfromControl.status=='VALID'){
      
      if(getobj.name!='' && getobj.list!='' && getobj.subject!='' && getobj.addressid!='' && getobj.sendoption!=''){

        if(getobj.emailbody!=''){

          this._campaignService.updatecampaign(getobj).subscribe({
            next: data => {
                console.log(data);
                if(data.success==true){
                    this.campstatus = 'Publish';
                    this._snackBar.open('Campaign Publish Successfully!!', 'OK');
                    this.router.navigate(['/crm/campaigns'],{relativeTo: this.route});
                    
                  }
                }
              }); 
              
        }else{
          this._snackBar.open("Design Can't be blank!!", 'OK');
        }
        
      }else{
        this._snackBar.open('Missing Campaign details!!', 'OK');
      }
      
    }

  }

 sendatestemail(){
    var getobj = this.fullcampobj;
    if(this.testemailControl.status=='VALID'){
      
      if(getobj.subject!='' && getobj.emailbody!='' && this.testemail!='' && getobj.addressid!=''){

        getobj.preheader_text = getobj.preheader_text!=''? getobj.preheader_text+' - ' : '';
      
        var maildata = {tomailid: this.testemail,preheader:getobj.preheader_text, subject: getobj.subject,replyto:getobj.emailfrom, html: getobj.emailbody, addressid:getobj.addressid};
        this.emailService.sendmailcampaign(maildata).subscribe({
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

  sendchange(event:any){
    this.sendoptn = event == 'specifictime' ? true:false;
  }

  sendaddress(){
    // console.log(this.genaddress);
    var nwaddress = this.genaddress;
    if(this.companynameControl.status=='VALID' && this.addressline1Control.status=='VALID'){

      if(nwaddress.company_name!=''&& nwaddress.country!='' && nwaddress.address_1!='' && nwaddress.city!='' && nwaddress.state!='' && nwaddress.zip!=''){

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
    // console.log(event.value);
    // console.log(event.source.triggerValue);

    this.genaddress.country = event.source.triggerValue;

  }

  gettimezone(event:any){
    this.genaddress.timezone = event.source.triggerValue;
    var timez = event.source.triggerValue;
    if( event.source.triggerValue=='Default') this.showmytime='Default'
    else{
    this.showmytime = this.viewmytimezone(timez);
    }
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
    this.filteredtimezone = this._general.timezone?.filter((option:any) => option?.name.toLowerCase().includes(value.toLowerCase()));
  }
  filtercountryData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredcountry= this._addressService.country?.filter((option:any) => option?.name.toLowerCase().includes(value.toLowerCase()));
  }
   // start list actions

   filterListData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.lists = this.lists.filter((option:any) => option.name.toLowerCase().includes(value.toLowerCase()));
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
}
