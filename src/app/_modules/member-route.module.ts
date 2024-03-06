import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { MemberAuthGuard } from '../_guard/member-auth.guard';
import { MemberSignedGuard } from '../_guard/member-signed.guard';
import { MemberForgotPasswordComponent } from '../_components/course-user/member-forgot-password/member-forgot-password.component';
import { ViewLessonModule } from './view-lesson.module';
import { ViewCourseModule } from './view-course.module';
import { MemberProfileSettingsComponent } from '../_components/course-user/member-profile-settings/member-profile-settings.component';
import { MemberSignInSecurityComponent } from '../_components/course-user/member-sign-in-security/member-sign-in-security.component';
import { MemberBillingComponent } from '../_components/course-user/member-billing/member-billing.component';
import { environment } from 'src/environments/environment';
import { MemberNavbarModule } from './member-navbar.module';
import { MemberSidebarModule } from './member-sidebar.module';
import { PageViewComponent } from '../_components/page-view/page-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

const currentDomain:any = window.location.hostname;
const currentPath:any = window.location.pathname;
const appHost:any = environment.appHost;


const routes: Routes = [
   { path: 'login', component : PageViewComponent, data: { domain: currentDomain,path: currentPath,},canActivate: [MemberSignedGuard]},
   { path: 'forgot/password', component : MemberForgotPasswordComponent,canActivate: [MemberSignedGuard]},
   { path: 'library', component : PageViewComponent, data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
   { path: ':course_id', component : ViewCourseModule,data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
   { path: ':course_id/:module_id/:lesson_id', component : ViewLessonModule,data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
  
    { path: 'profile/settings', component: MemberProfileSettingsComponent,data: { domain: currentDomain,path: currentPath,}, canActivate: [MemberAuthGuard] },
    { path: 'profile/sign-in-security', component: MemberSignInSecurityComponent,data: { domain: currentDomain,path: currentPath,}, canActivate: [MemberAuthGuard] },
    { path: 'profile/billing', component: MemberBillingComponent,data: { domain: currentDomain,path: currentPath,}, canActivate: [MemberAuthGuard]},
];

@NgModule({
  declarations: [
    MemberForgotPasswordComponent,
    MemberProfileSettingsComponent,
    MemberSignInSecurityComponent,  
    MemberBillingComponent,
   
  ],
  imports: [
    CommonModule,
    ViewCourseModule,
    ViewLessonModule,
    RouterModule.forChild(routes),
    MemberNavbarModule,
    MemberSidebarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  exports: [RouterModule]
})
export class MemberRouteModule { }
