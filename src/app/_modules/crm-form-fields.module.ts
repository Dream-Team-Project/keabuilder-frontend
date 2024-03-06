import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmFieldsComponent } from '../_components/_crm/fields/fields.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PipeModule } from './pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [CrmFieldsComponent],
  imports: [
    CommonModule,
    PipeModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatInputModule,
    MatProgressBarModule,
    ClipboardModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    EditorModule,
    MatDatepickerModule,
   
  ],
  exports:[ CrmFieldsComponent]
})
export class CrmFormFieldsModule { }
