import { Renderer2, Inject, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { CheckoutService } from '../_services/checkout.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FunnelService } from '../_services/funnels.service';

@Component({
  selector: 'app-funnel-checkout',
  templateUrl: './funnel-checkout.component.html',
  styleUrls: ['./funnel-checkout.component.css']
})
export class FunnelCheckoutComponent implements OnInit {
  
  stripeData: any;
  submitted: any;
  stripeForm: FormGroup | any;
  someerror:any;
  formbtnname='BUY NOW';
  uniqueidstep:any = '';

  founderror:any = false;
  productdata:any = [];
  totalprice = 0;
  invalidconn = false;

  constructor(
    private fb: FormBuilder, 
    private _renderer2: Renderer2, 
    private checkoutService: CheckoutService,
    private router: Router,
    private route: ActivatedRoute,
    private funnelService: FunnelService,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uniqueidstep = params.get('id');
    });

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

    var dataobj = {stepid: this.uniqueidstep,name: '', price: '', priceoverride: '',type:'get'};
    this.funnelService.funneladdeditproduct(dataobj).subscribe({
      next: data => {
        console.log(data);
        if(data.data.length!=0){

          data.data.forEach((element:any) => {
            var convertdata = {name:element.productname, price: element.productprice, priceoverride: element.priceoverride};
            this.productdata.push(convertdata);

            this.totalprice += parseFloat(element.productprice);
          });

        this.createForm(data.data.user_id);

          // console.log(this.productdata);
        }else{
          this.founderror = true;
        }
      }
    });


      
     

  }

  createForm(uniqueid:any){

    console.log(uniqueid);
    if(!this.founderror){
      this.checkoutService.stripePaymentkey(uniqueid).subscribe({
        next: data => {
          console.log(data);

          if(data.data.length!=0){
              
            let script = this._renderer2.createElement('script');
            script.type = `text/javascript`;
            script.text = `
            // console.log('hi');
              var stripe = Stripe('`+data.data[0].publish_key+`');
              
              var elements = stripe.elements();
              var styleCard =  {
                  'base': {
                    
                    'color': '#31325F',
                    'lineHeight': '40px',
                    'fontWeight': 300,
                    'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
                    'fontSize': '18px',
        
                  },
                  'Invalid': {  'color': 'red', },
              };
              var card = elements.create('card', { hidePostalCode: true,style: styleCard });
              card.mount('#card-element');
        
              card.addEventListener('change', function(event) {
                var displayError = document.getElementById('card-errors');
                if (event.error) {
                  displayError.textContent = event.error.message;
                } else {
                  displayError.textContent = '';
                }
              });
        
              function createToken() {
                stripe.createToken(card).then(function(result) {
                  if (result.error) {
                    // Inform the user if there was an error
                    var errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                  } else {
                    console.log(result.token);
                    document.getElementById('keatoken').value = result.token.id;
                    // document.getElementById("payment-form").submit();
                  }
                });
              };
              
              // Create a token when the form is submitted.
              var form = document.getElementById('payment-form');
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                createToken();
              });
            `;
        
            this._renderer2.appendChild(this._document.body, script);

          }else{
            this.invalidconn = true;
          }


        },
        error: err => {
          // console.log(err);
        }

      });

    }

  }

  buy(){

    this.submitted = true;

    setTimeout(() => {
      if(this.stripeForm.status=='VALID'){
        this.formbtnname = 'Processing...';
        var validatetoken = (<HTMLInputElement>document.getElementById('keatoken')).value;

        this.stripeData = this.stripeForm.value;
        this.stripeData['token'] = validatetoken;
        this.stripeData['amount'] = 1;

        console.log('workinside');
        
        console.log(this.stripeData);

        this.checkoutService.stripePayment(this.stripeData).subscribe({
          next: data => {
            console.log(data);
            this.formbtnname = 'BUY NOW';
            if(data.success==true){

              if(data.customer){
                // localStorage.setItem("uniquecustomer", data.customer.id);

                if(window.top!=null){
                  // window.top.location.href = "https://app.keabuilder.com/assets/upsell/#customerid="+data.customer.id; 
                  window.top.location.href = "http://localhost/upsell/#customerid="+data.customer.id; 
                }

              }


            }
          },
          error: err => {
            console.log(err);
          }
        });

      }else{
        this.someerror = 'something went wrong please try again!'
      }

    }, 1500);

  }




}
