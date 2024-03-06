import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrmEmailBuilderComponent } from '../_components/_crm/email-builder/email-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from './pipe.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BuilderSettingModule } from './builder-setting.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ImageModule } from './image.module';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: CrmEmailBuilderComponent, },
];
@NgModule({
  declarations: [CrmEmailBuilderComponent],
  imports: [
    CommonModule,
    BuilderSettingModule,
    ImageModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    PipeModule,
    DragDropModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports:[RouterModule]
})
export class EmailBuilderModule { }
