import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrmFormBuilderComponent } from '../_components/_crm/form-builder/form-builder.component';
import { CrmFormFieldsModule } from './crm-form-fields.module';
// import { FunnelCheckoutModule } from './funnel-checkout.module';
// import { PageviewModule } from './pageview.module';
import { ImageModule } from './image.module';
import { BuilderSettingModule } from './builder-setting.module';
import { FormfetchModule } from './formfetch.module';
import { PipeModule } from './pipe.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { BuilderModule } from './builder.module';
import { BuilderTopbarModule } from './builder-topbar.module';

const routes: Routes = [
  { path: '', component: CrmFormBuilderComponent,},
  ];

@NgModule({
 declarations: [CrmFormBuilderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImageModule,
    BuilderModule,
    CrmFormFieldsModule,
    BuilderSettingModule,
    BuilderTopbarModule,
    FormfetchModule,
    // FunnelCheckoutModule,
    // PageviewModule,
    PipeModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatExpansionModule,
    MatAutocompleteModule,
    EditorModule,
    DragDropModule,
    MatChipsModule,
    MatRippleModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
  ],
  exports: [RouterModule]
})
export class FormBuilderModule { }
