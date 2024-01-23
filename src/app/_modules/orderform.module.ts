import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from '../_components/_sales/orderform/orderform.component';


@NgModule({
  declarations: [
    OrderFormComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    OrderFormComponent,
  ]
})
export class OrderformModule { }
