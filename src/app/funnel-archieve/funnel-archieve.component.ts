import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { FunnelService } from '../_services/funnels.service';

export interface UserData {
  name:string;
  created_at:string;
  archive_reason:string;
  updated_at:string;
}

@Component({
  selector: 'app-funnel-archieve',
  templateUrl: './funnel-archieve.component.html',
  styleUrls: ['./funnel-archieve.component.css']
})
export class FunnelArchieveComponent implements OnInit {

  
  displayedColumns: string[] = ['name', 'created_at','archive_reason', 'updated_at'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  funnelsteps: any = [];
  showingcontacts = '7 DAY';
  users:any = [];

  constructor(private funnelService: FunnelService,) { 
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

    this.funnelService.getarchivefunnel('7 DAY').subscribe({
      next: data => {
        console.log(data.data); 
        this.users = data.data;
        this.dataSource = new MatTableDataSource(this.users);

      },
      error: err => {
        console.log(err);
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applykbfilter(){

    this.funnelService.getarchivefunnel(this.showingcontacts).subscribe({
      next: data => {
        // console.log(data.data); 
        this.users = data.data;
        this.dataSource = new MatTableDataSource(this.users);

      },
      error: err => {
        console.log(err);
      }
    });

  }

  datecusfilter(value:any){
    return new Date(value).toDateString();
  }

  restoredeleteme(id:any,type:any){
  // console.log(id);
    this.funnelService.restoredeletefunnel(id,type).subscribe({
      next: data => {
        console.log(data);
        if(data.success==1){
          this.applykbfilter();

          // this.fileuploadService.deletepage(data.path).subscribe({
          //   next: data => {
          //     console.log(data);
          //   }
          // });

        }

      },
      error: err => {
        console.log(err);
      }
    });

  }





}
