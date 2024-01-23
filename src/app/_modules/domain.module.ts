import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { DomainComponent } from '../_components/domain/domain.component';
import { UpdateDnsComponent } from '../_components/update-dns/update-dns.component';

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
  ],
  exports: [RouterModule]
})
export class DomainModule { }
