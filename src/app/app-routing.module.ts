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
import { HeatmapsRecordingsComponent } from './heatmaps-recordings/heatmaps-recordings.component';
import { MembershipComponent } from './membership/membership.component';
import { MembershipProductComponent } from './membership-product/membership-product.component';
import { MembershipOffersComponent } from './membership-offers/membership-offers.component';
import { MembershipCouponsComponent } from './membership-coupons/membership-coupons.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'funnel', component: FunnelComponent, canActivate: [AuthGuard] },
  { path: 'archieve-steps', component: FunnelArchieveComponent, canActivate: [AuthGuard] },
  { path: 'marketplace', component: FunnelMarketplaceComponent, canActivate: [AuthGuard] },
  { path: 'website', component: WebsiteComponent, canActivate: [AuthGuard] },
  { path: 'strategies', component: StrategiesComponent, canActivate: [AuthGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
  { path: 'heatmap', component: HeatmapsComponent, canActivate: [AuthGuard] },
  { path: 'build-funnel', component: BuildFunnelComponent, canActivate: [AuthGuard] },
  { path: 'create-funnel', component: CreateFunnelComponent, canActivate: [AuthGuard] },
  { path: 'heatmaps-recordings', component: HeatmapsRecordingsComponent, canActivate: [AuthGuard] },
  { path: 'membership', component: MembershipComponent, canActivate: [AuthGuard] },
  { path: 'membership-product', component: MembershipProductComponent, canActivate: [AuthGuard] },
  { path: 'membership-offers', component: MembershipOffersComponent, canActivate: [AuthGuard] },
  { path: 'membership-coupons', component: MembershipCouponsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'builder', component: BuilderComponent },
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
  ];
