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
import { environment } from 'src/environments/environment';

declare let paypal:any;

@Component({
  selector: 'register-newplan-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

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
    type:'stripe',
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
    {name:'Monthly',value:'price_1OMpu7BFKaDgAHCwv86w1n9J',paypalvalue:'P-8V418761AK036645CMWQVOYI'},
    {name:'Annual', value:'price_1NTeyPBFKaDgAHCwLv5twvpv',paypalvalue:'P-9GW30098774876834MWQVPSQ'},
    ],
},
    {name:'Entrepreneur',
    type:[
      {name:'Monthly',value:'price_1Ndr32BFKaDgAHCw5xKyngcc',paypalvalue:'P-6HW058532V7164047MWQVUBQ'},
    {name:'Annual', value:'price_1Ndr4lBFKaDgAHCw8WCP0i1G',paypalvalue:'P-0N019837HE343330AMWQVUJY'},
    ],
  },
  {name:'Agency',
    type:[
      {name:'Monthly',value:'price_1Ndr7RBFKaDgAHCwdcMETILM',paypalvalue:'P-0UJ58429A33637016MWQVUW'},
      {name:'Annual', value:'price_1Ndr8LBFKaDgAHCw7jph534I',paypalvalue:'P-31262490MY041344DMWQVVBQ'},
    ],
  },
  {name:'Beta',
    type:[
      {name:'Monthly',value:'price_1NgOpkBFKaDgAHCwesDitAQa',paypalvalue:'P-8YC71282FX3000908MWPFRNI'},
      {name:'Annual',value:'price_1OMnJqBFKaDgAHCwXYEHUk41',paypalvalue:'P-40C344272E276050JMWQTF4I'},
    ],
  },
];
subscriptionplans:any=[
  {id:'plan-8yKU3Mz9BnHVth6SYOjC',name:'Startup',type:'Monthly',value:'price_1OMpu7BFKaDgAHCwv86w1n9J',},
  {id:'plan-eeROpMVoVkNCasGIIXay',name:'Startup',type:'Annual',value:'price_1NTeyPBFKaDgAHCwLv5twvpv',},
  {id:'plan-74KaBnAOAiMDJx6HK5rl',name:'Entrepreneur',type:'Monthly',value:'price_1Ndr32BFKaDgAHCw5xKyngcc',},
  {id:'plan-O149fUrEJB3jc0akzgs9',name:'Entrepreneur',type:'Annual',value:'price_1Ndr4lBFKaDgAHCw8WCP0i1G',},
  {id:'plan-n5IKx4Z2asK7sYHS3lrd',name:'Agency',type:'Monthly',value:'price_1Ndr7RBFKaDgAHCwdcMETILM',},
  {id:'plan-bCR5pF562mZCjrALoDTQ',name:'Agency',type:'Annual',value:'price_1Ndr8LBFKaDgAHCw7jph534I',},
  {id:'plan-xTn8SqarYE0eVIEaSdkM',name:'Beta',type:'Monthly',value:'price_1NgOpkBFKaDgAHCwesDitAQa'},
  {id:'plan-a47a5e100242ac120002',name:'Beta',type:'Annual',value:'price_1OMnJqBFKaDgAHCwXYEHUk41'},
];

paypalsubsrid:any='';
paypalsubsridyearly:any = '';

secret_route:string='8YvA7kPbR2mX3uHwS6JnQgZtF4cV5xWp-c2BnRw5OzY7Lx3XmJq9UgCpHm4KfP6iA-9EhPvFjK1sQr4TlWnXzR3uY6Dg2mC8bV';
specialuser=false;

ischeck = false;

isthischecked = false;

checkhidemypayid = true;

securepaypalpayment = false;

