import { Component, OnInit, TemplateRef } from '@angular/core';
import { CrmCampaignsService } from 'src/app/_services/_crmservice/crm-campaigns.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { CrmListService } from 'src/app/_services/_crmservice/crm_list.service';
import { CrmService } from 'src/app/_services/crm.service';


@Component({
  selector: 'app-crm-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CrmCampaignsComponent implements OnInit {

  campaignname ='';
  campaignnameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  toggleview = true;
  kbcampaigns:any = [];
  shortwaiting = true;
  campoption = '';
  selectedForm:string = '';
  lists: any = [];
  delcampaign:any;
  order:any=[ 
    {value: 'ascending', viewValue: 'Ascending'},
    {value: 'descending', viewValue: 'Descending'},
  ];
optionGroup:any=[
    {value: 'campaign_name', viewValue: 'Name', order: this.order},
    {value: 'senddate', viewValue: 'Sent On', order: this.order},
]

  constructor(
      private crmCampaignservice: CrmCampaignsService,
      private crmService: CrmService,
      private _crmlistService: CrmListService,
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
    
    this.fetchAllcampaigns();
    this.fetchLists();
  }
fetchAllcampaigns(){
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

            this.router.navigate(['/crm/campaign/'+data.uniqueid],{relativeTo: this.route});
          }
        });

      }

    }

  }

  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
  }
  openDialog1(templateRef: TemplateRef<any>,uniqueid:any): void {
    this.delcampaign = uniqueid;
    this.dialog.open(templateRef);
  }
  
  changepagename(dataobj:any, title:any){

  }

  togglepageview(){
    this.toggleview = !this.toggleview; 
    console.log(this.toggleview);
    this._general.setStorage('campaign_toggle',this.toggleview);
  }
  deletecampaign(uniqueid:any){
    this.crmCampaignservice.deletecrmcampaign(uniqueid).subscribe((data:any)=>{
      this.fetchAllcampaigns();
    })
  }
  
  applyFilter(event: Event) {
    var SearchValue = {search:(event.target as HTMLInputElement).value};
    console.log(SearchValue)
    this.crmCampaignservice.getSinglecrmcampaigns(SearchValue).subscribe({
      next: data => {
        // console.log(data);
        this.kbcampaigns=data.data;
        
      }
    });
    
  }
  sortcampaigns(){
    this.crmCampaignservice.filtercrmcampaigns({order:this.selectedForm,search:'other'}).subscribe({
      next: data => {
        // console.log(data);
        this.kbcampaigns=data.data;
        
      }
    });
  }
  sort(){
    this.crmCampaignservice.filtercrmcampaigns({order:this.selectedForm,search:'sort'}).subscribe({
      next: data => {
        // console.log(data);
        this.kbcampaigns=data.data;
        
      }
    });
  }
  filter(){
    this.crmCampaignservice.filtercrmcampaigns({order:this.selectedForm[0],order1:this.selectedForm[1],search:'filter'}).subscribe({
      next: data => {
        // console.log(data);
        this.kbcampaigns=data.data;
        
      }
    });
  }
  sortlist(){
    // console.log(this.selectedForm)
    this.crmCampaignservice.filtercrmcampaigns({order:this.selectedForm,search:'list'}).subscribe({
      next: data => {
        // console.log(data);
        this.kbcampaigns=data.data;
        
      }
    });
  }
  fetchLists() {
    
      this._crmlistService.getAllcrmlists().subscribe(
        (data) => {
          this.lists = data.data;
         
  })
}
}
