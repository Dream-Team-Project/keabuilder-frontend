import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingService } from 'src/app/_services/_crm/setting.service';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
  @ViewChild('dialogtimezone') dialogtimezone!: TemplateRef<any>;
  timezone:any='America/New_York';
  constructor(
    private dialog: MatDialog,
    private _settingService: SettingService,
    private _snackBar: MatSnackBar,
  ) { 
    this.fetchcrmsmtp();
  }

  ngOnInit(): void {
  }
  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
  }
  fetchcrmsmtp(){
    this._settingService.singlesetting().subscribe({
      next: data => {
        if(!data.data[0]?.global_timezone)this.openDialog(this.dialogtimezone);
      }
    });
  }
  Settimezone(){
    console.log(this.timezone)
    let obj={global_timezone:this.timezone};
    this._settingService.globaltimezone(obj).subscribe((data:any)=>{

    })
    this._snackBar.open("Global TimeZone Set Successfully","Ok",{duration:3000});
  }
  gettimezone(event:any){
    var timez = event.source.triggerValue;
    this.viewmytimezone(timez);
  }
  viewmytimezone(timez:any){
    const date = new Date();

    var dt = date.toLocaleString('en-US', {
        timeZone: timez,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });

      return dt;
  }

}