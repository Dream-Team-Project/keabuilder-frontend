import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guard/auth.guard';
import { BuilderComponent } from './builder/builder.component';
import { BuilderSettingComponent } from './builder-setting/builder-setting.component';
import { BulderWireframeComponent } from './bulder-wireframe/bulder-wireframe.component';
import { FunnelComponent } from './funnel/funnel.component';
import { FunnelArchiveComponent } from './funnel-archive/funnel-archive.component';
import { FunnelMarketplaceComponent } from './funnel-marketplace/funnel-marketplace.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HeatmapsComponent } from './heatmaps/heatmaps.component';
import { AllFunnelsComponent } from './all-funnels/all-funnels.component';
import { BuildFunnelComponent } from './build-funnel/build-funnel.component';
import { CreateFunnelComponent } from './create-funnel/create-funnel.component';
import { CreateFunnelStatsComponent } from './create-funnel-stats/create-funnel-stats.component';
import { CreateFunnelContactsComponent } from './create-funnel-contacts/create-funnel-contacts.component';
import { CreateFunnelSalesComponent } from './create-funnel-sales/create-funnel-sales.component';
import { CreateFunnelSettingsComponent } from './create-funnel-settings/create-funnel-settings.component';
import { HeatmapsRecordingsComponent } from './heatmaps-recordings/heatmaps-recordings.component';
import { CoursesComponent } from './courses/courses.component';
import { ModulesComponent } from './modules/modules.component';
import { LessonComponent } from './lesson/lesson.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipProductComponent } from './membership-product/membership-product.component';
import { MembershipOffersComponent } from './membership-offers/membership-offers.component';
import { MembershipCouponsComponent } from './membership-coupons/membership-coupons.component';
import { MembershipPaymentComponent } from './membership-payment/membership-payment.component';
import { MembershipMembersComponent } from './membership-members/membership-members.component';
import { MembershipTagsComponent } from './membership-tags/membership-tags.component';
import { MembershipMarketplaceComponent } from './membership-marketplace/membership-marketplace.component';
import { FormSubmissionsComponent } from './form-submissions/form-submissions.component';
import { FormFetchComponent } from './form-fetch/form-fetch.component';
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
import { WebsiteComponent } from './website/website.component';
import { WebsitePagesComponent } from './website-pages/website-pages.component';
import { WebsiteDesignComponent } from './website-design/website-design.component';
import { WebsiteDetailsComponent } from './website-details/website-details.component';
import { WebsiteMarketplaceComponent } from './website-marketplace/website-marketplace.component';
import { WebsiteHeadersComponent } from './website-headers/website-headers.component';
import { WebsiteFootersComponent } from './website-footers/website-footers.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { FunnelWizardNavComponent } from './funnel-wizard-nav/funnel-wizard-nav.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { BuilderTopbarComponent } from './builder-topbar/builder-topbar.component';
import { ImageComponent } from './image/image.component';
import { CourseUserDashboardComponent } from './course-user/dashboard/dashboard.component';
import { CourseUserCoursesComponent } from './course-user/courses/courses.component';
import { CourseUserModulesComponent } from './course-user/modules/modules.component';
import { CourseUserModulesSidebarComponent } from './course-user/modules-sidebar/modules-sidebar.component';
import { CourseUserModulesBoardComponent } from './course-user/modules-board/modules-board.component';
import { CourseUserModulesPostComponent } from './course-user/modules-post/modules-post.component';
import { CourseUserCourseLoginComponent } from './course-user/course-login/course-login.component';
import { CourseUserCourseHeaderComponent } from './course-user/course-header/course-header.component';
import { CourseUserCourseForgotpassComponent } from './course-user/course-forgotpass/course-forgotpass.component';
import { DashboardNewComponent } from './dashboard-new/dashboard-new.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { FunnelCheckoutComponent } from './funnel-checkout/funnel-checkout.component';
import { AllWebsitesComponent } from './all-websites/all-websites.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';

import { CrmContactViewComponent } from './crm-contact-view/crm-contact-view.component';
import { CrmNewCampaignComponent } from './crm-new-campaign/crm-new-campaign.component';
import { CrmSmtpComponent } from './crm-smtp/crm-smtp.component';
import { CrmAutomationComponent } from './crm-automation/crm-automation.component';
import { CrmAutomationBuilderComponent } from './crm-automation-builder/crm-automation-builder.component';

