import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { CrmListService } from '../_services/_crmservice/crm_list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrmService } from '../_services/_crmservice/crm.service';
import { CrmTagsService } from '../_services/_crmservice/crm-tags.service';
import { MatDialog } from '@angular/material/dialog';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  Form,
} from '@angular/forms';
export interface UserData {
  position:number;
  list_name: string;
  activecontacts: any;
  actions:string;
}


@Component({
  selector: 'app-crm-lists',
  templateUrl: './crm-lists.component.html',
  styleUrls: ['./crm-lists.component.css']
})
export class CrmListsComponent implements OnInit {

 
  displayedColumns: string[] = ['checkbox','list_name', 'activecontacts','actions'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  currencytype = '';
  kbduration = '';
  listexist: any;
  popup: any;
  // popupsidebar = false;
  sidebar = {
    open: false,
    anim: { open: false, close: false, time: 500 },
    animtime: 300,
  };
  dellist:any;
  lists:any=[];
  contacts: any = [];
  listchar:any=[];
  singlelist:any;
  buttonText='add';
  order:any=[ 
    {value: 'ascending', viewValue: 'Ascending'},
    {value: 'descending', viewValue: 'Descending'},
  ];
optionGroup:any=[
    {value: 'list_name', viewValue: 'Name', order: this.order},
    {value: 'activecontacts', viewValue: 'Contacts', order: this.order},
]
selectedForm:string = '';
  crmlistForm: any = this._frmbuidr.group({
    list_name: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
    uniqueid: ''
  });
  constructor(private _crmlistService: CrmListService,private _frmbuidr: FormBuilder,
    private _snackBar: MatSnackBar, 
    private _crmtagService: CrmTagsService,
    private crmService: CrmService,
    private dialog: MatDialog,
    ) {
    
    this.dataSource = new MatTableDataSource(this.lists);

  }
  ngOnInit(): void {
    this.fetchLists().then((resp1) => {
    });
     // setTimeout(() => {
     //   this.dataSource.paginator = this.paginator;
     //   this.dataSource.sort = this.sort;
     // }, 500);
   }
  sortlist(){
    console.log(this.selectedForm)
    if(this.selectedForm[0]=='list_name' && this.selectedForm[1]=='Ascending'){
      this.lists.sort((a:any,b:any) =>a.list_name.toLowerCase()>b.list_name.toLowerCase() ? 1 :-1);
    }
    else if(this.selectedForm[0]=='list_name' && this.selectedForm[1]=='Descending'){
      this.lists.sort((a:any,b:any) =>a.list_name.toLowerCase()<b.list_name.toLowerCase() ? 1 :-1);
    }
    else if(this.selectedForm[0]=='activecontacts' && this.selectedForm[1]=='Ascending'){
      this.lists.sort((a:any,b:any) =>a.activecontacts>b.activecontacts ? 1 :-1);
    }
    else if(this.selectedForm[0]=='activecontacts' && this.selectedForm[1]=='Descending'){
      this.lists.sort((a:any,b:any) =>a.activecontacts<b.activecontacts ? 1 :-1);
    }
    else{
      this.lists.sort((a:any,b:any) =>a.created_at<b.created_at ? 1 :-1);
    }
  }
  gettwochar(value:any){
    this.listchar=value.trim().split(" ");
    return this.listchar.length >= 2 ? this.listchar[0][0]+this.listchar[1][0] : this.listchar[0][0]+this.listchar[0][1];
  }
  fetchLists() {
    return new Promise((resolve) => {
      this._crmlistService.getAllcrmlists().subscribe(
        (data) => {
          this.lists = data.data;
          resolve(true);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }
  openpopup(){
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e: any) => {
      this.sidebar.anim.open = false;
      
    }, this.sidebar.animtime);
    this.popup = true;
  }
  opensidebar(){
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e: any) => {
      this.sidebar.anim.open = false;
    }, this.sidebar.animtime);

  }

  hidepopupsidebar(){
    this.sidebar.anim.close = true;
    setTimeout((e: any) => {
      this.popup = false;
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
      this.crmlistForm.reset();
      this.listexist=0;
      this.buttonText = 'Add';
      this.singlelist=[];
    }, this.sidebar.animtime);
    
  }
  
  addcrmlist() {
    this._crmlistService
      .createcrmlist(this.crmlistForm.value)
      .subscribe((data) => {
        this.hidepopupsidebar();
        this.ngOnInit();
        // this.crmlistForm.reset();
        this._snackBar.open('CRM List added Succesfully !', 'OK');
      });
  }

  updatecrmlist(){
    // console.log(this.crmlistForm.value);
    this._crmlistService.updatecrmlist(this.crmlistForm.value).subscribe((data)=>{
      console.log(data.data)
      // this.crmlistForm.reset();
      this.hidepopupsidebar();
      this.ngOnInit();
      this._snackBar.open('CRM List updated Succesfully !', 'OK');

    })
  }
//   viewList(list:any){
 
//   // this._crmlistService.getcrmlists(uniqueid).subscribe((data)=>{
//   //   this.singlelist=data.data[0];
//     this.singlelist=list;
//     this.openpopup();
//     // console.log(this.singlelist);
//     this.ngOnInit();
//   // })
// }

  editList(list:any) {
  
    this.crmlistForm.patchValue(list);
    this.opensidebar();
    this.buttonText='update';
  }
  copyList(list:any){
    
    let obj={list_name:list+' '+'copy'};
    this._crmlistService
    .createcrmlist(obj)
    .subscribe((data) => {
      this.ngOnInit();
      this._snackBar.open('CRM List Copied Succesfully !', 'OK');
    });
  }
  
  openDialog(templateRef: TemplateRef<any>, list:any) {
    this.dellist = list;
    this.dialog.open(templateRef);

  }

  validatelist_name() {
    return new Promise((resolve) => {
      var list_name = this.crmlistForm.value.list_name;
      this._crmlistService.crmDuplicatelistcheck(list_name).subscribe((data) => {
        this.listexist = data.data[0]['count(*)'];
        resolve(this.listexist);
      });
    });
  }

  openDialog_addlist(templateRef: TemplateRef<any>) {
    this.validatelist_name().then((data:any)=>{
      data != 0 ? this.dialog.open(templateRef) : this.addcrmlist();
    })
  }

  deletecrmlist(uniqueid:any){
    this._crmlistService.deletecrmlist(uniqueid).subscribe((data)=>{
      this.ngOnInit();
      this._snackBar.open('CRM List deleted Succesfully !', 'OK');

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


}
