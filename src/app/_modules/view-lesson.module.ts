import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLessonComponent } from '../_components/_membership/view-lesson/view-lesson.component';
import { MemberNavbarModule } from './member-navbar.module';
import { MemberSidebarModule } from './member-sidebar.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ViewLessonComponent
  ],
  imports: [
    CommonModule,
    MemberNavbarModule,
    MemberSidebarModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports:[
    ViewLessonComponent,
  ]
})
export class ViewLessonModule { }
