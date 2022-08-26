import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/_services/_membership/course.service';

@Component({
  selector: 'app-course-user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CourseUserDashboardComponent implements OnInit {

  constructor(private _course: CourseService,) { }

  allcourses:any = [];

  ngOnInit(): void {

    this._course.all().subscribe((res:any)=>{
      console.log(res);
      res.data.forEach((element:any) => {
          this.allcourses.push(element);
      });
    }); 

  }



}
