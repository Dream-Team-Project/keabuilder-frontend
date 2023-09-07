import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ImageService } from 'src/app/_services/image.service';
import { RegistrationpaymentService } from 'src/app/_services/registrationpayment.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  @ViewChild('address') address!: TemplateRef<any>;
  @ViewChild('changecard') changecard!: TemplateRef<any>;
  @ViewChild('updatedialog') updatedialog!: TemplateRef<any>;
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

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
        '::placeholder': {color: '#87bbfd'}
      },
      invalid: {
        iconColor: 'dc3545',
        color: 'dc3545'
      }
    }
  };  
  elementsOptions: StripeElementsOptions = {
    locale: 'auto',
  };
  
  fetching=true;
  cngcard=false;

  stripedata:any={
    customer:[],
    subscription:[],
    card:[],
  }

  fetch=false;
  filteredcountry:any=[];
  error=false;
  errormessage:any;
  chgerror=false;
  chgerrormessage:any;
  nameoncard:any;
  token=false;
  tokenmessage:any;
  subscription_productid:any;
  usertype:any;
  product:any;
  products:any=[
    {name:'Startup',
    type:[
    {name:'Monthly',value:'price_1NTevbBFKaDgAHCwEwUIyyJw'},
    {name:'Annual', value:'price_1NTeyPBFKaDgAHCwLv5twvpv'},
    ],
},
    {name:'Entrepreneur',
    type:[
      {name:'Monthly',value:'price_1Ndr32BFKaDgAHCw5xKyngcc'},
    {name:'Annual', value:'price_1Ndr4lBFKaDgAHCw8WCP0i1G'},
    ],
  },
  {name:'Agency',
    type:[
      {name:'Monthly',value:'price_1Ndr7RBFKaDgAHCwdcMETILM'},
      {name:'Annual', value:'price_1Ndr8LBFKaDgAHCw7jph534I'},
    ],
  },
  {name:'Beta',
    type:[
      {name:'Monthly',value:'price_1NgOpkBFKaDgAHCwesDitAQa'},
    ],
  },
];
subscriptionplans:any=[
  {id:'plan-8yKU3Mz9BnHVth6SYOjC',name:'Startup',type:'Monthly',value:'price_1NTevbBFKaDgAHCwEwUIyyJw',},
  {id:'plan-eeROpMVoVkNCasGIIXay',name:'Startup',type:'Annual',value:'price_1NTeyPBFKaDgAHCwLv5twvpv',},
  {id:'plan-74KaBnAOAiMDJx6HK5rl',name:'Entrepreneur',type:'Monthly',value:'price_1Ndr32BFKaDgAHCw5xKyngcc',},
  {id:'plan-O149fUrEJB3jc0akzgs9',name:'Entrepreneur',type:'Annual',value:'price_1Ndr4lBFKaDgAHCw8WCP0i1G',},
  {id:'plan-n5IKx4Z2asK7sYHS3lrd',name:'Agency',type:'Monthly',value:'price_1Ndr7RBFKaDgAHCwdcMETILM',},
  {id:'plan-bCR5pF562mZCjrALoDTQ',name:'Agency',type:'Annual',value:'price_1Ndr8LBFKaDgAHCw7jph534I',},
  {id:'plan-xTn8SqarYE0eVIEaSdkM',name:'Beta',type:'Monthly',value:'price_1NgOpkBFKaDgAHCwesDitAQa',},
];

  nameFormControl= new FormControl('', [Validators.required]);
  emailFormControl= new FormControl('', [Validators.required,Validators.email]);
  phoneFormControl= new FormControl('', [Validators.required]);
  addressline1FormControl= new FormControl('', [Validators.required]);
  addressline2FormControl=new FormControl('');
  cityFormControl=new FormControl('', [Validators.required]);
  countryFormControl=new FormControl('', [Validators.required]);
  stateFormControl=new FormControl('', [Validators.required]);
  postal_codeFormControl=new FormControl('', [Validators.required]);
  nameoncardFormControl= new FormControl('', [Validators.required]);
  subscription_productidFormControl= new FormControl('', [Validators.required]);

