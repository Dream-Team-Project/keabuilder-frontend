import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';
// import { SignedInGuard } from './_guard/signed-in.guard';
// import { MemberAuthGuard } from './_guard/member-auth.guard';
// import { MemberSignedGuard } from './_guard/member-signed.guard';
import { environment } from 'src/environments/environment';
import { ComingSoonComponent } from './_components/coming-soon/coming-soon.component';
import { FeedbackFormComponent } from './_components/feedback-form/feedback-form.component';
import { StrategiesComponent } from './_components/strategies/strategies.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';


const currentDomain:any = window.location.hostname;
const currentPath:any = window.location.pathname;
const appHost:any = environment.appHost;

var routes: Routes = [];

if (currentDomain === appHost) {
  routes = [
    { path: '', loadChildren: () => import('./_modules/auth.module').then(m => m.AuthModule)},
    { path: 'websites', loadChildren: () => import('./_modules/website.module').then(m => m.WebsiteModule), canActivate: [AuthGuard] },
    { path: 'funnels', loadChildren: () => import('./_modules/funnel.module').then(m => m.FunnelModule), canActivate: [AuthGuard] },
    { path: 'membership', loadChildren: () => import('./_modules/membership.module').then(m => m.MembershipModule), canActivate: [AuthGuard] },
    { path: 'crm', loadChildren: () => import('./_modules/crm.module').then(m => m.CrmModule), canActivate: [AuthGuard] },
    { path: 'sales', loadChildren: () => import('./_modules/sale.module').then(m => m.SaleModule), canActivate: [AuthGuard] },
    { path: 'domain', loadChildren: () => import('./_modules/domain.module').then(m => m.DomainModule), canActivate: [AuthGuard] },
    { path: 'scrumboard', loadChildren: () => import('./_modules/scrumboard.module').then(m => m.ScrumboardModule), canActivate: [AuthGuard] },
    { path: 'heatmap', loadChildren: () => import('./_modules/heatmap.module').then(m => m.HeatmapModule), canActivate: [AuthGuard] },
    { path: 'account', loadChildren: () => import('./_modules/account-setting.module').then(m => m.AccountSettingModule), canActivate: [AuthGuard] },
    { path: 'affiliates', loadChildren: () => import('./_modules/affiliate.module').then(m => m.AffiliateModule), canActivate: [AuthGuard] },
    // { path: 'fetch-orderform/:id', loadChildren: () => import('./_modules/funnel-checkout.module').then(m => m.FunnelCheckoutModule),canActivate: [AuthGuard]},
    // { path: 'fetch-form/:user_id/:form_id',component: CrmFormFetchComponent, loadChildren: () => import('./_modules/formfetch.module').then(m => m.FormfetchModule),canActivate: [AuthGuard]},
    // { path: 'builder/form/:id', loadChildren: () => import('./_modules/crm-builders.module').then(m => m.CrmBuildersModule), canActivate: [AuthGuard] },
    { path: 'builder', loadChildren: () => import('./_modules/builder.module').then(m => m.BuilderModule), canActivate: [AuthGuard] },
    // { path: 'preview', loadChildren: () => import('./_modules/pageview.module').then(m => m.PageviewModule), canActivate: [AuthGuard] },
    // { path: '**', loadChildren: () => import('./_modules/pageview.module').then(m => m.PageviewModule), canActivate: [AuthGuard] , data: {
    //     domain: currentDomain,
    //     path: currentPath,
    //   }
    // },
    // page not found
  { path: '**', component: PageNotFoundComponent },     
  ]
}
else {
  routes = [
    // { path: 'member/login', component : PageViewComponent, data: { domain: currentDomain,path: currentPath},canActivate: [MemberSignedGuard]},
    // { path: 'member/forgot/password', component : MemberForgotPasswordComponent,canActivate: [MemberSignedGuard]},
    // auth guard
    // { path: 'member/library', component : PageViewComponent, data: { domain: currentDomain,path: currentPath},canActivate: [MemberAuthGuard]},
    // { path: 'member/:course_id', component : ViewCourseComponent,data: { domain: currentDomain,path: currentPath},canActivate: [MemberAuthGuard]},
    // { path: 'member/:course_id/:module_id/:lesson_id', component : ViewLessonComponent,data: { domain: currentDomain,path: currentPath},canActivate: [MemberAuthGuard]},
   
    
    // member-account-settings
    
    // { path: 'profile/settings', component: MemberProfileSettingsComponent,data: { domain: currentDomain,path: currentPath}, canActivate: [MemberAuthGuard] },
    // { path: 'profile/sign-in-security', component: MemberSignInSecurityComponent,data: { domain: currentDomain,path: currentPath}, canActivate: [MemberAuthGuard] },
    // { path: 'profile/billing', component: MemberBillingComponent,data: { domain: currentDomain,path: currentPath}, canActivate: [MemberAuthGuard]},
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
    FeedbackFormComponent,
    StrategiesComponent,
    ComingSoonComponent,
  ];

