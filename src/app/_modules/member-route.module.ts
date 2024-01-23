import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { MemberForgotPasswordComponent } from '../_components/course-user/member-forgot-password/member-forgot-password.component';
import { ViewLessonComponent } from '../_components/_membership/view-lesson/view-lesson.component';
import { ViewCourseComponent } from '../_components/_membership/view-course/view-course.component';
import { MemberProfileSettingsComponent } from '../_components/course-user/member-profile-settings/member-profile-settings.component';
import { MemberSignInSecurityComponent } from '../_components/course-user/member-sign-in-security/member-sign-in-security.component';
import { MemberBillingComponent } from '../_components/course-user/member-billing/member-billing.component';

const routes: Routes = [
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
    ViewLessonComponent,
    ViewCourseComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    
  ],
  exports: [RouterModule]
})
export class MemberRouteModule { }
