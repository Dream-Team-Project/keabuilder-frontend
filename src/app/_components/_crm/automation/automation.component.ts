import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AutomationGeneralService } from 'src/app/_services/_crm/automation-general.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-crm-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class CrmAutomationComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;

searching=false;
togglebutton=true;
delautomation:any;
automations:any=[];
automationname ='';
automationnote ='';
automationnameControl = new FormControl('',[Validators.required,Validators.minLength(3)]);
automationslength:any;
pageautomations:any;
selectedAutomations: any[] = [];
checked_selected=false;
sortInp : string = '';
searchInp : string = ''; 
filterInp : string = 'name DESC';


constructor( public _general: GeneralService,private _automationgeneralservice: AutomationGeneralService,private _snackBar: MatSnackBar, private dialog: MatDialog,private route: ActivatedRoute,
  private router: Router,
  ) {
  this.togglebutton=true; 
 }

ngOnInit(): void {
  this.getpageautomations({pageIndex:0,pageSize:20});
  // this.fetchAutomations();
}

// fetchAutomations() {
//   this.searching=true;
//   return new Promise((resolve) => {
//     this._automationgeneralservice.fetchautomations().subscribe(
//       (data) => {
//         this.automations = data.data;
//         this.searching=false;
//         resolve(true);
//       },
//       (error) => {
//         this.searching=false;
//         resolve(false);
//       }
//     );
//   });
// }
toggleView(){
  this.togglebutton=!this.togglebutton; 
}
addautomation(){
  if(this.automationnameControl.status=='VALID'){
    if(this.automationname!=''){
      var data = {name:this.automationname,note:this.automationnote};
  this._automationgeneralservice
  .addautomation(data)
  .subscribe((data) => {
    // console.log(data.uniqueid)
    this.getpageautomations({pageIndex:0,pageSize:20});
    // this.fetchAutomations()
    this.dialog.closeAll();
     this._general.openSnackBar(false,'Automation Added Succesfully', 'OK','center','top');
    this.router.navigate(['/builder/automation/'+data.uniqueid],{relativeTo: this.route});
  });
    }
  }
}
updateautomation(){
  if(this.automationnameControl.status=='VALID'){
this._automationgeneralservice.updateautomation(this.delautomation).subscribe((data:any)=>{
    if(data.success){
      var msg= 'Automation has been updated';
      this._general.openSnackBar(false,msg,'OK','center','top');
      this.dialog.closeAll();
    }
  })
}
  }    
copyAutomation(automation:any){
  let obj=automation;
  obj.name=obj.name+' '+this._general.makeid(10);
  // console.log(obj)
  this._automationgeneralservice
  .addautomation(obj)
  .subscribe((data) => {
    this.getpageautomations({pageIndex:0,pageSize:20});
    // this.fetchAutomations();
     this._general.openSnackBar(false,'CRM Automation Copied Succesfully', 'OK','center','top');

  });
}
openDialog(templateRef: TemplateRef<any>, automation:any) {
  this.delautomation = automation;
  this.dialog.open(templateRef).afterClosed().subscribe((data:any)=>{
    this.automationname='';
    this.automationnote='';
    this.dialog.closeAll();
  })

}
deleteAutomation(id:any){
  this.searching=true;
  this._automationgeneralservice.deleteautomation(id).subscribe((data)=>{
    this.getpageautomations({pageIndex:0,pageSize:20});
    // this.fetchAutomations();
    this._general.openSnackBar(false,'CRM Automation deleted Succesfully', 'OK','center','top');

  })
}

toggleSort(column: string): void {
  // console.log(column)
  if (this.filterInp.includes(column)) {
    this.filterInp = this.filterInp.endsWith('ASC') ? `${column} DESC` : `${column} ASC`;
  } else {
    this.filterInp = `${column} ASC`;
  }
  this.searchAutomations(this.searchInp, this.sortInp, this.filterInp);
}


searchAutomations(search: any, sort: any, filter: any) {
  this.searching=true;
  var obj = {
    search: search,
    sort: sort,
    filter: filter,
    pageIndex:this.paginator?.pageIndex ? this.paginator?.pageIndex : 0,
    pageSize:this.paginator?.pageSize ? this.paginator?.pageSize : 20,
  }
  console.log(obj);
  this._automationgeneralservice.searchautomations(obj).subscribe((data:any)=>{
    // console.log(data.data)
    this.pageautomations = data.data;
    this.searching=false;
  });
}
getpageautomations(event:any){
  let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
    this._automationgeneralservice.getpageautomations(obj).subscribe(
      (data:any) => {
        // this.kbcampaigns = data?.data;
        this.pageautomations=data?.data;
        this.automationslength=data?.automations;
        this.searching = false;
        // console.log(this.lists)
  });
}
selectAutomations(event: any, obj: any) {
if (event) {
  this.selectedAutomations.push(obj);
} else {
  const index = this.selectedAutomations.indexOf(obj);
  if (index !== -1) {
    this.selectedAutomations.splice(index, 1);
  }
}
console.log(this.selectedAutomations)
}

selectAllAutomations(event: any) {
// console.log(event)
if(event){
this.pageautomations=this.pageautomations.map((ele:any)=>{ele.selected = true; return ele;});
}
else{
  this.pageautomations=this.pageautomations.map((ele:any)=>{ele.selected = false; return ele;});
}
this.selectedAutomations = event ? [...this.pageautomations] : [];
// console.log(this.selectedContacts)
}

deleteSelectedAutomations(obj:any) {
this._automationgeneralservice.deleteselectedautomations({automations:obj}).subscribe((resp:any) => {
  if(resp.success) 
  this.getpageautomations({pageIndex:0,pageSize:20});
  this.resetselecteddata();
  this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
});
}

resetselecteddata(){
this.pageautomations=this.pageautomations.map((ele:any)=>{ele.selected = false; return ele;});
this.checked_selected=false;
this.selectedAutomations=[];
}

}

