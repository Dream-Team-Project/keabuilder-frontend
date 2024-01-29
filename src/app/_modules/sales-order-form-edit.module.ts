import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { OrderFormCheckoutComponent } from '../_components/_sales/orderform/checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxStripeModule } from 'ngx-stripe';
import { MatChipsModule } from '@angular/material/chips';
import { PipeModule } from './pipe.module';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
 
  { path: '', component: OrderFormCheckoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    OrderFormCheckoutComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgxStripeModule,
    MatChipsModule,
    PipeModule,
    MatCardModule,
    MatOptionModule,
    MatDialogModule,
  ],
  exports:[
    OrderFormCheckoutComponent ,
    RouterModule,
  ]
})
export class SalesOrderFormEditModule { }
