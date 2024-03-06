import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from '../_components/_sales/sales/sales.component';
import { PaymentComponent } from '../_components/_sales/payment/payment.component';
import { ProductsComponent } from '../_components/_sales/products/products.component';
import { OffersComponent } from '../_components/_sales/offers/offers.component';
import { CheckoutComponent } from '../_components/_sales/checkout/checkout.component';
import { BuilderSettingModule } from './builder-setting.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { PipeModule } from './pipe.module';
import { ImageModule } from './image.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { EditorModule } from '@tinymce/tinymce-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgxStripeModule } from 'ngx-stripe';
import { MatCardModule } from '@angular/material/card';
import { FormfetchModule } from './formfetch.module';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderFormComponent } from '../_components/_sales/orderform/orderform.component';
import { OrderFormCheckoutComponent } from '../_components/_sales/orderform/checkout/checkout.component';
import { OfferComponent } from '../_components/_sales/offer/offer.component';
import { MatRippleModule } from '@angular/material/core';


const routes: Routes = [
       { path: '', component:  SalesComponent,
       children :[
      { path: '', component:  OffersComponent},
      { path: 'offers', component: OffersComponent},
      { path: 'products', component: ProductsComponent},
      { path: 'payment', component: PaymentComponent},
      { path: 'orderform', component: OrderFormComponent},
      // { path: 'builder/checkout/:id', component: CheckoutComponent},
       ]},
       { path: 'orderform/:id', component: OrderFormCheckoutComponent},
       { path: 'offer/:uniqueid', component: OfferComponent},
  ];

@NgModule({
  declarations: [
    SalesComponent,
    PaymentComponent,
    ProductsComponent,
    OffersComponent,
    OrderFormCheckoutComponent,
    OfferComponent,
    CheckoutComponent,
    OrderFormComponent,
    // CrmFormFetchComponent,
  ],
  imports: [
    CommonModule,
    FormfetchModule,
    RouterModule.forChild(routes),
    PipeModule,
    ImageModule,
    BuilderSettingModule,
    MatPaginatorModule, 
    MatProgressBarModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatExpansionModule,
    EditorModule,
    DragDropModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonToggleModule,
    NgxStripeModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatRippleModule,
  ],
  exports: [RouterModule]
})
export class SaleModule { }
