import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-course-user-header',
  templateUrl: './course-header.component.html',
  styleUrls: ['./course-header.component.css']
})
export class CourseUserCourseHeaderComponent implements OnInit {

  constructor( private router: Router,
               private route: ActivatedRoute,) { }

  shortname = 'User';
  adminlogged = true;

  ngOnInit(): void {

    var courselogincheck:any = localStorage.getItem("kbcourselogin");
    if(courselogincheck!=null){
      var cnvrtobj = JSON.parse(courselogincheck);
      if(cnvrtobj.username!=''){
        this.shortname = cnvrtobj.username;
      }
      console.log(cnvrtobj.courseassign);
      if(cnvrtobj.courseassign=='all'){ 
          this.adminlogged = false;
      }else{
        this.adminlogged = true;
      }

    }

  }

  logoutuser(){
    localStorage.removeItem("kbcourselogin");
    this.router.navigate(['/course/login'],{relativeTo: this.route});
  }

}
