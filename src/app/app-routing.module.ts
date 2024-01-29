import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';
import { SignedInGuard } from './_guard/signed-in.guard';
import { MemberAuthGuard } from './_guard/member-auth.guard';
import { MemberSignedGuard } from './_guard/member-signed.guard';
import { environment } from 'src/environments/environment';

// import { AnalyticsComponent } from './_components/analytics/analytics.component';
import { ComingSoonComponent } from './_components/coming-soon/coming-soon.component';
// import { DomainComponent } from './_components/domain/domain.component';
// import { UpdateDnsComponent } from './_components/update-dns/update-dns.component';
import { FeedbackFormComponent } from './_components/feedback-form/feedback-form.component';
// import { ImageComponent } from './_components/image/image.component';
// import { IntegrationsComponent } from './_components/integrations/integrations.component';
// import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { StrategiesComponent } from './_components/strategies/strategies.component';
// import { ScrumBoardsComponent } from './_components/scrumboard/scrum-boards/scrum-boards.component';
// import { ScrumBoardListComponent } from './_components/scrumboard/scrum-board-list/scrum-board-list.component';

// auth
// import { DashboardComponent } from './_components/dashboard/dashboard.component';
// import { ForgotPasswordComponent } from './_components/_auth/forgot-password/forgot-password.component';
// import { LoginComponent } from './_components/_auth/login/login.component';
// import { ProfileComponent } from './_components/_auth/profile/profile.component';
// import { RegisterComponent } from './_components/_auth/register/register.component';
// auth
// builder
// import { TemplateComponent } from './_components/_builder/template/template.component';
import { BuilderComponent } from './_components/_builder/builder/builder.component';
// import { BuilderSettingComponent } from './_components/_builder/builder-setting/builder-setting.component';
// import { BuilderTopbarComponent } from './_components/_builder/builder-topbar/builder-topbar.component';
// import { BulderWireframeComponent } from './_components/_builder/bulder-wireframe/bulder-wireframe.component';
// import { PageViewComponent } from './_components/page-view/page-view.component';
// import { FetchMenuComponent } from './_components/_builder/fetch-menu/fetch-menu.component';
// builder
// websites
import { WebsiteComponent } from './_components/_websites/website/website.component';
// import { WebsitesComponent } from './_components/_websites/websites/websites.component';
// import { WebsiteDetailsComponent } from './_components/_websites/details/details.component';
// import { WebsiteFootersComponent } from './_components/_websites/footers/footers.component';
// import { WebsiteHeadersComponent } from './_components/_websites/headers/headers.component';
// import { WebsiteNavigationComponent } from './_components/_websites/navigation/navigation.component';
// import { WebsitePagesComponent } from './_components/_websites//pages/pages.component';
// import { WebpagesArchiveComponent } from './_components/_websites/webpages-archive/webpages-archive.component';
// import { WebsiteDesignComponent } from './_components/_websites/design/design.component';
// import { WebsiteMarketplaceComponent } from './_components/_websites/marketplace/marketplace.component';
// websites

// funnels
import { FunnelComponent } from './_components/_funnels/funnel/funnel.component';
// import { FunnelsComponent } from './_components/_funnels/funnels/funnels.component';
// import { FunnelBuildComponent } from './_components/_funnels/funnel-build/funnel-build.component';
// import { FunnelArchiveComponent } from './_components/_funnels/funnel-archive/funnel-archive.component';
import { CreateFunnelsComponent } from './_components/_funnels/create-funnels/create-funnels.component';
// import { FunnelSettingsComponent } from './_components/_funnels/funnel-settings/funnel-settings.component';
// import { FunnelStepArchiveComponent } from './_components/_funnels/funnel-step-archive/funnel-step-archive.component';
// import { FunnelStepsComponent } from './_components/_funnels/funnel-steps/funnel-steps.component';
// import { FunnelCheckoutComponent } from './_components/_funnels/funnel-checkout/funnel-checkout.component';
// import { FunnelStepSettingsComponent } from './_components/_funnels/funnel-step-settings/funnel-step-settings.component';
// funnels

