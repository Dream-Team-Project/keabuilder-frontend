import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewNavbarComponent } from '../_components/_membership/view-navbar/view-navbar.component';


@NgModule({
  declarations: [
    ViewNavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ViewNavbarComponent
  ]
})
export class MemberNavbarModule { }
