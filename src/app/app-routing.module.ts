import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guard/auth.guard';
import { BuilderComponent } from './builder/builder.component';
import { BuilderSettingComponent } from './builder-setting/builder-setting.component';
import { BulderWireframeComponent } from './bulder-wireframe/bulder-wireframe.component';
import { FunnelComponent } from './funnel/funnel.component';
import { FunnelArchieveComponent } from './funnel-archieve/funnel-archieve.component';
import { FunnelMarketplaceComponent } from './funnel-marketplace/funnel-marketplace.component';
import { WebsiteComponent } from './website/website.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HeatmapsComponent } from './heatmaps/heatmaps.component';
import { BuildFunnelComponent } from './build-funnel/build-funnel.component';
import { CreateFunnelComponent } from './create-funnel/create-funnel.component';
import { CreateFunnelStatsComponent } from './create-funnel-stats/create-funnel-stats.component';
import { CreateFunnelContactsComponent } from './create-funnel-contacts/create-funnel-contacts.component';
import { CreateFunnelSalesComponent } from './create-funnel-sales/create-funnel-sales.component';
import { CreateFunnelSettingsComponent } from './create-funnel-settings/create-funnel-settings.component';
import { HeatmapsRecordingsComponent } from './heatmaps-recordings/heatmaps-recordings.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipProductComponent } from './membership-product/membership-product.component';
import { MembershipOffersComponent } from './membership-offers/membership-offers.component';
import { MembershipCouponsComponent } from './membership-coupons/membership-coupons.component';
import { MembershipPaymentComponent } from './membership-payment/membership-payment.component';
import { MembershipMembersComponent } from './membership-members/membership-members.component';
import { MembershipTagsComponent } from './membership-tags/membership-tags.component';
import { FormsComponent } from './forms/forms.component';
import { DomainComponent } from './domain/domain.component';
import { PaymentComponent } from './payment/payment.component';
import { CrmComponent } from './crm/crm.component';
import { CrmCampaignsComponent } from './crm-campaigns/crm-campaigns.component';
import { CrmContactsComponent } from './crm-contacts/crm-contacts.component';
import { CrmListsComponent } from './crm-lists/crm-lists.component';
import { CrmTagsComponent } from './crm-tags/crm-tags.component';
import { CrmReportsComponent } from './crm-reports/crm-reports.component';
import { CrmSettingsComponent } from './crm-settings/crm-settings.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { AffiliateUsersComponent } from './affiliate-users/affiliate-users.component';
import { AffiliateCommissionComponent } from './affiliate-commission/affiliate-commission.component';
import { AffiliateTransactionsComponent } from './affiliate-transactions/affiliate-transactions.component';
import { AffiliateShareComponent } from './affiliate-share/affiliate-share.component';
import { AffiliateAnnouncementsComponent } from './affiliate-announcements/affiliate-announcements.component';
import { AffiliateExportsComponent } from './affiliate-exports/affiliate-exports.component';
import { AffiliateSettingsComponent } from './affiliate-settings/affiliate-settings.component';
import { WebsiteDesignComponent } from './website-design/website-design.component';
import { WebsiteDetailsComponent } from './website-details/website-details.component';
import { IntegrationsComponent } from './integrations/integrations.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'funnels', component: FunnelComponent, canActivate: [AuthGuard] },
  { path: 'archieve-steps', component: FunnelArchieveComponent, canActivate: [AuthGuard] },
  { path: 'marketplace', component: FunnelMarketplaceComponent, canActivate: [AuthGuard] },
  { path: 'strategies', component: StrategiesComponent, canActivate: [AuthGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
  { path: 'heatmap', component: HeatmapsComponent, canActivate: [AuthGuard] },
  { path: 'build-funnel', component: BuildFunnelComponent, canActivate: [AuthGuard] },
  { path: 'create-funnel/:id/:id', component: CreateFunnelComponent, canActivate: [AuthGuard] },
  { path: 'create-funnel-stats/:id', component: CreateFunnelStatsComponent, canActivate: [AuthGuard] },
  { path: 'create-funnel-contacts/:id', component: CreateFunnelContactsComponent, canActivate: [AuthGuard] },
  { path: 'create-funnel-sales/:id', component: CreateFunnelSalesComponent, canActivate: [AuthGuard] },
  { path: 'create-funnel-settings/:id', component: CreateFunnelSettingsComponent, canActivate: [AuthGuard] },
  { path: 'heatmaps-recordings', component: HeatmapsRecordingsComponent, canActivate: [AuthGuard] },
  { path: 'membership', component: MembershipComponent, canActivate: [AuthGuard] },
  { path: 'membership-product', component: MembershipProductComponent, canActivate: [AuthGuard] },
  { path: 'membership-offers', component: MembershipOffersComponent, canActivate: [AuthGuard] },
  { path: 'membership-coupons', component: MembershipCouponsComponent, canActivate: [AuthGuard] },
  { path: 'membership-payments', component: MembershipPaymentComponent, canActivate: [AuthGuard] },
  { path: 'membership-members', component: MembershipMembersComponent, canActivate: [AuthGuard] },
  { path: 'membership-tags', component: MembershipTagsComponent, canActivate: [AuthGuard] },
  { path: 'forms', component: FormsComponent, canActivate: [AuthGuard] },
  { path: 'domain', component: DomainComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'crm', component: CrmComponent, canActivate: [AuthGuard] },
  { path: 'crm-campaigns', component: CrmCampaignsComponent, canActivate: [AuthGuard] },
  { path: 'crm-contacts', component: CrmContactsComponent, canActivate: [AuthGuard] },
  { path: 'crm-lists', component: CrmListsComponent, canActivate: [AuthGuard] },
  { path: 'crm-tags', component: CrmTagsComponent, canActivate: [AuthGuard] },
  { path: 'crm-reports', component: CrmReportsComponent, canActivate: [AuthGuard] },
  { path: 'crm-settings', component: CrmSettingsComponent, canActivate: [AuthGuard] },
  { path: 'affiliates', component: AffiliatesComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-users', component: AffiliateUsersComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-commission', component: AffiliateCommissionComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-transactions', component: AffiliateTransactionsComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-share', component: AffiliateShareComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-announcements', component: AffiliateAnnouncementsComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-exports', component: AffiliateExportsComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-settings', component: AffiliateSettingsComponent, canActivate: [AuthGuard] },
  { path: 'website-pages', component: WebsiteComponent, canActivate: [AuthGuard] },
  { path: 'website-design', component: WebsiteDesignComponent, canActivate: [AuthGuard] },
  { path: 'website-details', component: WebsiteDetailsComponent, canActivate: [AuthGuard] },
  { path: 'integrations', component: IntegrationsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'builder/website/:id', component: BuilderComponent, canActivate: [AuthGuard] },
  { path: 'builder/funnel/:id', component: BuilderComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = 
  [
    LoginComponent, 
    RegisterComponent, 
    ForgetPasswordComponent,
    DashboardComponent, 
    FunnelComponent,
    FunnelArchieveComponent,
    FunnelMarketplaceComponent,
    WebsiteComponent,
    StrategiesComponent,
    AnalyticsComponent,
    HeatmapsComponent,
    BuildFunnelComponent,
    CreateFunnelComponent,
    CreateFunnelStatsComponent,
    CreateFunnelContactsComponent,
    CreateFunnelSalesComponent,
    CreateFunnelSettingsComponent,
    ProfileComponent,
    BuilderComponent,
    BuilderSettingComponent,
    BulderWireframeComponent, 
    PageNotFoundComponent,
    HeatmapsRecordingsComponent,
    MembershipComponent,
    MembershipProductComponent,
    MembershipOffersComponent,
    MembershipCouponsComponent,
    MembershipPaymentComponent,
    MembershipMembersComponent,
    MembershipTagsComponent,
    FormsComponent,
    DomainComponent,
    PaymentComponent,
    CrmComponent,
    CrmCampaignsComponent,
    CrmContactsComponent,
    CrmListsComponent,
    CrmTagsComponent,
    CrmReportsComponent,
    CrmSettingsComponent,
    AffiliatesComponent,
    AffiliateUsersComponent,
    AffiliateCommissionComponent,
    AffiliateTransactionsComponent,
    AffiliateShareComponent,
    AffiliateAnnouncementsComponent,
    AffiliateExportsComponent,
    AffiliateSettingsComponent,
    WebsiteDesignComponent,
    WebsiteDetailsComponent,
    IntegrationsComponent,
  ];

