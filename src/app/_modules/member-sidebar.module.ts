import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSidebarComponent } from '../_components/_membership/course-sidebar/course-sidebar.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CourseSidebarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
exports:[
  CourseSidebarComponent
]
})
export class MemberSidebarModule { }
