import { NgModule } from '@angular/core';
import { BuilderTopbarComponent } from '../_components/_builder/builder-topbar/builder-topbar.component';


@NgModule({
  declarations: [
    BuilderTopbarComponent,
  ],
  exports: [
    BuilderTopbarComponent,
  ]
})
export class BuilderTopbarModule { }
