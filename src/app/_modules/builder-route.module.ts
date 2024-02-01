import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from '../_components/_builder/builder/builder.component';
import { BuilderModule } from './builder.module';
// import { ImageModule } from './image.module';
// import { BuilderSettingModule } from './builder-setting.module';
// import { BuilderTopbarModule } from './builder-topbar.module';
// import { BuilderWireframeModule } from './builder-wireframe.module';
// import { FormfetchModule } from './formfetch.module';


const routes: Routes = [
  { path: '', component: BuilderComponent,},
  // { path: '', component: PagenotfoundModule },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BuilderModule,
    // BuilderSettingModule,
    // BuilderTopbarModule,
    // BuilderWireframeModule,
    // FormfetchModule,
    // ImageModule
  ],
  exports: [RouterModule]
})
export class BuilderRouteModule { }
