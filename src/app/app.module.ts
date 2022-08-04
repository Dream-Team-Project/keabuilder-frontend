import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from "ng-apexcharts";
import { GoogleMapsModule } from '@angular/google-maps';
import { ImageCropperModule } from 'ngx-image-cropper';

import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider'
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

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
import { ResizableModule } from 'angular-resizable-element';
import { NgxCaptureModule } from 'ngx-capture';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    SidebarComponent,
    NavbarComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ImageCropperModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    DragDropModule,
    NgxMatColorPickerModule,
    NgxColorsModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTabsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSliderModule,
    MatIconModule,
    MatRadioModule,
    MatButtonToggleModule,
    ColorMaterialModule,
    ColorCircleModule,
    EditorModule,
    MatTooltipModule,
    NgApexchartsModule,
    GoogleMapsModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    ResizableModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
    }),
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatMenuModule,
    NgxCaptureModule,  
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AngularSvgIconModule.forRoot()
  ],
  providers: [authInterceptorProviders, { 
    provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}},
    MatTableModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
