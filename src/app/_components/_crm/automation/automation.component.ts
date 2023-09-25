import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AutomationGeneralService } from 'src/app/_services/_crm/automation-general.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';



@Component({
  selector: 'app-crm-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class CrmAutomationComponent implements OnInit {

searching=false;
togglebutton=true;
delautomation:any;
automations:any=[];
automationname ='';
automationnameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
constructor( public _general: GeneralService,private _automationgeneralservice: AutomationGeneralService,private _snackBar: MatSnackBar, private dialog: MatDialog,private route: ActivatedRoute,
  private router: Router,
  ) {
  this.togglebutton=true; 
 }

ngOnInit(): void {
  this.fetchAutomations();
}

fetchAutomations() {
  this.searching=true;
  return new Promise((resolve) => {
    this._automationgeneralservice.fetchautomations().subscribe(
      (data) => {
        this.automations = data.data;
        this.searching=false;
        resolve(true);
      },
      (error) => {
        this.searching=false;
        resolve(false);
      }
    );
  });
}
toggleView(){
  this.togglebutton=!this.togglebutton; 
}
addautomation(){
  if(this.automationnameControl.status=='VALID'){
    if(this.automationname!=''){
      var data = {name:this.automationname};
  this._automationgeneralservice
  .addautomation(data)
  .subscribe((data) => {
    // console.log(data.uniqueid)
    this.fetchAutomations()
    this.dialog.closeAll();
     this._general.openSnackBar(false,'Automation Added Succesfully', 'OK','center','top');
    this.router.navigate(['/builder/automation/'+data.uniqueid],{relativeTo: this.route});
  });
    }
  }
}
copyAutomation(automation:any){
  let obj=automation;
  obj.name=obj.name+' '+'copy';
  // console.log(obj)
  this._automationgeneralservice
  .addautomation(obj)
  .subscribe((data) => {
    this.fetchAutomations();
     this._general.openSnackBar(false,'CRM Automation Copied Succesfully', 'OK','center','top');

  });
}
openDialog(templateRef: TemplateRef<any>, automation:any) {
  this.delautomation = automation;
  this.dialog.open(templateRef);

}
deleteAutomation(id:any){
  this.searching=true;
  this._automationgeneralservice.deleteautomation(id).subscribe((data)=>{
    this.fetchAutomations();
    this._general.openSnackBar(false,'CRM Automation deleted Succesfully', 'OK','center','top');

  })
}

searchAutomations(search: any, sort: any, filter: any) {
  this.searching=true;
  var obj = {
    search: search.value,
    sort: sort.value,
    filter: filter.value,
  }
  // console.log(obj);
  this._automationgeneralservice.searchautomations(obj).subscribe((data:any)=>{
    // console.log(data.data)
    this.automations = data.data;
    this.searching=false;
  });
}
}

