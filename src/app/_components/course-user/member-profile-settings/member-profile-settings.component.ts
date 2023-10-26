import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberTokenService } from 'src/app/_services/_membership/member-token.service';
import { MembersService } from 'src/app/_services/_membership/members.service';
import { ImageService } from 'src/app/_services/image.service';


@Component({
  selector: 'app-member-profile-settings',
  templateUrl: './member-profile-settings.component.html',
  styleUrls: ['./member-profile-settings.component.css']
})
export class MemberProfileSettingsComponent implements OnInit {

  active:any='active';
  active1:any='active1';
  active2:any='active2';
  user_id:any='';
  admin=false;
  memberobj:any={firstname:'',email:'',admin:false};
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email,Validators.pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)]);
  firstnameFormControl = new FormControl('',[Validators.required]);
  lastnameFormControl = new FormControl('');
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
  contactid:any='';

  constructor( public memberService: MembersService,
    public _membertokenService : MemberTokenService, 
    public _image: ImageService,
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
      this.profileobj.firstname=data.data[0]?.firstname;
      this.profileobj.lastname=data.data[0]?.lastname;
      this.profileobj.email=data.data[0]?.email;
      this.profileobj.phone=data.data[0]?.phone;
      this.contactid=data.data[0]?.uniqueid;
      // console.log(data)
      if(data?.user[0]?.memberavatar!='' && data?.user[0]?.memberavatar!=null && data?.user[0]?.memberavatar!=undefined){
        let avatarImg = '/assets/uploads/images/'+data?.user[0]?.memberavatar;
        this.userimgpath = avatarImg;
        this.logoimg = avatarImg;
      }
    }
    })
  }

  updateprofile(){
    
    var obj = {
      data:this.profileobj,
      logo:'keaimage-'+this.logoimgname,
      checkimginput1: this.imagelogorequest,
      type:'memberprofile',
      user_id:this.user_id,
      admin:this.admin,
      contactid:this.contactid,
    };
    this.memberService.updateActiveUser(obj).subscribe({
      next: data => {  
        if(data?.success){
        var splnmlogo = data.genlogo.split('keaimage-');  
        var genobjlogo:any = {path:this.logoimg, name:splnmlogo[1]};

        if(this.logoimgname!=this.userimgpath && this.imagelogorequest == true ){
          this._image.onImageFilefaviconUpload(genobjlogo);
          this._image.timeStamp = (new Date()).getTime();
        }

        this.selectfilenm = '';
        this._snackBar.open('Profile Updated Successfully!', 'OK');

      }
      else{
        this._snackBar.open('Something went wrong!', 'OK');
      }
    }
   
    });
  }

  changeme (event:any) {
    var outsidethis:any = this;
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;

    var getname = (event.target.files[0].name);
    this.logoimgname =this.generatename(getname);

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

  Gotohref(url :any,active:any){
    if(active == 'active') this.active= 'active';
    if(active == 'active1') this.active1= 'active';
    if(active == 'active2') this.active2= 'active';
    window.open(url,'_self');
  }
}
