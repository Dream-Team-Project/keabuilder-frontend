import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { BuilderComponent } from '../_components/_builder/builder/builder.component';
import { BuilderSettingModule } from './builder-setting.module';
import { BuilderTopbarModule } from './builder-topbar.module';
import { BuilderWireframeModule } from './builder-wireframe.module';
import { FunnelCheckoutModule } from './funnel-checkout.module';
import { FormfetchModule } from './formfetch.module';
// import { PageviewModule } from './pageview.module';
import { ImageModule } from './image.module';
import { PipeModule } from './pipe.module';

const routes: Routes = [
  { path: ':target/:id', component: BuilderComponent }
];

@NgModule({
  declarations: [
    BuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImageModule,
    BuilderSettingModule,
    BuilderTopbarModule,
    BuilderWireframeModule,
    FormfetchModule,
    FunnelCheckoutModule,
    // PageviewModule,
    MatCheckboxModule,
    PipeModule,
    MatIconModule,
    DragDropModule,
    MatListModule,
    MatFormFieldModule,
    // MatSlideToggleModule,
    MatMenuModule,
    // MatSliderModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  exports: [
    RouterModule
  ]
})

export class BuilderModule { }
