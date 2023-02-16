import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { CourseService } from 'src/app/_services/_membership/course.service';

@Component({
  selector: 'app-course-user-forgotpass',
  templateUrl: './course-forgotpass.component.html',
  styleUrls: ['./course-forgotpass.component.css']
})
export class CourseUserCourseForgotpassComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  email = '';
  findfalseinfo = false;
  ifemailsuccess = false;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  sendrecoveryinfo(){

    if(this.emailFormControl.status=='VALID'){

      var userdata = {email:this.email};
 
       this.courseService.validatecourseemail(userdata).subscribe({
         next: data => {
           // console.log(data);
         }
       });
 
     }

  }

}
