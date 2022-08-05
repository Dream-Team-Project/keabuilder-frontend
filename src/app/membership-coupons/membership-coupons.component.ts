import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  coupons: string;
  numberoffer: string;
  amountoff: string;  
  duration: string;
  expirationdate: string;
  expirestatus:string;
  actions:string;
}

@Component({
  selector: 'app-membership-coupons',
  templateUrl: './membership-coupons.component.html',
  styleUrls: ['./membership-coupons.component.css']
})

export class MembershipCouponsComponent implements OnInit {
  
  minDate = new Date();

  displayedColumns: string[] = ['coupons', 'numberoffer', 'amountoff', 'duration','expirationdate','expirestatus','actions'];
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;
  
  popupsidebar = false;
  automationaddnewaction = false;
  itemshow = false;
  pricetype = 'USD';

  discountselected = '';
  currencytype = '';
  kbduration = '';
  
  productoptionals = new FormControl();
  productoptionalList: string[] = ['For testing', 'Small Option Big Profits','Weekly Options Income Academy'];
  
  constructor() {
    
    const users =[
        {coupons: 'REFERSOBP', numberoffer: '1', amountoff:'100% off', duration:'Forever',expirationdate:'-',expirestatus:'',actions:''},
        {coupons: 'UNCLE2', numberoffer: '1', amountoff:'$500.00 USD off', duration:'Forever',expirationdate:'-',expirestatus:'Expired',actions:''},
        {coupons: '10OFF', numberoffer: '2', amountoff:'10% off', duration:'Once',expirationdate:'Oct 8, 2021 8:59PM',expirestatus:'Expired',actions:''},
    ];
    this.dataSource = new MatTableDataSource(users);

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  addnewcourse(){
    this.popupsidebar = true;
    this.automationaddnewaction = true;
  }

  kbitemshow(){
    this.itemshow = !this.itemshow;
  }

  hidepopupsidebar(){
    this.popupsidebar = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