// crm
import { CrmComponent } from './_components/_crm/crm/crm.component';
// import { CrmAutomationComponent } from './_components/_crm/automation/automation.component';
// import { CrmAutomationBuilderComponent } from './_components/_crm/automation-builder/automation-builder.component';
// import { CrmAutomationWorkflowComponent } from './_components/_crm/automation-workflow/automation-workflow.component';
// import { CrmCampaignBuilderComponent } from './_components/_crm/campaign-builder/campaign-builder.component';
// import { CrmCampaignsComponent } from './_components/_crm/campaigns/campaigns.component';
// import { CrmContactComponent } from './_components/_crm/contact/contact.component';
// import { CrmContactsComponent } from './_components/_crm/contacts/contacts.component';
// import { CrmFieldsComponent } from './_components/_crm/fields/fields.component';
// import { CrmFormBuilderComponent } from './_components/_crm/form-builder/form-builder.component';
// import { CrmFormFetchComponent } from './_components/_crm/form-fetch/form-fetch.component';
// import { CrmFormsComponent } from './_components/_crm/forms/forms.component';
// import { CrmListsComponent } from './_components/_crm/lists/lists.component';
// import { CrmReportsComponent } from './_components/_crm/reports/reports.component';
// import { CrmSettingsComponent } from './_components/_crm/settings/settings.component';
// import { CrmTagsComponent } from './_components/_crm/tags/tags.component';
// import { CrmEmailsComponent } from './_components/_crm/emails/emails.component';
// import { CrmEmailBuilderComponent } from './_components/_crm/email-builder/email-builder.component';
// crm
// membership
// import { MembershipCoursesComponent } from './_components/_membership/courses/courses.component';
// import { MembershipModulesComponent } from './_components/_membership/modules/modules.component';
// import { MembershipLessonComponent } from './_components/_membership/lesson/lesson.component';
import { MembershipComponent } from './_components/_membership/membership/membership.component';
// import { MembershipProductComponent } from './_components/_membership/product/product.component';
// import { MembershipOffersComponent } from './_components/_membership/offers/offers.component';
// import { MembershipCouponsComponent } from './_components/_membership/coupons/membership-coupons.component';
// import { MembershipPaymentComponent } from './_components/_membership/payment/payment.component';
// import { MembershipMembersComponent } from './_components/_membership/members/members.component';
// import { MembershipTagsComponent } from './_components/_membership/tags/tags.component';
// import { MembershipMarketplaceComponent } from './_components/_membership/marketplace/marketplace.component';
// import { MembershipReportsComponent } from './_components/_membership/membership-reports/membership-reports.component';
// import { MembershipCustomizationComponent } from './_components/_membership/membership-customization/membership-customization.component';
// import { CourseSettingsComponent } from './_components/_membership/course-settings/course-settings.component';
// affiliate
// import { AffiliatesComponent } from './_components/_affiliate/affiliates/affiliates.component';
// import { AffiliateUsersComponent } from './_components/_affiliate/users/users.component';
// import { AffiliateCommissionComponent } from './_components/_affiliate/commission/commission.component';
// import { AffiliateTransactionsComponent } from './_components/_affiliate/transactions/transactions.component';
// import { AffiliateShareComponent } from './_components/_affiliate/share/share.component';
// import { AffiliateAnnouncementsComponent } from './_components/_affiliate/announcements/announcements.component';
// import { AffiliateExportsComponent } from './_components/_affiliate/exports/exports.component';
// import { AffiliateSettingsComponent } from './_components/_affiliate/settings/settings.component';
// affiliate
// heatmap
import { HeatmapsComponent } from './_components/_heatmap/heatmaps/heatmaps.component';
// import { HeatmapsRecordingsComponent } from './_components/_heatmap/recordings/recordings.component';
// import { HeatmapViewComponent } from './_components/_heatmap/heatmap-view/heatmap-view';
// heatmap
// sales
import { SalesComponent } from './_components/_sales/sales/sales.component';
// import { PaymentComponent } from './_components/_sales/payment/payment.component';
// import { ProductsComponent } from './_components/_sales/products/products.component';
// import { OffersComponent } from './_components/_sales/offers/offers.component';
// import { OfferComponent } from './_components/_sales/offer/offer.component';
// import { CheckoutComponent } from './_components/_sales/checkout/checkout.component';
// import { OrderFormComponent } from './_components/_sales/orderform/orderform.component';
// import { OrderFormCheckoutComponent } from './_components/_sales/orderform/checkout/checkout.component';
// sales

