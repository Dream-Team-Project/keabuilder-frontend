import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { HeatmapsComponent } from '../_components/_heatmap/heatmaps/heatmaps.component';
import { HeatmapsRecordingsComponent } from '../_components/_heatmap/recordings/recordings.component';
import { HeatmapViewComponent } from '../_components/_heatmap/heatmap-view/heatmap-view';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
const routes: Routes = [
  { path: 'heatmap', component: HeatmapsComponent, canActivate: [AuthGuard] },
  // { path: 'heatmap/:id', component: HeatmapViewComponent, canActivate: [AuthGuard] },
  // { path: 'heatmaps-recordings', component: HeatmapsRecordingsComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [
    HeatmapsComponent,
    HeatmapViewComponent,
    HeatmapsRecordingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  exports: [RouterModule]
})
export class HeatmapModule { }
