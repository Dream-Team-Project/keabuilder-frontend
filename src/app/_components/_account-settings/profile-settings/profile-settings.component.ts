import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ImageService } from 'src/app/_services/image.service';
import { Location } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/_services/_builder/general.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]);
  firstnameFormControl = new FormControl('',[Validators.required]);
  lastnameFormControl = new FormControl('');
  companynameFormControl = new FormControl('');
  phoneFormControl = new FormControl('',[Validators.required]);

  imageFormControl=new FormControl('');

  profileobj:any = {firstname:'',lastname:'',email:'',phone:'',company:''};
  imagelogorequest = false;
  userimgpath = '';
  logoimg:any = '/assets/images/profile/avatar.png';
  selectfilenm = '';
  file = null;
  logoimgname = '';
  typeerror = '';

  constructor(public userService: UserService,
              public imageService: ImageService,
              private _general :GeneralService,
              private _auth: AuthService, 
              public _location: Location) { }

  ngOnInit(): void {
    this.getprofiledetails();
  }
  getprofiledetails(){
    this.userService.getUsersDetails().subscribe({
      next: data => {        
        this.profileobj.username = data?.data[0]?.username;
        this.profileobj.firstname = data?.data[0]?.firstname;
        this.profileobj.lastname = data?.data[0]?.lastname;
        this.profileobj.email = data?.data[0]?.email;
        this.profileobj.phone = data?.data[0]?.phone;
        this.profileobj.company = data?.data[0]?.company;
        if(data?.data[0]?.useravatar!='' && data?.data[0]?.useravatar!=null && data?.data[0]?.useravatar!=undefined){
          let avatarImg = '/assets/uploads/images/'+data?.data[0]?.useravatar;
          this.userimgpath = avatarImg;
          this.logoimg = avatarImg;
        }
        this.userService.user = {
          name: data?.data[0]?.firstname,
          email: data?.data[0]?.email
        }
      }
    });
  }

  updateprofile(){
    
    var obj = {
      data:this.profileobj,
      logo:this.logoimgname,
      checkimginput1: this.imagelogorequest,
      type:'profile'
    };
    this.userService.updateuserdetails(obj).subscribe({
      next: data => {  
        if(data?.success){
        var splnmlogo = data.genlogo.split('keaimage-');  
        var genobjlogo:any = {path:this.logoimg, name:splnmlogo[1]};

        if(this.logoimgname!=this.userimgpath && this.imagelogorequest == true ){
          this.imageService.onImageFilefaviconUpload(genobjlogo);
          this.imageService.timeStamp = (new Date()).getTime();
        }

        this.selectfilenm = '';
        this._general.openSnackBar(false,'Profile Updated Successfully!', 'OK','center','top');

      }
      else{
        this._general.openSnackBar(true,'Something went wrong!', 'OK','center','top');
      }
    }
   
    });
  }

  changeme (event:any) {
    var outsidethis:any = this;
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;

    var getname = (event.target.files[0].name);
    this.logoimgname = this.generatename(getname);

    this.selectfilenm = getname;
  
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

  // isEmailValid(value:any) {
  //   let regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  //   return regex.test(value);
  // }
 
}
