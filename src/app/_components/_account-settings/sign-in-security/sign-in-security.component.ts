import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MatDialog } from '@angular/material/dialog';
import {hashSync} from 'bcryptjs';

@Component({
  selector: 'app-sign-in-security',
  templateUrl: './sign-in-security.component.html',
  styleUrls: ['./sign-in-security.component.css']
})

export class SignInSecurityComponent implements OnInit {

  @ViewChild('passworddialog') passworddialog!: TemplateRef<any>;
  @ViewChild('usernamedialog') usernamedialog!: TemplateRef<any>;

  usernameFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);
  tokenFormControl = new FormControl('',[Validators.required]);
  confirmpasswordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);

  chktoken = '';
  newpassword = '';
  confirmpassword = '';
  username='';
  incrtkn = false;
  incrpwdlng = false;
  hide = true;
  error=false;
  errormessage='';
  tokenmail=false;

  constructor(public userService: UserService,
    private _general :GeneralService,
    private _auth: AuthService, 
    public _location: Location,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getprofiledetails();
  }

  getprofiledetails(){
    this.userService.getUsersDetails().subscribe({
      next: data => {    
        this.username = data?.data[0]?.username;
      }
      })
    }

  generatetoken(){

    this.userService.getUsersDetails().subscribe({
      next: data => {
      
         var loctn:any = window.location.origin;
         var emailInp = data.data[0].email;
         var type = 'type2';
         this._auth.forgetPassword(emailInp, loctn,type).subscribe(resp=>{
          //  console.log(resp);
          this.tokenmail=true;
           this._general.openSnackBar(false,resp[1], 'OK','center','top');
         });

      }
    });
    
  }

  validatepas(event:any){

    if(event.value.length<=6){
      this.incrpwdlng = true;
    }else{
      this.incrpwdlng = false;
    }

  }
  updatepassword(){
    if(this.newpassword == this.confirmpassword){
      if(this.chktoken!='' && this.newpassword!='' && this.incrpwdlng==false){
        this.incrpwdlng = false;
        // console.log(hashSync(this.newpassword, 8))
        this._auth.onupdatePassword(hashSync(this.newpassword, 8), this.chktoken).subscribe(resp=>{
          if(resp[0]=='error'){
          this.error=true;
          this.errormessage='Invalid Token; please try again!';
            // this._general.openSnackBar(true,'Invalid Token; please try again!', 'OK','center','top');
          }else{
            this.dialog.closeAll();
            this._general.openSnackBar(false,'Password Update Successfully!', 'OK','center','top');
            this.chktoken = '';
            this.newpassword = '';
            this.confirmpassword = '';
            this.error=false;
          this.errormessage='';
          }
        });

      }else{
        if(this.incrpwdlng==true){
          this.incrpwdlng = true;
        }else{
          this.error=true;
          this.errormessage='Both fields are required !';
          this.dialog.open(this.passworddialog);
          // this._general.openSnackBar(false,'Both fields are required !', 'OK','center','top');
        }
      }
    }
    else{
      this.error=true;
      this.errormessage='Password not matched'
      this.dialog.open(this.passworddialog);
      // this._general.openSnackBar(false,'Password not matched', 'OK','center','top');
    }
  }
  updateusername(){
    var obj = {
      username:this.username,
      type:'updateusername'
    };
    this.userService.updateuserdetails(obj).subscribe((data:any)=>{
      if(data.success){
        this.dialog.closeAll();
        this._general.openSnackBar(false,'Username Updated Successfully','Ok','center','top');
        this.error=false;
        this.errormessage='';
      }
      else{
        this.error=true;
        this.errormessage=data?.message;
        this.dialog.open(this.usernamedialog);
      }
    })
    
  }
  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef) .afterClosed().subscribe((resp:any) => {
      this.tokenmail=false;
    //  this.stripeaddress=null;
  })
}
removespecialchar(data:any){
  // console.log(data);
  var datagen = data.replace(/[^a-zA-Z0-9]/g, "");
  return datagen;
}

}

  