// account-setting

import { AccountComponent } from './_components/_account-settings/account/account.component';
import { LoginComponent } from './_components/_auth/login/login.component';
import { DomainComponent } from './_components/domain/domain.component';
import { ScrumBoardsComponent } from './_components/scrumboard/scrum-boards/scrum-boards.component';
import { CrmFormFetchComponent } from './_components/_crm/form-fetch/form-fetch.component';
import { NewMembershipComponent } from './_components/_membership/new-membership/new-membership.component';
import { PageViewComponent } from './_components/page-view/page-view.component';
// import { ProfileSettingsComponent } from './_components/_account-settings/profile-settings/profile-settings.component';
// import { SignInSecurityComponent } from './_components/_account-settings/sign-in-security/sign-in-security.component';
// import { BillingComponent } from './_components/_account-settings/billing/billing.component';
// import { ViewplansComponent } from './_components/_account-settings/viewplans/viewplans.component';
// import { NewMembershipComponent } from './_components/_membership/new-membership/new-membership.component';

//account-settings

//default page view
// import { DefaultPageViewComponent } from './_components/default-page-view/default-page-view.component';
//default page view

// member-routes
// import { MemberForgotPasswordComponent } from './_components/course-user/member-forgot-password/member-forgot-password.component';
// import { ViewLessonComponent } from './_components/_membership/view-lesson/view-lesson.component';
// import { ViewCourseComponent } from './_components/_membership/view-course/view-course.component';
// import { CourseSidebarComponent } from './_components/_membership/course-sidebar/course-sidebar.component';
// import { MemberProfileSettingsComponent } from './_components/course-user/member-profile-settings/member-profile-settings.component';
// import { MemberSignInSecurityComponent } from './_components/course-user/member-sign-in-security/member-sign-in-security.component';
// import { MemberBillingComponent } from './_components/course-user/member-billing/member-billing.component';
// import { MembershipComponent } from './_components/_membership/membership/membership.component';
// member-routes

const currentDomain:any = window.location.hostname;
const currentPath:any = window.location.pathname;
const appHost:any = environment.appHost;

var routes: Routes = [];

