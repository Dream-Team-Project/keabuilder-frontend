import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrmFormFetchComponent } from '../_components/_crm/form-fetch/form-fetch.component';
import { FormfetchModule } from './formfetch.module';

const routes: Routes = [
  { path: '', component: CrmFormFetchComponent},
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormfetchModule,
    RouterModule.forChild(routes),
  ],
  exports : [RouterModule]
})
export class FormfetchRouteModule { }
