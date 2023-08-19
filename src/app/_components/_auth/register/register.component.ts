import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/_services//auth.service';
import { WistiaService } from 'src/app/_services//wistia.service';
import { FileUploadService } from 'src/app/_services//file-upload.service';
import { MailerService } from 'src/app/_services/mailer.service';
import { StripeService,StripeCardComponent,StripeCardNumberComponent } from 'ngx-stripe';
import {StripeCardElementOptions,StripeElementsOptions,PaymentIntent,} from '@stripe/stripe-js';
import { RegistrationpaymentService } from 'src/app/_services/registrationpayment.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import {hashSync} from 'bcryptjs'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]);
  userFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);
  firstnameFormControl = new FormControl('',[Validators.required]);
  lastnameFormControl = new FormControl('');
  companynameFormControl = new FormControl('',[Validators.required]);
  phoneFormControl = new FormControl('',[Validators.required]);
  
  stripeForm :FormGroup | any ;
  // paypalForm :FormGroup | any ;
  hide = true;
  form = {
    username:'',
    firstname:'',
    lastname:'',
    company:'',
    email: '',
    phone:'',
    password: '',
    customerid:'',
    productid:'',
    subscriptionid:'', 
    uniqueid:'',
    cardid:'',
    usertype:'',

  };
  stripe:any={
    payeename:'',
    // payeeamount:'',
    phone:this.form.phone,
    payeeaddress:'',
    payeecity:'',
    payeestate:'',
    payeecountry:'',
    payeezip:'',
  }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  paymentMessage = '';
  successMessage = '';
  filteredcountry:any=[];
  min = 1;
  max = 3;
  bgImg = 'url(./assets/images/login/login-bk1.jpg)';

  changestep = 0;
  paymentstatus = false;
  paymenterror = false;
  activetab=0;
  spinner=false;
  productid :any='';
  productname :any='';
  plantype :any='';
  emailsubscription=false;
  serviceterms=false;
  product:any;
  products:any=[
//     {name:'Startup',
//     type:[
//     {name:'Monthly',value:'price_1NTevbBFKaDgAHCwEwUIyyJw'},
//     {name:'Annual', value:'price_1NTeyPBFKaDgAHCwLv5twvpv'},
//     ],
// },
//     {name:'Entrepreneur',
//     type:[
//       {name:'Monthly',value:'price_1Ndr32BFKaDgAHCw5xKyngcc'},
//     {name:'Annual', value:'price_1Ndr4lBFKaDgAHCw8WCP0i1G'},
//     ],
//   },
//   {name:'Agency',
//     type:[
//       {name:'Monthly',value:'price_1Ndr7RBFKaDgAHCwdcMETILM'},
//       {name:'Annual', value:'price_1Ndr8LBFKaDgAHCw7jph534I'},
//     ],
//   },
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
specialroute:string='bCR5pF562mZCjrALoDTQbCR5pF562mZCjrALoDTQbCR5pF562mZCjrALoDTQ';
specialuser=false;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private _file: FileUploadService,
              private _wistia: WistiaService,
              private emailService: MailerService,
              private _snackBar: MatSnackBar,
              private stripeService: StripeService,
              private regpayService:RegistrationpaymentService,
              private ProgressSpinner :MatProgressSpinnerModule,
              private tokenStorage: TokenStorageService,
              private _route: ActivatedRoute,
             ) { 
              this._route.paramMap.subscribe((params: ParamMap) => {
                if(params.get('id') == this.specialroute ){
                  this.specialuser=true;
                }
               this.subscriptionplans.map((element:any)=>{
                if(element?.id == params.get('id')){
                  this.productname=element.name;
                  this.productid=element.value;
                 this.products.map((option:any)=>{
                    if(option?.name==this.productname)
                    {
                      this.product=option;
                    }
                   
                  });
                }
               })
               if(!this.productid && (params.get('id') != this.specialroute )){
                window.location.href='/login';
               }
              }); 
              
             }

  ngOnInit(): void {
    this.createNewImg();
    this.stripeForm  = this.fb.group({
      address: ['', [Validators.required]],
      cityname: ['', [Validators.required]],
      shippingcountry: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
    });
    // this.paypalForm  = this.fb.group({
    //   name: ['', [Validators.required]],
    //   amount: ['', [Validators.required]],
    //   address: ['', [Validators.required]],
    //   cityname: ['', [Validators.required]],
    //   shippingcountry: ['', [Validators.required]],
    //   state: ['', [Validators.required]],
    //   zip: ['', [Validators.required]],
    // });
    
  }

  onSubmit(): void {
    this.form.uniqueid=this.makeid(20);
    this.form.password=hashSync(this.form.password,8);
    if(this.specialuser) this.form.usertype='free';
    const { username,firstname,lastname,company, email,phone, password} = this.form;
    if(this.specialuser || (this.form.customerid && this.form.productid && this.form.subscriptionid)){
    if(this.userFormControl.status=='VALID' && this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID' && this.firstnameFormControl.status=='VALID'){
        this.authService.register(this.form).subscribe({
          next: data => {
            // console.log(data);
            if(data?.success){
              this.tokenStorage.saveToken(data?.accessToken);
            var userdata = {
              uniqueid: data?.uniqueid,
            }
            this.tokenStorage.saveUser(userdata);
            this._file.createuserfolder(data.uniqueid).subscribe(e=>{
              // console.log(e);
            });
            var domainpath = window.location.hostname;

            var emailhtml = `Dear `+firstname+`,<br>
            <br>
            Thank you for choosing KEA Solutions. We are very excited to have you with us!<br>   
            <br>
            Your new KEA builder includes 2 FREE hours of BONUS Launch Assist redeemable through our KEA building Team! You can use it for free website/funnel transfers, consulting about advanced business strategy, custom solutions for any other 3rd party platform, and digital marketing services.<br> 
            <br>
            Please email <strong>support@keasolution.com</strong> in case you need any clarity or suggestions.<br>
            <br>
            Login: `+domainpath+`/login<br>
            Username: `+username+`<br>
            Password: `+password+`<br>
            <br>
            Thanks<br>
            KEA Solutions Team`;
            var maildata = {tomailid: email, frommailid: 'support@keasolution.com', subject: 'Welcome To Kea', html: emailhtml};
            this.emailService.sendmail(maildata).subscribe({
              next: data => {
                console.log(data);
              }
            });

            // need to pass unique id to the wistia instead of username
            //  var userobject = {project_name: username};
            //   this._wistia.projectCreate(userobject).subscribe({
            //     next: data2 => {
            //       this.authService.onupdateprojectid(data.id, data2.data.hashedId).subscribe({
            //         next: data3 => {
            //           console.log(data3);
            //         }
            //       });
            //     }
            //   });

            this.isSuccessful = true;
            this.isSignUpFailed = false;
            var datasubmittion = [username,firstname,lastname,email,company,phone,data?.uniqueid];
            this.redirectToDashboard();
            this.email_creationuser(datasubmittion);
            
        }
      else{
          
            this.errorMessage = data?.error?.message;
            this.isSignUpFailed = true;
          
        }
      },
      error: err=> {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
        });
    }
  }
  else{
    this._snackBar.open('Payment Failed','OK',{duration:2000} );
    this.spinner=false;
  }
    // if(this.userFormControl.status!='VALID' || this.emailFormControl.status!='VALID' || this.firstnameFormControl.status!='VALID'){
    //   this.changestep = this.changestep;
    // }

  }
  duplicateusercheck(){
    return new Promise((resolve) => {
      let obj={username:this.form.username,email:this.form.email};
    this.authService.duplicatecheck(obj).subscribe((data:any)=>{
      if(data.success)  resolve(data.success);
      else this._snackBar.open(data?.message,'OK',{duration:2000});
     
    })
});
}

  searchStringInArray(str:any, strArray:any) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return 0;
    }
    return 1;
}

  email_creationuser(data:any){
    var emailhtml = `New User Sign Creation Successfully.
    <br>
    UserId: `+data[6]+`<br>
    Username: `+data[0]+`<br>
    Firstname: `+data[1]+`<br>
    Lastname: `+data[2]+`<br>
    Email: `+data[3]+`<br>
    Company: `+data[4]+`<br>
    Phone: `+data[5]+`<br>
    <br>`;
    var maildata = {tomailid: 'support@keasolution.com', frommailid: 'support@keasolution.com', subject: 'New Registration', html: emailhtml};
    this.emailService.sendmail(maildata).subscribe({
      next: data => {
        // console.log(data);
      }
    });
  }

  removespecialchar(data:any){
    // console.log(data);
    var datagen = data.replace(/[^a-zA-Z0-9]/g, "");
    return datagen;
  }

  removespecialcharwithsmall(data:any){
    var datagen = this.removespecialchar(data).toLowerCase();
    return datagen;
  }

  redirectToDashboard(): void {
    // this.router.navigate(['/'],{relativeTo: this.route});
    window.location.href='/';
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
    this.bgImg = 'url(./assets/images/login/login-bk'+genNum+'.jpg)';
  }

  fillnext(){
    this.duplicateusercheck().then((resp:any)=>{
      this.changestep = this.changestep+1;
    // if(this.changestep==1){
    //   if(this.userFormControl.status=='VALID' && this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID' && this.firstnameFormControl.status=='VALID'){
    //     this.changestep = this.changestep+1;
    //   }
    //   else{
    //     this._general.openSnackBar(true,"Please Fill All Details before pay!",'OK', 'center', 'top');
    //   }
    // }
    // else{
    // this.changestep = this.changestep+1;
    // }
  })
  }

  fillback(){
    this.changestep = this.changestep-1;
  }
  filtercountryData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredcountry= this.regpayService.Countrycode?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }
  getcountrynm(option:any){
    if(option) this.stripe.payeecountry = option.value;
  }
  getactivetab(event:any){
    this.activetab=event;
  }
   createtoken(){
    return new Promise((resolve) => {
      let payeename:any=this.form.firstname+' '+this.form.lastname;
      this.stripeService.createToken(this.card.element,payeename).subscribe((result:any) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            // console.log(result.error.message);
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

  payment(){
    this.spinner=true;
    this.duplicateusercheck().then((resp)=>{
    this.createtoken().then((resp:any)=>{                                                                        
      var data={name:this.form.firstname+' '+this.form?.lastname,email:this.form.email,phone:this.form.phone,address:this.stripe.payeeaddress,city:this.stripe.payeecity,state:this.stripe.payeestate,country:this.stripe.payeecountry,zip:this.stripe.payeezip,productid:this.productid,token:resp};
      this.regpayService.registrationpayment(data).subscribe((data:any)=>{
        //  console.log(data.subscription)
        if(data.success){
          this.paymentstatus=true;
          this.form.customerid=data?.customer?.id;
           this.form.subscriptionid=data?.subscription?.id;
           this.form.cardid=data?.customer?.default_source;
           this.form.productid=this.productid;
           this.form.usertype='paid';
          this.successMessage=data?.status;
          // this._snackBar.open(data.status,'OK',{duration:2000});
          this.onSubmit();
          // console.log(this.form);
        }
        else{
          this.paymenterror=true;
          this.spinner=false;
          this.paymentMessage=data?.error?.raw?.message;
          this._snackBar.open(data.message,'OK',{duration:200});

        }
      })
    })
  })
  }

  makeid(length:number) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    productdetails(event:any){
      this.productname=event.value.name;
      this.product=event.value;
    }
    subscriptiontype(event:any){
      this.productid=event.value;
    }
}

