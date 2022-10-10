import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { Router, ParamMap, ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-course-user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CourseUserDashboardComponent implements OnInit {

  constructor(private _course: CourseService,
              private router: Router,
              private route: ActivatedRoute,) { }

  allcourses:any = [];
  userselectedcourse:any = [];
  nocoursefound = '';

  ngOnInit(): void {

    var courselogincheck:any = localStorage.getItem("kbcourselogin");
    if(courselogincheck==null){
      this.router.navigate(['/course/login'],{relativeTo: this.route});
    }else{
      var cnvrtobj = JSON.parse(atob(courselogincheck));
      this.userselectedcourse = cnvrtobj.courseassign;
    }

    if(this.userselectedcourse!='all'){
      var sendobj = {data:this.userselectedcourse};
      this._course.multiple(sendobj).subscribe((res:any)=>{
        console.log(res);
        res.data.forEach((element:any) => {
          this.allcourses.push(element);
        });
      }); 
    }else if(this.userselectedcourse=='all'){
      this._course.all().subscribe((res:any)=>{
        console.log(res);
        res.data.forEach((element:any) => {
          this.allcourses.push(element);
        });
      }); 
    }

  }



}
