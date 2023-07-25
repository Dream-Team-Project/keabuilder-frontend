import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutService } from 'src/app/_services/checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  stripekey = new FormControl('', [Validators.required]);
  stripesecret = new FormControl('', [Validators.required]);
  paypalemail = new FormControl('', [Validators.required]);
  paypalclientid = new FormControl('', [Validators.required]);
  paypalsecret = new FormControl('', [Validators.required]);

  paymentaction = false;
  stripecontentactive = true;
  paypalcontentactive = false;
  sripestatus = 'Connect';
  paypalstatus = 'Connect';

  constructor(private checkoutService: CheckoutService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.checkoutService.getpaymentinteg().subscribe({
      next: data => {
        // console.log(data);
        if(data.data.length!=0){
          this.stripekey.setValue(data.data[0].publish_key);
          this.stripesecret.setValue(data.data[0].secret_key);
          this.sripestatus =  'Connected';
        }
      }
    });    

  }


  connectpayment(){
    if(this.sripestatus == 'Connect'){
      if(this.stripekey.status=='VALID' && this.stripesecret.status=='VALID'){
          var data = {key:this.stripekey.value, secret: this.stripesecret.value, method:'insert'};
          this.checkoutService.updatepayment(data).subscribe({
            next: data => {
              // console.log(data);
              if(data.success==1){
                this.dialog.closeAll();
                this.sripestatus = 'Connected';
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
              // console.log(data);
              if(data.success==1){
                this.dialog.closeAll();
                this.sripestatus = 'Connected';
                this._snackBar.open('Stripe Keys Updated Successfully!', 'OK');

              }
          }
        });

      }
    }
  }
  openDialog(templateRef: TemplateRef<any>,value:any) {
    if(value=='stripe'){
      this.stripecontentactive = true;
      this.paypalcontentactive = false;
    }else if(value=='paypal'){
      this.stripecontentactive = false;
      this.paypalcontentactive = true;
    }
    this.paymentaction = true;
    this.dialog.open(templateRef);
  }

}