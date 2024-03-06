import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { RegistrationpaymentService } from 'src/app/_services/registrationpayment.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  
  fetching=false;
  customer:any={};
  invoiceslength:any;

  constructor(public _general:GeneralService,
    private regpayService:RegistrationpaymentService,
    private _route: ActivatedRoute,) {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.customer.id = params.get('id');
    }); 
   }

  ngOnInit(): void {
    this.fetchdata();
  }
  fetchdata(){
    this.fetching=true;
    this.regpayService.getCustomerInvoices({customerid:this.customer.id}).subscribe((data:any)=>{
    if(data.success) this.customer.invoices=data?.invoices?.data; 
    this.invoiceslength=data?.invoices?.data.length || 0;
    // console.log(this.customer.invoices)
    this.fetching=false;
    })
  }
  getpageInvoices(obj:any){

  }
  Gotoinvoice(url:any){
    window.open(url,'_blank');
  }
}
