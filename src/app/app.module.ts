import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { SidebarComponent } from './_components/sidebar/sidebar.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxTinymceModule } from 'ngx-tinymce';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from '../environments/environment';
import { ApiInterceptor } from './_helpers/api.interceptor';
import { CommonModule } from '@angular/common';

// import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    SidebarComponent,
    NavbarComponent, 
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule,
    MatSidenavModule,
    // MatTooltipModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
    }),
    MatMenuModule, 
    MatDialogModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    NgxStripeModule.forRoot(environment.stripekey),
  ],
  providers: [authInterceptorProviders, 
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000} },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