if (currentDomain === appHost) {
  routes = [
    { path: '', loadChildren: () => import('./_modules/auth.module').then(m => m.AuthModule)},
    { path: 'fetch-form/:user_id/:form_id',component: CrmFormFetchComponent,  loadChildren: () => import('./_modules/formfetch.module').then(m => m.FormfetchModule),canActivate: [AuthGuard]},
    { path: 'fetch-orderform',loadChildren: () => import('./_modules/funnel-checkout.module').then(m => m.FunnelCheckoutModule),canActivate: [AuthGuard]},
    { path: 'websites',component: WebsiteComponent, loadChildren: () => import('./_modules/website.module').then(m => m.WebsiteModule), canActivate: [AuthGuard] },
    { path: 'funnels',component: FunnelComponent,  loadChildren: () => import('./_modules/funnel.module').then(m => m.FunnelModule), canActivate: [AuthGuard] },
    { path: 'funnels/:funnel_id',component: CreateFunnelsComponent,  loadChildren: () => import('./_modules/funnel-edit.module').then(m => m.FunnelEditModule), canActivate: [AuthGuard] },
    { path: 'membership',component: MembershipComponent, loadChildren: () => import('./_modules/membership.module').then(m => m.MembershipModule), canActivate: [AuthGuard] },
    { path: 'new-membership',component: NewMembershipComponent, loadChildren: () => import('./_modules/new-membership.module').then(m => m.NewMembershipModule), canActivate: [AuthGuard] },
    { path: 'crm',component: CrmComponent, loadChildren: () => import('./_modules/crm.module').then(m => m.CrmModule), canActivate: [AuthGuard] },
    { path: 'crm/fields',component: CrmComponent, loadChildren: () => import('./_modules/crm-form-fields.module').then(m => m.CrmFormFieldsModule), canActivate: [AuthGuard] },
    { path: 'crm/contact/:uniqueid', loadChildren: () => import('./_modules/crm-contact.module').then(m => m.CrmContactModule), canActivate: [AuthGuard] },
    { path: 'sales/orderform',component: SalesComponent, loadChildren: () => import('./_modules/orderform.module').then(m => m.OrderformModule), canActivate: [AuthGuard] },
    { path: 'sales/orderform/:id',loadChildren: () => import('./_modules/sales-order-form-edit.module').then(m => m.SalesOrderFormEditModule), canActivate: [AuthGuard] },
    { path: 'sales/offer/:uniqueid', loadChildren: () => import('./_modules/sales-offer.module').then(m => m.SalesOfferModule), canActivate: [AuthGuard] },
    { path: 'sales',component: SalesComponent,  loadChildren: () => import('./_modules/sale.module').then(m => m.SaleModule), canActivate: [AuthGuard] },
    { path: 'domain',loadChildren: () => import('./_modules/domain.module').then(m => m.DomainModule), canActivate: [AuthGuard] },
    { path: 'scrumboard',loadChildren: () => import('./_modules/scrumboard.module').then(m => m.ScrumboardModule), canActivate: [AuthGuard] },
    { path: 'heatmap',component: HeatmapsComponent,loadChildren: () => import('./_modules/heatmap.module').then(m => m.HeatmapModule), canActivate: [AuthGuard] },
    { path: 'account',component: AccountComponent, loadChildren: () => import('./_modules/account-setting.module').then(m => m.AccountSettingModule), canActivate: [AuthGuard] },
    // { path: 'affiliates', component: AffiliatesComponent, loadChildren: () => import('./_modules/affiliate.module').then(m => m.AffiliateModule), canActivate: [AuthGuard] },
    { path: 'builder',loadChildren: () => import('./_modules/crm-builders.module').then(m => m.CrmBuildersModule), canActivate: [AuthGuard] },
    { path: 'builder/:target/:id',component: BuilderComponent, loadChildren: () => import('./_modules/builder.module').then(m => m.BuilderModule), canActivate: [AuthGuard] },
    { path: 'preview',component: PageViewComponent, loadChildren: () => import('./_modules/pageview.module').then(m => m.PageviewModule), canActivate: [AuthGuard] },
    { path: '**', loadChildren: () => import('./_modules/pageview.module').then(m => m.PageviewModule), canActivate: [AuthGuard] , data: {
      domain: currentDomain,
      path: currentPath,
    }
  },
    // { path: 'scrumboardlist/:id', component:ScrumBoardListComponent, canActivate: [AuthGuard] },
   

    
    // 8YvA7kPbR2mX3uHwS6JnQgZtF4cV5xWp-c2BnRw5OzY7Lx3XmJq9UgCpHm4KfP6iA-9EhPvFjK1sQr4TlWnXzR3uY6Dg2mC8bV -  secret url for registration
    
    // auth

    // website 
     // {path: 'websites', component: WebsiteComponent,
    //   children: [
    //     {path: '', component: WebsiteDesignComponent, canActivate: [AuthGuard]},
    //     {path: '', component: WebsitesComponent, canActivate: [AuthGuard]},
    //     {path: 'all', component: WebsitesComponent, canActivate: [AuthGuard]},
    //     {path:'pages', component: WebsitePagesComponent, canActivate: [AuthGuard]},
    //     {path:'headers', component: WebsiteHeadersComponent, canActivate: [AuthGuard]},
    //     {path:'footers', component: WebsiteFootersComponent, canActivate: [AuthGuard]},
    //     {path:'navigation', component: WebsiteNavigationComponent, canActivate: [AuthGuard]},
    //     {path: ':website_id/details', component: WebsiteDetailsComponent, canActivate: [AuthGuard]},
    //     {path: 'marketplace', component: ComingSoonComponent, canActivate: [AuthGuard]},
    //     {path: ':website_id/pages', component: WebsitePagesComponent, canActivate: [AuthGuard]},
    //     {path: ':website_id/pages/archive', component: WebpagesArchiveComponent, canActivate: [AuthGuard]},
    //     {path: 'pages/archive', component: WebpagesArchiveComponent, canActivate: [AuthGuard]},
    //   ],
    // canActivate: [AuthGuard] },

    // website 

   
    // funnels

  //   { path: 'funnels', component: FunnelComponent,
  //   children: [
  //     { path: '', component: FunnelsComponent, canActivate: [AuthGuard] },
  //     { path: 'all', component: FunnelsComponent, canActivate: [AuthGuard] },
  //     { path: 'build', component: FunnelBuildComponent, canActivate: [AuthGuard] },
  //     { path: 'archive', component: FunnelArchiveComponent, canActivate: [AuthGuard] },
  //   ],
  //   canActivate: [AuthGuard] },
  // { path: 'funnels/:funnel_id', component: CreateFunnelsComponent,
  // children: [ 
  //   { path: 'steps/:step_id', component: FunnelStepsComponent, canActivate: [AuthGuard] },
  //   // { path: 'steps/:step_id', component: CreateNewFunnelStepsComponent, canActivate: [AuthGuard] },
  //   { path: 'settings', component: FunnelSettingsComponent, canActivate: [AuthGuard] },
  //   { path: 'archive', component: FunnelStepArchiveComponent, canActivate: [AuthGuard] },
  // ],
  // canActivate: [AuthGuard] },
  // { path: 'funnels/step/settings/:step_id', component: FunnelStepSettingsComponent, canActivate: [AuthGuard] },
    // funnels
    

    // sales 
   
  
    // { path: 'sales', component: SalesComponent, 
    // children: [
    //   { path: '', component:  OffersComponent, canActivate: [AuthGuard] },
    //   { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
    //   { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
    //   { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
    //   // { path: 'coupons', component: ComingSoonComponent, canActivate: [AuthGuard] },
    //   // { path: 'affiliates', component: ComingSoonComponent, canActivate: [AuthGuard] },
    //   { path: 'orderform', component: OrderFormComponent, canActivate: [AuthGuard] },
    // ],
    // canActivate: [AuthGuard] },
    // { path: 'sales/orderform/:id', component: OrderFormCheckoutComponent, canActivate: [AuthGuard] },
    // { path: 'sales/offer/:uniqueid', component: OfferComponent, canActivate: [AuthGuard] },
    // { path: 'builder/checkout/:id', component: CheckoutComponent, canActivate: [AuthGuard] },
  
    // sales 
  
    // { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
    
    // { path: 'domain/update/:uniqueid', component: UpdateDnsComponent, canActivate: [AuthGuard] },

    // builder

    // { path: 'builder/automation/:id', component: CrmAutomationBuilderComponent, canActivate: [AuthGuard] },
    // { path: 'builder/email/:id', component: CrmEmailBuilderComponent, canActivate: [AuthGuard] },
    // { path: 'builder/form/:id', component: CrmFormBuilderComponent, canActivate: [AuthGuard] },
    // { path: 'builder/:target/:id', component: BuilderComponent, canActivate: [AuthGuard] },
    // { path: 'preview/:view_target/:template_id', loadComponent: () => import('./_modules/pageview.module').then(m => m.PageviewModule), canActivate: [AuthGuard] },
    
    // { path: 'preview/:view_target/:template_id', component: PageViewComponent, pathMatch: 'full', data: {
    //   domain: currentDomain,
    //   path: currentPath,
    // }},
    // { path: 'preview/:view_target/:user_id/:page_id', component: PageViewComponent, pathMatch: 'full', data: {
    //   domain: currentDomain,
    //   path: currentPath,
    // }},
    // { path: 'preview/:view_target/:user_id/:website_id/:page_id', component: PageViewComponent, pathMatch: 'full', data: {
    //   domain: currentDomain,
    //   path: currentPath,
    // }},
    // { path: 'member/:course_id/:module_id/:lesson_id', component : ViewLessonComponent,canActivate: [AuthGuard]},
    // { path: 'member/:course_id', component : ViewCourseComponent,canActivate: [AuthGuard]},


     // member-account-settings
     
      //  { path: 'profile/settings', component: MemberProfileSettingsComponent, canActivate: [AuthGuard] },
      //  { path: 'profile/sign-in-security', component: MemberSignInSecurityComponent, canActivate: [AuthGuard] },
      //  { path: 'profile/billing', component: MemberBillingComponent, canActivate: [AuthGuard]},
    
     //member-account-settings
    
    // builder
    // { path: 'fetch-orderform/:id', component: FunnelCheckoutComponent},

    // crm
   
    // { path: 'fetch-form/:user_id/:form_id', component: CrmFormFetchComponent},

    // { path: 'crm', component: CrmComponent, 
    // children:[
    //   { path: '', component: CrmReportsComponent, canActivate: [AuthGuard] },
    //   { path: 'automations', component: CrmAutomationComponent, canActivate: [AuthGuard] },
    //   { path: 'campaigns', component: CrmCampaignsComponent, canActivate: [AuthGuard] },
    //   { path: 'contacts', component: CrmContactsComponent, canActivate: [AuthGuard] },
    //   { path: 'fields', component: CrmFieldsComponent, canActivate: [AuthGuard] },
    //   { path: 'forms', component: CrmFormsComponent, canActivate: [AuthGuard] },
    //   { path: 'lists', component: CrmListsComponent, canActivate: [AuthGuard] },
    //   { path: 'reports', component: CrmReportsComponent, canActivate: [AuthGuard] },
    //   { path: 'settings', component: CrmSettingsComponent, canActivate: [AuthGuard] },
    //   { path: 'tags', component: CrmTagsComponent, canActivate: [AuthGuard] },
    //   { path: 'emails', component: CrmEmailsComponent, canActivate: [AuthGuard] },
    // ],
    // canActivate: [AuthGuard] },
    // { path: 'crm/contact/:uniqueid', component: CrmContactComponent, canActivate: [AuthGuard] },
    // { path: 'crm/campaign/:uniqueid', component: CrmCampaignBuilderComponent, canActivate: [AuthGuard] },

    // crm

    // membership
   
    // { path: 'membership', component: MembershipComponent,
    //   children : [
    //     { path: '', component: MembershipReportsComponent, canActivate: [AuthGuard] },
    //     { path: 'reports', component: MembershipReportsComponent, canActivate: [AuthGuard] }, 
    //     { path: 'memberships', component: MembershipCoursesComponent,canActivate: [AuthGuard] },
    //     { path: 'members', component: MembershipMembersComponent, canActivate: [AuthGuard] },
    //     { path: 'marketplace', component: MembershipMarketplaceComponent, canActivate: [AuthGuard] },
    //     { path: 'customization', component: MembershipCustomizationComponent, canActivate: [AuthGuard] },
    //     { path: 'settings', component: CourseSettingsComponent, canActivate: [AuthGuard] },

    //   ],
    //   canActivate: [AuthGuard] },
    //     { path: 'new-membership', component: NewMembershipComponent,
    //     children :[
    //       { path: 'course/:course_id', component: MembershipModulesComponent, canActivate: [AuthGuard] },
    //       { path: 'course/:course_id/module/:module_id/lesson/:lesson_id/:tab', component: MembershipLessonComponent, canActivate: [AuthGuard] },
    //       { path: 'course/:course_id/module/:module_id/lesson/:lesson_id', component: MembershipLessonComponent, canActivate: [AuthGuard] },
    //       ],canActivate: [AuthGuard] },
    
          // { path: 'member/:memberid/:uniqueid', component: CrmContactComponent, canActivate: [AuthGuard] },

    // membership

        // Coming Soon links==>  ComingSoonComponent
    
      // { path: 'analytics', component: ComingSoonComponent, canActivate: [AuthGuard] },
      // { path: 'integrations', component: ComingSoonComponent, canActivate: [AuthGuard] },
      // { path: 'heatmap', component: ComingSoonComponent, canActivate: [AuthGuard] },
      // { path: 'heatmaps-recordings', component: ComingSoonComponent, canActivate: [AuthGuard] },
    
      // { path: 'strategies', component: ComingSoonComponent, canActivate: [AuthGuard] },
    
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
   
    // { path: 'membership', component: MembershipComponent,
    // { path: 'heatmap', component: HeatmapsComponent, canActivate: [AuthGuard] },
    // { path: 'heatmap/:id', component: HeatmapViewComponent, canActivate: [AuthGuard] },
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
   
    // { path: 'account', component: AccountComponent, loadChildren: () => import('./_modules/account-setting.module').then(m => m.AccountSettingModule),
    // children: [
    //   { path: '', component: ProfileSettingsComponent,loadChildren: () => import('./_modules/account-setting.module').then(m => m.AccountSettingModule), canActivate: [AuthGuard] },
    //   { path: 'settings', component: ProfileSettingsComponent,loadChildren: () => import('./_modules/account-setting.module').then(m => m.AccountSettingModule), canActivate: [AuthGuard] },
    //   { path: 'sign-in-security', component: SignInSecurityComponent,loadChildren: () => import('./_modules/account-setting.module').then(m => m.AccountSettingModule), canActivate: [AuthGuard] },
    //   { path: 'billing', component: BillingComponent,loadChildren: () => import('./_modules/account-setting.module').then(m => m.AccountSettingModule), canActivate: [AuthGuard] },
    //   { path: 'viewplans', component: ViewplansComponent,loadChildren: () => import('./_modules/account-setting.module').then(m => m.AccountSettingModule), canActivate: [AuthGuard] },
    // ],
    // canActivate: [AuthGuard] },
    //account-settings
 
    // page not found
    // { path: '**', component: PageNotFoundComponent },
   
  ]
}
else {
  routes = [
    // { path: 'member/login', component : PageViewComponent, data: { domain: currentDomain,path: currentPath,},canActivate: [MemberSignedGuard]},
    // { path: 'member/forgot/password', component : MemberForgotPasswordComponent,canActivate: [MemberSignedGuard]},
    // auth guard
    // { path: 'member/library', component : PageViewComponent, data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
    // { path: 'member/:course_id', component : ViewCourseComponent,data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
    // { path: 'member/:course_id/:module_id/:lesson_id', component : ViewLessonComponent,data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
   
    
    // member-account-settings
    
    // { path: 'profile/settings', component: MemberProfileSettingsComponent,data: { domain: currentDomain,path: currentPath,}, canActivate: [MemberAuthGuard] },
    // { path: 'profile/sign-in-security', component: MemberSignInSecurityComponent,data: { domain: currentDomain,path: currentPath,}, canActivate: [MemberAuthGuard] },
    // { path: 'profile/billing', component: MemberBillingComponent,data: { domain: currentDomain,path: currentPath,}, canActivate: [MemberAuthGuard]},
    //member-account-settings
     // auth guard
     { path: '**', loadChildren: () => import('./_modules/pageview.module').then(m => m.PageviewModule), canActivate: [AuthGuard] , data: {
      domain: currentDomain,
      path: currentPath,
    }
  },
  ]

}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = 
  [
    // WebsiteComponent,
    // WebsitesComponent,
    // WebsiteDetailsComponent,
    // WebsiteFootersComponent,
    // WebsiteHeadersComponent,
    // WebsiteNavigationComponent,
    // WebsitePagesComponent,
    // WebpagesArchiveComponent,
    FeedbackFormComponent,
    // LoginComponent,
    // RegisterComponent,
    // ForgotPasswordComponent,
    // DashboardComponent, 
    StrategiesComponent,
    // AnalyticsComponent,
    // HeatmapsComponent,
    // HeatmapViewComponent,
    // ProfileComponent,
    // TemplateComponent, 
    // PageViewComponent,
    // ScrumBoardsComponent,
    // ScrumBoardListComponent,   
    // FetchMenuComponent,
    // BuilderComponent,
    // BuilderSettingComponent,
    // BulderWireframeComponent, 
    // PageNotFoundComponent,
    // HeatmapsRecordingsComponent,
    // MembershipCoursesComponent,
    // MembershipModulesComponent,
    // MembershipLessonComponent,
    // MembershipComponent,
    // MembershipProductComponent,
    // MembershipOffersComponent,
    // MembershipCouponsComponent,
    // MembershipPaymentComponent,
    // MembershipMembersComponent,
    // MembershipTagsComponent,
    // MembershipMarketplaceComponent,
    // MembershipReportsComponent,
    // MembershipCustomizationComponent,
    // CourseSettingsComponent,
    // NewMembershipComponent,
    // CrmComponent,
    // CrmFormsComponent,
    // CrmFormFetchComponent,
    // CrmEmailsComponent,
    // CrmEmailBuilderComponent,
    // CrmCampaignsComponent,
    // CrmContactsComponent,
    // CrmContactComponent,
    // CrmListsComponent,
    // CrmTagsComponent,
    // CrmReportsComponent,
    // CrmSettingsComponent,
    // CrmCampaignBuilderComponent,
    // CrmAutomationComponent,
    // CrmAutomationBuilderComponent,
    // CrmAutomationWorkflowComponent, 
    // AffiliatesComponent,
    // AffiliateUsersComponent,
    // AffiliateCommissionComponent,
    // AffiliateTransactionsComponent,
    // AffiliateShareComponent,
    // AffiliateAnnouncementsComponent,
    // AffiliateExportsComponent,
    // AffiliateSettingsComponent,
    // IntegrationsComponent,
    // CrmFormBuilderComponent,
    // BuilderTopbarComponent,
    // ImageComponent,
    ComingSoonComponent,
    // FunnelCheckoutComponent,
    // CrmFieldsComponent,
    // SalesComponent,
    // PaymentComponent,
    // ProductsComponent,
    // OffersComponent,
    // OrderFormComponent,
    // OrderFormCheckoutComponent,
    // OfferComponent,
    // CheckoutComponent,
    // DomainComponent,
    // UpdateDnsComponent,
    // AccountComponent,
    // BillingComponent,
    // ViewplansComponent, 
    // ProfileSettingsComponent,
    // SignInSecurityComponent,
    // FunnelsComponent,
    // FunnelComponent,
    // FunnelStepSettingsComponent,
    // FunnelBuildComponent,
    // FunnelArchiveComponent,
    // CreateFunnelsComponent,
    // FunnelSettingsComponent,
    // FunnelStepArchiveComponent,
    // FunnelStepsComponent,
    // DefaultPageViewComponent,
    //member-routes
    // MemberForgotPasswordComponent,
    // ViewLessonComponent,
    // ViewCourseComponent,
    // CourseSidebarComponent,
    // MemberProfileSettingsComponent,
    // MemberSignInSecurityComponent,  
    // MemberBillingComponent,
  ];

