import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchMenuComponent } from '../_components/_builder/fetch-menu/fetch-menu.component';


@NgModule({
  declarations: [
    FetchMenuComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    FetchMenuComponent,
  ]
})
export class FetchmenuModule { }
