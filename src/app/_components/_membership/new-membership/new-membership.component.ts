import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { CourseService } from 'src/app/_services/_membership/course.service';

@Component({
  selector: 'app-new-membership',
  templateUrl: './new-membership.component.html',
  styleUrls: ['./new-membership.component.css']
})
export class NewMembershipComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    public _general: GeneralService,) {

   
   
   }

  ngOnInit(): void {
   
  }
 
  
}
