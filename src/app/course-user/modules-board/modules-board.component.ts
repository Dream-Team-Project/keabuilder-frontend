import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { LessonService } from 'src/app/_services/_membership/lesson.service';
import { Router, ParamMap, ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-course-user-modules-board',
  templateUrl: './modules-board.component.html',
  styleUrls: ['./modules-board.component.css']
})
export class CourseUserModulesBoardComponent implements OnInit {

  constructor( private router: Router,
                 private route: ActivatedRoute,
                private _lesson: LessonService) {

                  router.events.subscribe((val) => {
                    if(val instanceof NavigationEnd) {
                      this.moduleid = this.route.snapshot.paramMap.get('id');
                      this.showlessons(this.moduleid);
                    }
                  });

                 }

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 50;
  moduleid:any = '';
  moduleparts:any = [];
  totalstart = 0;
  totalprogress = 0;
  coursename:any = '';  
  showcategory = true;

  ngOnInit(): void {
    this.coursename = this.route.snapshot.paramMap.get('name');
    this.moduleid = this.route.snapshot.paramMap.get('id');
    this.showlessons(this.moduleid);

    if(this.route.snapshot.paramMap.get('postid')!=null){
      this.showcategory = false;
    }
    

  }

  showlessons(id:any){
    if(id!=''){
      this._lesson.onlymodulebyid(id).subscribe((res:any)=>{
        // console.log(res);
        this.moduleparts = res.data;
        this.totalprogress = res.data.length;
      });
    }
  }




}
