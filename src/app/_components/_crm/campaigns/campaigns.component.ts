import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ListService } from 'src/app/_services/_crm/list.service';
import { CampaignService } from 'src/app/_services/_crm/campaign.service';

@Component({
  selector: 'app-crm-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CrmCampaignsComponent implements OnInit {

  fetching:boolean = true;
  campaignname ='';
  campaignnameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  toggleview = true;
  kbcampaigns:any = [];
  shortwaiting = true;
  selectedForm:string = '';
  lists: any = [];
  delcampaign:any;

  constructor(
      private _campaignservice: CampaignService,
      private _listService: ListService,
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
    this.fetchcampaigns();
    this.fetchLists();
    setTimeout(() => {
        this.shortwaiting = false;
    }, 1000);
  }
fetchcampaigns(){
  this.fetching=true;
  this._campaignservice.fetchcampaigns().subscribe({
    next: resp => {
      // console.log(data);
     this.adjustdata(resp?.data)
    }
  });
}
adjustdata(data:any){
  if(data) this.kbcampaigns = data;
  this.fetching = false;
}
fetchLists() {
  this._listService.fetchlists().subscribe((data:any) => {
      this.lists = data.data;  

})
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
        this._campaignservice.addcampaign(data).subscribe({
          next: data => {
            // console.log(data);
            this.dialog.closeAll();
            this._snackBar.open('Campaign Created Successfully!', 'OK');
            this.router.navigate(['/crm/campaign/'+data.uniqueid],{relativeTo: this.route});
          }
        });

      }

    }

  }
openDialog(templateRef: TemplateRef<any>,id:any): void {
    if(id)  this.delcampaign = id;
    this.dialog.open(templateRef);
  } 
changepagename(dataobj:any, title:any){
  }

  togglepageview(){
    this.toggleview = !this.toggleview; 
    console.log(this.toggleview);
    this._general.setStorage('campaign_toggle',this.toggleview);
  }
  deletecampaign(id:any){
    this._campaignservice.deletecampaign(id).subscribe((data:any)=>{
      this.fetchcampaigns();
    })
  }
  searchCampaigns(search: any, sortInp:any, sentInp:any, listInp:any) {
    this.fetching=true;
    var obj = {
      search: search.value,
      sortInp: sortInp.value,
      sentInp: sentInp.value,
      listInp: listInp.value,
    }
    this._campaignservice.searchcampaigns(obj).subscribe((resp:any)=>{
      this.adjustdata(resp?.data);
    });
  }

}
