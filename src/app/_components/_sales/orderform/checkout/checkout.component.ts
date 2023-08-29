import {Component, OnInit, Renderer2, Inject, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CheckoutService } from 'src/app/_services/_sales/checkout.service';
import { DOCUMENT } from '@angular/common';
import { StripeService,StripeCardComponent,StripeCardNumberComponent } from 'ngx-stripe';
import {StripeCardElementOptions,StripeElementsOptions,PaymentIntent,} from '@stripe/stripe-js';


@Component({
    selector: 'orderformcheckout-form',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
  })
export class OrderFormCheckoutComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;


  fetching:boolean = true;
  orderform:any = {
    name: '',
  }
  hasError:boolean = false;
  stripeForm: FormGroup | any;
  submitted: any;
  checkoutstyle:any = {step1btntext:'Special Offer Click Here', step1footertext:'* 100% Secure & Safe Payments *',step2btntext:'Buy Now', step2footertext:'* 100% Secure & Safe Payments *'};
  founderror:any = false;

  switchstep = false;

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#dea641',
        color: '#000',
        fontWeight: 400,
        fontFamily: 'Poppins,Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {color: '#fce883'},
        '::placeholder': {color: '#000000'},
      },
      invalid: {
        iconColor: 'dc3545',
        color: 'dc3545'
      }
    },
    hidePostalCode: true,
  };  
  elementsOptions: StripeElementsOptions = {
    locale: 'auto',
  };
  
  constructor(
    private fb: FormBuilder, 
    private dialog: MatDialog,
    private checkoutService: CheckoutService,
    public _general: GeneralService,
    private stripeService: StripeService,
    ) {}

  ngOnInit(): void {
    this.fetching = false;

    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      fulladdress: ['', [Validators.required]],
      cityname: ['', [Validators.required]],
      shippingcountry: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
    });

    const stripeKeys = 'pk_test_51Gqk7rBFKaDgAHCwnEl2FfdGGmguQWptXwwk5fHbjPu1jlWKeG0JGmy8rOhxr5dyP5PWMkObSFuZjllhQtT4Zhwt00QWjR7c8V';
    this.stripeService.setKey(stripeKeys);


  }

  nextstep(){
    // (<HTMLStyleElement>document.getElementsByClassName('o2step_step1')[0]).style.display = "none";
    // (<HTMLStyleElement>document.getElementsByClassName('o2step_step2')[0]).style.display = "block";
    // this.adjustclass = false;
  }


 


}
