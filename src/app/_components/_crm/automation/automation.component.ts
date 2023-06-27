import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AutomationService } from 'src/app/_services/_crm/automation.service';


@Component({
  selector: 'app-crm-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class CrmAutomationComponent implements OnInit {

togglebutton=true;
delautomation:any;
automations:any=[];
automationname ='';
automationnameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
constructor(private _automationservice: AutomationService,private _snackBar: MatSnackBar, private dialog: MatDialog,
  ) {
  this.togglebutton=true; 
 }

ngOnInit(): void {
  this.fetchAutomations();
}

fetchAutomations() {
  return new Promise((resolve) => {
    this._automationservice.fetchautomations().subscribe(
      (data) => {
        this.automations = data.data;
        resolve(true);
      },
      (error) => {
        resolve(false);
      }
    );
  });
}
toggleView(){
  this.togglebutton=!this.togglebutton; 
}
addautomation(){
 
  // this._automationservice
  // .addautomation(obj)
  // .subscribe((data) => {
  //   this.fetchAutomations()
  //   this._snackBar.open('Automation Added Succesfully !', 'OK');
  // });
}
copyAutomation(automation:any){
  let obj=automation;
  obj.name=obj.name+' '+'copy';
  // console.log(obj)
  this._automationservice
  .addautomation(obj)
  .subscribe((data) => {
    this.fetchAutomations()
    this._snackBar.open('CRM Automation Copied Succesfully !', 'OK');
  });
}
openDialog(templateRef: TemplateRef<any>, automation:any) {
  this.delautomation = automation;
  this.dialog.open(templateRef);

}
deleteAutomation(id:any){
  this._automationservice.deleteautomation(id).subscribe((data)=>{
    this.fetchAutomations()
    this._snackBar.open('CRM Automation deleted Succesfully !', 'OK');

  })
}

searchAutomations(search: any, sort: any, filter: any) {
  var obj = {
    search: search.value,
    sort: sort.value,
    filter: filter.value,
  }
  // console.log(obj);
  this._automationservice.searchautomations(obj).subscribe((data:any)=>{
    console.log(data.data)
    this.automations = data.data;
  });
}
}

