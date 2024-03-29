import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from '../_components/_builder/builder/builder.component';
import { BuilderModule } from './builder.module';

const routes: Routes = [
  { path: '', component: BuilderComponent,},
  // { path: '', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BuilderModule,
  ],
  exports: [RouterModule]
})
export class BuilderRouteModule { }
