import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-course-user-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class CourseUserModulesComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    var courselogincheck:any = localStorage.getItem("kbcourselogin");
    if(courselogincheck==null){
      this.router.navigate(['/course/login'],{relativeTo: this.route});
    }

  }

}
