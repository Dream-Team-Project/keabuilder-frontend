import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { OfferComponent } from '../_components/_sales/offer/offer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { PipeModule } from './pipe.module';
import { MatSelectModule } from '@angular/material/select';
import { FormfetchModule } from './formfetch.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditorModule } from '@tinymce/tinymce-angular';

const routes: Routes = [
  { path: '', component: OfferComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    OfferComponent,
  ],
  imports: [
    CommonModule,
    FormfetchModule,
    RouterModule.forChild(routes),
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatInputModule,
    MatDialogModule,
    PipeModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    EditorModule,
  ],
exports:[
  OfferComponent,
  RouterModule,
]
})
export class SalesOfferModule { }
