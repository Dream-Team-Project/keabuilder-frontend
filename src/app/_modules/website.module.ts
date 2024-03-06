import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WebsiteComponent } from '../_components/_websites/website/website.component';
import { WebsitesComponent } from '../_components/_websites/websites/websites.component';
import { WebsiteDetailsComponent } from '../_components/_websites/details/details.component';
import { WebsiteFootersComponent } from '../_components/_websites/footers/footers.component';
import { WebsiteHeadersComponent } from '../_components/_websites/headers/headers.component';
import { WebsiteNavigationComponent } from '../_components/_websites/navigation/navigation.component';
import { WebsitePagesComponent } from '../_components/_websites//pages/pages.component';
import { WebpagesArchiveComponent } from '../_components/_websites/webpages-archive/webpages-archive.component';
import { WebsiteDesignComponent } from '../_components/_websites/design/design.component';
import { WebsiteMarketplaceComponent } from '../_components/_websites/marketplace/marketplace.component';
import { TemplateModule } from './template.module';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { PipeModule } from './pipe.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchmenuModule } from './fetchmenu.module';

const routes: Routes = [
  {path: '', component: WebsiteComponent,
      children: [
        // {path: '', component: WebsiteDesignComponent, canActivate: [AuthGuard]},
        {path: '', component: WebsitesComponent,},
        {path: 'all', component: WebsitesComponent,},
        {path:'pages', component: WebsitePagesComponent,},
        {path:'headers', component: WebsiteHeadersComponent,},
        {path:'footers', component: WebsiteFootersComponent,},
        {path:'navigation', component: WebsiteNavigationComponent,},
        {path: ':website_id/details', component: WebsiteDetailsComponent,},
        {path: ':website_id/pages', component: WebsitePagesComponent,},
        {path: ':website_id/pages/archive', component: WebpagesArchiveComponent,},
        {path: 'pages/archive', component: WebpagesArchiveComponent,},
      ],},
];

@NgModule({
  declarations: [
    WebsiteComponent,
    WebsitesComponent,
    WebsiteDetailsComponent,
    WebsiteFootersComponent,
    WebsiteHeadersComponent,
    WebsiteNavigationComponent,
    WebsitePagesComponent,
    WebpagesArchiveComponent,
    WebsiteMarketplaceComponent,
    WebsiteDesignComponent,
  ],
  imports: [
    CommonModule,
    TemplateModule,
    FetchmenuModule,
    RouterModule.forChild(routes),
    PipeModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatPaginatorModule, 
    MatProgressBarModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatExpansionModule,
    DragDropModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    
  ],
  exports: [RouterModule]
})
export class WebsiteModule { }
