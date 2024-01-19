import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { HeatmapsComponent } from '../_components/_heatmap/heatmaps/heatmaps.component';
import { HeatmapsRecordingsComponent } from '../_components/_heatmap/recordings/recordings.component';
import { HeatmapViewComponent } from '../_components/_heatmap/heatmap-view/heatmap-view';
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
  ],
  exports: [RouterModule]
})
export class HeatmapModule { }
