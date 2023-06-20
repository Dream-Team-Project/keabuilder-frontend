import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/_services//auth.service';
import { WistiaService } from 'src/app/_services//wistia.service';
import { FileUploadService } from 'src/app/_services//file-upload.service';
import { EmailService } from 'src/app/_services//mailer.service';
import { GeneralService } from 'src/app/_services//_builder/general.service';

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
  // subdomainFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
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
    // subdomain:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  min = 1;
  max = 3;
  bgImg = 'url(./assets/images/login/login-bk1.jpg)';

  changestep = true;

  constructor(private authService: AuthService,
              public _general: GeneralService,
              private router: Router,
              private route: ActivatedRoute,
              private _file: FileUploadService,
              private _wistia: WistiaService,
              private emailService: EmailService,
              private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.createNewImg();
  }

  onSubmit(): void {
    const { username,firstname,lastname,company, email,phone, password } = this.form;
    if(this.userFormControl.status=='VALID' && this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID' && this.firstnameFormControl.status=='VALID'){

      // var nwsubdomain:any = subdomain.toLowerCase();
      // var notusesub = ['app','test','developer','admin','kea','keabuilder','keapages','user']

        // if(this.searchStringInArray(nwsubdomain,notusesub)==1){
        this.authService.register(username,firstname,lastname,company, email,phone, password).subscribe({
          next: data => {
            // console.log(data);
            this._file.createuserfolder(data.uniqueid).subscribe(e=>{
              console.log(e);
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
                // console.log(data);
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

            var uniqueid = data.uniqueid;
            var datasubmittion = [username,firstname,lastname,email,company,phone,uniqueid];

            this._snackBar.open('Sign Up Successfully!', 'OK');
            this.redirectToDashboard();
            this.email_creationuser(datasubmittion);
            
        },
          error: err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          }
        });

      // }else{
      //   this._snackBar.open("Subdomain is in use, please use another name!", 'OK');
      // }


    }

    if(this.userFormControl.status!='VALID' || this.emailFormControl.status!='VALID' || this.firstnameFormControl.status!='VALID'){
      this.changestep = true;
    }

  }

  searchStringInArray(str:any, strArray:any) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return 0;
    }
    return 1;
``}

  email_creationsubdomain(data:any){
    var emailhtml = `Error while creation subdomain.
    <br>
    UserId: `+data[7]+`<br>
    Username: `+data[0]+`<br>
    Email: `+data[3]+`<br>
    <br>`;
    var maildata = {tomailid: 'support@keasolution.com', frommailid: 'support@keasolution.com', subject: 'Subdomain Creation Error!', html: emailhtml};
    this.emailService.sendmail(maildata).subscribe({
      next: data => {
        // console.log(data);
      }
    });
  }

  email_creationuser(data:any){
    var emailhtml = `New User Sign Creation Successfully.
    <br>
    UserId: `+data[7]+`<br>
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
