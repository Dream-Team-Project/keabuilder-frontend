import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  amount: string;
  type: string;
  method:string;
  membername: string;
  memberemail: string;
  offertitle: string;
  transactiondate:string;
  status:string;
}

@Component({
  selector: 'app-membership-payment',
  templateUrl: './membership-payment.component.html',
  styleUrls: ['./membership-payment.component.css']
})
export class MembershipPaymentComponent implements OnInit {

  displayedColumns: string[] = ['amount', 'type','method', 'membername', 'memberemail','offertitle','transactiondate','edit'];
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  currencytype = '';
  kbduration = '';
  
  constructor() {
    
    const users =[
        {amount: '$99.00 USD', type: 'Subscription',method:'Stripe', membername:'Larry Suhr', memberemail:'sirlarry49@gmail.com',offertitle:'Get Unlimited Access to our Premium Trading Group 1',transactiondate:'May 15, 2022 5:00AM',status:'Successful'},
        {amount: '$909.00 USD', type: 'Subscription',method:'Paypal', membername:'Brooke Smith', memberemail:'brooke@brookesmith.me',offertitle:'Get Unlimited Access to our Premium Trading Group 1',transactiondate:'May 4, 2022 9:26PM',status:'Failed'},
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
