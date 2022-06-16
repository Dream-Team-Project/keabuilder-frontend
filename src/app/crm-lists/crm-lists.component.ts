import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface UserData {
  position:number;
  name: string;
  activecontacts: string;
  actions:string;
}


@Component({
  selector: 'app-crm-lists',
  templateUrl: './crm-lists.component.html',
  styleUrls: ['./crm-lists.component.css']
})
export class CrmListsComponent implements OnInit {

 
  displayedColumns: string[] = ['select','name', 'activecontacts','actions'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  currencytype = '';
  kbduration = '';

  poupsidebar = false;
  
  constructor() {
    
    const users =[
        {position:1,name:'Book a call', activecontacts:'20', actions:''},
        {position:2,name:'All Members', activecontacts:'1,201', actions:''},
        {position:3,name:'All Experts', activecontacts:'101', actions:''},
        {position:4,name:'Career', activecontacts:'11', actions:''},
    ];
    this.dataSource = new MatTableDataSource(users);

  }

  addnewconnect(){
    this.poupsidebar = true;
  }

  hidepopupsidebar(){
    this.poupsidebar = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
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
