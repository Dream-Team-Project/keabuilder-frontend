import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSettingComponent } from '../_components/_builder/builder-setting/builder-setting.component';
import { MatSliderModule } from '@angular/material/slider'
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ColorMaterialModule } from 'ngx-color/material';
import { ColorCircleModule } from 'ngx-color/circle';
import { NgxColorsModule } from 'ngx-colors';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { PipeModule } from './pipe.module';
import { ImageModule } from './image.module';
import { FetchmenuModule } from './fetchmenu.module';
import { TemplateModule } from './template.module';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    BuilderSettingComponent
  ],
  imports: [
    CommonModule,
    ImageModule,
    FetchmenuModule,
    TemplateModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatRippleModule,
    MatCheckboxModule,
    MatTabsModule,
    DragDropModule,
    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    MatMenuModule,
    NgxColorsModule,
    ColorCircleModule,
    ColorMaterialModule,
    EditorModule,
    ClipboardModule,
    MatDialogModule,
    MatAutocompleteModule, 
    MatButtonModule,
    PipeModule, 
    MatListModule,
    MatProgressBarModule,
    MatSidenavModule, 
    MatInputModule,
    
  ],
  exports: [
    BuilderSettingComponent
  ]
})
export class BuilderSettingModule { }

