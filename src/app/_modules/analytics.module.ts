import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { AnalyticsComponent } from '../_components/analytics/analytics.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GoogleMapsModule } from '@angular/google-maps';

const routes: Routes = [
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AnalyticsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
    GoogleMapsModule,
  ],
  exports: [RouterModule]
})
export class AnalyticsModule { }
