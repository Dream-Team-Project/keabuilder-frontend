import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { AutomationGeneralService } from 'src/app/_services/_crm/automation-general.service';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { LessonService } from 'src/app/_services/_membership/lesson.service';
import { MemberTokenService } from 'src/app/_services/_membership/member-token.service';
import { MembersService } from 'src/app/_services/_membership/members.service';
import { ModuleService } from 'src/app/_services/_membership/module.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ImageService } from 'src/app/_services/image.service';


@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

 
userimgpath = '/assets/images/profile/avatar.png';
progress: number = 1;
course_navigation:string  = 'description'
searching=false;
course:any = {};
module:any = {};
lesson:any = {};
user_id:any;
  admin=false;
constructor(private router: Router,
  private route: ActivatedRoute,
  public memberService: MembersService,
  public _membertokenService : MemberTokenService,  
  public _file: FileUploadService,
  public _image: ImageService,
  public _general: GeneralService,
  public automationService :AutomationGeneralService,) { 
  route.paramMap.subscribe((params: ParamMap) => {
    var tab = params.get('tab');
    // this.selTab = tab ? tab : 0;
    // this.course.user_id = params.get('user_id');
    this.course.uniqueid = params.get('course_id');
    // this.lesson.uniqueid = params.get('lesson_id');
    this.fetchCourse();
    
  });
  this.user_id = this._membertokenService.getMember().uniqueid;
    this.admin = this._membertokenService.getMember().admin;
}

  ngOnInit(): void {
    this.getmemberdetails();
  }
  getmemberdetails(){
    let obj={user_id: this.user_id, admin:this.admin};
    this.memberService.getActiveUser(obj).subscribe((data)=>{
    if(data.success){
      // console.log(data)
      if(data?.user[0]?.memberavatar!='' && data?.user[0]?.memberavatar!=null && data?.user[0]?.memberavatar!=undefined){
        let avatarImg = '/assets/uploads/images/'+data?.user[0]?.memberavatar;
        this.userimgpath = avatarImg;
      }
    }
    })
  }

  fetchCourse() {
    this.searching=true;
    let obj={course_id : this.course.uniqueid}
      this.memberService.getsinglecourse(obj).subscribe((resp:any)=>{
        if(resp.success) {
          // console.log(resp.data[0])
          this.course=resp.data[0]
        this.searching=false;
        }
      })
  }
  Gotohref(url :any){
    window.open(url,'_self');
  }
}
