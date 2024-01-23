import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { MemberSignedGuard } from '../_guard/member-signed.guard';
import { MemberAuthGuard } from '../_guard/member-auth.guard';
import { PageViewComponent } from '../_components/page-view/page-view.component';
import { environment } from 'src/environments/environment';
import { PagenotfoundModule } from './pagenotfound.module';
import { PipeModule } from './pipe.module';
import { FormfetchModule } from './formfetch.module';
import { OrderformModule } from './orderform.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DefaultpageModule } from './defaultpage.module';
import { MatInputModule } from '@angular/material/input';
import { MemberNavbarModule } from './member-navbar.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

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
    PagenotfoundModule,
    PipeModule,
    RouterModule.forChild(routes),
    FormfetchModule,
    OrderformModule,
    MatFormFieldModule,
    DefaultpageModule,
    MatInputModule,
    MemberNavbarModule,
    FormsModule,
    RouterModule,
    DragDropModule,
    MatIconModule,
  ],
  exports:[
    PageViewComponent,
  ]
})
export class PageviewModule { }
