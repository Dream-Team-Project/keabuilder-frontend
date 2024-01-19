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
  dnsRecordTypes :any = [
    { name: 'A', value: 'A' },
    { name: 'AAAA', value: 'AAAA' },
    // { name: 'CAA', value: 'CAA' },
    // { name: 'CERT', value: 'CERT' },
    { name: 'CNAME', value: 'CNAME' },
    // { name: 'DNSKEY', value: 'DNSKEY' },
    // { name: 'DS', value: 'DS' },
    // { name: 'HTTPS', value: 'HTTPS' },
    // { name: 'LOC', value: 'LOC' },
    { name: 'MX', value: 'MX' },
    // { name: 'NAPTR', value: 'NAPTR' },
    { name: 'NS', value: 'NS' },
    { name: 'PTR', value: 'PTR' },
    // { name: 'SMIMEA', value: 'SMIMEA' },
    // { name: 'SRV', value: 'SRV' },
    // { name: 'SSHFP', value: 'SSHFP' },
    // { name: 'SVCB', value: 'SVCB' },
    // { name: 'TLSA', value: 'TLSA' },
    { name: 'TXT', value: 'TXT' },
    // { name: 'URI', value: 'URI' },
  ];
  error=false;
  errormessage:any='';
  nameserver:any={type:'',name:'',content:'',proxied:'0',ttl:1};
  usage:string = `You can update name severs of above domain`;
  delaction:any='';
  delobj:any={};
  shwttl:any;
  constructor(private _route: ActivatedRoute,
    private domainService: DomainService,
    public _general: GeneralService,
    private dialog: MatDialog,
    ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.domain.uniqueid = params.get('uniqueid');
      // console.log(this.domain.uniqueid)
  });  
   }

  ngOnInit(): void {
    this.getdomainDetails();
  }
  openDialog(templateRef: TemplateRef<any>,action:any,data:any) {
    if(action) {
      this.delaction=action;
      this.delobj=data;
    }
    this.dialog.open(templateRef).afterClosed().subscribe((resp :any)=>{})
     
  }
  getdomainDetails(){
    this.domainService.getSingleDomain(this.domain.uniqueid).subscribe({
      next: (data:any) => {
        // // console.log(data);
        this.fetching=false;
        if(data.data.length!=0){
          this.domain=data.data[0];
          this.domain.dns_records=JSON.parse(data.data[0]?.dns_records);
          // // console.log(this.domain)
        }
      }
    });
  }
  resetobj(){
    this.error=false;
    this.errormessage='';
    this.delaction='';
    this.delobj='';
    this.nameserver={type:'',name:'',content:'',proxied:'0',ttl:1};
    this.type.reset();
    this.name.reset();
    this.content.reset();
    this.dialog.closeAll();
  }
  updatedomain(data:any,action:any){
    data.action=action;
    data.zoneid=this.domain?.zoneid;
    data.domain=this.domain?.name;
    let recordid=data?.id ? data?.id : '';
    data.content=JSON.stringify(data.content);
    // // console.log(recordid)
    // console.log(data)
    if(data.type && data.name && data.content && data.ttl){
      this.domainService.oncloudAddUpdatedomain(data.zoneid,data.domain,data.type,data.name,recordid,data.content,data.action,data.proxied,data.ttl).subscribe((resp:any)=>{
        if(resp.success == true) {
        let dns_records=JSON.stringify(resp.dns_records);
        var objdata = {uniqueid:this.domain?.uniqueid,name:resp.dmname,zoneid:resp.zoneid, nameservers:resp.nameservers,dns_records:dns_records, status:resp.status};
        this.domainService.updatedomainnameserver(objdata).subscribe({
          next: data => {
            // // console.log(data);
            if(data.success==true){
              this.resetobj();
              this.getdomainDetails();
              this.fetching = false;
              this._general.openSnackBar(false,'Data Updated Successfully', 'OK','center','top');
            }
          }
        });
      }else {
        this.fetching = false;
        this._general.openSnackBar(true,'Something went Wrong!!', 'OK','center','top');
      }
      })

    }
    else{
      this._general.openSnackBar(true,'Please fill required information','Ok','center','top');
    }

  }

//   deletedomain(domain:any,action:any){
//     if(action=='main'){
//     this.domainService.onclouddeletedomain(domain.zoneid,domain.name).subscribe({
//       next: data => {
//         // // console.log(data);
//         if(data.success==true){

//           this.domainService.ondeletedomain(domain.id).subscribe({
//             next: data => {
//               // // console.log(data);
//               this.fetching = false;
             
//               if(data.success==true){
//                 this.getdomainDetails();
//                 this._general.openSnackBar(false,'Domain has been Successfully removed!', 'OK','center','top');
//               }else{
//                 this._general.openSnackBar(true,'Something Went Wrong!', 'OK','center','top');
//               }
              
//             }
//           });
          
//         }else{
//           this.fetching = false;
         
//         }
//     }
// });
//     }
//     else{

//     }
//   }
 
  undoNameserver(cf:any, i:number) {
    cf.edit = false;
    delete cf.error;
    delete cf.uniqueErr;
    delete cf.invalid;
    this.resetobj();
    this.getdomainDetails();
  }

  showttl(event:any){
    // // console.log(event.target.value)
    let evt=event.target.value
    this.shwttl= JSON.parse(evt);
  }
  showttl1(event:any){
    // // console.log(event)
    let evt=event
    this.shwttl= JSON.parse(evt);
  }
}
