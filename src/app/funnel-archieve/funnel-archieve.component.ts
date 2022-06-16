import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface UserData {
  funnel:string;
  step:string;
  created_at:string;
  actions: string;
}

@Component({
  selector: 'app-funnel-archieve',
  templateUrl: './funnel-archieve.component.html',
  styleUrls: ['./funnel-archieve.component.css']
})
export class FunnelArchieveComponent implements OnInit {

  
  displayedColumns: string[] = ['funnel', 'step', 'created_at', 'actions'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
    const users =[
      {funnel:'Book A Call', step:'Optin', created_at:'Wed, 03 Mar 2021 00:36:31', actions:''},
      {funnel:'Marketing', step:'Sales Page', created_at:'Wed, 03 Mar 2021 00:36:31', actions:''},
      {funnel:'Webinar', step:'Book a call', created_at:'Wed, 03 Mar 2021 00:36:31', actions:''},
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
