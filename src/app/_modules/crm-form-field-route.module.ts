import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrmComponent } from '../_components/_crm/crm/crm.component';
import { CrmReportsComponent } from '../_components/_crm/reports/reports.component';
import { CrmFieldsComponent } from '../_components/_crm/fields/fields.component';
import { CrmFormFieldsModule } from './crm-form-fields.module';

const routes: Routes = [
  {path:'', component : CrmComponent,
  children : [
  { path: '', component: CrmReportsComponent,},
  { path: 'fields', component: CrmFieldsComponent,},
],
}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CrmFormFieldsModule,
  ],
   exports:[RouterModule,]
})
export class CrmFormFieldRouteModule { }
