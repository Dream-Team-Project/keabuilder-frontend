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
import { MatPaginator } from '@angular/material/paginator';
import { TagService } from 'src/app/_services/_crm/tag.service';

@Component({
  selector: 'app-crm-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CrmCampaignsComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  
  fetching:boolean = true;
  campaignname ='';
  campaignnote='';
  campaignobj:any={};
  campaignnameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  toggleview = true;
  kbcampaigns:any = [];
  selectedForm:string = '';
  lists: any = [];
  tags: any = [];
  delcampaign:any;
  error=false;
  errormessage:any;
  campaignslength:any;
  pagecampaigns:any;
  selectedCampaigns: any[] = [];
  checked_selected=false;
  sortInp : string = 'name DESC';
  searchInp : string = ''; 
  sentInp : string = '';
  listInp : string = '';
  tagInp : string = '';
  
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
      private _tagService: TagService,
    ) {
      this.toggleview = _general.getStorage('campaign_toggle');
  }

  ngOnInit(): void {
    this.getpagecampaigns({pageIndex:0,pageSize:20});
    this.fetchLists();
    this.fetchTags();
  }
adjustdata(data:any){
  if(data) this.pagecampaigns = data;
  this.fetching = false;
}
fetchLists() {
  this._listService.fetchlists().subscribe((data:any) => {
      this.lists = data.data;  

})
}
fetchTags() {
  this._tagService.fetchtags().subscribe(
    (data) => {
      this.tags = data.data;
});
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
        var data = {name:this.campaignname,note:this.campaignnote};
        this._campaignservice.addcampaign(data).subscribe({
          next: data => {
            if(data?.success){
            this.dialog.closeAll();
            this._general.openSnackBar(false,'Campaign created Successfully!', 'OK','center','top');
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

  updatecamp(){
    if(this.campaignnameControl.status=='VALID'){
    this._campaignservice.updatecampaign(this.campaignobj).subscribe({
      next: data => {
          if(data.success==true){
            this.dialog.closeAll();
            this._general.openSnackBar(false,'Campaign Updated Successfully!', 'OK','center','top');
          }
        }
        })
      }
  }

  openDialog(templateRef: TemplateRef<any>,id:any): void {
    if(id)  {
      this.delcampaign = id;
      this.campaignobj=id;
    }
    this.dialog.open(templateRef).afterClosed().subscribe((data)=>{
      this.campaignname='';
      this.campaignobj={};
      this.error=false;
      this.errormessage='';
    })
  } 

  togglepageview(){
    this.toggleview = !this.toggleview; 
    // console.log(this.toggleview);
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
                  this.getpagecampaigns({pageIndex:0,pageSize:20})
                  this._general.openSnackBar(false, 'Campaign Deleted Successfully!', 'OK', 'center', 'top');
                }
              });
            }
            else {
              this.getpagecampaigns({pageIndex:0,pageSize:20})
              this._general.openSnackBar(false, 'Campaign Deleted Successfully!', 'OK', 'center', 'top');
            }
          }
        });
    })
  }
  toggleSort(column: string): void {
    // console.log(column)
    if (this.sortInp.includes(column)) {
      this.sortInp = this.sortInp.endsWith('ASC') ? `${column} DESC` : `${column} ASC`;
    } else {
      this.sortInp = `${column} ASC`;
    }
    this.searchCampaigns(this.searchInp, this.sortInp, this.sentInp, this.listInp, this.tagInp);
  }

  searchCampaigns(search: any, sortInp:any, sentInp:any, listInp:any, tagInp:any) {
    this.fetching=true;
    var obj = {
      search: search,
      sortInp: sortInp,
      sentInp: sentInp,
      listInp: listInp,
      tagInp: tagInp,
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 20,
    }
    console.log(obj)
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
                    this.getpagecampaigns({pageIndex:0,pageSize:20})
                    this._general.openSnackBar(false, 'Campaign Duplicated Successfully!', 'OK', 'center', 'top');
                  }
                });
              }else{
                this.getpagecampaigns({pageIndex:0,pageSize:20})
                this._general.openSnackBar(false, 'Campaign Duplicated Successfully!', 'OK', 'center', 'top');
              }

            }
          });
        }
        else{
          this._general.openSnackBar(true,data?.message,'Ok','center','top');
        }
    })   
  }
  getpagecampaigns(event:any){
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
      this._campaignservice.getpagecampaigns(obj).subscribe(
        (data:any) => {
          this.kbcampaigns = data?.data;
          this.pagecampaigns=data?.data;
          this.campaignslength=data?.campaigns;
          this.fetching = false;
          // console.log(this.lists)
    });
 }
 selectCampaigns(event: any, list: any) {
  if (event) {
    this.selectedCampaigns.push(list);
  } else {
    const index = this.selectedCampaigns.indexOf(list);
    if (index !== -1) {
      this.selectedCampaigns.splice(index, 1);
    }
  }
  // console.log(this.selectedContacts)
}

selectAllCampaigns(event: any) {
  // console.log(event)
  if(event){
  this.pagecampaigns=this.pagecampaigns.map((ele:any)=>{ele.selected = true; return ele;});
  }
  else{
    this.pagecampaigns=this.pagecampaigns.map((ele:any)=>{ele.selected = false; return ele;});
  }
  this.selectedCampaigns = event ? [...this.pagecampaigns] : [];
  // console.log(this.selectedContacts)
}

deleteSelectedCampaigns(campaigns:any) {
  this._campaignservice.deleteselectedcampaigns({campaigns:campaigns}).subscribe((resp:any) => {
    if(resp.success) 
    this.getpagecampaigns({pageIndex:0,pageSize:20});
    this.resetselecteddata();
    this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
  });
}

resetselecteddata(){
  this.pagecampaigns=this.pagecampaigns.map((ele:any)=>{ele.selected = false; return ele;});
  this.checked_selected=false;
  this.selectedCampaigns=[];
  this.sortInp = 'name DESC';
  this.searchInp = ''; 
  this.sentInp  = '';
  this.listInp = '';
  this.tagInp = '';
  this.paginator.pageIndex = 0;
  this.paginator.pageSize =20;
}

GotoUrl(url:any) {
  this.router.navigate([url], {relativeTo: this.route,});
}

} 
