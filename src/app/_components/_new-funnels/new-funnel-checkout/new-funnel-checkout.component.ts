import {Component, OnInit, Renderer2, Inject, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService,StripeCardComponent,StripeCardNumberComponent } from 'ngx-stripe';
import {StripeCardElementOptions,StripeElementsOptions,PaymentIntent,} from '@stripe/stripe-js';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OrderformService } from 'src/app/_services/_sales/orderform.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { OfferService } from 'src/app/_services/_sales/offer.service';
import { ProductService } from 'src/app/_services/_sales/product.service';
import { CheckoutService } from 'src/app/_services/_sales/checkout.service';
import { RegistrationpaymentService } from 'src/app/_services/registrationpayment.service';

@Component({
  selector: 'appnew-funnel-checkout',
  templateUrl: './new-funnel-checkout.component.html',
  styleUrls: ['./new-funnel-checkout.component.css']
})
export class NewFunnelCheckoutComponent implements OnInit {

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
  uniqueid:any; 
  redirection = '';

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
  stripe:any={
    payeename:'',
    // payeeamount:'',
    phone:'',
    payeeaddress:'',
    payeecity:'',
    payeestate:'',
    payeecountry:'',
    payeezip:'',
  }

  selectedProducts:Array<any> = [];
  filteredProducts:Array<any> = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  offers:Array<any> = [];

  totalprice:any = 0;
  myproductarr:any = [];
  symbolcode = '';

  isPaymentConnected = false;
  filteredcountry:any=[];

  firststepsubmit = false;
  spinner = false;
  paymenterror = false;
  paymentMessage = '';
  productids = [];
  user_id:any = '';
  uniqueproid:any = [];
  cntryhelp = false;
  redirecturi = '';

  checkoutvisible = false;
  chkerror = '';
  constructor(
    private fb: FormBuilder, 
    private dialog: MatDialog,
    private orderformService: OrderformService,
    public _general: GeneralService,
    private route: ActivatedRoute,
    private stripeService: StripeService,
    private _offerservice: OfferService,
    private productService: ProductService,
    private checkoutService: CheckoutService,
    private regpayService:RegistrationpaymentService,
    ) {
      this.route.paramMap.subscribe((params: ParamMap) => { 
        this.uniqueid = params.get('id');
        console.log()
      })

        var dt = {id: this.uniqueid};
        this.checkoutService.orderformgetuserid(dt).subscribe({
          next: data => {
            if(data?.data?.length!=0){
              this.checkoutvisible = true;
              this.chkerror = '';
              this.user_id = data.data[0].user_id;
              this.redirecturi = data.data[0].redirection;
              this.fetchOffers(); 
              this.fetchOrder();
            }else{
              this.checkoutvisible = false;
              this.chkerror = 'Error Loading in checkout!';
            }

            if(data.data2.length!=0){
              if(data.data2[0]?.secret_key){
                this.isPaymentConnected=true;
                let stripeKeys = data.data2[0].publish_key;
                var setstripekey = this.stripeService.setKey(stripeKeys);
              }
              else this.isPaymentConnected=false;
            }
            else{
              this.isPaymentConnected=false;
            }

          }
        });

        
    }

  ngOnInit(): void {
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
  }

  validatestep(){
    this.firststepsubmit = true;
    var getcn = this.stripeForm.value.shippingcountry;
    if(2>=getcn.length){
      this.cntryhelp = false;
      if(this.stripeForm.status=='VALID'){
        this.switchstep = !this.switchstep;
        setTimeout(() => {
          const kbchk0: HTMLInputElement = document.getElementById('kbchk0') as HTMLInputElement;
          if(kbchk0!=null) this.totalprice = parseFloat(kbchk0.value);
        }, 50);
      }
    }else{
      this.cntryhelp = true;
    }
  }

  buy(){
    if(this.stripeForm.status=='VALID' && this.totalprice!=0){
      this.spinner=true;
      this.checkboxvalues();
      this.createtoken().then((resp:any)=>{   
        
        var stripeData:any = this.stripeForm.value;
        stripeData['token'] = resp;
        stripeData['amount'] = this.totalprice;
        stripeData['offerid'] = this.uniqueproid;
        stripeData['user_id'] = this.user_id;

        console.log(stripeData);

        this.checkoutService.stripePayment(stripeData).subscribe({
          next: data => {
            console.log(data);
            if(data.success){

              if(data.customer){
                // localStorage.setItem("uniquecustomer", data.customer.id);

                if(window.top!=null){
                  if(this.redirecturi!=''){
                     window.top.location.href = this.redirecturi+"#customerid="+data.customer+'?userid='+this.user_id+'&email='+data.email; 
                    //  console.log(this.redirecturi+"#customerid="+data.customer+'?userid='+this.user_id)
                  }
                }

              }

            }else{
              this.paymenterror=true;
              this.spinner=false;
            }
          }
        });

      })

    }else{
      this.paymenterror=true;
      this.paymentMessage='Something went wrong please try again!';
    }
  }

  checkboxvalues(){
    var main = document.querySelectorAll('input[type="checkbox"]');

    this.uniqueproid = [];
    main.forEach((elm: any) => {
      if (elm.checked) {
        this.uniqueproid.push(elm.getAttribute('data-prid'));
      }

    });

  }

