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

export interface UserData {
  name:string;
  created_at:string;
  archive_reason:string;
  updated_at:string;
}

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-funnel-archive',
  templateUrl: './funnel-archive.component.html',
  styleUrls: ['./funnel-archive.component.css']
})
export class FunnelArchiveComponent implements OnInit {

  
  displayedColumns: string[] = ['name', 'created_at','archive_reason', 'updated_at'];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;
  
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
            ) { 
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

    this.funnelService.getarchivefunnel('7 DAY').subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchval = filterValue;
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

  restoredeleteme(row:any,type:any){
    console.log(row);
    var data = {id:row.id,type:type, password:'', funnelid:row.uniqueid};

    if(type=="restore"){

      this.funnelService.restoredeletefunnel(data).subscribe({
        next: data => {
          console.log(data);
          if(data.success==1){

            data.data.forEach((element:any) => {
              this.draftpublish('1', element.page_path, row.id);
            });

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
              this._snackBar.open("Password did't match!", 'OK');
            }else{
              this.fileuploadService.deletewebsitefolder(row.uniqueid).subscribe(e=>{
                // console.log(e);
              });
  
                this.websiteService.ondeletesubdomain(row.subdomain).subscribe({
                  next: data => {
                    
                    this.searching = false;
                    this._snackBar.open("Website has been successfully deleted!", 'OK'); 
  
                  }
                });
  
            }

            this.applykbfilter();

  
          }
  
        });
      }else{
        this._snackBar.open("Password Can't be blank!", 'OK');
      }

          
    }

  }

  draftpublish(status:any, page_path:any, websiteid:any){

    var getvl = status == '0' ? 'draft' : 'publish';
    var newobjdt = {status:getvl, path:page_path, website_id:websiteid};
    this.fileuploadService.toggleDraft(newobjdt).subscribe((data:any)=>{
    })

  }

  // openDialog(id:any): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '455px',
  //     data: {name: ' Funnel!! It will delete all steps as well.'},
  //   });
    
  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log(id);

  //     if(result.event == 'Delete'){
        
  //       this._snackBar.open('Funnel Delete In Process...', 'Close');

  //       this.funnelService.restoredeletefunnel(id,'delete').subscribe({
  //         next: data => {
  //           // console.log(data);
  //           if(data.success==1){
    
  //             this._snackBar.open('Funnel Deleted Successfully!', 'Close');
    
  //             if(data.objpath.length!=0){
  //               // console.log('--inside');
    
  //               data.objpath.forEach((element:any) => {
    
  //                  this.fileuploadService.deletepage(element).subscribe({
  //                     next: data => {
  //                         // console.log(data);
  //                       }
  //                     });
    
  //               });
    
  //             }
    
  //             this.applykbfilter();
    
  //           }
    
  //         },
  //         error: err => {
  //           console.log(err);
  //         }
  //       });
          
  //     }
      
  //   });

  // }

  openDialog(templateRef: TemplateRef<any>, page:any , type:any): void {
    
    this.delpage = page;
    this.dialog.open(templateRef);

  }





}



@Component({
  selector: 'tags-dialog',
  templateUrl: '../../../delete-dialog/delete-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close({event:'nothanks'});
  }
  onClick(){
    this.dialogRef.close({event:'Delete'});
  }
}