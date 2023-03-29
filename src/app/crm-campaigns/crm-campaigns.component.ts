import { Component, OnInit, TemplateRef } from '@angular/core';
import { CrmCampaignsService } from '../_services/_crmservice/crm-campaigns.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { ImageService } from '../_services/image.service';
import { GeneralService } from '../_services/_builder/general.service';


@Component({
  selector: 'app-crm-campaigns',
  templateUrl: './crm-campaigns.component.html',
  styleUrls: ['./crm-campaigns.component.css']
})
export class CrmCampaignsComponent implements OnInit {
  
  campaignname ='';
  campaignnameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  toggleview = true;
  kbcampaigns:any = [];
  shortwaiting = true;
  campoption = '';

  constructor(
      private crmCampaignservice: CrmCampaignsService,
      private _snackBar: MatSnackBar, 
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private router: Router,
      public _image: ImageService,
      public _general: GeneralService,
    ) {
      this.toggleview = _general.getStorage('campaign_toggle');

  }

  ngOnInit(): void {

    setTimeout(() => {
        this.shortwaiting = false;
    }, 1000);
    
    this.crmCampaignservice.getAllcrmcampaigns().subscribe({
      next: data => {
        console.log(data);
        this.kbcampaigns = data.data;
      }
    });

  }

  dateformat(value:any){
    if(value=='') return '';
    var mycustomdate =  new Date(value);
    var text1 = mycustomdate.toDateString();    
    var text2 = mycustomdate.toLocaleTimeString();
    return text1+' '+text2;
  }

  createcamp(){

    if(this.campaignnameControl.status=='VALID'){
      
      if(this.campaignname!=''){
        
        var data = {name:this.campaignname};
        this.crmCampaignservice.createcrmcampaign(data).subscribe({
          next: data => {
            // console.log(data);
            this.dialog.closeAll();
            this._snackBar.open('Campaign Created Successfully!', 'OK');

            this.router.navigate(['/crm-newcampaign/'+data.uniqueid],{relativeTo: this.route});
          }
        });

      }

    }

  }

  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
  }
  
  changepagename(dataobj:any, title:any){

  }

  togglepageview(){
    this.toggleview = !this.toggleview; 
    console.log(this.toggleview);
    this._general.setStorage('campaign_toggle',this.toggleview);
  }
  

}
