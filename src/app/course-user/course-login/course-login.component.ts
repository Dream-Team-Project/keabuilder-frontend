import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { Router, ParamMap, ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-course-login',
  templateUrl: './course-login.component.html',
  styleUrls: ['./course-login.component.css']
})
export class CourseUserCourseLoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
  hide = true;
  email = '';
  password = '';
  findfalseinfo = false;

  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {

    var courselogincheck:any = localStorage.getItem("kbcourselogin");
    if(courselogincheck!=null){
      var cnvrtobj = JSON.parse(atob(courselogincheck));
      if(cnvrtobj.isloggedIn==true){
        this.router.navigate(['/course/dashboard'],{relativeTo: this.route});
      }
    }

  }

  courselogin(){

    if(this.emailFormControl.status=='VALID' && this.passwordFormControl.status=='VALID'){

     var userdata = {email:this.email,password: this.password};

      this.courseService.verifyuserlogin(userdata).subscribe({
        next: data => {
          // console.log(data);
          if(data.data.length!=0){
            // console.log('Good');
            this.findfalseinfo = false;
            var getassigncourse:any = [];

            var splt = data.data[0].courseassign;
            if(splt!=null){
              getassigncourse = splt.split(',');
            }

            var firstletter = data.data[0].firstname, lastletter = data.data[0].lastname;
            if(firstletter!=''){
              firstletter = firstletter.charAt(0);
            }
            
            if(lastletter!=''){
              lastletter = lastletter.charAt(0);
            }else{
              lastletter = (data.data[0].firstname).charAt((data.data[0].firstname).length-1);
            }

            var genrtname = firstletter+''+lastletter;

            var loginobj:any = {isloggedIn:true, courseassign:getassigncourse, username:genrtname};
            localStorage.setItem("kbcourselogin", btoa(JSON.stringify(loginobj)));
            this.router.navigate(['/course/dashboard'],{relativeTo: this.route});

          }else{
              this.findfalseinfo = true;
          }
        }
      });

    }

  }

}
