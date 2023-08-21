import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);
  hide = true;


  emailInp = '';
  passwInp = '';
  forgetFirst = true;
  forgetSecond = false;
  chktoken = '';
  submitError = '';
  submitShow = false;

  constructor(
              private _auth: AuthService, 
              private route: ActivatedRoute,  
              private router: Router
            ) { 

    this.route.queryParams
      .subscribe(params => {
        this.chktoken = params['token'];
        if(this.chktoken!=undefined){
          this.forgetFirst = false;
          this.forgetSecond = true;
        }
      }
    );

  }

  min = 1;
  max = 3;
  bgImg = 'url(./assets/images/login/login-bk1.jpg)';

  ngOnInit(): void {
    this.createNewImg();
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
      this.bgImg = 'url(./assets/images/login/login-bk'+genNum+'.jpg)';
  }

  onSubmit() {
    // console.log(this.emailInp);
    if(this.emailFormControl.status=='VALID'){
    // if(this.emailInp!=''){
      var loctn:any = window.location.origin;
      var type = 'type1';

      // console.log(loctn);
      this._auth.forgetPassword(this.emailInp, loctn, type).subscribe(resp=>{
        this.submitShow = true;
        this.submitError = resp[1];

        setTimeout(() => {
          this.submitShow = false;
        }, 3000);
        // console.log(resp);
      });
    }
  }

  onupdatePassword(){
    if(this.passwordFormControl.status=='VALID'){
    
    // if(this.passwInp!=''){
      this._auth.onupdatePassword(this.passwInp, this.chktoken).subscribe(resp=>{
        this.submitShow = true;
        this.submitError = resp[1];

        setTimeout(() => {
          if(resp[0]!='error'){
              this.router.navigate(['/login'],{relativeTo: this.route});
          }
          this.submitShow = false;
        }, 3000);

        // console.log(resp);
      });
    }
  }

}
