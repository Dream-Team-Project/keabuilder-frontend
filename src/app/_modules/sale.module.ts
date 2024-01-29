import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { SalesComponent } from '../_components/_sales/sales/sales.component';
import { PaymentComponent } from '../_components/_sales/payment/payment.component';
import { ProductsComponent } from '../_components/_sales/products/products.component';
import { OffersComponent } from '../_components/_sales/offers/offers.component';
import { OfferComponent } from '../_components/_sales/offer/offer.component';
import { CheckoutComponent } from '../_components/_sales/checkout/checkout.component';
// import { OrderformModule } from './orderform.module';
// import { OrderFormCheckoutComponent } from '../_components/_sales/orderform/checkout/checkout.component';
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


const routes: Routes = [
      { path: '', component:  OffersComponent, canActivate: [AuthGuard] },
      { path: 'offers', component: OffersComponent, canActivate: [AuthGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
      { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
      // { path: 'orderform', component: OrderformModule, canActivate: [AuthGuard] },
      // { path: 'orderform/:id', component: OrderFormCheckoutComponent, canActivate: [AuthGuard] },
      { path: 'offer/:uniqueid', component: OfferComponent, canActivate: [AuthGuard] },
      { path: 'builder/checkout/:id', component: CheckoutComponent, canActivate: [AuthGuard] },
  ];

@NgModule({
  declarations: [
    SalesComponent,
    PaymentComponent,
    ProductsComponent,
    OffersComponent,
    // OrderFormCheckoutComponent,
    OfferComponent,
    CheckoutComponent,
    // CrmFormFetchComponent,
  ],
  imports: [
    CommonModule,
    FormfetchModule,
    // OrderformModule, 
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
    MatDialogModule
  ],
  exports: [RouterModule]
})
export class SaleModule { }
