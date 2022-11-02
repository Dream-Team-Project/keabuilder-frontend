import { Component, OnInit } from '@angular/core';
import { ConnectableObservable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { ImageService } from '../_services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  defaultimgpath = '/assets/images/profile/avatar.png';
  logoimg:any = this.defaultimgpath;
  timeStamp = (new Date()).getTime();

  constructor(private token: TokenStorageService,
              private userService: UserService,
              private imageService: ImageService,
              private _snackBar: MatSnackBar,
              ) { }

  ngOnInit(): void {
    // this.currentUser = this.token.getUser();

    this.updateuserdetailsnow();

  }

  updateuserdetailsnow(){
    this.userService.getUsersDetails().subscribe({
      next: data => {
        console.log(data);
        
        this.profileobj.username = data.data[0].username;
        this.profileobj.firstname = data.data[0].firstname;
        this.profileobj.lastname = data.data[0].lastname;
        this.profileobj.email = data.data[0].email;
        this.profileobj.phone = data.data[0].phone;
        this.profileobj.company = data.data[0].company;
        if(data.data[0].useravatar!='' && data.data[0].useravatar!=null && data.data[0].useravatar!=undefined){
          this.defaultimgpath = '/assets/uploads/images/'+data.data[0].useravatar;
        }

      }
    });
  }

  getImgPath(thumbnail:string) {
    var path = thumbnail;
      if(this.timeStamp) {
        return path + '?' + this.timeStamp;
      }
      return path;
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
      this.logoimg = this.defaultimgpath;
      this.typeerror = 'File Type Not Allow';
      this.imagelogorequest = false;
    }

  }

  generatename(value:any){
    var extn = value.split(/[. ]+/).pop();
    var newvl = value.split('.'+extn)
    var setname = (newvl[0].toLowerCase()).replaceAll(" ","-");
    var unqueid = Math.random().toString(20).slice(2);
    return setname+'-'+unqueid+'.'+extn;
  }

  kbsavechange(){
    console.log(this.profileobj);

    var obj = {
      data:this.profileobj,
      logo:this.logoimgname,
      checkimginput1: this.imagelogorequest,
    };

    this.userService.updateuserdetails(obj).subscribe({
      next: data => {  
        console.log(data);

        var splnmlogo = data.genlogo.split('keaimage-');  
        var genobjlogo:any = {path:this.logoimg, name:splnmlogo[1]};
        if(this.logoimgname!=this.defaultimgpath && this.imagelogorequest == true ){
          this.imageService.onImageFileUpload(genobjlogo);
          this.timeStamp = (new Date()).getTime();
        }

        this.updateuserdetailsnow();

        this._snackBar.open('Profile Updated Successfully!', 'OK');


      }
    });

  }


}
