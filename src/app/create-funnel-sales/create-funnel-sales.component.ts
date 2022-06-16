import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface UserData {
  position:number;
  product:string;
  amount:string;
  customer:string;
  status:string;
  transition:string;
  actions: string;
}

@Component({
  selector: 'app-create-funnel-sales',
  templateUrl: './create-funnel-sales.component.html',
  styleUrls: ['./create-funnel-sales.component.css']
})
export class CreateFunnelSalesComponent implements OnInit {
 
  displayedColumns: string[] = ['select', 'product', 'amount', 'customer', 'status','transition', 'actions'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  mainOpen = 'sales';

  constructor() { 

    const users =[
      {position:1,product:'Optin', amount:'$12.00', customer:'DeanStanley@gmail.com', status:'Active',transition:'2 Days Ago', actions:''},
      {position:1,product:'Landing page', amount:'$2.00', customer:'peter@gmail.com', status:'Active',transition:'4 Days Ago', actions:''},
      {position:1,product:'Upsell', amount:'$120.00', customer:'newwork@gmail.com', status:'InActive',transition:'1 Days Ago', actions:''},
    ];
    this.dataSource = new MatTableDataSource(users);

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  kb_mainsteps(value: string) {
    this.mainOpen = value;
  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /* Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /* Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /* The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
