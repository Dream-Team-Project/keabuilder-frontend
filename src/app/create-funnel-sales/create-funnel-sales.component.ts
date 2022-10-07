import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { FunnelService } from '../_services/funnels.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as XLSX from 'xlsx';

export interface UserData {
  product_name:string;
  amount:string;
  customer:string;
  status:string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-create-funnel-sales',
  templateUrl: './create-funnel-sales.component.html',
  styleUrls: ['./create-funnel-sales.component.css']
})
export class CreateFunnelSalesComponent implements OnInit {
 
  displayedColumns: string[] = ['product_name', 'amount', 'customer', 'status','created_at', 'updated_at'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  mainOpen = 'sales';
  uniqueid:any = '';
  uniqueidstep:any = '';
  funnelname = '';
  users:any = [];
  funnelsteps: any = [];
  fileName= 'SalesExcelSheet.xlsx';
  showingcontacts = '7 DAY';
  selectedfunnelsteps:any = 'all';
  selecteddelete = false;

  constructor(private funnelService: FunnelService,
    private router: Router,
    private route: ActivatedRoute) { 

    this.dataSource = new MatTableDataSource(this.users);

  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params: ParamMap) => { 
      this.uniqueid = params.get('funnel_id');
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uniqueidstep = params.get('step_id');
    });
    this.funnelService.getuniquefunnelstep(this.uniqueid,'funnelstep').subscribe({
      next: data => {
        this.funnelname = data.data2[0].name;
        this.uniqueidstep = data.data[0].uniqueid;

        var gensepratestep:any = [];

        data.data.forEach((element: any) => {
          var gennewobj = {id:'',value:''};
          gennewobj.id = element.uniqueid;
          gennewobj.value = element.page_title;

          gensepratestep.push(gennewobj);
        });

        this.funnelsteps = gensepratestep;
        
        // console.log(data); 
      },
      error: err => {
        console.log(err);
      }
    });

    this.funnelService.getfunnelsales(this.uniqueid,'7 DAY','all').subscribe({
      next: data => {
        // console.log(data.data); 
        this.users = data.data;
        this.dataSource = new MatTableDataSource(this.users);

      },
      error: err => {
        console.log(err);
      }
    });
    
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

  datecusfilter(value:any){
    return new Date(value).toDateString();
  }

  exportexcel(): void
  {

    this.funnelService.getfunnelexportsale(this.uniqueid).subscribe({
      next: data => {

        const ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(data.data);
     
        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     
        /* save to file */  
        XLSX.writeFile(wb, this.fileName);

      },
      error: err => {
        console.log(err);
      }
    });

 
  }

  applykbfilter(){

    this.funnelService.getfunnelsales(this.uniqueid,this.showingcontacts,this.selectedfunnelsteps).subscribe({
      next: data => {
        console.log(data); 
        this.users = data.data;
        this.dataSource = new MatTableDataSource(this.users);

      },
      error: err => {
        console.log(err);
      }
    });

  }


}
