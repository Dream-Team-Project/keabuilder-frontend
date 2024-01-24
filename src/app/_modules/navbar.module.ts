import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../_components/navbar/navbar.component';
import { MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    
  ],
  exports:[
    NavbarComponent
  ]
})
export class NavbarModule { }
