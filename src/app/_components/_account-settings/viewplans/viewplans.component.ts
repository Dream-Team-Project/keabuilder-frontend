import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { RegistrationpaymentService } from 'src/app/_services/registrationpayment.service';

@Component({
  selector: 'app-viewplans',
  templateUrl: './viewplans.component.html',
  styleUrls: ['./viewplans.component.css']
})
export class ViewplansComponent implements OnInit {

  @ViewChild('updatedialog') updatedialog!: TemplateRef<any>;

  subscription_productidFormControl= new FormControl('', [Validators.required]);

  fetching=false;
  product:any;
  stripedata:any={
    customer:[],
    subscription:[],
    card:[],
  }
  subscription_productid:any;
  usertype:any='paid';
  currentPlan:any={};
  paymenttype = 'stripe';
  paypaldata:any = {current_period_end:''};
  error=false;
  errormessage:any;
  plantype:any='';
  products:any=[
    {name:'Startup',
    type:[
    {name:'Monthly',value:'price_1NTevbBFKaDgAHCwEwUIyyJw_m'},
    {name:'Annual', value:'price_1NTeyPBFKaDgAHCwLv5twvpv_y'},
    ],
},
    {name:'Entrepreneur',
    type:[
      {name:'Monthly',value:'price_1Ndr32BFKaDgAHCw5xKyngcc_m'},
    {name:'Annual', value:'price_1Ndr4lBFKaDgAHCw8WCP0i1G_y'},
    ],
  },
  {name:'Agency',
    type:[
      {name:'Monthly',value:'price_1Ndr7RBFKaDgAHCwdcMETILM_m'},
      {name:'Annual', value:'price_1Ndr8LBFKaDgAHCw7jph534I_y'},
    ],
  },
  {name:'Beta',
    type:[
      {name:'Monthly',value:'price_1NgOpkBFKaDgAHCwesDitAQa'},
    ],
  },
];
subscriptionplans:any=[
  {id:'plan-xTn8SqarYE0eVIEaSdkM',name:'Beta',type:'Monthly',value:'price_1NgOpkBFKaDgAHCwesDitAQa',},
  {id:'plan-8yKU3Mz9BnHVth6SYOjC',name:'Startup',type:'Monthly',value:'price_1NTevbBFKaDgAHCwEwUIyyJw_m',},
  {id:'plan-eeROpMVoVkNCasGIIXay',name:'Startup',type:'Annual',value:'price_1NTeyPBFKaDgAHCwLv5twvpv_y',},
  {id:'plan-74KaBnAOAiMDJx6HK5rl',name:'Entrepreneur',type:'Monthly',value:'price_1Ndr32BFKaDgAHCw5xKyngcc_m',},
  {id:'plan-O149fUrEJB3jc0akzgs9',name:'Entrepreneur',type:'Annual',value:'price_1Ndr4lBFKaDgAHCw8WCP0i1G_y',},
  {id:'plan-n5IKx4Z2asK7sYHS3lrd',name:'Agency',type:'Monthly',value:'price_1Ndr7RBFKaDgAHCwdcMETILM_m',},
  {id:'plan-bCR5pF562mZCjrALoDTQ',name:'Agency',type:'Annual',value:'price_1Ndr8LBFKaDgAHCw7jph534I_y',},
];

  constructor( private regpayService:RegistrationpaymentService,
    public _general:GeneralService,
    public dialog: MatDialog, ) { }

  ngOnInit(): void {
    this.fetchdata();
  }
  fetchdata(){
    this.fetching=true;
    this.subscriptiondata().then((resp:any)=>{
      this.subscriptionplans.map((element:any)=>{
        // console.log(this.subscription_productid)
        this.fetching=false;
        if(element?.value == this.subscription_productid){
          this.currentPlan=element;
          this.plantype=element.type;
         this.products.map((option:any)=>{
            if(option?.name == element.name)
            {
              this.product=option;
              // this.show=true;
            }
            
          });
        }
       })
    })
  }
  subscriptiondata(){
    return new Promise((resolve) => {
    this.regpayService.getsubscriptiondata().subscribe((data:any)=>{
      if(data.success){
        // console.log(data)
        if(data.paymenttype=='paypal'){
          this.paymenttype = 'paypal';
          this.paypaldata.current_period_end = data?.subscription?.billing_info?.next_billing_time;
          this.subscription_productid=data.productid;
        }else{

          this.stripedata.subscription=data?.subscription;
          this.stripedata.customer=data?.customer;
          this.subscription_productid=this.stripedata?.subscription?.plan?.id;
        }
        resolve(true);

      }
      else{
        this.usertype='free';
        this.fetching=false;
      }
      })
    });
  }
  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef).afterClosed().subscribe((resp:any) => {
    this.subscriptionplans.map((element:any)=>{
      // console.log(this.subscription_productid)
      if(element?.value == this.subscription_productid){
       this.products.map((option:any)=>{
          if(option?.name == element.name)
          {
            this.product=option;
            // this.show=true;
          }
        })
      }
      
    })

  })
}
updatesubscription(){
  // console.log(this.subscription_productid)
  this.fetching=true;
  if(this.subscription_productid && this.subscription_productid != this.stripedata.subscription?.plan?.id){
  let obj={productid:this.subscription_productid,customerid:this.stripedata?.customer?.id,type:'updateplan',subscriptionid:this.stripedata?.subscription?.id}; 
  this.regpayService.updatestripedata(obj).subscribe((data:any)=>{
    if(data.success){
      // console.log(data.subscription)
      this.fetching=false;
      this.stripedata.subscription=data?.subscription;
      this.fetchdata();
      this._general.openSnackBar(false,data?.message,'Ok','center','top');
      this.dialog.closeAll();
      this.error=false;
      this.errormessage='';
    }
    else{
     this.fetching=false;
      this.error=true;
     this.errormessage=data?.message;
     this.openDialog(this.updatedialog);
   
    }
  })
 }
 else{
   this.fetching=false;
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
 
 validateSubscription() {
   let currentSubscription = this.stripedata.subscription?.plan?.id;
   let selectedSubscription = this.subscription_productid;
   const currentSubscriptionIndex = this.subscriptionplans.findIndex((sub:any) => sub.value === currentSubscription);
   const selectedSubscriptionIndex = this.subscriptionplans.findIndex((sub :any) => sub.value === selectedSubscription);
   if (selectedSubscriptionIndex < currentSubscriptionIndex) {
     let msg="Please contact the support team to downgrade your Subscription plan."
             this._general.openSnackBar(true,msg,'Ok','center','top');
               this.fetchdata();
   }
 else{
   this.updatesubscription();
 }
 }
 changeplantype(type:any){
// console.log(type)
  // this.plantype=type.value

 }
}
