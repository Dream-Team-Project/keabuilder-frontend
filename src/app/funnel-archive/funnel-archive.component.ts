import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { FunnelService } from '../_services/funnels.service';
import { FileUploadService } from '../_services/file-upload.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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

  constructor(private funnelService: FunnelService,
            private fileuploadService: FileUploadService,
            private _snackBar: MatSnackBar,
            public dialog: MatDialog, 
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
  // console.log(type+''+id);

    this.funnelService.restoredeletefunnel(id,type).subscribe({
      next: data => {
        // console.log(data);
        if(data.success==1){

          this.applykbfilter();

        }

      },
      error: err => {
        console.log(err);
      }
    });

  }

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '455px',
      data: {name: ' Funnel!! It will delete all steps as well.'},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // console.log(id);

      if(result.event == 'Delete'){
        
        this._snackBar.open('Funnel Delete In Process...', 'Close');

        this.funnelService.restoredeletefunnel(id,'delete').subscribe({
          next: data => {
            // console.log(data);
            if(data.success==1){
    
              this._snackBar.open('Funnel Deleted Successfully!', 'Close');
    
              if(data.objpath.length!=0){
                // console.log('--inside');
    
                data.objpath.forEach((element:any) => {
    
                   this.fileuploadService.deletepage(element).subscribe({
                      next: data => {
                          // console.log(data);
                        }
                      });
    
                });
    
              }
    
              this.applykbfilter();
    
            }
    
          },
          error: err => {
            console.log(err);
          }
        });
          
      }
      
    });

  }





}



@Component({
  selector: 'tags-dialog',
  templateUrl: '../delete-dialog/delete-dialog.html',
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