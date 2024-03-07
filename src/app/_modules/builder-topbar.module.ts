import { NgModule } from '@angular/core';
import { BuilderTopbarComponent } from '../_components/_builder/builder-topbar/builder-topbar.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PipeModule } from './pipe.module';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BuilderTopbarComponent
  ],
  imports:[
    CommonModule,
    DragDropModule,
    PipeModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    BuilderTopbarComponent
  ]
})
export class BuilderTopbarModule { }
