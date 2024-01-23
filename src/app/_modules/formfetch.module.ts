import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmFormFetchComponent } from '../_components/_crm/form-fetch/form-fetch.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PipeModule } from './pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CrmFormFetchComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    PipeModule, 
    FormsModule,
    ReactiveFormsModule,
  ],
exports:[
  CrmFormFetchComponent,
]
})
export class FormfetchModule { }
