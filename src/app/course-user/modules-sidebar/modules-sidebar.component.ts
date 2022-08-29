import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { ModuleService } from 'src/app/_services/_membership/module.service';
import { LessonService } from 'src/app/_services/_membership/lesson.service';
import { CourseService } from 'src/app/_services/_membership/course.service';

@Component({
  selector: 'app-course-user-modules-sidebar',
  templateUrl: './modules-sidebar.component.html',
  styleUrls: ['./modules-sidebar.component.css']
})
export class CourseUserModulesSidebarComponent implements OnInit {

  constructor(private _module: ModuleService,
              private route: ActivatedRoute,
              private _lesson: LessonService,
              private _course: CourseService) { }

  coursename:any = '';  
  courseid:any = '';  
  course_modules:any = [];
  course_lessons:any = [];

  ngOnInit(): void {
    
    this.coursename = this.route.snapshot.paramMap.get('name');
    this.courseid = this.route.snapshot.paramMap.get('id');

    this._course.singlebyurl(this.coursename).subscribe((res1:any)=>{

      this._module.bycourseid(res1.data[0].uniqueid).subscribe((res:any)=>{

        // console.log(res);

        this.course_modules = res.data;
        
        this._lesson.bycourseid(res1.data[0].uniqueid).subscribe((res2:any)=>{
          
          this.course_lessons = res2.data;
            // console.log(res2)
            // console.log(this.course_lessons);
        });

        // console.log(this.course_modules);

      });

    });

  }




}
