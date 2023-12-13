import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
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
import {hashSync} from 'bcryptjs';

@Component({
  selector: 'register-newplan-register',
  templateUrl: './register-newplan.component.html',
  styleUrls: ['./register-newplan.component.css']
})

export class RegisterNewplanComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  showdetails = false;

  cardOptions: StripeCardElementOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#dea641',
        color: '#000',
        fontWeight: 400,
        fontFamily: 'Poppins,Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '17px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {color: '#000'},
        '::placeholder': {color: '#000'},
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
    registration_type:'',

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
  spinnerpayment=false;

  productid :any='';
  productname :any='';
  plantype :any='';
  emailsubscription=false;
  serviceterms=false;
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
      {name:'Annual',value:'price_1OMnJqBFKaDgAHCwXYEHUk41'},
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
  {id:'plan-a47a5e100242ac120002',name:'Beta',type:'Annual',value:'price_1OMnJqBFKaDgAHCwXYEHUk41',},
];
secret_route:string='8YvA7kPbR2mX3uHwS6JnQgZtF4cV5xWp-c2BnRw5OzY7Lx3XmJq9UgCpHm4KfP6iA-9EhPvFjK1sQr4TlWnXzR3uY6Dg2mC8bV';
specialuser=false;

ischeck = false;

isthischecked = false;

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
              private router: Router
             ) { 
              this._route.paramMap.subscribe((params: ParamMap) => {
                if(params.get('id') == this.secret_route ){
                  this.specialuser=true;
                }
               this.subscriptionplans.map((element:any)=>{
                if(element?.id == params.get('id')){

                  if(element?.type=='Annual'){
                      this.isthischecked = true;
                  }
                  // console.log(element);
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
               if(!this.productid && (params.get('id') != this.secret_route )){
                window.location.href='/login';
               }
              }); 
              
             }

  changemyplan(mode:any){
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.subscriptionplans.map((element:any)=>{

        if(element?.id == params.get('id')){
          console.log(element);
          this.products.forEach((pr:any) => {
            if(pr.name==element.name){

              pr.type.forEach((nm:any) => {
                if(nm.name==mode){
                  console.log(nm);
                  this.productid = nm.value;
                }
              });

             
              }
          });

        }
        // if(element?.type=='Annual'){
        //   this.isthischecked = true;
        // }

      });
    });
    // this.productid = 
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
  changeStatus(isChecked:any) {
    this.ischeck = isChecked;
  }
  onSubmit(): void {
    this.isSignUpFailed = false;
    this.errorMessage='';
    this.form.uniqueid=this.makeid(20);
    this.form.password=hashSync(this.form.password,8);
    if(this.specialuser) {
      this.form.registration_type='free';
      this.form.productid='price_F562mZCjrALoDTQbCR5pF562mZC';
  }
    const { username,firstname,lastname,company, email,phone, password} = this.form;
    if(this.specialuser || (this.form.customerid && this.form.productid && this.form.subscriptionid)){
    if(this.userFormControl.status=='VALID' && this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID' && this.firstnameFormControl.status=='VALID'){
        this.authService.register(this.form).subscribe({
          next: data => {
            // console.log(data);
            if(data.success){
              this.tokenStorage.saveToken(data.accessToken);
            var userdata = {
              uniqueid: data.uniqueid,
            }
            this.tokenStorage.saveUser(userdata);
            this._file.createuserfolder(data.uniqueid).subscribe(e=>{
              // console.log(e);
            });
            var domainpath = window.location.hostname;

            var emailhtml = `Dear `+firstname+`,<br>
            <br>
            We're thrilled to welcome you to the Kea Builder community! Your successful registration marks the beginning of your web development journey with us, and we're excited to be part of it.<br>   
            <br>
            Here are your User details-<br>
            Login: `+domainpath+`/login<br>
            Username: `+username+`<br>  
            <br>
            Here's what you can do now that your registration is complete:<br> 
            <br>
            1. Access Your Dashboard<br>
            <br>
            You can now log in to your dashboard at any time by visiting [Dashboard URL] and using the credentials provided.<br>
            <br>
            2. Start Building Your Dream Website/Funnel<br>
            <br>
            With Kea Builder, you have the tools and resources at your fingertips to create stunning websites and funnels and build your online business. Begin your project by selecting a template or starting from scratch.<br>
            <br>
            3. Explore Our Features<br>
            <br>
            Discover the powerful features and functionalities available to you:<br>
            <br>
            Customer Relationship Management<br>
            Forms<br>
            Funnel Builder<br>
            <br>
            4. Get Assistance When Needed<br>
            <br>
            If you have any questions, encounter challenges, or need assistance with your journey, our support team is here. Feel free to reach out to them at <strong>support@keasolution.com</strong>.<br>
            <br>
            5. Learn and Grow<br>
            <br>
            Explore our tutorials, documentation, and community forums to enhance your web development skills. Stay connected with other developers, share insights, and learn from each other's experiences.<br>
            <br>
            Thank you for choosing Kea Builder. We're dedicated to providing you with the tools and support you need to create unique websites. We can't wait to see what you build!.<br>
            <br>
            Welcome aboard, and happy exploring!<br>
            <br>
            Best regards,<br>
            Kea Builder Team`;
            var maildata = {tomailid: email, frommailid: 'support@keasolution.com', subject: 'Welcome to Kea Builder - Registration Successful!', html: emailhtml};
            this.emailService.sendmail(maildata).subscribe({
              next: data => {
                // console.log(data);
              }
            });

            // need to pass unique id to the wistia instead of username
            //  var userobject = {project_name: username};
            //   this._wistia.projectCreate(userobject).subscribe({
            //     next: data2 => {
            //       console.log(data2)
            //       this.authService.onupdateprojectid(data?.id, data2?.data?.id).subscribe({
            //         next: data3 => {
            //           console.log(data3);
            //         }
            //       });
            //     }
            //   });

            this.isSuccessful = true;
            this.isSignUpFailed = false;
            var datasubmittion = [username,firstname,lastname,email,company,phone,data.uniqueid];
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
    this.spinnerpayment = false;
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
    let un = data.username.replace(/[^a-zA-Z0-9]/g, "");
    data.username = un.toLowerCase();
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
            this.spinnerpayment = false;
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
    if(this.userFormControl.status=='VALID' && this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID' && this.firstnameFormControl.status=='VALID' && this.ischeck){
      
      this.spinnerpayment = true;
        this.duplicateusercheck().then((resp)=>{
          this.createtoken().then((resp:any)=>{                                                                        
            var data={name:this.form.firstname+' '+this.form?.lastname,email:this.form.email,phone:this.form.phone,address:this.stripe.payeeaddress,city:this.stripe.payeecity,state:this.stripe.payeestate,country:this.stripe.payeecountry,zip:this.stripe.payeezip,productid:this.productid,token:resp};
            this.regpayService.registrationpayment(data).subscribe((data:any)=>{
              // console.log(data.subscription)
              if(data.success){
                this.paymentstatus=true;
                this.form.customerid=data?.customer?.id;
                this.form.subscriptionid=data?.subscription?.id;
                this.form.cardid=data?.customer?.default_source;
                this.form.productid=this.productid;
                this.form.registration_type='paid';
                this.successMessage=data?.status;
                // this._snackBar.open(data.status,'OK',{duration:2000});
                this.onSubmit();
                // console.log(this.form);
              }
              else{
                this.paymenterror=true;
                this.spinner=false;
                this.spinnerpayment = false;
                this.paymentMessage=data?.error?.raw?.message;
                // this._snackBar.open(data.message,'OK',{duration:200});
              }
            })
          })
      })

    }

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

  navigateToLoginWithRefresh() {
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });
  }




}