savepaypaldetails:any;

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
              private router: Router,
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

                  if(element.type=='Monthly'){
                    this.checkhidemypayid = true;
                  }else{
                    this.checkhidemypayid = false;
                  }


                  this.products.map((option:any)=>{
                    if(option?.name==this.productname)
                    {
                        console.log(option);
                        // console.log(option);
                        this.product=option;

                        this.paypalsubsrid = option?.type[0].paypalvalue;
                        this.paypalsubsridyearly = option?.type[1].paypalvalue;
                      }
                      
                      // paypal
                    
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
          // console.log(element);
          this.products.forEach((pr:any) => {
            if(pr.name==element.name){

              pr.type.forEach((nm:any) => {
                if(nm.name==mode){
                  // console.log(nm);
                  this.productid = nm.value;
                  // paypal

                  if(mode=='Monthly'){
                    this.checkhidemypayid = true;
                  }else{
                    this.checkhidemypayid = false;
                  }
                  
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

    this.loadPayPalScript().then(() => {
      // Render the PayPal button
      this.renderPayPalButton();
    });
    
  }

  loadPayPalScript(): Promise<void> {
    return new Promise<void>((resolve:any) => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id='+environment.paypalkey+'&vault=true&intent=subscription';
      script.onload = resolve;
      script.setAttribute('data-sdk-integration-source','button-factory');
      document.head.appendChild(script);
    });
  }

  renderPayPalButton(): void {
    paypal.Buttons({
      style: {
        shape: 'rect',
        color: 'gold',
        layout: 'horizontal',
        label: 'paypal'
    },
      createSubscription: (data:any, actions: { subscription: { create: (arg0: { plan_id: string; }) => any; }; }) => {
        return actions.subscription.create({
          plan_id: this.paypalsubsrid,
        });
      },
      onApprove: (data: any, actions: any) => {
        // console.log(data);
        if(data.subscriptionID){
          this.securepaypalpayment = true;
          this.savepaypaldetails = data;
        }
        // Handle onApprove logic
      },
      onCancel: (data: any, actions: any) => {
        // Handle onCancel logic
      },
      onError: (err: any) => {
        console.error(err);
        // Handle onError logic
      },
      onClick: (data: any, actions: any) => {
        // console.log("onClick", data, actions);
      }
    }).render('#paypal-button-container-monthly');

    paypal.Buttons({
      style: {
        shape: 'rect',
        color: 'gold',
        layout: 'horizontal',
        label: 'paypal'
    },
      createSubscription: (data:any, actions: { subscription: { create: (arg0: { plan_id: string; }) => any; }; }) => {
        return actions.subscription.create({
          plan_id: this.paypalsubsridyearly,
        });
      },
      onApprove: (data: any, actions: any) => {
        // console.log(data);
        if(data.subscriptionID){
          this.securepaypalpayment = true;
          this.savepaypaldetails = data;
        }
        // Handle onApprove logic
      },
      onCancel: (data: any, actions: any) => {
        // Handle onCancel logic
      },
      onError: (err: any) => {
        console.error(err);
        // Handle onError logic
      },
      onClick: (data: any, actions: any) => {
        // console.log("onClick", data, actions);
      }
    }).render('#paypal-button-container-yearly');
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
            // this._file.createuserfolder(data.uniqueid).subscribe(e=>{
            //   // console.log(e);
            // });
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

            if(this.securepaypalpayment){
              // for paypal only
              var emailhtml2 = `Hello `+firstname+`,<br>
              <br>
              Welcome on board! We're delighted to have you become a part of the Kea community. By selecting our Beta Plan, you've embarked on an exciting digital adventure with us.<br>
              <br>
              Our dedicated team has meticulously crafted a suite of offerings that resonates with modern businesses like yours. Brace yourself for a plethora of robust features that aim to redefine your digital prowess.<br>
              <br>
              Here's What You Can Expect with the [Plan Name]: (Note: Features listed are specific to the Beta Plan)</br>
              <br>
              <strong>Beta Plan - Key Features</strong><br>
              <br>
              <strong>Bespoke Website</strong><br>
              <br>
              Create a powerful online presence with a custom website tailored to your brand.<br>
              <br>
              <strong>Marketing Funnel</strong><br>
              <br>
              Efficiently capture and retain your audience with a high-performance marketing funnel.<br>
              <br>
              <strong>Contact Management</strong><br>
              <br>
              Seamlessly manage and engage with up to 10,000 contacts.<br>
              <br>
              <strong>Unlimited Product Listings</strong><br>
              <br>
              Showcase your diverse offerings with unlimited product listings.<br>
              <br>
              <strong>Customizable Pages</strong><br>
              <br>
              Fine-tune your branding with 10 fully customizable pages.<br>
              <br>
              <strong>Exclusive Domain</strong><br>
              <br>
              Establish your unique online identity with a personalized domain.<br>
              <br>
              <strong>Tailored Campaigns</strong><br>
              <br>
              Drive growth with 100 meticulously crafted marketing campaigns.<br>
              <br>
              <strong>Collaborative Access</strong><br>
              <br>
              Optimize your operations with access for one user.<br>
              <br>
              <strong>Advanced Analytics</strong><br>
              <br>
              Gain insights into user behavior with heatmap snapshots and advanced analytics tools.<br>
              <br>
              <strong>Zapier Integration</strong><br>
              <br>
              Maximize efficiency with seamless automation through our Zapier integration.<br>
              <br>
              <strong>Priority Support</strong><br>
              <br>
              Our ticket support system ensures you're always a priority, with assistance just a click away.<br>
              <br>
              <strong>Business Strategy Session</strong><br>
              <br>
              Benefit from a free 30-minute call with our business strategists to align your goals and actions.<br>
              <br>
              <strong>Funnel Strategist Session</strong><br>
              <br>
              Refine your conversion path with a free 30-minute call with our funnel experts.<br>
              <br>
              <strong>Here's What Awaits You:<strong>
              <br>
              <strong>Access to Premium Features:</strong><br>
              <br>
              Dive into a suite of tools and functionalities exclusive to the Beta Plan.<br>
              <br>    
              <strong>Expert Support</strong><br>
              <br>
              Our dedicated team is here to assist, guide, and answer any queries you might have.</br>
              <br>
              <strong>Regular Updates:</strong><br>
              <br>
              Stay ahead of the curve with consistent updates tailored to enhance your experience.<br>
              <br>
              Kick Off Your Journey:<br>
              <br>
              <strong>Login:</strong> Use your registered email and password to access your dashboard.<br>
              <strong>Explore:</strong> Familiarize yourself with the range of tools and features available.<br>
              <strong>Seek Assistance: Should you have any questions, visit our [Help Center] or reach out directly via <strong>support@keasolution.com.<br>
              <br>
              <strong>Exclusive Bonus: As a token of our appreciation, enjoy [Bonus Feature or Discount] for the first month of your subscription! (if any)<br>
              <br>
              At Kea, our goal is to ensure you have everything you need to succeed. Your success is our success, and we're here every step of the way.<br>
              <br>
              Happy exploring, and here's to new beginnings!<br>
              <br>
              Warm regards,<br>
              The Kea Team<br>`; 
              var maildata2 = {tomailid: email, frommailid: 'support@keasolution.com', subject: 'Welcome Aboard: Your Subscription Plan is Active!', html: emailhtml2};
              this.emailService.sendmail(maildata2).subscribe({
                next: data => {
                  // console.log(data);
                }
              });
              // for paypal only
            }

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
      if(data.success){
        resolve(data.success);
      }else{
        this._snackBar.open(data?.message,'OK',{duration:2000});
        this.spinner=false;
      } 
     
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
    var emailhtml = `New User Creation Successfully.
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

          if(this.securepaypalpayment){

              this.paymentstatus=true;
              this.form.customerid=this.savepaypaldetails?.orderID;
              this.form.subscriptionid= this.savepaypaldetails?.subscriptionID;
              this.form.cardid='paypal';
              this.form.productid=this.productid;
              this.form.registration_type='paid';
              this.form.type = 'paypal';
              this.onSubmit();

          }else{

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
                }else{
                  this.paymenterror=true;
                  this.spinner=false;
                  this.spinnerpayment = false;
                  this.paymentMessage=data?.error?.raw?.message;
                  // this._snackBar.open(data.message,'OK',{duration:200});
                }

              })
            });

          }


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

