import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';

export interface UserData {
  name: string;
  people: string;
  options:string;
}

@Component({
  selector: 'app-membership-tags',
  templateUrl: './membership-tags.component.html',
  styleUrls: ['./membership-tags.component.css']
})
export class MembershipTagsComponent implements OnInit {

 
  displayedColumns: string[] = ['name', 'people', 'options'];
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []);
  currencytype = '';
  kbduration = '';
  poupsidebar = false;
  automationaddnewaction = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    
    const users =[
        {name:'members', people:'200', options:''},
        {name:'Clicked Black Friday Payment Offer', people:'300', options:''},
        {name:'experts', people:'10', options:''},
        {name:'usergo', people:'0', options:''},
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

  addnewcontact(){
    this.poupsidebar = true;
    this.automationaddnewaction = true;
  }
  
  hidepopupsidebar(){
    this.poupsidebar = false;
  }


}
