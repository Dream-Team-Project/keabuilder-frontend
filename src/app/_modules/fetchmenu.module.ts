import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchMenuComponent } from '../_components/_builder/fetch-menu/fetch-menu.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FetchMenuComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports:[
    FetchMenuComponent,
  ]
})
export class FetchmenuModule { }
