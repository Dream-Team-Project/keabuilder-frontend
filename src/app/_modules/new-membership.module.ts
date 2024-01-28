import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { NewMembershipComponent } from '../_components/_membership/new-membership/new-membership.component';
import { MembershipLessonComponent } from '../_components/_membership/lesson/lesson.component';
import { MembershipModulesComponent } from '../_components/_membership/modules/modules.component';
import { ViewCourseModule } from './view-course.module';
import { ViewLessonModule } from './view-lesson.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [

    { path: 'course/:course_id', component: MembershipModulesComponent, canActivate: [AuthGuard] },
    { path: 'course/:course_id/module/:module_id/lesson/:lesson_id/:tab', component: MembershipLessonComponent, canActivate: [AuthGuard] },
    { path: 'course/:course_id/module/:module_id/lesson/:lesson_id', component: MembershipLessonComponent, canActivate: [AuthGuard] },

];

@NgModule({
  declarations: [
    NewMembershipComponent,
    MembershipModulesComponent,
    MembershipLessonComponent,
  ],
  imports: [
    CommonModule,
    ViewCourseModule,
    ViewLessonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTabsModule,
    DragDropModule,
    MatSidenavModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatMenuModule,
    EditorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatInputModule
  ],
  exports: [RouterModule]
})
export class NewMembershipModule { }
