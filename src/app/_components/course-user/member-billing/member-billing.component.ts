import { Component, OnInit } from '@angular/core';
import { MemberTokenService } from 'src/app/_services/_membership/member-token.service';
import { MembersService } from 'src/app/_services/_membership/members.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-member-billing',
  templateUrl: './member-billing.component.html',
  styleUrls: ['./member-billing.component.css']
})
export class MemberBillingComponent implements OnInit {

  
  active:any='active';
  active1:any='active1';
  active2:any='active2';
  course:any;
  user_id:any='';
  admin=false;
  registrationtype:any='';
  fetching=false;
  memberobj:any={firstname:'',email:'',admin:false};
  constructor( public memberService: MembersService,public _membertokenService : MemberTokenService, public _image: ImageService,) { 
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
      // console.log(this.memberobj)
    }
    })
  }

  Gotohref(url :any,active:any){
    if(active == 'active') this.active= 'active';
    if(active == 'active1') this.active1= 'active';
    if(active == 'active2') this.active2= 'active';
    window.open(url,'_self');
  }
}
