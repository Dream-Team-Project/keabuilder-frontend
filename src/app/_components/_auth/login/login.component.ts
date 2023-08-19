import { Component, OnInit } from '@angular/core';
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

  bgImg = 'url(src/assets/images/login/login-bk1.jpg)';
  min = 1;
  max = 3;

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private router: Router,
    private route: ActivatedRoute) { 
    }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.createNewImg();
  }

  onSubmit(): void {

    const { username, password } = this.form;
    if(this.userFormControl.status=='VALID' && this.passwordFormControl.status=='VALID'){
      this.authService.login(btoa(username), btoa(password)).subscribe({
        next: data => {
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
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }

  }

  redirectToDashboard(): void {
    window.location.href = '/';
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
      this.bgImg = 'url(./assets/images/login/login-bk'+genNum+'.jpg)';
  }


}
