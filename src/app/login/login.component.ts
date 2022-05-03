import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    email:null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  signheading = 'Sign In To Admin';
  signpara = 'Enter your details to login to your account:';
  errors = [];
  loginbox = true;
  registerbox = false;
  cssVars = 'url(./assets/images/login/login-bk1.jpg)';
  min = 1;
  max = 3;
  forforget = false;
  isSuccessful = false;
  isSignUpFailed = false;
  isActive= '';


  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.createNewImg();
  }

  onloginSubmit(): void {
    const { username, password } = this.form;
    
    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.redirectToDashboard();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });


  }

  onregisterSubmit(): void {
    const { username, email, password } = this.form;
    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  redirectToDashboard(): void {
    this.router.navigate(['/dashboard'],{relativeTo: this.route});
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
      this.cssVars = 'url(./assets/images/login/login-bk'+genNum+'.jpg)';
  }

  anchorsignin() {
    this.loginbox = true;
    this.registerbox = false;
    this.forforget = false;
    this.signheading = 'Sign In To Admin';
    this.signpara = 'Enter your details to login to your account:';
  }

  anchorsignup() {
      this.loginbox = false;
      this.registerbox = true;
      this.forforget = false;
      this.signheading = 'Sign Up To Admin';
      this.signpara = 'Enter your details to Register to your account:';
  }

}
