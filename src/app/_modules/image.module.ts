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
import { PipeModule } from './pipe.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ResizableModule } from 'angular-resizable-element';


@NgModule({
  declarations: [ImageComponent],
  imports :[
    CommonModule,
    ImageCropperModule,
    MatTabsModule, 
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    PipeModule,
    MatDialogModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    ClipboardModule,
    ResizableModule,
  ],
  exports: [ImageComponent]
})
export class ImageModule { }
