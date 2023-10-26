import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MemberTokenService } from 'src/app/_services/_membership/member-token.service';
import { MembersService } from 'src/app/_services/_membership/members.service';
import { ImageService } from 'src/app/_services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {hashSync} from 'bcryptjs';

@Component({
  selector: 'app-member-sign-in-security',
  templateUrl: './member-sign-in-security.component.html',
  styleUrls: ['./member-sign-in-security.component.css']
})
export class MemberSignInSecurityComponent implements OnInit {


   
  @ViewChild('passworddialog') passworddialog!: TemplateRef<any>;

  active:any='active';
  active1:any='active1';
  active2:any='active2';

  user_id:any='';
  admin=false;
  memberobj:any={firstname:'',email:'',admin:false};

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
  contactid:any;
  constructor( public memberService: MembersService,
    public _membertokenService : MemberTokenService, 
    public _image: ImageService,
    // public _location: Location,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,) { 
    this.user_id = this._membertokenService.getMember().uniqueid;
    this.admin = this._membertokenService.getMember().admin;
    //  console.log(this._membertokenService.getMember())
  }


  ngOnInit(): void {
    this.getmemberdetails();
  }
  getmemberdetails(){
    let obj={user_id: this.user_id, admin:this.admin};
    this.memberService.getActiveUser(obj).subscribe((data)=>{
    if(data.success){
      this.memberobj.firstname=data.data[0]?.firstname;
      this.memberobj.email=data.data[0]?.email;
      this.memberobj.admin=data.data[0]?.admin;
      this.memberService.memberobj=data.data[0];
      this.contactid=data.data[0]?.uniqueid;
      this.username=data.data[0]?.email;
      // console.log(this.memberobj)
    }
    })
  }

  generatetoken(){

    // this.userService.getUsersDetails().subscribe({
    //   next: data => {
      
    //      var loctn:any = window.location.origin;
    //      var emailInp = data.data[0].email;
    //      var type = 'type2';
    //      this._auth.forgetPassword(emailInp, loctn,type).subscribe(resp=>{
    //       //  console.log(resp);
    //        this._general.openSnackBar(false,resp[1], 'OK','center','top');
    //      });

    //   }
    // });
    
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
        // this._auth.onupdatePassword(hashSync(this.newpassword, 8), this.chktoken).subscribe(resp=>{
        //   if(resp[0]=='error'){
        //   this.error=true;
        //   this.errormessage='Invalid Token; please try again!';
        //     // this._general.openSnackBar(true,'Invalid Token; please try again!', 'OK','center','top');
        //   }else{
        //     this.dialog.closeAll();
        //     this._snackBar.open('Password Update Successfully!', 'OK');
        //     this.chktoken = '';
        //     this.newpassword = '';
        //     this.confirmpassword = '';
        //     this.error=false;
        //   this.errormessage='';
        //   }
        // });

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
 
  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
 //    .afterClosed().subscribe((resp:any) => {
 //     this.stripeaddress=null;
 //  })
}
removespecialchar(data:any){
  // console.log(data);
  var datagen = data.replace(/[^a-zA-Z0-9]/g, "");
  return datagen;
}

  Gotohref(url :any,active:any){
    if(active == 'active') this.active= 'active';
    if(active == 'active1') this.active1= 'active';
    if(active == 'active2') this.active2= 'active';
    window.open(url,'_self');
  }
}
