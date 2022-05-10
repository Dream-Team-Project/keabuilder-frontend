import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

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
    if(this.emailInp!=''){
      this._auth.forgetPassword(this.emailInp).subscribe(resp=>{
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
    if(this.passwInp!=''){
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
