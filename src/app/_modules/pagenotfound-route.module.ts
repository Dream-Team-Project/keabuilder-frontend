import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../_components/page-not-found/page-not-found.component';
import { PagenotfoundModule } from './pagenotfound.module';


const routes: Routes = [
  { path: '', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PagenotfoundModule,
  ],
  exports : [RouterModule]
})
export class PagenotfoundRouteModule { }
