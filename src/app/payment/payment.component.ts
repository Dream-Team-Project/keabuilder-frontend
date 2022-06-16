import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  poupsidebar = false;
  paymentaction = false;
  stripecontentactive = true;
  paypalcontentactive = false;

  constructor() { }

  ngOnInit(): void {
  }

  addnewconnect(value:string){

    if(value=='stripe'){
      this.stripecontentactive = true;
      this.paypalcontentactive = false;
    }else if(value=='paypal'){
      this.stripecontentactive = false;
      this.paypalcontentactive = true;
    }
    this.poupsidebar = true;
    this.paymentaction = true;
  }

  hidepopupsidebar(){
    this.poupsidebar = false;
  }

}
