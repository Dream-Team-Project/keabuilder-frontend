import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageViewComponent } from '../_components/page-view/page-view.component';
import { PagenotfoundModule } from './pagenotfound.module';
import { PageviewModule } from './pageview.module';
import { MemberAuthGuard } from '../_guard/member-auth.guard';
import { MemberSignedGuard } from '../_guard/member-signed.guard';

const currentDomain:any = window.location.hostname;
const currentPath:any = window.location.pathname;
// const appHost:any = environment.appHost;

const routes: Routes = [

  { path: ':view_target/:template_id', component: PageViewComponent, pathMatch: 'full', data: {
    domain: currentDomain,
    path: currentPath,
  }},
  { path: ':view_target/:user_id/:page_id', component: PageViewComponent, pathMatch: 'full', data: {
    domain: currentDomain,
    path: currentPath,
  }},
  { path: ':view_target/:user_id/:website_id/:page_id', component: PageViewComponent, pathMatch: 'full', data: {
    domain: currentDomain,
    path: currentPath,
  }},
  { path: 'member/login', component : PageViewComponent, data: { domain: currentDomain,path: currentPath,},canActivate: [MemberSignedGuard]},
  { path: 'member/library', component : PageViewComponent, data: { domain: currentDomain,path: currentPath,},canActivate: [MemberAuthGuard]},
  { path: '**', component: PageViewComponent, data: {
    domain: currentDomain,
    path: currentPath,
  },},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageviewModule,
  ],
  exports : [
    RouterModule,
  ]
})
export class PageviewRouteModule { }
