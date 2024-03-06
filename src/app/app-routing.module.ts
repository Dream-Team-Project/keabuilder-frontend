import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';
// import { SignedInGuard } from './_guard/signed-in.guard';
// import { MemberAuthGuard } from './_guard/member-auth.guard';
// import { MemberSignedGuard } from './_guard/member-signed.guard';
import { environment } from 'src/environments/environment';
// import { ComingSoonComponent } from './_components/coming-soon/coming-soon.component';
// import { FeedbackFormComponent } from './_components/feedback-form/feedback-form.component';
// import { StrategiesComponent } from './_components/strategies/strategies.component';
// import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
// import { MemberAuthGuard } from './_guard/member-auth.guard';

const currentDomain:any = window.location.hostname;
const currentPath:any = window.location.pathname;
const appHost:any = environment.appHost;

var routes: Routes = [];
if (currentDomain === appHost) {
  routes = [
    { path: '', loadChildren: () => import('./_modules/auth.module').then(m => m.AuthModule)},
    { path: 'fetch-form/:user_id/:form_id',loadChildren: () => import('./_modules/formfetch-route.module').then(m => m.FormfetchRouteModule),canActivate: [AuthGuard]},
    { path: 'fetch-orderform/:id', loadChildren: () => import('./_modules/funnel-checkout-route.module').then(m => m.FunnelCheckoutRouteModule),canActivate: [AuthGuard]},
    { path: 'websites', loadChildren: () => import('./_modules/website.module').then(m => m.WebsiteModule), canActivate: [AuthGuard] },
    { path: 'funnels', loadChildren: () => import('./_modules/funnel.module').then(m => m.FunnelModule), canActivate: [AuthGuard] },
    { path: 'member', loadChildren: () => import('./_modules/member-route.module').then(m => m.MemberRouteModule)},
    { path: 'membership', loadChildren: () => import('./_modules/membership.module').then(m => m.MembershipModule), canActivate: [AuthGuard] },
    { path: 'sales', loadChildren: () => import('./_modules/sale.module').then(m => m.SaleModule), canActivate: [AuthGuard] },
    { path: 'domain', loadChildren: () => import('./_modules/domain.module').then(m => m.DomainModule), canActivate: [AuthGuard] },
    { path: 'scrumboard', loadChildren: () => import('./_modules/scrumboard.module').then(m => m.ScrumboardModule), canActivate: [AuthGuard] },
    { path: 'heatmap', loadChildren: () => import('./_modules/heatmap.module').then(m => m.HeatmapModule), canActivate: [AuthGuard] },
    { path: 'account', loadChildren: () => import('./_modules/account-setting.module').then(m => m.AccountSettingModule), canActivate: [AuthGuard] },
    // { path: 'affiliates', loadChildren: () => import('./_modules/affiliate.module').then(m => m.AffiliateModule), canActivate: [AuthGuard] },
    { path: 'builder/automation/:id',loadChildren: () => import('./_modules/automation-builder.module').then(m => m.AutomationBuilderModule), canActivate: [AuthGuard] },
    { path: 'builder/email/:id',loadChildren: () => import('./_modules/email-builder.module').then(m => m.EmailBuilderModule), canActivate: [AuthGuard] },
    { path: 'builder/form/:id',loadChildren: () => import('./_modules/form-builder.module').then(m => m.FormBuilderModule), canActivate: [AuthGuard] },
    { path: 'builder/:target/:id',loadChildren: () => import('./_modules/builder-route.module').then(m => m.BuilderRouteModule), canActivate: [AuthGuard] },
    { path: 'crm', loadChildren: () => import('./_modules/crm.module').then(m => m.CrmModule), canActivate: [AuthGuard] },
    { path: 'preview', loadChildren: () => import('./_modules/pageview-route.module').then(m => m.PageviewRouteModule), canActivate: [AuthGuard] },
    { path: '**', loadChildren: () => import('./_modules/pageview-route.module').then(m => m.PageviewRouteModule), canActivate: [AuthGuard] , data: {
      domain: currentDomain,
      path: currentPath,
    }
  },
    // page not found
  { path: '**', loadChildren: () => import('./_modules/pagenotfound-route.module').then(m => m.PagenotfoundRouteModule),}, 
   

    
    // 8YvA7kPbR2mX3uHwS6JnQgZtF4cV5xWp-c2BnRw5OzY7Lx3XmJq9UgCpHm4KfP6iA-9EhPvFjK1sQr4TlWnXzR3uY6Dg2mC8bV -  secret url for registration
    
   
  ]
}
else {
  routes = [
     { path: 'member', loadChildren: () => import('./_modules/member-route.module').then(m => m.MemberRouteModule)},
     { path: '**', loadChildren: () => import('./_modules/pageview-route.module').then(m => m.PageviewRouteModule), data: {
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
// export const RoutingComponents = 
//   [
//     FeedbackFormComponent,
//     StrategiesComponent,
//     ComingSoonComponent,
//   ];

