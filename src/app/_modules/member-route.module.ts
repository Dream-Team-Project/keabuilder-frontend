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

const currentDomain:any = window.location.hostname;
const currentPath:any = window.location.pathname;
const appHost:any = environment.appHost;


const routes: Routes = [
  //  { path: 'member/login', component : PageViewComponent, data: { domain: currentDomain,path: currentPath,},canActivate: [MemberSignedGuard]},
   { path: 'member/forgot/password', component : MemberForgotPasswordComponent,canActivate: [MemberSignedGuard]},
   // auth guard
   // { path: 'member/library', component : PageViewComponent, data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
   { path: 'member/:course_id', component : ViewCourseModule,data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
   { path: 'member/:course_id/:module_id/:lesson_id', component : ViewLessonModule,data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
  
  { path: 'profile/settings', component: MemberProfileSettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile/sign-in-security', component: MemberSignInSecurityComponent, canActivate: [AuthGuard] },
  { path: 'profile/billing', component: MemberBillingComponent, canActivate: [AuthGuard]},
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
   
  ],
  exports: [RouterModule]
})
export class MemberRouteModule { }
