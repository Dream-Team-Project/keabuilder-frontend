import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgApexchartsModule } from "ng-apexcharts";
import { GoogleMapsModule } from '@angular/google-maps';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { SortablejsModule } from 'ngx-sortablejs';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    SidebarComponent,
    NavbarComponent,
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
    MatTooltipModule,
    BrowserModule,
    FormsModule,
    NgApexchartsModule,
    GoogleMapsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
  
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
