import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeatmapsComponent } from '../_components/_heatmap/heatmaps/heatmaps.component';
import { HeatmapsRecordingsComponent } from '../_components/_heatmap/recordings/recordings.component';
import { HeatmapViewComponent } from '../_components/_heatmap/heatmap-view/heatmap-view';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
const routes: Routes = [
  { path: '', component: HeatmapsComponent,},
  // { path: 'heatmap/:id', component: HeatmapViewComponent,},
  // { path: 'heatmaps-recordings', component: HeatmapsRecordingsComponent,},
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
