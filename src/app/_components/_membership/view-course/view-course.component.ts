import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { AutomationGeneralService } from 'src/app/_services/_crm/automation-general.service';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { LessonService } from 'src/app/_services/_membership/lesson.service';
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

 
user: string  = 'Kunal Sharma';
progress: number = 1;
course_navigation:string  = 'description'
searching=false;
course:any = {};
module:any = {};
lesson:any = {};

constructor(private router: Router,
  private route: ActivatedRoute,
  private memberService: MembersService, 
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
    
  })
}

  ngOnInit(): void {
  }
  fetchCourse() {
    this.searching=true;
    let obj={course_id : this.course.uniqueid}
      this.memberService.getsinglecourse(obj).subscribe((resp:any)=>{
        if(resp.success) {
          console.log(resp.data[0])
          this.course=resp.data[0]
        this.searching=false;
        }
      })
  
  }
}