const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  // website 
  {path: 'websites', component: WebsiteComponent,
    children: [
      // {path: '', component: WebsiteDesignComponent, canActivate: [AuthGuard]},
      {path: '', component: AllWebsitesComponent, canActivate: [AuthGuard]},
      {path:'pages', component: WebsitePagesComponent, canActivate: [AuthGuard]},
      {path:'headers', component: WebsiteHeadersComponent, canActivate: [AuthGuard]},
      {path:'footers', component: WebsiteFootersComponent, canActivate: [AuthGuard]},
      {path:'navigation', component: NavigationComponent, canActivate: [AuthGuard]},
      {path: ':website_id/details', component: WebsiteDetailsComponent, canActivate: [AuthGuard]},
      {path: 'marketplace', component: ComingSoonComponent, canActivate: [AuthGuard]},
      {path: ':website_id/pages', component: WebsitePagesComponent, canActivate: [AuthGuard]},
    ],
  canActivate: [AuthGuard] },

  // funnels
  { path: 'funnels', component: FunnelComponent,
  children: [
    { path: '', component: AllFunnelsComponent, canActivate: [AuthGuard] },
    // { path: ':uniqueid', component: AllFunnelsComponent, canActivate: [AuthGuard] },
    { path: 'build', component: BuildFunnelComponent, canActivate: [AuthGuard] },
    { path: 'archive', component: FunnelArchiveComponent, canActivate: [AuthGuard] },
    { path: 'marketplace', component: FunnelMarketplaceComponent, canActivate: [AuthGuard] },
    { path: ':funnel_id', component: FunnelWizardNavComponent, 
    children: [
      { path: 'steps/:step_id', component: CreateFunnelComponent, canActivate: [AuthGuard] },
      { path: 'stats', component: CreateFunnelStatsComponent, canActivate: [AuthGuard] },
      { path: 'contacts', component: CreateFunnelContactsComponent, canActivate: [AuthGuard] },
      { path: 'sales', component: CreateFunnelSalesComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: CreateFunnelSettingsComponent, canActivate: [AuthGuard] }
    ],
    canActivate: [AuthGuard]},
  ],
  canActivate: [AuthGuard] },

  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'domain', component: DomainComponent, canActivate: [AuthGuard] },
  
  // Coming Soon links==>  ComingSoonComponent
  
  { path: 'analytics', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'heatmap', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'heatmaps-recordings', component: ComingSoonComponent, canActivate: [AuthGuard] },

  { path: 'strategies', component: ComingSoonComponent, canActivate: [AuthGuard] },

  { path: 'membership', component: ComingSoonComponent, canActivate: [AuthGuard] }, 

  // { path: 'crm', component: ComingSoonComponent, canActivate: [AuthGuard] },
  // { path: 'crm-campaigns', component: ComingSoonComponent, canActivate: [AuthGuard] },
  // { path: 'crm-contacts', component: ComingSoonComponent, canActivate: [AuthGuard] },
  // { path: 'crm-lists', component: ComingSoonComponent, canActivate: [AuthGuard] },
  // { path: 'crm-tags', component: ComingSoonComponent, canActivate: [AuthGuard] },
  // { path: 'crm-reports', component: ComingSoonComponent, canActivate: [AuthGuard] },
  // { path: 'crm-settings', component: ComingSoonComponent, canActivate: [AuthGuard] },

  { path: 'affiliates', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-users', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-commission', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-transactions', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-share', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-announcements', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-exports', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'affiliates-settings', component: ComingSoonComponent, canActivate: [AuthGuard] },
  { path: 'integrations', component: ComingSoonComponent, canActivate: [AuthGuard] },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

  // builder routes
  { path: 'builder/automation/:id', component: CrmAutomationBuilderComponent, canActivate: [AuthGuard] },
  { path: 'builder/form/:id', component: FormBuilderComponent, canActivate: [AuthGuard] },
  { path: 'builder/:target/:id', component: BuilderComponent, canActivate: [AuthGuard] },
  
  // User Course
  { path: 'course/dashboard', component: CourseUserDashboardComponent},
  { path: 'course/login', component: CourseUserCourseLoginComponent},
  { path: 'course/forgot', component: CourseUserCourseForgotpassComponent},
  { path: 'course/:name', component: CourseUserCoursesComponent},
  { path: 'course/:name/:id', component: CourseUserModulesComponent},
  { path: 'course/:name/:id/posts/:postid', component: CourseUserModulesComponent},
  
  { path: 'dashboard-new', component: DashboardNewComponent},
  
  { path: 'checkout/:id', component: FunnelCheckoutComponent},
  


  // Coming Soon Features ==>

  // { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
  // { path: 'heatmap', component: HeatmapsComponent, canActivate: [AuthGuard] },
  // { path: 'heatmaps-recordings', component: HeatmapsRecordingsComponent, canActivate: [AuthGuard] },


  // { path: 'strategies', component: StrategiesComponent, canActivate: [AuthGuard] },

  // Membership

  // { path: 'membership', component: MembershipComponent,
  //   children:[
  //     { path: '', component: CoursesComponent, canActivate: [AuthGuard] },
  //     { path: 'course/:course_id', component: ModulesComponent, canActivate: [AuthGuard] },
  //     { path: 'course/:course_id/module/:module_id/lesson/:lesson_id/:tab', component: LessonComponent, canActivate: [AuthGuard] },
  //     { path: 'course/:course_id/module/:module_id/lesson/:lesson_id', component: LessonComponent, canActivate: [AuthGuard] },
  //     { path: 'product', component: MembershipProductComponent, canActivate: [AuthGuard] }, // suspicious: not in used
  //     { path: 'offers', component: MembershipOffersComponent, canActivate: [AuthGuard] },
  //     { path: 'coupons', component: MembershipCouponsComponent, canActivate: [AuthGuard] },
  //     { path: 'payments', component: MembershipPaymentComponent, canActivate: [AuthGuard] },
  //     { path: 'members', component: MembershipMembersComponent, canActivate: [AuthGuard] },
  //     { path: 'tags', component: MembershipTagsComponent, canActivate: [AuthGuard] },
  //     { path: 'marketplace', component: MembershipMarketplaceComponent, canActivate: [AuthGuard] },
  // ],
  //  canActivate: [AuthGuard] },

  // crm

  { path: 'fetch-form/:user_id/:form_id', component: FormFetchComponent},

  { path: 'crm', component: CrmComponent, 
  children:[
    { path: 'campaigns', component: CrmCampaignsComponent, canActivate: [AuthGuard] },
    { path: 'automations', component: CrmAutomationComponent, canActivate: [AuthGuard] },
    { path: 'smtp', component: CrmSmtpComponent, canActivate: [AuthGuard] },
    { path: 'newcampaign/:uniqueid', component: CrmNewCampaignComponent, canActivate: [AuthGuard] },
    { path: 'contacts', component: CrmContactsComponent, canActivate: [AuthGuard] },
    { path: 'contact/view/:uniqueid', component: CrmContactViewComponent, canActivate: [AuthGuard] },
    { path: 'contacts/:uniqueid/:name', component: CrmContactsComponent, canActivate: [AuthGuard] },
    // { path: 'contacts/view/:uniqueid', component: CrmContactsViewComponent, canActivate: [AuthGuard] },
    { path: 'lists', component: CrmListsComponent, canActivate: [AuthGuard] },
    { path: 'tags', component: CrmTagsComponent, canActivate: [AuthGuard] },
    { path: '', component: CrmReportsComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: CrmReportsComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: CrmSettingsComponent, canActivate: [AuthGuard] },
    { path: 'form/submissions/:form_id', component: FormSubmissionsComponent, canActivate: [AuthGuard] },
    { path: 'forms', component: FormsComponent, canActivate: [AuthGuard] },
    { path: 'fields', component: FormFieldsComponent, canActivate: [AuthGuard] },
  ],
  canActivate: [AuthGuard] },
  // { path: 'affiliates', component: AffiliatesComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-users', component: AffiliateUsersComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-commission', component: AffiliateCommissionComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-transactions', component: AffiliateTransactionsComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-share', component: AffiliateShareComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-announcements', component: AffiliateAnnouncementsComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-exports', component: AffiliateExportsComponent, canActivate: [AuthGuard] },
  // { path: 'affiliates-settings', component: AffiliateSettingsComponent, canActivate: [AuthGuard] },
  // { path: 'integrations', component: IntegrationsComponent, canActivate: [AuthGuard] },



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
    ForgetPasswordComponent,
    DashboardComponent, 
    FunnelComponent,
    FunnelArchiveComponent,
    FunnelMarketplaceComponent,
    FunnelWizardNavComponent,
    StrategiesComponent,
    AnalyticsComponent,
    HeatmapsComponent,
    AllFunnelsComponent,
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
    CoursesComponent,
    ModulesComponent,
    LessonComponent,
    MembershipComponent,
    MembershipProductComponent,
    MembershipOffersComponent,
    MembershipCouponsComponent,
    MembershipPaymentComponent,
    MembershipMembersComponent,
    MembershipTagsComponent,
    MembershipMarketplaceComponent,
    FormsComponent,
    FormFetchComponent,
    FormSubmissionsComponent,
    DomainComponent,
    PaymentComponent,
    CrmComponent,
    CrmCampaignsComponent,
    CrmContactsComponent,
    CrmContactViewComponent,
    CrmListsComponent,
    CrmTagsComponent,
    CrmReportsComponent,
    CrmSettingsComponent,
    CrmNewCampaignComponent,
    CrmSmtpComponent,
    CrmAutomationComponent,
    CrmAutomationBuilderComponent,
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
    NavigationComponent,
    IntegrationsComponent,
    FormBuilderComponent,
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
    AllWebsitesComponent,
    FormFieldsComponent
  ];

