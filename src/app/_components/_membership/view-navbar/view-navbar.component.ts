import { Component, OnInit } from '@angular/core';
import { MemberTokenService } from 'src/app/_services/_membership/member-token.service';
import { MembersService } from 'src/app/_services/_membership/members.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-view-navbar',
  templateUrl: './view-navbar.component.html',
  styleUrls: ['./view-navbar.component.css']
})
export class ViewNavbarComponent implements OnInit {

  userimgpath = '/assets/images/profile/avatar.png';
  isDropdown = false;
  isMenuOpen = false;
  scrollPosition:any = null;
  user_id:any='';
  admin=false;
  memberobj:any={firstname:'',email:'',admin:false};
  constructor( public memberService: MembersService,public _membertokenService : MemberTokenService, public _image: ImageService,) { 
    this.user_id = this._membertokenService.getMember().uniqueid;
    this.admin = this._membertokenService.getMember().admin;
    //  console.log(this._membertokenService.getMember())
  }

 
  ngOnInit(): void {
    var th:any = this;
    window.addEventListener('scroll', function(){
      th.scrollPosition = window.scrollY;
    });
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
      if(data?.user[0]?.memberavatar!='' && data?.user[0]?.memberavatar!=null && data?.user[0]?.memberavatar!=undefined){
        let avatarImg = '/assets/uploads/images/'+data?.user[0]?.memberavatar;
        this.userimgpath = avatarImg;
      }
    }
    })
  }

  logout(): void {
    this._membertokenService.membersignOut();
    window.open('https://'+this.memberService.memberobj.domain+'/member/login','_self')
  }
  Gotohref(url :any){
    window.open(url,'_self');
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
