import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageViewComponent } from '../_components/page-view/page-view.component';
import { PagenotfoundModule } from './pagenotfound.module';
import { PipeModule } from './pipe.module';
import { FormfetchModule } from './formfetch.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DefaultpageModule } from './defaultpage.module';
import { MatInputModule } from '@angular/material/input';
import { MemberNavbarModule } from './member-navbar.module';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { FunnelCheckoutModule } from './funnel-checkout.module';


@NgModule({
  declarations: [
    PageViewComponent,
  ],
  imports: [
    CommonModule,
    PagenotfoundModule,
    MemberNavbarModule,
    PipeModule,
    FormfetchModule,
    FunnelCheckoutModule,
    MatFormFieldModule,
    DefaultpageModule,
    MatInputModule,
    FormsModule,
    DragDropModule,
    MatIconModule,
  ],
  exports:[PageViewComponent]
})
export class PageviewModule { }
