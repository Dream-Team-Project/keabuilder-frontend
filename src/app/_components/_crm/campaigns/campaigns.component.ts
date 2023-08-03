import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ListService } from 'src/app/_services/_crm/list.service';
import { CampaignService } from 'src/app/_services/_crm/campaign.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';

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
  error=false;
  errormessage:any;
  
  constructor(
      private _campaignservice: CampaignService,
      private _listService: ListService,
      private _snackBar: MatSnackBar, 
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private router: Router,
      public _image: ImageService,
      public _general: GeneralService,
      private _file: FileUploadService,
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
    return text1;
    // return text1+' '+text2;
  }
createcamp(){

    if(this.campaignnameControl.status=='VALID'){
      if(this.campaignname!=''){
        var data = {name:this.campaignname};
        this._campaignservice.addcampaign(data).subscribe({
          next: data => {
            if(data?.success){
            this.dialog.closeAll();
            this._snackBar.open('Campaign Created Successfully!', 'OK');
            this.router.navigate(['/crm/campaign/'+data.uniqueid],{relativeTo: this.route});
            } else{
              this.error=true;
              this.errormessage=data?.message;
             
            }
          }
        });

      }

    }

  }
openDialog(templateRef: TemplateRef<any>,id:any): void {
    if(id)  this.delcampaign = id;
    this.dialog.open(templateRef).afterClosed().subscribe((data)=>{
      this.campaignname='';
      this.error=false;
      this.errormessage='';
    })
  } 
changepagename(dataobj:any, title:any){
  }
  togglepageview(){
    this.toggleview = !this.toggleview; 
    console.log(this.toggleview);
    this._general.setStorage('campaign_toggle',this.toggleview);
  }
  deletecampaign(campaign:any){
    this._campaignservice.deletecampaign(campaign.id).subscribe((data:any)=>{
      var genscrn = 'keaimage-campaign-'+campaign.uniqueid+'-screenshot.png';
        this._file.validateimg(genscrn).subscribe({
          next: datagen => {
            if(datagen.data==1){
              this._file.deleteimage('keaimage-campaign-'+campaign.uniqueid+'-screenshot.png').subscribe({
                next: data => {
                  this.fetchcampaigns();
                  this._general.openSnackBar(false, 'Campaign Deleted Successfully!', 'OK', 'center', 'top');
                }
              });
            }
            else {
              this.fetchcampaigns();
              this._general.openSnackBar(false, 'Campaign Deleted Successfully!', 'OK', 'center', 'top');
            }
          }
        });
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
  duplicatecampaign(campaign:any){
  campaign.publish_status=0;
  campaign.olduid = campaign.uniqueid;
  campaign.uniqueid = this._general.makeid(20);
  this._campaignservice.duplicatecampaign(campaign).subscribe((data:any) => {
        if(data.success==true){
          var oldimg = 'keaimage-campaign-'+campaign.olduid+'-screenshot.png';
          this._file.validateimg(oldimg).subscribe({
            next: datagen => {
              if(datagen.data==1){
                var imgobj  = {oldname:oldimg, newname:'keaimage-campaign-'+campaign.uniqueid+'-screenshot.png'};
                this._file.copyimage(imgobj).subscribe({
                  next: data => {
                    this.fetchcampaigns();
                    this._general.openSnackBar(false, 'Campaign Duplicated Successfully!', 'OK', 'center', 'top');
                  }
                });
              }else{
                this.fetchcampaigns();
                this._general.openSnackBar(false, 'Campaign Duplicated Successfully!', 'OK', 'center', 'top');
              }

            }
          });
        }
    })   
  }
} 
