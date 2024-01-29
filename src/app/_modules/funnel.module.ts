import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { FunnelComponent } from '../_components/_funnels/funnel/funnel.component';
import { FunnelsComponent } from '../_components/_funnels/funnels/funnels.component';
import { FunnelBuildComponent } from '../_components/_funnels/funnel-build/funnel-build.component';
import { FunnelArchiveComponent } from '../_components/_funnels/funnel-archive/funnel-archive.component';
import { FunnelStepSettingsComponent } from '../_components/_funnels/funnel-step-settings/funnel-step-settings.component';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxStripeModule } from 'ngx-stripe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [

  { path: '', component: FunnelsComponent, canActivate: [AuthGuard] },
  { path: 'all', component: FunnelsComponent, canActivate: [AuthGuard] },
  { path: 'build', component: FunnelBuildComponent, canActivate: [AuthGuard] },
  { path: 'archive', component: FunnelArchiveComponent, canActivate: [AuthGuard] },
//   { path: ':funnel_id', component: CreateFunnelsComponent,
// children: [ 
// { path: 'steps/:step_id', component: FunnelStepsComponent, canActivate: [AuthGuard] },
// // { path: 'steps/:step_id', component: CreateNewFunnelStepsComponent, canActivate: [AuthGuard] },
// { path: 'settings', component: FunnelSettingsComponent, canActivate: [AuthGuard] },
// { path: 'archive', component: FunnelStepArchiveComponent, canActivate: [AuthGuard] },
// ],
// canActivate: [AuthGuard] },
  { path: 'step/settings/:step_id', component: FunnelStepSettingsComponent, canActivate: [AuthGuard] },

  // builder
  // { path: 'fetch-orderform/:id', component: FunnelCheckoutModule},
];

@NgModule({
  declarations: [
    FunnelComponent,
    FunnelsComponent,
    FunnelStepSettingsComponent,
    FunnelBuildComponent,
    FunnelArchiveComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatPaginatorModule, 
    MatProgressBarModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    MatAutocompleteModule,
    NgxStripeModule,
    MatTooltipModule,
    MatChipsModule,
    MatIconModule, 
    MatInputModule,
    MatDialogModule
  ],
  exports: [RouterModule]
})
export class FunnelModule { }
