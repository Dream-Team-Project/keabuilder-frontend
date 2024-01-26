import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { DomainComponent } from '../_components/domain/domain.component';
import { UpdateDnsComponent } from '../_components/update-dns/update-dns.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  { path: 'domain', component: DomainComponent, canActivate: [AuthGuard] },
  { path: 'domain/update/:uniqueid', component: UpdateDnsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    DomainComponent,
    UpdateDnsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [RouterModule]
})
export class DomainModule { }
