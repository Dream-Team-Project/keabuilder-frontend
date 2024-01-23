import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { MembershipCoursesComponent } from '../_components/_membership/courses/courses.component';
import { MembershipModulesComponent } from '../_components/_membership/modules/modules.component';
import { MembershipLessonComponent } from '../_components/_membership/lesson/lesson.component';
import { MembershipComponent } from '../_components/_membership/membership/membership.component';
import { MembershipProductComponent } from '../_components/_membership/product/product.component';
import { MembershipOffersComponent } from '../_components/_membership/offers/offers.component';
import { MembershipCouponsComponent } from '../_components/_membership/coupons/membership-coupons.component';
import { MembershipPaymentComponent } from '../_components/_membership/payment/payment.component';
import { MembershipMembersComponent } from '../_components/_membership/members/members.component';
import { MembershipTagsComponent } from '../_components/_membership/tags/tags.component';
import { MembershipMarketplaceComponent } from '../_components/_membership/marketplace/marketplace.component';
import { MembershipReportsComponent } from '../_components/_membership/membership-reports/membership-reports.component';
import { MembershipCustomizationComponent } from '../_components/_membership/membership-customization/membership-customization.component';
import { CourseSettingsComponent } from '../_components/_membership/course-settings/course-settings.component';
import { NewMembershipComponent } from '../_components/_membership/new-membership/new-membership.component';
import { ViewLessonComponent } from '../_components/_membership/view-lesson/view-lesson.component';
import { ViewCourseComponent } from '../_components/_membership/view-course/view-course.component';
import { ViewNavbarComponent } from '../_components/_membership/view-navbar/view-navbar.component';
import { CourseSidebarComponent } from '../_components/_membership/course-sidebar/course-sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';

const routes: Routes = [
{ path: 'membership', component: MembershipComponent,
      children : [
        { path: '', component: MembershipReportsComponent, canActivate: [AuthGuard] },
        { path: 'reports', component: MembershipReportsComponent, canActivate: [AuthGuard] }, 
        { path: 'memberships', component: MembershipCoursesComponent,canActivate: [AuthGuard] },
        { path: 'members', component: MembershipMembersComponent, canActivate: [AuthGuard] },
        { path: 'marketplace', component: MembershipMarketplaceComponent, canActivate: [AuthGuard] },
        { path: 'customization', component: MembershipCustomizationComponent, canActivate: [AuthGuard] },
        { path: 'settings', component: CourseSettingsComponent, canActivate: [AuthGuard] },

      ],
      canActivate: [AuthGuard] },
  { path: 'new-membership', component: NewMembershipComponent,
  children :[
    { path: 'course/:course_id', component: MembershipModulesComponent, canActivate: [AuthGuard] },
    { path: 'course/:course_id/module/:module_id/lesson/:lesson_id/:tab', component: MembershipLessonComponent, canActivate: [AuthGuard] },
    { path: 'course/:course_id/module/:module_id/lesson/:lesson_id', component: MembershipLessonComponent, canActivate: [AuthGuard] },
    ],canActivate: [AuthGuard] },
    { path: 'member/:course_id/:module_id/:lesson_id', component : ViewLessonComponent,canActivate: [AuthGuard]},
    { path: 'member/:course_id', component : ViewCourseComponent,canActivate: [AuthGuard]},
  ];

@NgModule({
  declarations: [
    MembershipCoursesComponent,
    MembershipModulesComponent,
    MembershipLessonComponent,
    MembershipComponent,
    MembershipProductComponent,
    MembershipOffersComponent,
    MembershipCouponsComponent,
    MembershipPaymentComponent,
    MembershipMembersComponent,
    MembershipTagsComponent,
    MembershipMarketplaceComponent,
    MembershipReportsComponent,
    MembershipCustomizationComponent,
    CourseSettingsComponent,
    NewMembershipComponent,
    ViewCourseComponent,
    ViewLessonComponent,
    ViewNavbarComponent,
    CourseSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    EditorModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    NgApexchartsModule,
    MatTabsModule,
    DragDropModule,
    MatSidenavModule,
  ],
  exports: [RouterModule]
})
export class MembershipModule { }
