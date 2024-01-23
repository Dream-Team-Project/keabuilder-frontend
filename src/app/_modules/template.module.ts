import { NgModule } from '@angular/core';
import { TemplateComponent } from '../_components/_builder/template/template.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    TemplateComponent,
  ],
  imports:[
    MatProgressSpinnerModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [
    TemplateComponent,
  ]
})
export class TemplateModule { }
