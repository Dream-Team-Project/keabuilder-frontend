import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../_components/image/image.component';


@NgModule({
  declarations: [
    ImageComponent,
  ],
  exports: [
    ImageComponent,
  ]
})
export class OtherComponentModule { }
