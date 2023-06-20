import { Component, OnInit, TemplateRef } from '@angular/core';
import { CrmAutomationsService } from 'src/app/_services/_crmservice/crm-automations.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-crm-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class CrmAutomationComponent implements OnInit {

togglebutton=true;
order:any=[ 
  {value: 'ascending', viewValue: 'Ascending'},
  {value: 'descending', viewValue: 'Descending'},
];
optionGroup:any=[
  {value: 'automation_name', viewValue: 'Name', order: this.order},
  {value: 'created_at', viewValue: 'Create On', order: this.order},
  {value: 'updated_at', viewValue: 'Last Modified On', order: this.order},
]
delautomation:any;
selectedForm:string = '';
selectedForm1:string = '';
  automations:any=[];
// automations:any[] = [
//   {
//       "id": 1,
//       "automation_name": "Business Mindset",
//       "automation_url": "business-mindset",
//       "domain": null,
//       "publish_status": 1,
//       "automation_campaigns":"5",
//       "thumbnail": "`https://wiseher.img-us3.com/_screenshot_/679a821dafa146fd2daa614677bca468bd55e935.png`",
//       "updated_at": "Thu Jan 06 2022 5:09:57 PM",
//       "entries":'10',
//       "itemshow": false,
//       "dropdownstatus": false
//   },
//   {
//     "id": 1,
//     "automation_name": "Lead Form Automation",
//     "automation_url": "lead-form",
//     "domain": null,
//     "publish_status": 0,
//     "automation_campaigns":"3",
//     "thumbnail": "https://ac-image.s3.amazonaws.com/2/3/0/4/0/2/0/home/_screenshot_/92aa52b35b8f0fc713d7f07e44d174c4ce31537f.png",
//     "updated_at": "Thu Jan 06 2022 5:09:57 PM",
//     "entries":'2',
//     "itemshow": false,
//     "dropdownstatus": false
//   }
// ];

constructor(private crm_automations_service: CrmAutomationsService,
  private _snackBar: MatSnackBar, 
  private dialog: MatDialog,
  ) {
  this.togglebutton=true; 
 }

ngOnInit(): void {
  this.fetchAutomations();
}
// fetchdata(){
//   this.fetchAutomations().then((resp1)=>{
//     // console.log(resp1)
//     this.sortautomations().then((resp2)=>{
//       // console.log(resp2);  
//     })
//     this.sortautomations1().then((resp3)=>{
//       // console.log(resp3);  
//     })
//   });
// }
// sortautomations(){
//   // console.log(this.selectedForm)
//   return new Promise((resolve) => {
//   if(this.selectedForm[0]=='automation_name' && this.selectedForm[1]=='Ascending'){
//     this.automations.sort((a:any,b:any) =>a.automation_name.toLowerCase()>b.automation_name.toLowerCase() ? 1 :-1);
//   }
//   else if(this.selectedForm[0]=='automation_name' && this.selectedForm[1]=='Descending'){
//     this.automations.sort((a:any,b:any) =>a.automation_name.toLowerCase()<b.automation_name.toLowerCase() ? 1 :-1);
//   }
//   else if(this.selectedForm[0]=='updated_at' && this.selectedForm[1]=='Ascending'){
//     this.automations.sort((a:any,b:any) =>a.updated_at.toLowerCase()>b.updated_at.toLowerCase() ? 1 :-1);
//   }
//   else if(this.selectedForm[0]=='updated_at' && this.selectedForm[1]=='Descending'){
//     this.automations.sort((a:any,b:any) =>a.updated_at.toLowerCase()<b.updated_at.toLowerCase() ? 1 :-1);
//   }
//   else if(this.selectedForm[0]=='created_at' && this.selectedForm[1]=='Ascending'){
//     this.automations.sort((a:any,b:any) =>a.created_at.toLowerCase()>b.created_at.toLowerCase() ? 1 :-1);
//   }
//   else{
//     this.automations.sort((a:any,b:any) =>a.created_at.toLowerCase()<b.created_at.toLowerCase() ? 1 :-1);
//   }
//   resolve(true);
// })
// }
// sortautomations1(){
//   console.log(this.selectedForm1)
//   return new Promise((resolve) => {
//   if(this.selectedForm1==''){
//     this.fetchAutomations();

//   }
//   else{
//     this.crm_automations_service.crmautomationStatus(this.selectedForm1).subscribe((data:any)=>{
//       this.automations=data.data;
//       console.log(data.data)
//     })
//   }  
//   resolve(true);
// })
// }
fetchAutomations() {
  return new Promise((resolve) => {
    this.crm_automations_service.getAllcrmautomations().subscribe(
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
  // this.togglebutton=this.togglebutton;
}

copyAutomation(automation:any){
  let obj=automation;
  obj.automation_name=obj.automation_name+' '+'copy';
  // console.log(obj)
  this.crm_automations_service
  .createcrmautomation(obj)
  .subscribe((data) => {
    this.fetchAutomations()
    this._snackBar.open('CRM Automation Copied Succesfully !', 'OK');
  });
}
openDialog(templateRef: TemplateRef<any>, automation:any) {
  this.delautomation = automation;
  this.dialog.open(templateRef);

}
deleteAutomation(uniqueid:any){
  this.crm_automations_service.deletecrmautomation(uniqueid).subscribe((data)=>{
    this.fetchAutomations()
    this._snackBar.open('CRM Automation deleted Succesfully !', 'OK');

  })
}

searchAutomations(search: any, sort: any, filter: any) {
  var obj = {
    search: search.value,
    sort: sort.value,
    filter: filter.value
  }
  // console.log(obj);
  this.crm_automations_service.searchAutomationsquery(obj).subscribe((data:any)=>{
    console.log(data.data)
    this.automations = data.data;
  });
}
}

