import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunnelCheckoutComponent } from '../_components/_funnels/funnel-checkout/funnel-checkout.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    FunnelCheckoutComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
    NgxStripeModule.forRoot(environment.stripekey),
  ],
  exports:[
    FunnelCheckoutComponent
  ],
})
export class FunnelCheckoutModule { }
