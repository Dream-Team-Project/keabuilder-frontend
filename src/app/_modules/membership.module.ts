import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MembershipCoursesComponent } from '../_components/_membership/courses/courses.component';
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
import { MembershipLessonComponent } from '../_components/_membership/lesson/lesson.component';
import { MembershipModulesComponent } from '../_components/_membership/modules/modules.component';
import { NewMembershipComponent } from '../_components/_membership/new-membership/new-membership.component';

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
import { ViewCourseModule } from './view-course.module';
import { ViewLessonModule } from './view-lesson.module';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CrmContactComponent } from '../_components/_crm/contact/contact.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



const routes: Routes = [
  { path: '', component: MembershipComponent, 
  children : [
        { path: '', component: MembershipReportsComponent,},
        { path: 'reports', component: MembershipReportsComponent,}, 
        { path: 'courses', component: MembershipCoursesComponent,},
        { path: 'members', component: MembershipMembersComponent, },
        { path: 'marketplace', component: MembershipMarketplaceComponent, },
        { path: 'customization', component: MembershipCustomizationComponent, },
        { path: 'settings', component: CourseSettingsComponent,},
   ],},
   { path: 'new-membership/course', component: NewMembershipComponent,
   children :[
    { path: ':course_id', component: MembershipModulesComponent,},
    { path: ':course_id/module/:module_id/lesson/:lesson_id/:tab', component: MembershipLessonComponent,},
    { path: ':course_id/module/:module_id/lesson/:lesson_id', component: MembershipLessonComponent,},
    ],},
    { path: 'member/:course_id', component : ViewCourseModule,},
    { path: 'member/:course_id/:module_id/:lesson_id', component : ViewLessonModule,},
    { path: 'member/:memberid/:uniqueid', component: CrmContactComponent,},
  ];

@NgModule({
  declarations: [
    MembershipCoursesComponent,
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
    MembershipModulesComponent,
    MembershipLessonComponent,
    NewMembershipComponent,
  ],
  imports: [
    CommonModule,
    ViewCourseModule,
    ViewLessonModule,
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
    MatInputModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
  exports: [RouterModule]
})
export class MembershipModule { }
