import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import { WistiaService } from '../_services/wistia.service';
import { FileUploadService } from '../_services/file-upload.service';
import { EmailService } from '../_services/mailer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20) ]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);
  firstnameFormControl = new FormControl('',[Validators.required]);
  subdomainFormControl = new FormControl('',[Validators.required]);
  lastnameFormControl = new FormControl('');
  companynameFormControl = new FormControl('');
  phoneFormControl = new FormControl('');
  

  hide = true;

  form: any = {
    username: null,
    firstname:null,
    lastname:'',
    company:'',
    email: null,
    phone:'',
    password: null,
    subdomain:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  min = 1;
  max = 3;
  bgImg = 'url(./assets/images/login/login-bk1.jpg)';

  changestep = true;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private _file: FileUploadService,
              private _wistia: WistiaService,
              private emailService: EmailService) { }

  ngOnInit(): void {
    this.createNewImg();
  }

  onSubmit(): void {
console.log('inside');
    const { username,firstname,lastname,company, email,phone, password,subdomain } = this.form;
    if(this.userFormControl.status=='VALID' && this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID' && this.firstnameFormControl.status=='VALID' && this.subdomainFormControl.status=='VALID'){

        this.authService.register(username,firstname,lastname,company, email,phone, password,subdomain).subscribe({
          next: data => {
            console.log(data);
            this._file.createdefaulthome(data.uniqueid).subscribe(e=>{
              // console.log(e);
            });
            var domainpath = window.location.hostname;
            var emailhtml = `Dear `+firstname+`,<br>
            <br>
            Thank you for choosing KEA Solutions. We are very excited to have you with us!<br>
            <br>
            Your account for domain `+subdomain+`.keapages.com has been confirmed and set up.<br>
            <br>
            Your new KEA builder includes 2 FREE hours of BONUS Launch Assist [activated from 1st of November] redeemable through our KEA building Team! You can use it for free website/funnel transfers, consulting about advanced business strategy, custom solutions for any other 3rd party platform, and digital marketing services.<br> 
            <br>
            Please email <strong>support@keasolution.com</strong> in case you need any clarity or suggestions.<br>
            <br>
            Your data will be safe and secure even after KEA builder's first launch on the 1st of November 2022, so play around and enjoy the builder.<br>
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
                // console.log(data);
              }
            });

            // var maildata = {tomailid: email, frommailid: 'keabuilder@gmail.com', subject: 'Welcome To Kea', html: emailhtml};
            // this.emailService.sendmail(maildata).subscribe({
            //   next: data => {
            //     // console.log(data);
            //   }
            // });
            
            
            var subdomain = data.subdomain;
            // window.location.href='https://keahosted.com/create_subdomain.php?subdomain='+subdomain;

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
            this.redirectToDashboard();

            
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });

    }

    if(this.userFormControl.status!='VALID' || this.emailFormControl.status!='VALID' || this.firstnameFormControl.status!='VALID'){
      this.changestep = true;
    }

  }

  onupdateusername(event:any){
    this.form.subdomain = event.target.value;
  }

  redirectToDashboard(): void {
    this.router.navigate(['/'],{relativeTo: this.route});
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
    this.bgImg = 'url(./assets/images/login/login-bk'+genNum+'.jpg)';
  }

  fillnext(){
    this.changestep = !this.changestep;
  }


}
