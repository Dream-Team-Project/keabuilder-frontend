import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { GeneralService } from '../_services/_builder/general.service';
import { CrmListService } from '../_services/_crmservice/crm_list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmailService } from '../_services/mailer.service';
import { CrmUserAddressService } from '../_services/_crmservice/crm-user-address.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CrmCampaignsService } from '../_services/_crmservice/crm-campaigns.service';

@Component({
  selector: 'app-crm-new-campaign',
  templateUrl: './crm-new-campaign.component.html',
  styleUrls: ['./crm-new-campaign.component.css']
})
export class CrmNewCampaignComponent implements OnInit {

  campnameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  subjectControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  preheadertextControl = new FormControl('',[Validators.minLength(3)]);
  replytoControl = new FormControl('',[Validators.minLength(3),Validators.email]);

  testemailControl = new FormControl('', [Validators.required, Validators.email]);
  
  companynameControl = new FormControl('', [Validators.required,Validators.minLength(3)]);
  addressline1Control = new FormControl('', [Validators.required,Validators.minLength(3)]);
  cityControl = new FormControl('', [Validators.required]);
  stateControl = new FormControl('', [Validators.required]);
  zipControl = new FormControl('', [Validators.required]);

  config: any = {
    height: 600,
    plugins:
      'image print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap',
    toolbar:
      'undo redo | image | bold italic underline strikethrough link blockquote | forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist table outdent indent charmap | formatselect fontselect fontsizeselect | code',
    content_css: [],
    importcss_append: true,
    menubar: false,
    statusbar: false,
    branding: false,
    setup: (editor: { ui: any; }) => {},
    diskCache: true
  };
  testemail = '';
  fullcampobj:any = {name:'',list:'',subject:'',preheader:'',replyto:'',sendoption:'',campaigndate:'',campaigneditor:'', addressid:'', timezone:'America/New_York'};
  sendoptn = false;

  alllists:any = [];
  alladdress:any = [];
  genaddress:any = {company_name:'',country:'',address_1:'',address_2:'',city:'',state:'',zip:''};

  uniqueidcamp:any = '';
  campstatus = 'Draft';
  showmytime:any = '';

  constructor(public _general:GeneralService,
        private crmListService :CrmListService,
        private _snackBar: MatSnackBar, 
        public dialog: MatDialog, 
        private emailService: EmailService,
        private crmUserAddressService: CrmUserAddressService,
        private route: ActivatedRoute,
        private crmCampaignsService: CrmCampaignsService,
        private router: Router,
      ) { 

      this.route.paramMap.subscribe((params: ParamMap) => {
        this.uniqueidcamp = params.get('uniqueid');
      });

  }
 
  ngOnInit(): void {

    this.crmListService.getAllcrmliststagcnt().subscribe({
      next: data => {
          // console.log(data);
          this.alllists = data.data;
      }
    });

    this.crmUserAddressService.getAlluserAddress().subscribe({
      next: data => {
          // console.log(data);
          this.alladdress = data.data;
      }
    });

    this.showmytime = this.viewmytimezone(this.fullcampobj.timezone);

    this.crmCampaignsService.getSinglecrmdata(this.uniqueidcamp).subscribe({
      next: data => {
          console.log(data);
          if(data.data?.length!=0){

            data.data.forEach((element:any) => {
              this.fullcampobj.name = element.campaign_name;
              this.fullcampobj.subject = element.subject;
              this.fullcampobj.preheader = element.preheader_text;
              this.fullcampobj.replyto = element.replyto;
              this.fullcampobj.sendoption = element.sendoption;
              this.fullcampobj.campaigneditor = element.emaildata;

              this.sendoptn = element.sendoption == 'immediately' || element.sendoption == '' ? false : true;

              this.fullcampobj.campaigndate = element.senddate;
              this.fullcampobj.list = element.lists_uniqueid;
              this.fullcampobj.addressid = element.addressid;

              this.fullcampobj.timezone = element.timezone;

              this.campstatus = element.publish_status == 1 ? 'Publish' : 'Draft';
              // console.log(this.fullcampobj);
              this.showmytime = this.viewmytimezone(element.timezone);

            });

          }else{
            this.router.navigate(['/crmmain'],{relativeTo: this.route});
          }
      }
    });


  }

  campaigndraft(){
    console.log(this.fullcampobj);
    this.fullcampobj.uniqueid = this.uniqueidcamp;
    this.fullcampobj.publish = 0;
    var getobj = this.fullcampobj;
    if(this.campnameControl.status=='VALID' && this.subjectControl.status=='VALID' && this.preheadertextControl.status=='VALID' && this.replytoControl.status=='VALID'){
      
      if(getobj.name!='' && getobj.list!='' && getobj.subject!='' && getobj.addressid!='' && getobj.sendoption!=''){

        this.crmCampaignsService.updatecrmcampaignt(getobj).subscribe({
          next: data => {
              console.log(data);
              if(data.success==1){
                  this.campstatus = 'Draft';
                  this._snackBar.open('Campaign Update Successfully!!', 'OK');
              }
          }
        });    

      }
      
    }

  }

  publishcampaign(){

    this.fullcampobj.uniqueid = this.uniqueidcamp;
    this.fullcampobj.publish = 1;
    var getobj = this.fullcampobj;
    if(this.campnameControl.status=='VALID' && this.subjectControl.status=='VALID' && this.preheadertextControl.status=='VALID' && this.replytoControl.status=='VALID'){
      
      if(getobj.name!='' && getobj.list!='' && getobj.subject!='' && getobj.addressid!='' && getobj.sendoption!=''){

        if(getobj.campaigneditor!=''){

          this.crmCampaignsService.updatecrmcampaignt(getobj).subscribe({
            next: data => {
                console.log(data);
                if(data.success==1){
                    this.campstatus = 'Publish';
                    this._snackBar.open('Campaign Publish Successfully!!', 'OK');
                    this.router.navigate(['/crmmain'],{relativeTo: this.route});
                    
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
      
      if(getobj.subject!='' && getobj.campaigneditor!='' && this.testemail!='' && getobj.addressid!=''){

        getobj.preheader = getobj.preheader!=''? getobj.preheader+' - ' : '';
      
        var maildata = {tomailid: this.testemail,preheader:getobj.preheader, subject: getobj.subject,replyto:getobj.replyto, html: getobj.campaigneditor, addressid:getobj.addressid};
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

        this.crmUserAddressService.createuserAddress(nwaddress).subscribe({
          next: data => {
              // console.log(data);
              if(data.success==1){
                this.genaddress = {company_name:'',country:'',address_1:'',address_2:'',city:'',state:'',zip:''};
                this._snackBar.open('User Address added Successfully!', 'OK');
                this.alladdress = data.fulldata;
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

  dateToday(): Date {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    return new Date(year, month, day, hour, minute);
  }

  sendtimezone(){

  }


}
