import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FunnelComponent } from '../_components/_funnels/funnel/funnel.component';
import { FunnelsComponent } from '../_components/_funnels/funnels/funnels.component';
import { FunnelBuildComponent } from '../_components/_funnels/funnel-build/funnel-build.component';
import { FunnelArchiveComponent } from '../_components/_funnels/funnel-archive/funnel-archive.component';
import { FunnelStepSettingsComponent } from '../_components/_funnels/funnel-step-settings/funnel-step-settings.component';
import { FunnelStepsComponent } from '../_components/_funnels/funnel-steps/funnel-steps.component';
import { FunnelSettingsComponent } from '../_components/_funnels/funnel-settings/funnel-settings.component';
import { FunnelStepArchiveComponent } from '../_components/_funnels/funnel-step-archive/funnel-step-archive.component';
import { CreateFunnelsComponent } from '../_components/_funnels/create-funnels/create-funnels.component';
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
  { path: '', component: FunnelComponent,
  children : [
  { path: '', component: FunnelsComponent},
  { path: 'all', component: FunnelsComponent},
  { path: 'build', component: FunnelBuildComponent},
  { path: 'archive', component: FunnelArchiveComponent},
]},
  { path: ':funnel_id', component: CreateFunnelsComponent,
children: [ 
{ path: 'steps/:step_id', component: FunnelStepsComponent,},
// { path: 'steps/:step_id', component: CreateNewFunnelStepsComponent,},
{ path: 'settings', component: FunnelSettingsComponent,},
{ path: 'archive', component: FunnelStepArchiveComponent,},
],},
  { path: 'step/settings/:step_id', component: FunnelStepSettingsComponent,},
  
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
    CreateFunnelsComponent,
    FunnelStepsComponent,
    FunnelSettingsComponent,
    FunnelStepArchiveComponent,
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
