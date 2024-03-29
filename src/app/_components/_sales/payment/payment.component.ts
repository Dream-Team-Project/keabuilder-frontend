import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutService } from 'src/app/_services/_sales/checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  @ViewChild('addstripe') addstripe!: TemplateRef<any>;

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
  error=false;
  errormessage:any='';

  constructor(private checkoutService: CheckoutService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.checkoutService.getpaymentinteg().subscribe({
      next: data => {
        // console.log(data);
        if(data.data.length!=0){
          data.data.forEach((element:any) => {
            if(element.method =="stripe"){
              this.stripekey.setValue(element.publish_key);
              this.stripesecret.setValue(element.secret_key);
              this.sripestatus =  'Connected';
              }
              else if(element.method=="paypal"){
                this.paypalclientid.setValue(element.publish_key);
              this.paypalsecret.setValue(element.secret_key);
              this.paypalemail.setValue(element.email);
              this.paypalstatus =  'Connected';
              }
          });
          
        }
      }
    });    

  }
resetobj(){
  this.error=false;
  this.errormessage='';
  this.dialog.closeAll();
  this.stripekey.reset();
  this.stripesecret.reset();
  this.paypalemail.reset();
  this.paypalclientid.reset();
  this.paypalsecret.reset();

}

  connectstripe(){
    
    if(this.sripestatus == 'Connect'){
      if(this.stripekey.status=='VALID' && this.stripesecret.status=='VALID'){ 
       let obj = {key:this.stripekey.value, secret: this.stripesecret.value, method:'insert'};
        this.checkoutService.updatepayment(obj).subscribe({
            next: data => {
              // console.log(data);
              if(data.success==1){
               this.resetobj();
                this.sripestatus = 'Connected';
                this._snackBar.open('Stripe Keys Connected Successfully!', 'OK');

              }
              else{
                this.error=true;
                this.errormessage=data?.message;
                this.dialog.open(this.addstripe);
              }
          }
        });

      }
      else{
        this.error=true;
        this.errormessage="Please enter required fields";
        this.dialog.open(this.addstripe);
      }
    }else{
      if(this.stripekey.status=='VALID' && this.stripesecret.status=='VALID'){
          let data = {key:this.stripekey.value, secret: this.stripesecret.value, method: 'update'};
          this.checkoutService.updatepayment(data).subscribe({
            next: data => {
              // console.log(data);
              if(data.success==1){
                this.resetobj();
                this.sripestatus = 'Connected';
                this._snackBar.open('Stripe Keys Updated Successfully!', 'OK');

              }
              else{
                this.error=true;
                this.errormessage=data?.message;
                this.dialog.open(this.addstripe);
              }
          }
        });

      }
      else{
        this.error=true;
        this.errormessage="Please enter required fields";
        this.dialog.open(this.addstripe);
      }
    }
  }
  connectpaypal(){
    if(this.paypalstatus == 'Connect'){
      if(this.paypalemail.status=='VALID' && this.paypalclientid.status=='VALID' && this.paypalsecret.status=='VALID'){
        let obj = {key:this.paypalclientid.value, secret: this.paypalsecret.value, method:'insert' ,email:this.paypalemail.value};
       
        this.checkoutService.updatepayment(obj).subscribe({
            next: data => {
              // console.log(data);
              if(data.success==1){
                this.resetobj();
                this.paypalstatus = 'Connected';
                this._snackBar.open('Paypal Keys Connected Successfully!', 'OK');

              }
              else{
                this.error=true;
                this.errormessage=data?.message;
                this.dialog.open(this.addstripe);
              }
          }
        });

      }
      else{
        this.error=true;
        this.errormessage="Please enter required fields";
        this.dialog.open(this.addstripe);
      }

    }else{
      if(this.paypalemail.status=='VALID' && this.paypalclientid.status=='VALID' && this.paypalsecret.status=='VALID'){
        let obj = {key:this.paypalclientid.value, secret: this.paypalsecret.value, method:'update' ,email:this.paypalemail.value};
          this.checkoutService.updatepayment(obj).subscribe({
            next: data => {
              // console.log(data);
              if(data.success==1){
                this.dialog.closeAll();
                this.paypalstatus = 'Connected';
                this._snackBar.open('Paypal Keys Updated Successfully!', 'OK');

              }
              else{
                this.error=true;
                this.errormessage=data?.message;
                this.dialog.open(this.addstripe);
              }
          }
        });

      }
      else{
        this.error=true;
        this.errormessage="Please enter required fields";
        this.dialog.open(this.addstripe);
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