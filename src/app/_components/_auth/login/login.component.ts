import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

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
  bgImg:string = '';
  fadeImg:boolean = false;
  bgIntervalTime:number = 5000; 

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private router: Router,
    private route: ActivatedRoute) { 
      let num:any = window.localStorage.getItem('login_img');
      this.bgImg = this.generateImgLink(num ? parseInt(num) : 1);
      this.fetchLoginImg();
    }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.isLoginFailed = false;
    this.errorMessage='';
    const { username, password } = this.form;
    if(this.userFormControl.status=='VALID' && this.passwordFormControl.status=='VALID'){
      this.authService.login(btoa(username), btoa(password)).subscribe({
        next: data => {
          if(data.success) {
          this.tokenStorage.saveToken(data.accessToken);
          var userdata = {
            uniqueid: data.uniqueid,
          }
          this.tokenStorage.saveUser(userdata);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
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
      this.bgImg = this.generateImgLink(randomNumber);
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

}
