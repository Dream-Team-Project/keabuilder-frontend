import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';
import { SignedInGuard } from './_guard/signed-in.guard';

import { AnalyticsComponent } from './_components/analytics/analytics.component';
import { ComingSoonComponent } from './_components/coming-soon/coming-soon.component';
import { DomainComponent } from './_components/domain/domain.component';
import { FeedbackFormComponent } from './_components/feedback-form/feedback-form.component';
import { ImageComponent } from './_components/image/image.component';
import { IntegrationsComponent } from './_components/integrations/integrations.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { StrategiesComponent } from './_components/strategies/strategies.component';

// auth
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './_components/_auth/forgot-password/forgot-password.component';
import { LoginComponent } from './_components/_auth/login/login.component';
import { ProfileComponent } from './_components/_auth/profile/profile.component';
import { RegisterComponent } from './_components/_auth/register/register.component';
// auth
// builder
import { BuilderComponent } from './_components/_builder/builder/builder.component';
import { BuilderSettingComponent } from './_components/_builder/builder-setting/builder-setting.component';
import { BuilderTopbarComponent } from './_components/_builder/builder-topbar/builder-topbar.component';
import { BulderWireframeComponent } from './_components/_builder/bulder-wireframe/bulder-wireframe.component';
// builder
// websites
import { WebsiteDesignComponent } from './_components/_websites/design/design.component';
import { WebsiteDetailsComponent } from './_components/_websites/details/details.component';
import { WebsiteFootersComponent } from './_components/_websites/footers/footers.component';
import { WebsiteHeadersComponent } from './_components/_websites/headers/headers.component';
import { WebsiteMarketplaceComponent } from './_components/_websites/marketplace/marketplace.component';
import { WebsiteNavigationComponent } from './_components/_websites/navigation/navigation.component';
import { WebsitePagesComponent } from './_components/_websites//pages/pages.component';
import { WebsiteComponent } from './_components/_websites/website/website.component';
import { WebsitesComponent } from './_components/_websites/websites/websites.component';
// websites
// funnels
import { FunnelComponent } from './_components/_funnels/funnel/funnel.component';
import { FunnelArchiveComponent } from './_components/_funnels/funnel-archive/funnel-archive.component';
import { FunnelMarketplaceComponent } from './_components/_funnels/funnel-marketplace/funnel-marketplace.component';
import { FunnelsComponent } from './_components/_funnels/funnels/funnels.component';
import { BuildFunnelComponent } from './_components/_funnels/build-funnel/build-funnel.component';
import { CreateFunnelComponent } from './_components/_funnels/create-funnel/create-funnel.component';
import { CreateFunnelStatsComponent } from './_components/_funnels/create-funnel-stats/create-funnel-stats.component';
import { CreateFunnelContactsComponent } from './_components/_funnels/create-funnel-contacts/create-funnel-contacts.component';
import { CreateFunnelSalesComponent } from './_components/_funnels/create-funnel-sales/create-funnel-sales.component';
import { CreateFunnelSettingsComponent } from './_components/_funnels/create-funnel-settings/create-funnel-settings.component';
import { FunnelCheckoutComponent } from './_components/_funnels/funnel-checkout/funnel-checkout.component';
import { FunnelWizardNavComponent } from './_components/_funnels/funnel-wizard-nav/funnel-wizard-nav.component';
// funnels

// new-funnels
import { NewFunnelsComponent } from './_components/_new-funnels/new-funnels/new-funnels.component';
import { NewFunnelComponent } from './_components/_new-funnels/new-funnel/new-funnel.component';
import { NewFunnelBuildComponent } from './_components/_new-funnels/new-funnel-build/new-funnel-build.component';
import { NewFunnelArchiveComponent } from './_components/_new-funnels/new-funnel-archive/new-funnel-archive.component';
import { CreateNewFunnelsComponent } from './_components/_new-funnels/create-new-funnels/create-new-funnels.component';
import { FunnelSettingsComponent } from './_components/_new-funnels/funnel-settings/funnel-settings.component';
import { FunnelStepArchiveComponent } from './_components/_new-funnels/funnel-step-archive/funnel-step-archive.component';
import { NewFunnelStepsComponent } from './_components/_new-funnels/new-funnel-steps/new-funnel-steps.component';

