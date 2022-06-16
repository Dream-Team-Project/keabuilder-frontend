import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface UserData {
  position:number;
  fullname: string;
  email: string;
  phone:string;
  datecreated: string;
  actions: string;
}


@Component({
  selector: 'app-crm-contacts',
  templateUrl: './crm-contacts.component.html',
  styleUrls: ['./crm-contacts.component.css']
})
export class CrmContactsComponent implements OnInit {


  displayedColumns: string[] = ['select','fullname', 'email','phone', 'datecreated', 'actions'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  currencytype = '';
  kbduration = '';

  poupsidebar = false;
  
  constructor() {
    
    const users =[
        {position:1,fullname:'Emily Adams', email:'inspireempowerimpact@gmail.com', phone:'18125938054', datecreated:'05/27/2022 15:06', actions:''},
        {position:2,fullname:'Rhonda Britten', email:'rhonda@fearlessliving.org', phone:'18182619579', datecreated:'05/21/2022 09:27', actions:''},
    ];
    this.dataSource = new MatTableDataSource(users);

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  addnewconnect(){
    this.poupsidebar = true;
  }

  hidepopupsidebar(){
    this.poupsidebar = false;
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
