import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MembersService } from 'src/app/_services/_membership/members.service';
import { MemberTokenService } from 'src/app/_services/_membership/member-token.service';

@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.css']
})
export class MemberLoginComponent implements OnInit {

  emailFormControl = new FormControl('',[Validators.required,Validators.email]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);
  hide = true;
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
 
  bgImg = 'url(src/assets/images/login/login-bk1.jpg)';
  min = 1;
  max = 3;

  constructor(
    private memberService: MembersService, 
    private tokenmemberService: MemberTokenService, 
    private router: Router,
    private route: ActivatedRoute) { 
    }

  ngOnInit(): void {
    if (this.tokenmemberService.getmemberToken()) {
      this.isLoggedIn = true;
    }
    this.createNewImg();
  }

  onSubmit(): void {
    if(this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID'){
      const { email, password } = this.form;
      this.memberService.memberlogin(btoa(email), btoa(password)).subscribe({
        next: data => {
          if(data.success){
          this.tokenmemberService.savememberToken(data.uniqueid);
          var userdata = {
            uniqueid: data.uniqueid,
          }
          this.tokenmemberService.saveMember(userdata);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.redirectToDashboard();
        }
        else{
          this.errorMessage = data.message;
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
    this.router.navigate(['/member/dashboard'],{relativeTo: this.route});
  }

   createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
      this.bgImg = 'url(./assets/images/login/login-bk'+genNum+'.jpg)';
  }

}