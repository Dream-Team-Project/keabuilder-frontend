import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { MemberSignedGuard } from '../_guard/member-signed.guard';
import { MemberAuthGuard } from '../_guard/member-auth.guard';
import { PageViewComponent } from '../_components/page-view/page-view.component';
import { environment } from 'src/environments/environment';

const currentDomain:any = window.location.hostname;
const currentPath:any = window.location.pathname;
const appHost:any = environment.appHost;

const routes: Routes = [

  { path: 'preview/:view_target/:template_id', component: PageViewComponent, pathMatch: 'full', data: {
    domain: currentDomain,
    path: currentPath,
  }},
  { path: 'preview/:view_target/:user_id/:page_id', component: PageViewComponent, pathMatch: 'full', data: {
    domain: currentDomain,
    path: currentPath,
  }},
  { path: 'preview/:view_target/:user_id/:website_id/:page_id', component: PageViewComponent, pathMatch: 'full', data: {
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
  declarations: [
    PageViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    PageViewComponent,
  
  ]
})
export class PageviewModule { }
