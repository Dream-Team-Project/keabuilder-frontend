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
  templateUrl: './funnel-archive.component.html',
  styleUrls: ['./funnel-archive.component.css']
})
export class FunnelArchiveComponent implements OnInit {

 
  // dataSource: MatTableDataSource<UserData>;
  
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('deldialog') deldialog!: TemplateRef<any>;

  funnelsteps: any = [];
  showingcontacts = '7 DAY';
  users:any = [];
  searchval:any = '';
  delpage:any;
  confirmpass = '';
  searching:boolean = false;
  error=false;
  errormessage:any='';
  funnellength:any;

  constructor(private funnelService: FunnelService,
            private fileuploadService: FileUploadService,
            private _snackBar: MatSnackBar,
            public dialog: MatDialog, 
            private websiteService: WebsiteService,
            public _general: GeneralService,
            ) { 
             
  }

  ngOnInit(): void {

    this.applykbfilter();
  }

  getpagearchive(event:any){
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize,showingcontacts:this.showingcontacts};
    this.funnelService.getpagearchivefunnel(obj).subscribe({
      next: data => {
        // console.log(data.data); 
        this.users = data?.data;
        this.funnellength=data?.archive;
      },
      error: err => {
        // console.log(err);
      }
    });
   
    }
  applykbfilter(){
    this.getpagearchive({pageIndex:0,pageSize:20});
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
            this.applykbfilter();
            this.resetobj();

          }

        },
        error: err => {
          // console.log(err);
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
              this.error=true;
              this.errormessage="Password incorrect";
              this.dialog.open(this.deldialog);
            }else{
              this.fileuploadService.deletewebsitefolder(row.uniqueid).subscribe(e=>{
                // console.log(e);
              });
  
                this.websiteService.ondeletesubdomain(row.subdomain).subscribe({
                  next: data => {
                    
                    
                    this._general.openSnackBar(false,"Website has been successfully deleted!", 'OK','center','top'); 
                   
                  }
                  
                });
                
                this.applykbfilter();
                this.resetobj();
            }
            
            
  
          }
  
        });
      }else{
        this.error=true;
        this.errormessage="Password Can't be blank!";
        this.dialog.open(this.deldialog);
        // this._general.openSnackBar(false,"Password Can't be blank!", 'OK','center','top');
      }

          
    }

  }
resetobj(){
  this.searching=false;
  this.dialog.closeAll();
  this.confirmpass='';
  this.error=false;
  this.errormessage='';
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
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 20,
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
