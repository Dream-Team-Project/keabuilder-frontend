import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCourseComponent } from '../_components/_membership/view-course/view-course.component';
import { MemberNavbarModule } from './member-navbar.module';
import { MemberSidebarModule } from './member-sidebar.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    ViewCourseComponent,
  ],
  imports: [
    CommonModule,
    MemberNavbarModule,
    MemberSidebarModule,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
  ],
  exports:[
    ViewCourseComponent,
  ]
})
export class ViewCourseModule { }
