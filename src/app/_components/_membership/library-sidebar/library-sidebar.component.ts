import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/_services/_membership/course.service';

@Component({
  selector: 'app-library-sidebar',
  templateUrl: './library-sidebar.component.html',
  styleUrls: ['./library-sidebar.component.css']
})
export class LibrarySidebarComponent implements OnInit {

    
  connectWtParent:boolean = false;
  toggleSidebar:boolean = false;
  fullsidebar = true;
  hoveropen = false;
  courses:any=[];
 
  constructor(public router: Router,private _course: CourseService,) { 
    this.fetchCourses().then(resp=>{
      this.courses=resp;
      console.log(this.courses)
    })
  }
  

  ngOnInit(): void {
  }


  fetchCourses() {
    return new Promise<any>((resolve, reject) => {
      this._course.allcourses().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }
getCourseLabel(course: any): string {
    return `<i class="fas fa-life-ring pr-1"></i> ${course.title}`;
  }

  getModuleLabel(module: any): string {
    return `<i class="fas fa-life-ring pr-1"></i> ${module.title}`;
  }
  
  gotoHelpDocs() {
    window.open('https://help.keabuilder.com','_blank');
  }

}
