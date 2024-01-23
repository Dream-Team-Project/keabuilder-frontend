import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { CrmComponent } from '../_components/_crm/crm/crm.component';
import { CrmAutomationComponent } from '../_components/_crm/automation/automation.component';
import { CrmAutomationBuilderComponent } from '../_components/_crm/automation-builder/automation-builder.component';
import { CrmAutomationWorkflowComponent } from '../_components/_crm/automation-workflow/automation-workflow.component';
import { CrmCampaignBuilderComponent } from '../_components/_crm/campaign-builder/campaign-builder.component';
import { CrmCampaignsComponent } from '../_components/_crm/campaigns/campaigns.component';
import { CrmContactComponent } from '../_components/_crm/contact/contact.component';
import { CrmContactsComponent } from '../_components/_crm/contacts/contacts.component';
import { CrmFieldsComponent } from '../_components/_crm/fields/fields.component';
import { CrmFormBuilderComponent } from '../_components/_crm/form-builder/form-builder.component';
// import { CrmFormFetchComponent } from '../_components/_crm/form-fetch/form-fetch.component';
import { FormfetchModule } from './formfetch.module';
import { CrmFormsComponent } from '../_components/_crm/forms/forms.component';
import { CrmListsComponent } from '../_components/_crm/lists/lists.component';
import { CrmReportsComponent } from '../_components/_crm/reports/reports.component';
import { CrmSettingsComponent } from '../_components/_crm/settings/settings.component';
import { CrmTagsComponent } from '../_components/_crm/tags/tags.component';
import { CrmEmailsComponent } from '../_components/_crm/emails/emails.component';
import { CrmEmailBuilderComponent } from '../_components/_crm/email-builder/email-builder.component';
import { BuilderSettingModule } from './builder-setting.module';
import { PipeModule } from './pipe.module';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatSidenavModule } from '@angular/material/sidenav';


const routes: Routes = [
    { path: 'crm', component: CrmComponent, 
    children:[
      { path: '', component: CrmReportsComponent, canActivate: [AuthGuard] },
      { path: 'automations', component: CrmAutomationComponent, canActivate: [AuthGuard] },
      { path: 'campaigns', component: CrmCampaignsComponent, canActivate: [AuthGuard] },
      { path: 'contacts', component: CrmContactsComponent, canActivate: [AuthGuard] },
      { path: 'fields', component: CrmFieldsComponent, canActivate: [AuthGuard] },
      { path: 'forms', component: CrmFormsComponent, canActivate: [AuthGuard] },
      { path: 'lists', component: CrmListsComponent, canActivate: [AuthGuard] },
      { path: 'reports', component: CrmReportsComponent, canActivate: [AuthGuard] },
      { path: 'settings', component: CrmSettingsComponent, canActivate: [AuthGuard] },
      { path: 'tags', component: CrmTagsComponent, canActivate: [AuthGuard] },
      { path: 'emails', component: CrmEmailsComponent, canActivate: [AuthGuard] },
    ],
    canActivate: [AuthGuard] },
    { path: 'crm/contact/:uniqueid', component: CrmContactComponent, canActivate: [AuthGuard] },
    { path: 'crm/campaign/:uniqueid', component: CrmCampaignBuilderComponent, canActivate: [AuthGuard] },
    { path: 'fetch-form/:user_id/:form_id', component: FormfetchModule},
    
    { path: 'builder/automation/:id', component: CrmAutomationBuilderComponent, canActivate: [AuthGuard] },
    { path: 'builder/email/:id', component: CrmEmailBuilderComponent, canActivate: [AuthGuard] },
    { path: 'builder/form/:id', component: CrmFormBuilderComponent, canActivate: [AuthGuard] },
    { path: 'member/:memberid/:uniqueid', component: CrmContactComponent, canActivate: [AuthGuard] },
  ];

@NgModule({
  declarations: [
    CrmComponent,
    CrmFormsComponent,
    CrmEmailsComponent,
    CrmEmailBuilderComponent,
    CrmCampaignsComponent,
    CrmContactsComponent,
    CrmContactComponent,
    CrmListsComponent,
    CrmTagsComponent,
    CrmReportsComponent,
    CrmSettingsComponent,
    CrmCampaignBuilderComponent,
    CrmAutomationComponent,
    CrmAutomationBuilderComponent,
    CrmAutomationWorkflowComponent, 
    CrmFormBuilderComponent,
    CrmFieldsComponent,
    // BuilderSettingComponent,
    
  ],
  imports: [
    CommonModule,
    PipeModule,
    FormfetchModule,
    BuilderSettingModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatListModule,
    MatBottomSheetModule, 
    MatFormFieldModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatMenuModule,
    EditorModule,
    MatProgressSpinnerModule,
    ClipboardModule,
    DragDropModule,
    NgApexchartsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatSidenavModule,
  ],
  exports: [RouterModule]
})
export class CrmModule { }
