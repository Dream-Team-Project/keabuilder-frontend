import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import {FormControl, Validators} from '@angular/forms';
import { WistiaService } from '../_services/wistia.service';
import { FileUploadService } from '../_services/file-upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20) ]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);

  hide = true;

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  min = 1;
  max = 3;
  bgImg = 'url(./assets/images/login/login-bk1.jpg)';

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private _file: FileUploadService,
              private _wistia: WistiaService) { }

  ngOnInit(): void {
    this.createNewImg();
  }

  onSubmit(): void {
    const { username, email, password } = this.form;
    if(this.userFormControl.status=='VALID' && this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID'){
        this.authService.register(username, email, password).subscribe({
          next: data => {
            console.log(data);
            this._file.createdefaulthome(data.uniqueid).subscribe(e=>{
              console.log(e);
            })
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
  }

  redirectToDashboard(): void {
    this.router.navigate(['/'],{relativeTo: this.route});
  }

  createNewImg(){
    var genNum = Math.floor(Math.random()*(this.max-this.min+1)+this.min);
    this.bgImg = 'url(./assets/images/login/login-bk'+genNum+'.jpg)';
  }


}
