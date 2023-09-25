import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.css']
})

export class LoginNewComponent implements OnInit {

  @ViewChild('bgLoginImg') bgLoginImg: any;

  product:any='plan-xTn8SqarYE0eVIEaSdkM';
  userFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20) ]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);
  hide = true;
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  fadeImg:boolean = false;
  bgIntervalTime:number = 5000; 
  bgImg:any='url(./assets/images/login/sidepannel.png)';
  bkImg:any = 'url(./assets/images/login/bklogin.jpg)';

  clientid = environment.signingooglekey;
  
  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private router: Router,
    private route: ActivatedRoute,private ngZone: NgZone) { 
      let num:any = window.localStorage.getItem('login_img');
      // this.bgImg = this.generateImgLink(num ? parseInt(num) : 1);
      this.fetchLoginImg();
    }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.googleAuthSDK();

  }
  
  onSubmit(): void {
    this.isLoginFailed = false;
    this.errorMessage='';
    const { username, password } = this.form;
    if(this.userFormControl.status=='VALID' && this.passwordFormControl.status=='VALID'){
      this.authService.login(btoa(username), btoa(password)).subscribe({
        next: data => {
          if(data.success){
          this.tokenStorage.saveToken(data.accessToken);
          var userdata = {
            uniqueid: data.uniqueid,
          }
          this.tokenStorage.saveUser(userdata);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;

          var loginobj:any = {isloggedIn:true, course_assign:'all', username:'admin'};
          localStorage.setItem("kbcourselogin", btoa(JSON.stringify(loginobj)));

          this.redirectToDashboard();
        } else{
          this.errorMessage = data?.error?.message;
          this.isLoginFailed = true;
        
      }
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }

  }

  redirectToDashboard(): void {
    window.location.href = '/';
  }

  generateImgLink(num:number) {
    return 'url(./assets/images/login/'+num+'.jpg)';
  }

  fetchLoginImg(){
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 9) + 1;
      // this.bgImg = this.generateImgLink(randomNumber);
      this.fadeOutImg();
      window.localStorage.setItem('login_img', randomNumber.toString());
    }, this.bgIntervalTime);
  }

  fadeOutImg() {
    this.fadeImg = true;
    setTimeout(()=>{
        this.fadeImg = false;
    }, this.bgIntervalTime - 2000);
  }

  handleSignInCallback(response: any) {
    // console.log('Credential response:', response);

    let responsePayload = this.decodeJwtResponse(response.credential);

    // console.log("ID: " + responsePayload.sub);
    // console.log('Full Name: ' + responsePayload.name);
    // console.log('Given Name: ' + responsePayload.given_name);
    // console.log('Family Name: ' + responsePayload.family_name);
    // console.log("Image URL: " + responsePayload.picture);
    // console.log("Email: " + responsePayload.email);
    var resemail = responsePayload.email;
    if(resemail!=''){

      this.authService.googlelogin(resemail).subscribe({
        next: data => {
          console.log(data);
          this.tokenStorage.saveToken(data.accessToken);
          var userdata = {
            uniqueid: data.uniqueid,
          }
          this.tokenStorage.saveUser(userdata);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;

          var loginobj:any = {isloggedIn:true, course_assign:'all', username:'admin'};
          localStorage.setItem("kbcourselogin", btoa(JSON.stringify(loginobj)));

          this.redirectToDashboard();
        },
        error: err => {
          // console.log(err);
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });


    }

  }

  decodeJwtResponse(token:any) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
}

  googleAuthSDK() {

    (window as any).handleCredentialResponse = (response:any) => {
      this.ngZone.run(() => {
        this.handleSignInCallback(response);
      });
    };
     
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); 
      js.id = id;
      js.src = "https://accounts.google.com/gsi/client";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
   
  }

}

declare global {
  interface Window {
    handleCredentialResponse: (response: any) => void;
  }
}