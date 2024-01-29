import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { FunnelStepsComponent } from '../_components/_funnels/funnel-steps/funnel-steps.component';
import { FunnelSettingsComponent } from '../_components/_funnels/funnel-settings/funnel-settings.component';
import { FunnelStepArchiveComponent } from '../_components/_funnels/funnel-step-archive/funnel-step-archive.component';
import { CreateFunnelsComponent } from '../_components/_funnels/create-funnels/create-funnels.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


const routes: Routes = [
  // { path: ':funnel_id', component: CreateFunnelsComponent,
  // children: [ 
  { path: 'steps/:step_id', component: FunnelStepsComponent, canActivate: [AuthGuard] },
  // { path: 'steps/:step_id', component: CreateNewFunnelStepsComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: FunnelSettingsComponent, canActivate: [AuthGuard] },
  { path: 'archive', component: FunnelStepArchiveComponent, canActivate: [AuthGuard] },
  // ],
  // canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    CreateFunnelsComponent,
    FunnelStepsComponent,
    FunnelSettingsComponent,
    FunnelStepArchiveComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports:[
    RouterModule
  ]
})
export class FunnelEditModule { }
