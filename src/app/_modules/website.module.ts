import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
// import { WebsiteComponent } from '../_components/_websites/website/website.component';
// import { WebsitesComponent } from '../_components/_websites/websites/websites.component';
// import { WebsiteDetailsComponent } from '../_components/_websites/details/details.component';
// import { WebsiteFootersComponent } from '../_components/_websites/footers/footers.component';
// import { WebsiteHeadersComponent } from '../_components/_websites/headers/headers.component';
// import { WebsiteNavigationComponent } from '../_components/_websites/navigation/navigation.component';
// import { WebsitePagesComponent } from '../_components/_websites//pages/pages.component';
// import { WebpagesArchiveComponent } from '../_components/_websites/webpages-archive/webpages-archive.component';
// import { WebsiteDesignComponent } from '../_components/_websites/design/design.component';
// import { WebsiteMarketplaceComponent } from '../_components/_websites/marketplace/marketplace.component';
// import { MatListModule } from '@angular/material/list';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatSelectModule } from '@angular/material/select';

// const routes: Routes = [
//   {path: '', component: WebsitesComponent, canActivate: [AuthGuard]},
//   {path: 'all', component: WebsitesComponent, canActivate: [AuthGuard]},
//   {path:'pages', component: WebsitePagesComponent, canActivate: [AuthGuard]},
//   {path:'headers', component: WebsiteHeadersComponent, canActivate: [AuthGuard]},
//   {path:'footers', component: WebsiteFootersComponent, canActivate: [AuthGuard]},
//   {path:'navigation', component: WebsiteNavigationComponent, canActivate: [AuthGuard]},
//   {path: ':website_id/details', component: WebsiteDetailsComponent, canActivate: [AuthGuard]},
//   {path: ':website_id/pages', component: WebsitePagesComponent, canActivate: [AuthGuard]},
//   {path: ':website_id/pages/archive', component: WebpagesArchiveComponent, canActivate: [AuthGuard]},
//   {path: 'pages/archive', component: WebpagesArchiveComponent, canActivate: [AuthGuard]}
// ];

@NgModule({
  declarations: [
    // WebsiteComponent,
    // WebsitesComponent,
    // WebsiteDetailsComponent,
    // WebsiteFootersComponent,
    // WebsiteHeadersComponent,
    // WebsiteNavigationComponent,
    // WebsitePagesComponent,
    // WebpagesArchiveComponent
  ],
  imports: [
    // CommonModule,
    // RouterModule.forChild(routes),
    // MatListModule,
    // MatMenuModule,
    // MatSelectModule
  ],
  exports: [RouterModule]
})
export class WebsiteModule { }
