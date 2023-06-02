import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrmSmtpService } from '../_services/_crmservice/crm-smtp.service';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
  @ViewChild('dialogtimezone') dialogtimezone!: TemplateRef<any>;
  constructor(
    private dialog: MatDialog,
    private crmSmtpService: CrmSmtpService,
  ) { 
    this.fetchcrmsmtp();
  }

  ngOnInit(): void {
  }
  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
  }
  fetchcrmsmtp(){
    this.crmSmtpService.getsmtpdetails().subscribe({
      next: data => {
        if(!data.data[0]?.global_timezone)this.openDialog(this.dialogtimezone);
      }
    });
  }

}