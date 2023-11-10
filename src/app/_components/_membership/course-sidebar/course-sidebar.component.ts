import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-course-sidebar',
  templateUrl: './course-sidebar.component.html',
  styleUrls: ['./course-sidebar.component.css']
})
export class CourseSidebarComponent implements OnInit {
  domain:any='';
  @Input () course: any;
  constructor( private route: ActivatedRoute,) {
    const routeData:any = this.route.snapshot.data;
    if(routeData.domain == 'localhost')  this.domain='http://'+routeData.domain+":4200/member/library";
    else this.domain='https://'+routeData.domain+'/member/library';
   }

  ngOnInit(): void {
  }
  Gotohref(url :any){
    window.open(url,'_self');
  }
}
