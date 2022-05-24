import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider'
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
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
import { ColorMaterialModule } from 'ngx-color/material';
import { ColorCircleModule } from 'ngx-color/circle';
import { NgxColorsModule } from 'ngx-colors';
import { NgxTinymceModule } from 'ngx-tinymce';
import { SafeHtmlPipe } from './safe-html.pipe';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    SidebarComponent,
    NavbarComponent,
<<<<<<< HEAD
    ForgetPasswordComponent,
    SafeHtmlPipe,
=======
>>>>>>> 9550893dbe0702d5024119648ad3039151129034
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    DragDropModule,
<<<<<<< HEAD
    NgxMatColorPickerModule,
    NgxColorsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatButtonToggleModule,
    ColorMaterialModule,
    ColorCircleModule,
    EditorModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
    })
=======
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
  
>>>>>>> 9550893dbe0702d5024119648ad3039151129034
  ],
  providers: [authInterceptorProviders, { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