stripeaddress:any={
  id:'',
  name:null,
  email:null,
  phone:null,
line1:null,
line2:null,
city:null,
state:null,
country:null,
postal_code:null,
type:'',
};
stripecard:any={
  id:'',
  brand:null,
  country:null,
  exp_year:null,
  exp_month:null,
  last4:null,
  funding:null,
  fingerprint:null,

}

  constructor(
              public userService: UserService,
              public imageService: ImageService,
              private _auth: AuthService, 
              private tokenservice:TokenStorageService,
              private _general:GeneralService,
              public dialog: MatDialog, 
              private stripeService: StripeService,
              private regpayService:RegistrationpaymentService,
              ) { }

  ngOnInit(): void {
    this.subscriptiondata().then((resp:any)=>{
      this.fetching=false;
      this.subscriptionplans.map((element:any)=>{
        // console.log(this.subscription_productid)
        if(element?.value == this.subscription_productid){
         this.products.map((option:any)=>{
            if(option?.name==element.name)
            {
              this.product=option;
            }
           
          });
        }
       })
    })
  }
  subscriptiondata(){
    return new Promise((resolve) => {
    this.regpayService.getsubscriptiondata().subscribe((data:any)=>{
      if(data?.success){
        // console.log(data)
        this.stripedata.subscription=data?.subscription;
        this.stripedata.customer=data?.customer;
        this.stripedata.card=data?.card;
        this.stripeaddress.id=this.stripedata?.customer?.id;
        this.stripeaddress.name=this.stripedata?.customer?.name;
        this.stripeaddress.email=this.stripedata?.customer?.email;
        this.stripeaddress.phone=this.stripedata?.customer?.phone;
        this.stripeaddress.line1=this.stripedata?.customer?.address?.line1;
        this.stripeaddress.line2=this.stripedata?.customer?.address?.line2;
        this.stripeaddress.city=this.stripedata?.customer?.address?.city;
        this.stripeaddress.state=this.stripedata?.customer?.address?.state;
        this.stripeaddress.country=this.stripedata?.customer?.address?.country;
        this.stripeaddress.postal_code=this.stripedata?.customer?.address?.postal_code;
        this.stripecard.id=this.stripedata?.card?.id;
        this.stripecard.brand=this.stripedata?.card?.brand;
        this.stripecard.country=this.stripedata?.card?.country;
        this.stripecard.exp_year=this.stripedata?.card?.exp_year;
        this.stripecard.exp_month=this.stripedata?.card?.exp_month;
        this.stripecard.last4=this.stripedata?.card?.last4;
        this.stripecard.funding=this.stripedata?.card?.funding;
        this.stripecard.fingerprint=this.stripedata?.card?.fingerprint;
        this.subscription_productid=this.stripedata?.subscription?.plan?.id;
        resolve(true);
      }
      else{
        // this._general.openSnackBar(true,data.message,'Ok','center','top');
        this.fetching=false;
        this.usertype='free';
      }
      })
    });
  }
  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
 //    .afterClosed().subscribe((resp:any) => {
 //     this.stripeaddress=null;
 //  })
}
filtercountryData(event:any) {
 var value = event ? event.target.value : '';
 this.filteredcountry= this.regpayService.Countrycode?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
}

updateaddress(){
 if(this.stripeaddress.name && this.stripeaddress.email && this.stripeaddress.phone && this.stripeaddress.line1 && this.stripeaddress.city && this.stripeaddress.state && this.stripeaddress.country && this.stripeaddress.postal_code)
{
 this.stripeaddress.type='customer';
 this.error=false;
 this.errormessage='';
 // console.log(this.stripeaddress);
 
 this.regpayService.updatestripedata(this.stripeaddress).subscribe((data:any)=>{
   if(data?.success){
     this.dialog.closeAll();
     this._general.openSnackBar(false,data?.message,'Ok','center','top');
     this.stripedata.customer=data?.customer;
   }
   else{
     this.openDialog(this.address);
     this.error=true;
     this.errormessage=data?.message;
   }
 })

}
else{
 this.openDialog(this.address);
 this.error=true;
 this.errormessage="Please Fill details";

}
}
changecardstatus(){
 this.cngcard=true;
}
changecarddetails(){
 
 this.createtoken().then((resp:any)=>{
  if(this.nameoncard && this.card.element){
   this.token=false;
   this.tokenmessage='';
   // token:'tok_visa
   let obj={name:this.nameoncard,customerid:this.stripedata?.customer?.id,type:'changecard',token:resp}
   this.regpayService.updatestripedata(obj).subscribe((data:any)=>{
     if(data?.success){
       this.cngcard=false;
       this.stripedata.card=data?.card;
       this.stripedata.customer=data?.customer;
       this._general.openSnackBar(false,data?.message,'OK','center','top');
       this.dialog.closeAll();
     }
     else{
       this.cngcard=true;
       this.openDialog(this.changecard);
       this.token=true;
       this.tokenmessage=data?.message;
     }
   })
  }
 })

}
createtoken(){
 return new Promise((resolve) => {
   this.stripeService.createToken(this.card.element,this.nameoncard).subscribe((result:any) => {
       if (result.error) {
         // Show error to your customer (e.g., insufficient funds)
         // console.log(result.error.message);
         this.token=true;
         this.tokenmessage=result.error.message;
       } else if (result.token) {
           // Show a success message to your customer
           this.token=false;
           this.tokenmessage='';
           // console.log(result.token.id);
           resolve(result.token.id);
         }
     })
     })
}
cancelsubscription(){
 let obj={subscriptionid:this.stripedata?.subscription?.id,type:'cancelplan'};
 // this.regpayService.updatestripedata(obj).subscribe((data:any)=>{
 //   if(data?.success){
 //     this._general.openSnackBar(false,data?.message,'Ok','center','top');
 //     this.tokenservice.signOut();
 //   }
 //   else{
 //     this._general.openSnackBar(true,data?.message,'Ok','center','top');
 //   }
 // })
}

updatesubscription(){
 // console.log(this.subscription_productid)
 if(this.subscription_productid && this.subscription_productid != this.stripedata.subscription?.plan?.id){
 let obj={productid:this.subscription_productid,customerid:this.stripedata?.customer?.id,type:'updateplan'}; 
 this.regpayService.updatestripedata(obj).subscribe((data:any)=>{
   if(data.success){
     // console.log(data.subscription)
     this.stripedata.subscription=data?.subscription;
     this._general.openSnackBar(false,data?.message,'Ok','center','top');
     this.dialog.closeAll();
     this.error=false;
     this.errormessage='';
   }
   else{
     this.error=true;
    this.errormessage=data?.message;
    this.openDialog(this.updatedialog);
   }
 })
}
else{
 this._general.openSnackBar(true,"Plan Allready Active",'Ok','center','top');

}
}
productdetails(event:any){
  // this.productname=event.value.name;
  this.product=event.value;
}
subscriptiontype(event:any){
  this.subscription_productid=event.value;
}
}
