import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { AffiliatesComponent } from '../_components/_affiliate/affiliates/affiliates.component';
import { AffiliateUsersComponent } from '../_components/_affiliate/users/users.component';
import { AffiliateCommissionComponent } from '../_components/_affiliate/commission/commission.component';
import { AffiliateTransactionsComponent } from '../_components/_affiliate/transactions/transactions.component';
import { AffiliateShareComponent } from '../_components/_affiliate/share/share.component';
import { AffiliateAnnouncementsComponent } from '../_components/_affiliate/announcements/announcements.component';
import { AffiliateExportsComponent } from '../_components/_affiliate/exports/exports.component';
import { AffiliateSettingsComponent } from '../_components/_affiliate/settings/settings.component';
import { IntegrationsComponent } from '../_components/integrations/integrations.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
   { path: 'affiliates', component: AffiliatesComponent, canActivate: [AuthGuard] },
    { path: 'affiliates-users', component: AffiliateUsersComponent, canActivate: [AuthGuard] },
    { path: 'affiliates-commission', component: AffiliateCommissionComponent, canActivate: [AuthGuard] },
    { path: 'affiliates-transactions', component: AffiliateTransactionsComponent, canActivate: [AuthGuard] },
    { path: 'affiliates-share', component: AffiliateShareComponent, canActivate: [AuthGuard] },
    { path: 'affiliates-announcements', component: AffiliateAnnouncementsComponent, canActivate: [AuthGuard] },
    { path: 'affiliates-exports', component: AffiliateExportsComponent, canActivate: [AuthGuard] },
    { path: 'affiliates-settings', component: AffiliateSettingsComponent, canActivate: [AuthGuard] },
    { path: 'integrations', component: IntegrationsComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [
    AffiliatesComponent,
    AffiliateUsersComponent,
    AffiliateCommissionComponent,
    AffiliateTransactionsComponent,
    AffiliateShareComponent,
    AffiliateAnnouncementsComponent,
    AffiliateExportsComponent,
    AffiliateSettingsComponent,
    IntegrationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
  ],
  exports: [RouterModule]
})
export class AffiliateModule { }
