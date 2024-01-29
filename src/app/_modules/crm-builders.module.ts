import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { CrmFormBuilderComponent } from '../_components/_crm/form-builder/form-builder.component';
import { CrmEmailBuilderComponent } from '../_components/_crm/email-builder/email-builder.component';
import { CrmAutomationBuilderComponent } from '../_components/_crm/automation-builder/automation-builder.component';
import { BuilderSettingModule } from './builder-setting.module';
import { FormfetchModule } from './formfetch.module';
import { PipeModule } from './pipe.module';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatSidenavModule } from '@angular/material/sidenav';
import { ImageModule } from './image.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CrmAutomationWorkflowComponent } from '../_components/_crm/automation-workflow/automation-workflow.component';
import { CrmFormFieldsModule } from './crm-form-fields.module';

const routes: Routes = [
{ path: 'automation/:id', component: CrmAutomationBuilderComponent, canActivate: [AuthGuard] },
{ path: 'email/:id', component: CrmEmailBuilderComponent, canActivate: [AuthGuard] },
{ path: 'form/:id', component: CrmFormBuilderComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    CrmFormBuilderComponent,
    CrmEmailBuilderComponent,
    CrmAutomationBuilderComponent, 
    CrmAutomationWorkflowComponent
  ],
  imports: [
    CommonModule,
    PipeModule,
    FormfetchModule,
    CrmFormFieldsModule,
    ImageModule,
    BuilderSettingModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatListModule,
    MatBottomSheetModule, 
    MatFormFieldModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatMenuModule,
    EditorModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    DragDropModule,
    NgApexchartsModule,
    MatSidenavModule,
    MatSnackBarModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    CrmFormBuilderComponent,
    CrmEmailBuilderComponent,
    CrmAutomationBuilderComponent, 
  ]
})
export class CrmBuildersModule { }
