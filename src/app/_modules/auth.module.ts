import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { SignedInGuard } from '../_guard/signed-in.guard';
import { DashboardComponent } from '../_components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../_components/_auth/forgot-password/forgot-password.component';
import { LoginComponent } from '../_components/_auth/login/login.component';
import { ProfileComponent } from '../_components/_auth/profile/profile.component';
import { RegisterComponent } from '../_components/_auth/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxStripeModule } from 'ngx-stripe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


// 8YvA7kPbR2mX3uHwS6JnQgZtF4cV5xWp-c2BnRw5OzY7Lx3XmJq9UgCpHm4KfP6iA-9EhPvFjK1sQr4TlWnXzR3uY6Dg2mC8bV -  secret url for registration

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [SignedInGuard]},
  { path: 'register/:id', component: RegisterComponent, canActivate: [SignedInGuard]},
  { path: 'forget', component: ForgotPasswordComponent, canActivate: [SignedInGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent, 
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgxStripeModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgApexchartsModule,
    MatTooltipModule,
    MatSelectModule,
    MatMenuModule,
    MatProgressBarModule,
    MatInputModule,  
    MatTabsModule,
    MatSliderModule,
    Ng2GoogleChartsModule
  ],
  exports: [RouterModule]
})
export class AuthModule { }