// new-funnels

// crm
import { CrmAutomationComponent } from './_components/_crm/automation/automation.component';
import { CrmAutomationBuilderComponent } from './_components/_crm/automation-builder/automation-builder.component';
import { CrmAutomationWorkflowComponent } from './_components/_crm/automation-workflow/automation-workflow.component';
import { CrmCampaignBuilderComponent } from './_components/_crm/campaign-builder/campaign-builder.component';
import { CrmCampaignsComponent } from './_components/_crm/campaigns/campaigns.component';
import { CrmContactComponent } from './_components/_crm/contact/contact.component';
import { CrmContactsComponent } from './_components/_crm/contacts/contacts.component';
import { CrmComponent } from './_components/_crm/crm/crm.component';
import { CrmFieldsComponent } from './_components/_crm/fields/fields.component';
import { CrmFormBuilderComponent } from './_components/_crm/form-builder/form-builder.component';
import { CrmFormFetchComponent } from './_components/_crm/form-fetch/form-fetch.component';
import { CrmFormsComponent } from './_components/_crm/forms/forms.component';
import { CrmListsComponent } from './_components/_crm/lists/lists.component';
import { CrmReportsComponent } from './_components/_crm/reports/reports.component';
import { CrmSettingsComponent } from './_components/_crm/settings/settings.component';
import { CrmTagsComponent } from './_components/_crm/tags/tags.component';
import { CrmEmailsComponent } from './_components/_crm/emails/emails.component';
import { CrmEmailBuilderComponent } from './_components/_crm/email-builder/email-builder.component';
// crm
// membership
import { MembershipCoursesComponent } from './_components/_membership/courses/courses.component';
import { MembershipModulesComponent } from './_components/_membership/modules/modules.component';
import { MembershipLessonComponent } from './_components/_membership/lesson/lesson.component';
import { MembershipComponent } from './_components/_membership/membership/membership.component';
import { MembershipProductComponent } from './_components/_membership/product/product.component';
import { MembershipOffersComponent } from './_components/_membership/offers/offers.component';
import { MembershipCouponsComponent } from './_components/_membership/coupons/membership-coupons.component';
import { MembershipPaymentComponent } from './_components/_membership/payment/payment.component';
import { MembershipMembersComponent } from './_components/_membership/members/members.component';
import { MembershipTagsComponent } from './_components/_membership/tags/tags.component';
import { MembershipMarketplaceComponent } from './_components/_membership/marketplace/marketplace.component';
// theme
import { CourseUserDashboardComponent } from './course-user/dashboard/dashboard.component';
import { CourseUserCoursesComponent } from './course-user/courses/courses.component';
import { CourseUserModulesComponent } from './course-user/modules/modules.component';
import { CourseUserModulesSidebarComponent } from './course-user/modules-sidebar/modules-sidebar.component';
import { CourseUserModulesBoardComponent } from './course-user/modules-board/modules-board.component';
import { CourseUserModulesPostComponent } from './course-user/modules-post/modules-post.component';
import { CourseUserCourseLoginComponent } from './course-user/course-login/course-login.component';
import { CourseUserCourseHeaderComponent } from './course-user/course-header/course-header.component';
import { CourseUserCourseForgotpassComponent } from './course-user/course-forgotpass/course-forgotpass.component';
// theme
// membership
// affiliate
import { AffiliatesComponent } from './_components/_affiliate/affiliates/affiliates.component';
import { AffiliateUsersComponent } from './_components/_affiliate/users/users.component';
import { AffiliateCommissionComponent } from './_components/_affiliate/commission/commission.component';
import { AffiliateTransactionsComponent } from './_components/_affiliate/transactions/transactions.component';
import { AffiliateShareComponent } from './_components/_affiliate/share/share.component';
import { AffiliateAnnouncementsComponent } from './_components/_affiliate/announcements/announcements.component';
import { AffiliateExportsComponent } from './_components/_affiliate/exports/exports.component';
import { AffiliateSettingsComponent } from './_components/_affiliate/settings/settings.component';
// affiliate
// heatmap
import { HeatmapsComponent } from './_components/_heatmap/heatmaps/heatmaps.component';
import { HeatmapsRecordingsComponent } from './_components/_heatmap/recordings/recordings.component';
// heatmap
// sales
import { SalesComponent } from './_components/_sales/sales/sales.component';
import { PaymentComponent } from './_components/_sales/payment/payment.component';
import { ProductsComponent } from './_components/_sales/products/products.component';
import { OffersComponent } from './_components/_sales/offers/offers.component';
import { OfferComponent } from './_components/_sales/offer/offer.component';
// sales

