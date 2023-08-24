import { Component, OnInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FunnelService } from 'src/app/_services/funnels.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { WebsiteService } from 'src/app/_services/website.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';

@Component({
  selector: 'app-new-funnel-archive',
  templateUrl: './new-funnel-archive.component.html',
  styleUrls: ['./new-funnel-archive.component.css']
})
export class NewFunnelArchiveComponent implements OnInit {

 
  // dataSource: MatTableDataSource<UserData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  funnelsteps: any = [];
  showingcontacts = '7 DAY';
  users:any = [];
  searchval:any = '';
  delpage:any;
  confirmpass = '';
  searching:boolean = false;


  constructor(private funnelService: FunnelService,
            private fileuploadService: FileUploadService,
            private _snackBar: MatSnackBar,
            public dialog: MatDialog, 
            private websiteService: WebsiteService,
            public _general: GeneralService,
            ) { 
             
  }

  ngOnInit(): void {

    

    this.funnelService.getarchivefunnel('7 DAY').subscribe({
      next: data => {
        // console.log(data.data); 
        this.users = data.data;
        

      },
      error: err => {
        console.log(err);
      }
    });

  }

 
  applykbfilter(){

    this.funnelService.getarchivefunnel(this.showingcontacts).subscribe({
      next: data => {
        // console.log(data.data); 
        this.users = data.data;
      },
      error: err => {
        console.log(err);
      }
    });

  }

  datecusfilter(value:any){
    return new Date(value).toDateString();
  }

  restoredeleteme(row:any,type:any){
    // console.log(row);
    var data = {id:row.id,type:type, password:'', funnelid:row.uniqueid};

    if(type=="restore"){
      this.searching=true;
      this.funnelService.restoredeletefunnel(data).subscribe({
        next: data => {
          // console.log(data);
          if(data.success==1){

            data.data.forEach((element:any) => {
              this.draftpublish('1', element.page_path, row.id);
            });
            this.searching=false;
            this.applykbfilter();

          }

        },
        error: err => {
          console.log(err);
        }
      });

    }else if(type=="delete"){

      data.password = this.confirmpass;

      if(this.confirmpass!=''){
        this.searching = true;

        this.funnelService.restoredeletefunnel(data).subscribe({
          next: data => {
            // console.log(data);
  
            if(data.incorrect == 1){
              this.searching = false;
              this._general.openSnackBar(
            false,"Password did't match!", 'OK','center','top');
            }else{
              this.fileuploadService.deletewebsitefolder(row.uniqueid).subscribe(e=>{
                // console.log(e);
              });
  
                this.websiteService.ondeletesubdomain(row.subdomain).subscribe({
                  next: data => {
                    
                    this.searching = false;
                    this._general.openSnackBar(false,"Website has been successfully deleted!", 'OK','center','top'); 
  
                  }
                });
                this.dialog.closeAll();
              
            }
            this.searching=false;
            this.applykbfilter();

  
          }
  
        });
      }else{
        this._general.openSnackBar(false,"Password Can't be blank!", 'OK','center','top');
      }

          
    }

  }

  draftpublish(status:any, page_path:any, websiteid:any){

    var getvl = status == '0' ? 'draft' : 'publish';
    var newobjdt = {status:getvl, path:page_path, website_id:websiteid};
    this.fileuploadService.toggleDraft(newobjdt).subscribe((data:any)=>{
    })

  }

  searchfunnels(search: any, filter: any) {
    this.searching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
      archive:'1',
    }
    this.funnelService.searchqueryFunnel(obj).subscribe((data:any) => {
      this.searching = false;
        if(data.success){ 
        this.users = data?.data;
        }
        
    });
    
  }


  openDialog(templateRef: TemplateRef<any>, page:any , type:any): void {
    
    this.delpage = page;
    this.dialog.open(templateRef);

  }
}
