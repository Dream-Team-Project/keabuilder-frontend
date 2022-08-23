import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { ModuleService } from 'src/app/_services/_membership/module.service';

@Component({
  selector: 'app-course-user-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CourseUserCoursesComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _course: CourseService,
    private _module: ModuleService,) { }

    moduledatas:any = [];
    coursename:any = '';
    courseid:any = '';

  ngOnInit(): void {
    this.coursename = this.route.snapshot.paramMap.get('name');
    this._course.singlebyurl(this.coursename).subscribe((res:any)=>{
      // console.log(res);
      if(res.data.length!=0){

        res.data.forEach((element:any) => {
            // console.log(element);
            this.courseid = element.uniqueid;
            this._module.bycourseid(element.uniqueid).subscribe((res2:any)=>{
              // console.log(res2);
              if(res2.data.length!=0){
                res2.data.forEach((element2:any) => {
                  this.moduledatas.push(element2);
                });
              }else{
                console.log('module not found');
              }

              console.log(this.moduledatas);
            }); 

        });

      }else{
        console.log('not found');
      }

    }); 
    
  }


}
