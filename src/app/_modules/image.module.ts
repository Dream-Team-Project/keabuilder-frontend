import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../_components/image/image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ImageComponent,
  ],
  imports :[
    ImageCropperModule,
    MatTabsModule, 
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatSelectModule,
  ],
  exports: [
    ImageComponent,
  ]
})
export class ImageModule { }
