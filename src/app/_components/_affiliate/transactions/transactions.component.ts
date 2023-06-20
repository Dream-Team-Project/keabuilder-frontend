import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

export interface UserData {
 affiliate:string;
 offer:string;
 date:string;
 reason:string;
 percentage:string;
 amount:string;
 actions:string;
}

@Component({
  selector: 'app-affiliate-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class AffiliateTransactionsComponent implements OnInit {


  displayedColumns: string[] = ['affiliate', 'offer','date','reason','percentage','amount','actions'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    
    const users =[
        {affiliate:'warren@producelikeapro.com',offer:'The jumpStart...',date:'Jun 2, 2021 1:42PM',reason:'',percentage:'50',amount:'$49.50 USD', actions:''},
        {affiliate:'kern@homerecordingweekly.com',offer:'The jumpStart...',date:'Jun 4, 2021 1:42PM',reason:'',percentage:'50',amount:'$49.50 USD', actions:''},
        {affiliate:'great@gowith.com',offer:'The jumpStart...',date:'Jun 8, 2021 1:42PM',reason:'',percentage:'50',amount:'$49.50 USD', actions:''},
        {affiliate:'tom@weekly.com',offer:'The jumpStart...',date:'Jun 10, 2021 1:42PM',reason:'',percentage:'50',amount:'$29.70 USD', actions:''},
        {affiliate:'jerry@menon.com',offer:'The jumpStart...',date:'July 20, 2021 1:42PM',reason:'',percentage:'50',amount:'refunded', actions:''},
        {affiliate:'son@creative.com',offer:'The jumpStart...',date:'Aug 2, 2021 1:42PM',reason:'',percentage:'50',amount:'$49.50 USD', actions:''},
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
