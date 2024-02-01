import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FunnelCheckoutModule } from './funnel-checkout.module';
import { FunnelCheckoutComponent } from '../_components/_funnels/funnel-checkout/funnel-checkout.component';

const routes: Routes = [
  { path: '', component: FunnelCheckoutComponent,},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FunnelCheckoutModule,
  ],
  exports:[RouterModule],
})
export class FunnelCheckoutRouteModule { }
