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
  uniqueidstep:any = '';

  founderror:any = false;
  productdata:any = [];
  totalprice = 0;
  invalidconn = false;
  redirecturi:any = '';
  adjustclass = true;
  selectedproduct:any = [];

  checkoutstyle:any = {step1headline:'SHIPPING',step1subheadline:'Where Should We Ship It?',step1btntext:'Special Offer Click Here', step1btnsubtext:'', step1footertext:'* 100% Secure & Safe Payments *',step2headline:'YOUR INFO',step2subheadline:'Upgrade Now & Save!',step2btntext:'Buy Now', step2btnsubtext:'', step2footertext:'* 100% Secure & Safe Payments *'};
  user_id:any = '';

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
        // console.log(data);
        if(data?.data?.length!=0){

          data.data.forEach((element:any) => {
            var convertdata = {name:element.productname, price: element.productprice, priceoverride: element.priceoverride};
            this.productdata.push(convertdata);
          });
          this.totalprice = parseFloat(data.data[0].productprice);
          // this.selectedproduct.push(data.data[0].productname);

          this.createForm(data.data[0].user_id);
          this.user_id = data.data[0].user_id;
          // console.log(this.user_id);

          // console.log(this.productdata);
        }else{
          // this.founderror = true;
        }
      }
    });

    var dataobj2 = {id: this.uniqueidstep};
    this.checkoutService.getallcheckoutdata(dataobj2).subscribe({
      next: data => {

        if(data?.data?.length!=0){
          this.checkoutstyle = {step1headline:data.data[0].step1headline,step1subheadline:data.data[0].step1subheadline,step1btntext:data.data[0].step1btntext, step1btnsubtext:data.data[0].step1btnsubtext, step1footertext:data.data[0].step1footertext,step2headline:data.data[0].step2headline,step2subheadline:data.data[0].step2subheadline,step2btntext:data.data[0].step2btntext, step2btnsubtext:data.data[0].step2btnsubtext, step2footertext:data.data[0].step2footertext};
        }

      }
    });

    var dataobj3 = {id: this.uniqueidstep};
    this.checkoutService.getnextstepurl(dataobj3).subscribe({
      next: data => { 
        // console.log(data);
        if(data?.data?.length!=0){
          this.redirecturi = data.data;
        }
      }
    });


  }

  createForm(uniqueid:any){

    // console.log(uniqueid);
    if(!this.founderror){
      this.checkoutService.stripePaymentkey(uniqueid).subscribe({
        next: data => {
          console.log(data);

          if(data?.data?.length!=0){
              
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

  maketotalprice(value:any){
    // console.log(value.currentTarget.checked);
    
    if(value.currentTarget.checked==true){
      this.totalprice += parseFloat(value.currentTarget.value);
    }else{
      if(1<=this.totalprice){
        this.totalprice -= parseFloat(value.currentTarget.value);
      }
    }

    var main = document.querySelectorAll('input[type="checkbox"]');
    var chkfalse:any = [];
    main.forEach((element:any) => {
        if(element.checked==true){
          chkfalse.push(true);
        }else{
          chkfalse.push(false);
        }
    });
    
    if(!chkfalse.includes(true)){
      (<HTMLInputElement>document.getElementById('kbchk0')).checked = true;
      this.totalprice = parseFloat((<HTMLInputElement>document.getElementById('kbchk0')).value);
    }

  }
  
  nextstep(){
    (<HTMLStyleElement>document.getElementsByClassName('o2step_step1')[0]).style.display = "none";
    (<HTMLStyleElement>document.getElementsByClassName('o2step_step2')[0]).style.display = "block";
    this.adjustclass = false;
  }

  backstep(){
    (<HTMLStyleElement>document.getElementsByClassName('o2step_step1')[0]).style.display = "block";
    (<HTMLStyleElement>document.getElementsByClassName('o2step_step2')[0]).style.display = "none";
    this.adjustclass = true;
  }

  buy(){

    this.submitted = true;

    this.selectedproduct = [];
    var main = document.querySelectorAll('input[type="checkbox"]');
    main.forEach((element:any) => {
        // console.log(element.checked==true);
        if(element.checked==true){
          this.selectedproduct.push(element.name);
        }

    });
    // console.log(this.selectedproduct.toString());

    setTimeout(() => {
      if(this.stripeForm.status=='VALID' && this.totalprice!=0){
        this.checkoutstyle.step2btntext = 'Processing...';
        var validatetoken = (<HTMLInputElement>document.getElementById('keatoken')).value;

        this.stripeData = this.stripeForm.value;
        this.stripeData['token'] = validatetoken;
        this.stripeData['amount'] = this.totalprice;
        this.stripeData['stepid'] = this.uniqueidstep;
        this.stripeData['user_id'] = this.user_id;
        

        this.stripeData['productdescr'] = this.selectedproduct.toString();

        // console.log('workinside');
        // console.log(this.stripeData);

        this.checkoutService.stripePayment(this.stripeData).subscribe({
          next: data => {

            console.log(data);
            if(data.success==true){

              if(data.customer){
                // localStorage.setItem("uniquecustomer", data.customer.id);

                if(window.top!=null){
                  // window.top.location.href = "https://app.keabuilder.com/assets/upsell/#customerid="+data.customer.id; 
                  if(this.redirecturi!=''){
                     window.top.location.href = '/'+this.redirecturi+"/#customerid="+data.customer.id+'?userid='+this.user_id; 
                  }
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
