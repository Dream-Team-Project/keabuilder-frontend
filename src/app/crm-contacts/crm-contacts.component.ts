import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { CrmService } from '../_services/crm.service';

export interface UserData {
  fullname: string;
  email: string;
  phone:string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-crm-contacts',
  templateUrl: './crm-contacts.component.html',
  styleUrls: ['./crm-contacts.component.css']
})
export class CrmContactsComponent implements OnInit {

  displayedColumns: string[] = ['fullname', 'email','phone', 'created_at', 'updated_at'];
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  currencytype = '';
  kbduration = '';
  users:any = [];

  constructor(private crmService: CrmService) {
    
    // const users =[
    //     {fullname:'Emily Adams', email:'inspireempowerimpact@gmail.com', phone:'18125938054', datecreated:'05/27/2022 15:06', actions:''},
    //     {fullname:'Rhonda Britten', email:'rhonda@fearlessliving.org', phone:'18182619579', datecreated:'05/21/2022 09:27', actions:''},
    // ];
    this.dataSource = new MatTableDataSource(this.users);

  }

  ngOnInit(): void {

    this.crmService.getcrmcontacts().subscribe({
      next: data => {
        // console.log(data);

        if(data.data.length!=0){
          var gendataar:any = [];
          data.data.forEach((element:any) => {
            var gendata = {fullname:element.firstname+' '+element.lastname, email:element.email, phone:element.phone, created_at:this.datecusfilter(element.created_at), updated_at:''};
            gendataar.push(gendata);
          });
          this.users = gendataar;
          this.dataSource = new MatTableDataSource(this.users);
        }

      }
    });

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

  }

  datecusfilter(value:any){
    var dt = new Date(value);
    var text1 = dt.toDateString();    
    var text2 = dt.toLocaleTimeString();
    return text1+' '+text2;
  }

  addnewconnect(){
    this.openSidebar();
  }

  openSidebar(){
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.open = false;
    },this.sidebar.animtime)
  }

  hidepopupsidebar(){

    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
    },this.sidebar.animtime)
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
