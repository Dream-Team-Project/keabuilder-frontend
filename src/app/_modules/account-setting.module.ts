import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../_components/_account-settings/account/account.component';
import { ProfileSettingsComponent } from '../_components/_account-settings/profile-settings/profile-settings.component';
import { SignInSecurityComponent } from '../_components/_account-settings/sign-in-security/sign-in-security.component';
import { BillingComponent } from '../_components/_account-settings/billing/billing.component';
import { ViewplansComponent } from '../_components/_account-settings/viewplans/viewplans.component';
import { InvoicesComponent } from '../_components/_account-settings/invoices/invoices.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxStripeModule } from 'ngx-stripe';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
      { path: '', component: AccountComponent,
      children : [
      { path: '', component: ProfileSettingsComponent, },
      { path: 'settings', component: ProfileSettingsComponent, },
      { path: 'sign-in-security', component: SignInSecurityComponent, },
      { path: 'billing', component: BillingComponent,},
      { path: 'viewplans', component: ViewplansComponent,},
      ],},
      { path: 'invoices/:id', component: InvoicesComponent,},
  ];
@NgModule({
  declarations: [
    AccountComponent,
    BillingComponent,
    ViewplansComponent, 
    ProfileSettingsComponent,
    SignInSecurityComponent,
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgxStripeModule,
    MatButtonModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  exports: [RouterModule]
})
export class AccountSettingModule { }
