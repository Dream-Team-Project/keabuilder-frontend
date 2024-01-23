import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmFormFetchComponent } from '../_components/_crm/form-fetch/form-fetch.component';


@NgModule({
  declarations: [
    CrmFormFetchComponent,
  ],
  
exports:[
  CrmFormFetchComponent,
],
})
export class FormfetchModule { }