// account-setting

import { AccountComponent } from './_components/_account-settings/account/account.component';
import { ProfileSettingsComponent } from './_components/_account-settings/profile-settings/profile-settings.component';
import { SignInSecurityComponent } from './_components/_account-settings/sign-in-security/sign-in-security.component';
import { BillingComponent } from './_components/_account-settings/billing/billing.component';

//account-settings

const routes: Routes = [

  // auth

  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [SignedInGuard]},
  { path: 'register/:id', component: RegisterComponent, canActivate: [SignedInGuard]},
  { path: 'forget', component: ForgotPasswordComponent, canActivate: [SignedInGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // 8YvA7kPbR2mX3uHwS6JnQgZtF4cV5xWp-c2BnRw5OzY7Lx3XmJq9UgCpHm4KfP6iA-9EhPvFjK1sQr4TlWnXzR3uY6Dg2mC8bV -  secret url
  
  // auth

  // website 

  {path: 'websites', component: WebsiteComponent,
    children: [
      // {path: '', component: WebsiteDesignComponent, canActivate: [AuthGuard]},
      {path: '', component: WebsitesComponent, canActivate: [AuthGuard]},
      {path: 'all', component: WebsitesComponent, canActivate: [AuthGuard]},
      {path:'pages', component: WebsitePagesComponent, canActivate: [AuthGuard]},
      {path:'headers', component: WebsiteHeadersComponent, canActivate: [AuthGuard]},
      {path:'footers', component: WebsiteFootersComponent, canActivate: [AuthGuard]},
      {path:'navigation', component: WebsiteNavigationComponent, canActivate: [AuthGuard]},
      {path: ':website_id/details', component: WebsiteDetailsComponent, canActivate: [AuthGuard]},
      {path: 'marketplace', component: ComingSoonComponent, canActivate: [AuthGuard]},
      {path: ':website_id/pages', component: WebsitePagesComponent, canActivate: [AuthGuard]},
    ],
  canActivate: [AuthGuard] },

  // website 

  // funnels

  // { path: 'funnels', component: FunnelComponent,
  // children: [
  //   { path: '', component: FunnelsComponent, canActivate: [AuthGuard] },
  //   { path: 'build', component: BuildFunnelComponent, canActivate: [AuthGuard] },
  //   { path: 'archive', component: FunnelArchiveComponent, canActivate: [AuthGuard] },
  //   { path: 'marketplace', component: FunnelMarketplaceComponent, canActivate: [AuthGuard] },
  //   { path: ':funnel_id', component: FunnelWizardNavComponent, 
  //   children: [
  //     { path: 'steps/:step_id', component: CreateFunnelComponent, canActivate: [AuthGuard] },
  //     { path: 'stats', component: CreateFunnelStatsComponent, canActivate: [AuthGuard] },
  //     { path: 'contacts', component: CreateFunnelContactsComponent, canActivate: [AuthGuard] },
  //     { path: 'sales', component: CreateFunnelSalesComponent, canActivate: [AuthGuard] },
  //     { path: 'settings', component: CreateFunnelSettingsComponent, canActivate: [AuthGuard] }
  //   ],
  //   canActivate: [AuthGuard]},
  // ],
  // canActivate: [AuthGuard] },

  // funnels

  // new-funnels

  { path: 'funnels', component: NewFunnelComponent,
  children: [
    { path: '', component: NewFunnelsComponent, canActivate: [AuthGuard] },
    { path: 'all', component: NewFunnelsComponent, canActivate: [AuthGuard] },
    { path: 'build', component: NewFunnelBuildComponent, canActivate: [AuthGuard] },
    { path: 'archive', component: NewFunnelArchiveComponent, canActivate: [AuthGuard] },
  ],
  canActivate: [AuthGuard] },
{ path: 'funnels/:funnel_id', component: CreateNewFunnelsComponent,
children: [ 
{ path: 'steps/:step_id', component: NewFunnelStepsComponent, canActivate: [AuthGuard] },
// { path: 'steps/:step_id', component: CreateNewFunnelStepsComponent, canActivate: [AuthGuard] },
{ path: 'settings', component: FunnelSettingsComponent, canActivate: [AuthGuard] },
{ path: 'archive', component: FunnelStepArchiveComponent, canActivate: [AuthGuard] },
],
canActivate: [AuthGuard] },
  // new-funnels
  
  // sales 
  { path: 'sales', component: SalesComponent, 
  children: [
    { path: '', component:  ProductsComponent, canActivate: [AuthGuard] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
    { path: 'coupons', component: ComingSoonComponent, canActivate: [AuthGuard] },
    { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
    { path: 'affiliates', component: ComingSoonComponent, canActivate: [AuthGuard] },
  ],
  canActivate: [AuthGuard] },
  { path: 'sales/offer/:uniqueid', component: OfferComponent, canActivate: [AuthGuard] },
 
  // sales 
 
  // { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'domain', component: DomainComponent, canActivate: [AuthGuard] },

  // builder

  { path: 'builder/automation/:id', component: CrmAutomationBuilderComponent, canActivate: [AuthGuard] },
  { path: 'builder/email/:id', component: CrmEmailBuilderComponent, canActivate: [AuthGuard] },
  { path: 'builder/form/:id', component: CrmFormBuilderComponent, canActivate: [AuthGuard] },
  { path: 'builder/:target/:id', component: BuilderComponent, canActivate: [AuthGuard] },
  
  // builder
  
  // User Course
  { path: 'course/dashboard', component: CourseUserDashboardComponent},
  { path: 'course/login', component: CourseUserCourseLoginComponent},
  { path: 'course/forgot', component: CourseUserCourseForgotpassComponent},
  { path: 'course/:name', component: CourseUserCoursesComponent},
  { path: 'course/:name/:id', component: CourseUserModulesComponent},
  { path: 'course/:name/:id/posts/:postid', component: CourseUserModulesComponent},
  
  { path: 'checkout/:id', component: FunnelCheckoutComponent},

  // crm

  { path: 'fetch-form/:user_id/:form_id', component: CrmFormFetchComponent},

  { path: 'crm', component: CrmComponent, 
  children:[
    { path: '', component: CrmReportsComponent, canActivate: [AuthGuard] },
    { path: 'automations', component: CrmAutomationComponent, canActivate: [AuthGuard] },
    { path: 'campaigns', component: CrmCampaignsComponent, canActivate: [AuthGuard] },
    { path: 'contacts', component: CrmContactsComponent, canActivate: [AuthGuard] },
    { path: 'fields', component: CrmFieldsComponent, canActivate: [AuthGuard] },
    { path: 'forms', component: CrmFormsComponent, canActivate: [AuthGuard] },
    { path: 'lists', component: CrmListsComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: CrmReportsComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: CrmSettingsComponent, canActivate: [AuthGuard] },
    { path: 'tags', component: CrmTagsComponent, canActivate: [AuthGuard] },
    { path: 'emails', component: CrmEmailsComponent, canActivate: [AuthGuard] },
  ],
  canActivate: [AuthGuard] },
  { path: 'crm/contact/:uniqueid', component: CrmContactComponent, canActivate: [AuthGuard] },
  { path: 'crm/campaign/:uniqueid', component: CrmCampaignBuilderComponent, canActivate: [AuthGuard] },

  // crm

  // membership

  { path: 'membership', component: MembershipComponent,
    children:[
      { path: '', component: MembershipCoursesComponent, canActivate: [AuthGuard] },
      { path: 'course/:course_id', component: MembershipModulesComponent, canActivate: [AuthGuard] },
      { path: 'course/:course_id/module/:module_id/lesson/:lesson_id/:tab', component: MembershipLessonComponent, canActivate: [AuthGuard] },
      { path: 'course/:course_id/module/:module_id/lesson/:lesson_id', component: MembershipLessonComponent, canActivate: [AuthGuard] },
      { path: 'product', component: MembershipProductComponent, canActivate: [AuthGuard] }, // suspicious: not in used
      { path: 'offers', component: MembershipOffersComponent, canActivate: [AuthGuard] },
      { path: 'coupons', component: MembershipCouponsComponent, canActivate: [AuthGuard] },
      { path: 'payments', component: MembershipPaymentComponent, canActivate: [AuthGuard] },
      { path: 'members', component: MembershipMembersComponent, canActivate: [AuthGuard] },
      { path: 'tags', component: MembershipTagsComponent, canActivate: [AuthGuard] },
      { path: 'marketplace', component: MembershipMarketplaceComponent, canActivate: [AuthGuard] },
  ],
   canActivate: [AuthGuard] },

  // membership

      // Coming Soon links==>  ComingSoonComponent
  
    { path: 'analytics', component: ComingSoonComponent, canActivate: [AuthGuard] },
    { path: 'integrations', component: ComingSoonComponent, canActivate: [AuthGuard] },
    { path: 'heatmap', component: ComingSoonComponent, canActivate: [AuthGuard] },
    // { path: 'heatmaps-recordings', component: ComingSoonComponent, canActivate: [AuthGuard] },
  
    { path: 'strategies', component: ComingSoonComponent, canActivate: [AuthGuard] },
  
    // { path: 'membership', component: ComingSoonComponent, canActivate: [AuthGuard] }, 
  
    // { path: 'affiliates', component: ComingSoonComponent, canActivate: [AuthGuard] },
    // { path: 'affiliates-users', component: ComingSoonComponent, canActivate: [AuthGuard] },
    // { path: 'affiliates-commission', component: ComingSoonComponent, canActivate: [AuthGuard] },
    // { path: 'affiliates-transactions', component: ComingSoonComponent, canActivate: [AuthGuard] },
    // { path: 'affiliates-share', component: ComingSoonComponent, canActivate: [AuthGuard] },
    // { path: 'affiliates-announcements', component: ComingSoonComponent, canActivate: [AuthGuard] },
    // { path: 'affiliates-exports', component: ComingSoonComponent, canActivate: [AuthGuard] },
    // { path: 'affiliates-settings', component: ComingSoonComponent, canActivate: [AuthGuard] },
    // { path: 'integrations', component: ComingSoonComponent, canActivate: [AuthGuard] },

    // Coming Soon Features ==>

  // { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
  // { path: 'heatmap', component: HeatmapsComponent, canActivate: [AuthGuard] },
  // { path: 'heatmaps-recordings', component: HeatmapsRecordingsComponent, canActivate: [AuthGuard] },


  // { path: 'strategies', component: StrategiesComponent, canActivate: [AuthGuard] },


  // affiliate

  // { path: 'affiliates', component: AffiliatesComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-users', component: AffiliateUsersComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-commission', component: AffiliateCommissionComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-transactions', component: AffiliateTransactionsComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-share', component: AffiliateShareComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-announcements', component: AffiliateAnnouncementsComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-exports', component: AffiliateExportsComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-settings', component: AffiliateSettingsComponent, canActivate: [AuthGuard] },
  // { path: 'integrations', component: IntegrationsComponent, canActivate: [AuthGuard] },

  // affiliate

  // account-settings
  
  { path: 'account', component: AccountComponent,
  children: [
    { path: '', component: ProfileSettingsComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: ProfileSettingsComponent, canActivate: [AuthGuard] },
    { path: 'sign-in-security', component: SignInSecurityComponent, canActivate: [AuthGuard] },
    { path: 'billing', component: BillingComponent, canActivate: [AuthGuard] },
  ],
   canActivate: [AuthGuard] },
  //account-settings


  // page not found
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = 
  [
    FeedbackFormComponent,
    LoginComponent, 
    RegisterComponent, 
    ForgotPasswordComponent,
    DashboardComponent, 
    FunnelComponent,
    FunnelArchiveComponent,
    FunnelMarketplaceComponent,
    FunnelWizardNavComponent,
    StrategiesComponent,
    AnalyticsComponent,
    HeatmapsComponent,
    FunnelsComponent,
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
    MembershipCoursesComponent,
    MembershipModulesComponent,
    MembershipLessonComponent,
    MembershipComponent,
    MembershipProductComponent,
    MembershipOffersComponent,
    MembershipCouponsComponent,
    MembershipPaymentComponent,
    MembershipMembersComponent,
    MembershipTagsComponent,
    MembershipMarketplaceComponent,
    CrmFormsComponent,
    CrmFormFetchComponent,
    CrmEmailsComponent,
    CrmEmailBuilderComponent,
    CrmComponent,
    CrmCampaignsComponent,
    CrmContactsComponent,
    CrmContactComponent,
    CrmListsComponent,
    CrmTagsComponent,
    CrmReportsComponent,
    CrmSettingsComponent,
    CrmCampaignBuilderComponent,
    CrmAutomationComponent,
    CrmAutomationBuilderComponent,
    CrmAutomationWorkflowComponent, 
    AffiliatesComponent,
    AffiliateUsersComponent,
    AffiliateCommissionComponent,
    AffiliateTransactionsComponent,
    AffiliateShareComponent,
    AffiliateAnnouncementsComponent,
    AffiliateExportsComponent,
    AffiliateSettingsComponent,
    WebsiteComponent,
    WebsitePagesComponent,
    WebsiteDesignComponent,
    WebsiteDetailsComponent,
    WebsiteMarketplaceComponent,
    WebsiteHeadersComponent,
    WebsiteFootersComponent,
    WebsiteNavigationComponent,
    IntegrationsComponent,
    CrmFormBuilderComponent,
    BuilderTopbarComponent,
    ImageComponent,
    CourseUserDashboardComponent,
    CourseUserCoursesComponent,
    CourseUserModulesComponent,
    CourseUserModulesSidebarComponent,
    CourseUserModulesBoardComponent,
    CourseUserModulesPostComponent,
    CourseUserCourseLoginComponent,
    CourseUserCourseHeaderComponent,
    CourseUserCourseForgotpassComponent,
    ComingSoonComponent,
    FunnelCheckoutComponent,
    WebsitesComponent,
    CrmFieldsComponent,
    SalesComponent,
    PaymentComponent,
    ProductsComponent,
    OffersComponent,
    OfferComponent,
    DomainComponent,
    AccountComponent,
    BillingComponent, 
    ProfileSettingsComponent,
    SignInSecurityComponent,
    NewFunnelsComponent,
    NewFunnelComponent,
    NewFunnelBuildComponent,
    NewFunnelArchiveComponent,
    CreateNewFunnelsComponent,
    FunnelSettingsComponent,
    FunnelStepArchiveComponent,
    NewFunnelStepsComponent,
  ];

