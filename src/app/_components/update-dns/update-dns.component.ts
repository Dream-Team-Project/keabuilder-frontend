import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { DomainService } from 'src/app/_services/domain.service';

@Component({
  selector: 'app-update-dns',
  templateUrl: './update-dns.component.html',
  styleUrls: ['./update-dns.component.css']
})
export class UpdateDnsComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('deldialog') deldialog!: TemplateRef<any>;

  type = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  content = new FormControl('', [Validators.required]);
  proxy = new FormControl('', [Validators.required]);
  ttl= new FormControl('', [Validators.required]);


  fetching:boolean = true;
  domain:any={};
  error=false;
  errormessage:any='';
  nameserver:any={type:'',name:'',content:'',proxy_status:'false',ttl:'1'};
  usage:string = `To use this offer, go to the funnel step in the funnels and 
  select the 'Checkout' element or the 'Upsell' button to choose the offer by name.`;
  delaction:any='';
  constructor(private _route: ActivatedRoute,
    private domainService: DomainService,
    public _general: GeneralService,
    private dialog: MatDialog,
    ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.domain.uniqueid = params.get('uniqueid');
      console.log(this.domain.uniqueid)
  });  
   }

  ngOnInit(): void {
    this.getdomainDetails();
  }
  openDialog(templateRef: TemplateRef<any>,action:any) {
    if(action) this.delaction=action;
    this.dialog.open(templateRef).afterClosed().subscribe((resp :any)=>{})
     
  }
  getdomainDetails(){
    this.domainService.getSingleDomain(this.domain.uniqueid).subscribe({
      next: data => {
        console.log(data);
        this.fetching=false;
        if(data.data.length!=0){
          this.domain=data.data[0];
        }
      }
    });
  }
  resetobj(){
    this.error=false;
    this.errormessage='';
    this.nameserver={type:'',name:'',content:'',proxy_status:'false',ttl:'1'};
    this.dialog.closeAll();
  }
  updatedomain(data:any,action:any){
    data.action=action;
    let uptd=data;
    if(data.type && data.name && data.content && data.proxy_status && !data.proxy_status && data.ttl){
      this.domainService.oncloudAddUpdatedomain(data.zoneid,data.domain,data.type,data.name,data.content,data.action).subscribe((resp:any)=>{
        this.domainService.updatedomainnameserver(uptd).subscribe({
          next: data => {
            this.fetching = false;
            // console.log(data);
            if(data.success==true){
              this.resetobj();
              this.getdomainDetails();
              this._general.openSnackBar(false,'Data Updated Successfully', 'OK','center','top');
            }
          }
        });
      })

    }
    else{
      this._general.openSnackBar(true,'Please fill required information','Ok','center','top');
    }

  }

  deletedomain(domain:any,action:any){
    if(action=='main'){
    this.domainService.onclouddeletedomain(domain.zoneid,domain.name).subscribe({
      next: data => {
        // console.log(data);
        if(data.success==true){

          this.domainService.ondeletedomain(domain.id).subscribe({
            next: data => {
              // console.log(data);
              this.fetching = false;
             
              if(data.success==true){
                this.getdomainDetails();
                this._general.openSnackBar(false,'Domain has been Successfully removed!', 'OK','center','top');
              }else{
                this._general.openSnackBar(true,'Something Went Wrong!', 'OK','center','top');
              }
              
            }
          });
          
        }else{
          this.fetching = false;
         
        }
    }
});
    }
    else{

    }
  }
 
  undoNameserver(cf:any, i:number) {
    cf.edit = false;
    delete cf.error;
    delete cf.uniqueErr;
    delete cf.invalid;
    this.resetobj();
    this.getdomainDetails();
  }
}
