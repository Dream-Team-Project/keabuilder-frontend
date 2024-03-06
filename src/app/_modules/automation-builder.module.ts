import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrmAutomationBuilderComponent } from '../_components/_crm/automation-builder/automation-builder.component';
import { CrmAutomationWorkflowComponent } from '../_components/_crm/automation-workflow/automation-workflow.component';
import { MatIconModule } from '@angular/material/icon';
import { PipeModule } from './pipe.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRippleModule } from '@angular/material/core';

const routes: Routes = [
  { path: '', component: CrmAutomationBuilderComponent,},
  ];



@NgModule({
  declarations: [
    CrmAutomationBuilderComponent,
    CrmAutomationWorkflowComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    PipeModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatChipsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    EditorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatRippleModule,
  ],
  exports: [
   RouterModule,
  ]
})
export class AutomationBuilderModule { }
