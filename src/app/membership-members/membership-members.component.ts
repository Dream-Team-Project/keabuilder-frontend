import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';

export interface UserData {
  position:number;
  name: string;
  email: string;
  emailmarketing:string;
  addeddate: string;
  lastactivity: string;
  options: string;
}

@Component({
  selector: 'app-membership-members',
  templateUrl: './membership-members.component.html',
  styleUrls: ['./membership-members.component.css']
})
export class MembershipMembersComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'email', 'emailmarketing', 'addeddate', 'lastactivity', 'options'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);
  currencytype = '';
  kbduration = '';
  popupsidebar = false;
  automationaddnewaction = false;
  productoptionals = new FormControl();
  productoptionalList: string[] = ['For testing', 'Small Option Big Profits','Weekly Options Income Academy'];
  tagoptionals = new FormControl();
  tagoptionalList: string[] = ['29', 'Discount','Weekly Income'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    
    const users =[
        {position:1, name:'yasuhiro usui', email:'yutb926@gmail.com', emailmarketing:'Subscribed', addeddate:'May 27, 2022', lastactivity:'---', options:''},
        {position:2, name:'abc', email:'abc@gmail.com', emailmarketing:'Subscribed', addeddate:'May 27, 2022', lastactivity:'---', options:''},
        {position:3, name:'Balamuruganand Selvaraj', email:'dd@gmail.com', emailmarketing:'Subscribed', addeddate:'May 27, 2022', lastactivity:'---', options:''},
        {position:4, name:'yasuhiro ss', email:'yutb9ss26@gmail.com', emailmarketing:'Never subscribed	', addeddate:'May 27, 2022', lastactivity:'May 27, 2022', options:''},
        {position:5, name:'to', email:'to@gmail.com', emailmarketing:'Subscribed', addeddate:'May 27, 2022', lastactivity:'---', options:''},
        {position:6, name:'tafar ville', email:'tafarineufville@gmail.com', emailmarketing:'Subscribed', addeddate:'May 27, 2022', lastactivity:'---', options:''},
        {position:7, name:'danash vo', email:'danash1@yahoo.com', emailmarketing:'Subscribed', addeddate:'May 27, 2022', lastactivity:'---', options:''},
        {position:8, name:'db', email:'db@gmail.com', emailmarketing:'Never subscribed	', addeddate:'May 27, 2022', lastactivity:'---', options:''},
    ];
    this.dataSource = new MatTableDataSource(users);

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

  addnewcontact(){
    this.popupsidebar = true;
    this.automationaddnewaction = true;
  }
  
  hidepopupsidebar(){
    this.popupsidebar = false;
  }

}