  createtoken(){
    return new Promise((resolve) => {
      let payeename:any=this.stripeForm.value.name;
      // console.log(payeename);
      this.stripeService.createToken(this.card.element,payeename).subscribe((result:any) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            this.paymenterror=true;
            this.paymentMessage=result.error.message;
            this.spinner=false;
          } else if (result.token) {
              // Show a success message to your customer
              this.paymenterror=false;
              this.paymentMessage='';
              // console.log(result.token.id);
              resolve(result.token.id);
            }
        })
        })
  }

  fetchOrder() {

      this.fetching = true;
      this.orderformService.singleorderformusingid(this.user_id,this.uniqueid).subscribe((resp:any)=>{
        if(resp.success) {
            this.orderform = resp.data[0];
            var mkofferarr = (this.orderform.offers!= null && this.orderform.offers!= '') ? this.orderform.offers.split(',') : [];
            var mknewof:any = [];
            this.offers.forEach(ofr => { if(mkofferarr.includes(ofr.uniqueid)) mknewof.push(ofr); });
            this.selectedProducts = mknewof;
            this.selnewproductarr();
            this.redirection = this.orderform.redirection;
          }
        else {
            this._general.openSnackBar(true, 'Server Error', 'OK', 'center', 'top');
          }
        this.fetching = false;
      });
   
  }

  selnewproductarr(){
    this.myproductarr = [];
    this.selectedProducts.forEach((selpr: any, i: number) => {
      var obj:any = {user_id:this.user_id,productids:selpr.product_id};
      this.productService.fetchproductsusinguserid(obj).subscribe((resp:any)=>{
        var impname:any='';
        resp.data?.forEach((nm: any, i: number) => {
          impname += nm.name;
          if (i < resp.data.length - 1) impname += ' + ';
        });
        var finalprice = 0, sym = '', recurring='';
        var type = selpr.payment_type;
        if(type=='onetime'){
          var getprice = selpr.price;
          var cur = JSON.parse(selpr.currency);
          sym = cur.symbol;
          finalprice = getprice;
          if(i==0) this.symbolcode = cur.code;
          if(i==0) this.totalprice = selpr.price;
        }else if(type=='free'){
          var cur = JSON.parse(selpr.currency);
          if(i==0) this.symbolcode = cur.code;
          finalprice = 0;
        }else if(type=='recurring'){
          var dtrec = selpr.recurring_data!=''?JSON.parse(selpr.recurring_data):'';
          var adjpr = (parseInt(dtrec.price)/100);
          recurring = dtrec.currency+''+adjpr+'/'+dtrec.interval;
          finalprice = adjpr;
          if(i==0) this.symbolcode = dtrec.currency;
          if(i==0) this.totalprice = adjpr;
        }
        this.myproductarr.push({offerid:selpr.uniqueid,name:impname,price:finalprice,symbol:sym, type:type, recurring:recurring});
      });
    });
  }

  fetchOffers() {
    this._offerservice.fetchoffersusingid(this.user_id).subscribe((resp:any) => {
      // console.log(resp);
        this.offers = resp.data;
    });
  }

  addSelectedProduct(event:any, searchListInp:any): void {
    let value = JSON.parse(JSON.stringify(event.option.value))
    this.selectedProducts.push(value);
    searchListInp.value = '';
    this.filterProductData('');
    this.selnewproductarr();
  }

  filterProductData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredProducts = this.offers?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  removeSelectedProduct(index:number): void {
    this.selectedProducts.splice(index, 1);
    this.selnewproductarr();
    this.onremovetotalitem();
  }

  isOptionDisabled(values:any, uniqueid:any) {
    let vArr = values.filter((v:any) => v.uniqueid.includes(uniqueid));
    return vArr.length != 0;
  }

  maketotalprice(value:any){
    if(value.currentTarget.checked==true){
      this.totalprice += parseFloat(value.currentTarget.value);
    }else{
      if(1<=this.totalprice) this.totalprice -= parseFloat(value.currentTarget.value);
    }
    
   this.maketotalandsel();

  }

  maketotalandsel(){  
    var main = document.querySelectorAll('input[type="checkbox"]');
    var chkfalse:any = [];

      main.forEach((element: any) => {
        if (element.checked) {
          chkfalse.push(true);
        } else {
          chkfalse.push(false);
        }
      });

      if (!chkfalse.includes(true)) {
        const kbchk0: HTMLInputElement = document.getElementById('kbchk0') as HTMLInputElement;
        kbchk0.checked = true;
        this.totalprice = parseFloat(kbchk0.value);
      }
  }

  onremovetotalitem(){
    if(this.selectedProducts.length!=0){
      var kbchk0: HTMLInputElement = document.getElementById('kbchk0') as HTMLInputElement;
      kbchk0.checked = true;
      this.totalprice = parseFloat(kbchk0.value);
    }else{
      this.totalprice = 0;
    }
  }

  filtercountryData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredcountry= this.regpayService.Countrycode?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  getcountrynm(option:any){
    if(option) this.stripe.payeecountry = option.value;
  }

}
