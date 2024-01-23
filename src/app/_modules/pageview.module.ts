import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { PageViewComponent } from '../_components/page-view/page-view.component';


@NgModule({
  declarations: [
    PageViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PageViewComponent,
  ]
})
export class PageviewModule { }
