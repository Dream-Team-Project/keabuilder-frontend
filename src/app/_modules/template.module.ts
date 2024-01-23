import { NgModule } from '@angular/core';
import { TemplateComponent } from '../_components/_builder/template/template.component';


@NgModule({
  declarations: [
    TemplateComponent,
  ],
  exports: [
    TemplateComponent,
  ]
})
export class TemplateModule { }
