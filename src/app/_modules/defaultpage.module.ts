import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPageViewComponent } from '../_components/default-page-view/default-page-view.component';


@NgModule({
  declarations: [
    DefaultPageViewComponent, 
  ],
  imports: [
    CommonModule,
  ],
  exports :[
    DefaultPageViewComponent 
  ],
})
export class DefaultpageModule { }
