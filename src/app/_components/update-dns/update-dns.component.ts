import { Component, OnInit, TemplateRef } from '@angular/core';
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

  fetching:boolean = true;
  domain:any={};
  usage:string = `To use this offer, go to the funnel step in the funnels and 
  select the 'Checkout' element or the 'Upsell' button to choose the offer by name.`;
  constructor(private _route: ActivatedRoute,
    private domainService: DomainService,
    public _general: GeneralService,
    private _dialog: MatDialog,
    ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.domain.uniqueid = params.get('uniqueid');
      console.log(this.domain.uniqueid)
  });  
   }

  ngOnInit(): void {
    this.getdomainDetails();
  }
  openDialog(templateRef: TemplateRef<any>) {
    this._dialog.open(templateRef).afterClosed().subscribe((resp :any)=>{})
     
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
  updatedomain(){

  }
  deletedomain(domain:any){}
}
