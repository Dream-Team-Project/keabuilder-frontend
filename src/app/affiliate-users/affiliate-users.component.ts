import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface UserData {
  name: string;
  email: string;
  paypalemail:string;
  joindate:string;
  actions:string;
}

@Component({
  selector: 'app-affiliate-users',
  templateUrl: './affiliate-users.component.html',
  styleUrls: ['./affiliate-users.component.css']
})
export class AffiliateUsersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email','paypalemail','joindate','actions'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    
    const users =[
        {name:'John Monst', email:'store@john.com',paypalemail:'tranvanou@john.com',joindate:'Dec 3, 2021', actions:''},
        {name:'Lucky Murray', email:'peter@theschoolofmix.com',paypalemail:'peter@theschoolofmix.com',joindate:'Nov 3, 2021', actions:''},
        {name:'Hue long', email:'huelong@gmail.com',paypalemail:'huelong@gmail.com',joindate:'Oct 3, 2021', actions:''},
        {name:'Shaun', email:'shaun@gmail.com',paypalemail:'shaun@gmail.com',joindate:'Jan 3, 2022', actions:''},
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

}
