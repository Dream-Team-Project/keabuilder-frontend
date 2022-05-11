import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { SortablejsModule } from 'ngx-sortablejs';
import { FunnelComponent } from './funnel/funnel.component';
import { FunnelArchieveComponent } from './funnel-archieve/funnel-archieve.component';
import { FunnelMarketplaceComponent } from './funnel-marketplace/funnel-marketplace.component';
import { WebsiteComponent } from './website/website.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HeatmapsComponent } from './heatmaps/heatmaps.component';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    SidebarComponent,
    NavbarComponent,
    ForgetPasswordComponent,
    FunnelComponent,
    FunnelArchieveComponent,
    FunnelMarketplaceComponent,
    WebsiteComponent,
    StrategiesComponent,
    AnalyticsComponent,
    HeatmapsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule,
    SortablejsModule,
    DragDropModule,
    MatTooltipModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
