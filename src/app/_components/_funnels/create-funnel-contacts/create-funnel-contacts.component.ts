import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FunnelService } from 'src/app/_services/funnels.service';
import * as XLSX from 'xlsx';

export interface UserData {
  fullname: string;
  email: string;
  phone:string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-create-funnel-contacts',
  templateUrl: './create-funnel-contacts.component.html',
  styleUrls: ['./create-funnel-contacts.component.css']
})

export class CreateFunnelContactsComponent implements OnInit {
  
  displayedColumns: string[] = ['fullname', 'email','phone', 'created_at', 'updated_at'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  mainOpen = 'contacts';
  uniqueid:any = '';
  uniqueidstep:any = '';
  funnelname = '';
  users:any = [];
  funnelsteps: any = [];
  fileName= 'ContactExcelSheet.xlsx';
  showingcontacts = '7 DAY';
  selectedfunnelsteps:any = 'all';
  selecteddelete = false;
  contactname = '';
  contactid = '';

  constructor(private funnelService: FunnelService,
    private router: Router,
    public dialog: MatDialog, 
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
        console.log(data);
        this.funnelname = data.data2[0].name;
        this.uniqueidstep = data.data[0].uniqueid;

        var gensepratestep:any = [];

        data.data.forEach((element: any) => {
          if(element.funneltype!='regular' && element.funneltype!='thankyou'){
            var gennewobj = {id:'',value:'', type:''};
            gennewobj.id = element.uniqueid;
            gennewobj.value = element.page_title;
            gensepratestep.push(gennewobj);
          }
        });

        this.funnelsteps = gensepratestep;

        // console.log(this.funnelsteps); 
      },
      error: err => {
        console.log(err);
      }
    });
    // console.log(this.uniqueidstep );

    this.funnelService.getfunnelcontacts(this.uniqueid,'7 DAY','all').subscribe({
      next: data => {
        // console.log(data); 
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
    var dt = new Date(value);
    var text1 = dt.toDateString();    
    var text2 = dt.toLocaleTimeString();
    return text1+' '+text2;
  }

  exportexcel(): void
  {
    // console.log(this.users);

    var generateobj:any = [];
    
    if(this.users?.length!=0){
      this.users.forEach((element:any) => {
        var genobj = {fullname:element.fullname,email: element.email,phone:element.phone,address:element.address,city:element.city,state:element.state,zip:element.zip,country:element.country,created_at:element.created_at};
        generateobj.push(genobj);
      });
      console.log(generateobj);

        if(generateobj?.length!=0){
          const ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(generateobj);
          
          /* generate workbook and add the worksheet */
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Contact');
          
          /* save to file */  
          XLSX.writeFile(wb, this.fileName);
        }

    }
    // this.funnelService.getfunnelexportcontacts(this.uniqueid).subscribe({
    //   next: data => {
    //     console.log(data.data);

    //     if(data.data?.length!=0){

    //       const ws: XLSX.WorkSheet =  XLSX.utils.json_to_sheet(data.data);
      
    //       /* generate workbook and add the worksheet */
    //       const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
    //       /* save to file */  
    //       XLSX.writeFile(wb, this.fileName);

    //     }

    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });

 
  }

  applykbfilter(){

    this.funnelService.getfunnelcontacts(this.uniqueid,this.showingcontacts,this.selectedfunnelsteps).subscribe({
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

  deletecontact(){
    // console.log(value);
    this.funnelService.deletefunnelcontacts(this.contactid).subscribe({
      next: data => {
        // console.log(data.data); 
        if(data.data==1){
          this.applykbfilter();
        }

      },
      error: err => {
        console.log(err);
      }
    });

  }

  openDialog(templateRef: TemplateRef<any>, contact:any): void {

    console.log(contact);
    this.contactname = contact.fullname;
    this.contactid = contact.id;


    this.dialog.open(templateRef);

  }
}
