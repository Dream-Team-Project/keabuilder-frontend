import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSidebarComponent } from '../_components/_membership/course-sidebar/course-sidebar.component';


@NgModule({
  declarations: [
    CourseSidebarComponent
  ],
  imports: [
    CommonModule
  ],
exports:[
  CourseSidebarComponent
]
})
export class MemberSidebarModule { }
