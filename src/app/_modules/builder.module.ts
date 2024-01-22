import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { TemplateComponent } from '../_components/_builder/template/template.component';
import { BuilderComponent } from '../_components/_builder/builder/builder.component';
import { BuilderSettingComponent } from '../_components/_builder/builder-setting/builder-setting.component';
import { BuilderTopbarComponent } from '../_components/_builder/builder-topbar/builder-topbar.component';
import { BulderWireframeComponent } from '../_components/_builder/bulder-wireframe/bulder-wireframe.component';


const routes: Routes = [
  { path: 'builder/:target/:id', component: BuilderComponent, canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [
    TemplateComponent, 
    BuilderComponent,
    BuilderSettingComponent,
    BulderWireframeComponent, 
    BuilderTopbarComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class BuilderModule { }
