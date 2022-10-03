import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { CheckoutService } from '../_services/checkout.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  popupsidebar = false;
  paymentaction = false;
  stripecontentactive = true;
  paypalcontentactive = false;
  getstatus = 'Connect';

  constructor(private checkoutService: CheckoutService,
              private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {

    this.checkoutService.getpaymentinteg().subscribe({
      next: data => {
        // console.log(data);
        if(data.data.length!=0){
          this.stripekey.setValue(data.data[0].publish_key);
          this.stripesecret.setValue(data.data[0].secret_key);
          this.getstatus =  'Connected';
        }
      }
    });

    

  }

  stripekey = new FormControl('', [Validators.required]);
  stripesecret = new FormControl('', [Validators.required]);

  addnewconnect(value:string){

    if(value=='stripe'){
      this.stripecontentactive = true;
      this.paypalcontentactive = false;
    }else if(value=='paypal'){
      this.stripecontentactive = false;
      this.paypalcontentactive = true;
    }
    this.popupsidebar = true;
    this.paymentaction = true;
  }

  hidepopupsidebar(){
    this.popupsidebar = false;
  }

  connectpayment(){
    // console.log(this.stripekey);
    // console.log(this.stripesecret);

    if(this.getstatus == 'Connect'){

      if(this.stripekey.status=='VALID' && this.stripesecret.status=='VALID'){

          var data = {key:this.stripekey.value, secret: this.stripesecret.value, method:'insert'};
          this.checkoutService.updatepayment(data).subscribe({
            next: data => {
              console.log(data);
              if(data.success==1){
                this.popupsidebar = false;
                this.getstatus = 'Connected';
                this._snackBar.open('Stripe Keys Connected Successfully!', 'OK');

              }
          }
        });

      }

    }else{
      
      if(this.stripekey.status=='VALID' && this.stripesecret.status=='VALID'){

          var data = {key:this.stripekey.value, secret: this.stripesecret.value, method: 'update'};
          this.checkoutService.updatepayment(data).subscribe({
            next: data => {
              console.log(data);
              if(data.success==1){
                this.popupsidebar = false;
                this.getstatus = 'Connected';
                this._snackBar.open('Stripe Keys Updated Successfully!', 'OK');

              }
          }
        });

      }
      
    }


  }

}
