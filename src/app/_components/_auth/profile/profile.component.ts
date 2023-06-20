import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  checkuserState:any = false;
  profileobj:any = {username:'',firstname:'',lastname:'',email:'',phone:'',company:''};

  activem = 'profile';
  hideextrafeature = false;

  hideprofilenow = false;

  file = null;
  logoimgname = '';
  typeerror = '';
  imagelogorequest = false;
  userimgpath = '/assets/images/profile/avatar.png';
  logoimg:any = this.userimgpath;
  userchangeerror = false;
  emailchangeerror = false;

  chktoken = '';
  newpassword = '';

  incrtkn = false;
  incrpwdlng = false;
  selectfilenm = '';

  constructor(
              public userService: UserService,
              public imageService: ImageService,
              private _snackBar: MatSnackBar,
              private _auth: AuthService, 
              ) { }

  ngOnInit(): void {
    this.updateuserdetailsnow();
  }

  updateuserdetailsnow(){
    this.userService.getUsersDetails().subscribe({
      next: data => {        
        this.profileobj.username = data.data[0].username;
        this.profileobj.firstname = data.data[0].firstname;
        this.profileobj.lastname = data.data[0].lastname;
        this.profileobj.email = data.data[0].email;
        this.profileobj.phone = data.data[0].phone;
        this.profileobj.company = data.data[0].company;
        if(data.data[0].useravatar!='' && data.data[0].useravatar!=null && data.data[0].useravatar!=undefined){
          this.userimgpath = '/assets/uploads/images/'+data.data[0].useravatar;
        }
        this.userService.user = {
          name: data.data[0].firstname,
          email: data.data[0].email
        }
      }
    });
  }
  
  activeme(value: any){
      this.activem = value;
      console.log(this.activem);
  }

  changeme (event:any) {
    var outsidethis:any = this;
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;

    var getname = (event.target.files[0].name);
    this.logoimgname = this.generatename(getname);

    this.selectfilenm = getname;
    // console.log(this.logoimgname);

    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.typeerror = '';
      var fileReader = new FileReader();
      
      fileReader.readAsDataURL(this.file);
      fileReader.addEventListener("load", function (readerEvt:any) {
        outsidethis.logoimg = this.result;
      });    
      this.imagelogorequest = true;
    }else{
      this.logoimg = this.userimgpath;
      this.typeerror = 'File Type Not Allow';
      this.imagelogorequest = false;
    }

  }

  generatename(value:any){
    var extn = value.split(/[. ]+/).pop();
    var newvl = value.split('.'+extn)
    var setname = (newvl[0].toLowerCase()).replaceAll(" ","-");
    var unqueid = Math.random().toString(20).slice(2);
    return unqueid+'.'+extn;
    // return setname+'-'+unqueid+'.'+extn;
  }

  kbsavechange(){
    // console.log(this.activem);
    if(this.activem == 'profile'){

        var obj = {
          data:this.profileobj,
          logo:this.logoimgname,
          checkimginput1: this.imagelogorequest,
          type:'profile'
        };
        console.log(obj);
        this.userService.updateuserdetails(obj).subscribe({
          next: data => {  
            // console.log(data);
            // console.log(this.logoimg);
            var splnmlogo = data.genlogo.split('keaimage-');  
            var genobjlogo:any = {path:this.logoimg, name:splnmlogo[1]};

            if(this.logoimgname!=this.userimgpath && this.imagelogorequest == true ){
              this.imageService.onImageFileUpload(genobjlogo);
              this.imageService.timeStamp = (new Date()).getTime();
            }

            // console.log(data.result1[0]['count(*)']);
            if(data.result1[0]['count(*)']==1){
              this.userchangeerror = true;
            }else{
              this.userchangeerror = false;
            }

            if(data.result2[0]['count(*)']==1){
              this.emailchangeerror = true;
            }else{
              this.emailchangeerror = false;
            }

            this.selectfilenm = '';
            // this.updateuserdetailsnow();
            this._snackBar.open('Profile Updated Successfully!', 'OK');

          }
        });

    }else if(this.activem == 'changepassword'){

      if(this.chktoken!='' && this.newpassword!='' && this.incrpwdlng==false){
        
        this.incrpwdlng = false;
        this._auth.onupdatePassword(this.newpassword, this.chktoken).subscribe(resp=>{
          console.log(resp);

          if(resp[0]=='error'){
            this._snackBar.open('Invalid Token; please try again!', 'OK');
          }else{
            this._snackBar.open('Password Update Successfully!', 'OK');
            this.chktoken = '';
            this.newpassword = '';
          }
        });

      }else{

        if(this.incrpwdlng==true){
          this.incrpwdlng = true;
        }else{
          this._snackBar.open('Both fields are required!', 'OK');
        }

      }



    }

  }

  generatetoken(){

    this.userService.getUsersDetails().subscribe({
      next: data => {
       // console.log(data);
         var loctn:any = window.location.origin;
         var emailInp = data.data[0].email;
         var type = 'type2';
         this._auth.forgetPassword(emailInp, loctn,type).subscribe(resp=>{
           console.log(resp);
           this._snackBar.open(resp[1], 'OK');
         });

      }
    });
    
  }

  OnOpen(){
    (<HTMLInputElement>document.getElementById('fileElemlogo')).click();
  }

  validatepas(event:any){

    if(event.value.length<=6){
      this.incrpwdlng = true;
    }else{
      this.incrpwdlng = false;
    }

  }


}
