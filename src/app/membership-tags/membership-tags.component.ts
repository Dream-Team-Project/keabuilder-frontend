import { Component, OnInit, ViewChild,ChangeDetectorRef,Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CourseService } from '../_services/course.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface UserData {
  name: string;
  people: string;
  created:string;
  options:string;
}

export interface DialogData {
  name: string;
}

const ELEMENT_DATA: UserData[] = [];


@Component({
  selector: 'app-membership-tags',
  templateUrl: './membership-tags.component.html',
  styleUrls: ['./membership-tags.component.css']
})
export class MembershipTagsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'people','created', 'options'];
  users:any = [];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);

  selection = new SelectionModel<UserData>(true, []);
  currencytype = '';
  kbduration = '';
  popupsidebar = false;
  automationaddnewaction = false;
  tagsselid = 0;
  tagselname = '';
  firsttag = true;
  

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags:any[] = [];

  constructor( private _snackBar: MatSnackBar,
              private courseService: CourseService,
              private changeDetectorRefs: ChangeDetectorRef,
              public dialog: MatDialog) {
    
    // this.dataSource = new MatTableDataSource(this.users);

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

    this.getallmytags();
   
  }

  getallmytags(){
    this.courseService.getalltags().subscribe({
      next: data => {
        this.users = [];
        this.dataSource.data = [];

        data.data.forEach((element:any) => {
          var mycustomdate =  new Date(element.created_at);
          var text1 = mycustomdate.toDateString();    
          var text2 = mycustomdate.toLocaleTimeString();
          element.created_at = text1+' '+text2;
            var tgobj = {id:element.id,name:element.name, people:'',created:element.created_at, options:''};
            this.users.push(tgobj);
          });
          this.dataSource.data = this.users;
          this.table.renderRows();

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

  addnewcontact(){
    this.firsttag = true;
    this.popupsidebar = true;
    this.automationaddnewaction = true;
  }
  
  hidepopupsidebar(){
    this.popupsidebar = false;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  createmytags(){
    // console.log(this.tags);
    if (this.tags.length!=0) {

      var gentags = this.tags.toString();
      // console.log(gentags);
      this.courseService.addnewtags(gentags).subscribe({
        next: data => {
          // console.log(data);
          this.tags = [];
          this.getallmytags();
          this._snackBar.open('Successfully Tag Added!', 'Close');

        }
      });

    }

  }

  edittags(id:any,name:any){
    this.tagsselid = id;
    this.tagselname = name;
    this.firsttag = false;
    this.popupsidebar = true;
    this.automationaddnewaction = true;
  }

  updateemytags(){
    var data = {id:this.tagsselid,name:this.tagselname,type:'update'};
    this.courseService.updatedeltag(data).subscribe({
      next: data => {
        console.log(data);
        this.getallmytags();
        this._snackBar.open('Tag Updated Successfully!', 'Close');
      }
    });
  }

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: 'Tag'},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // console.log(id);

      if(result.event == 'Delete'){
        var data = {id:id,name:'',type:'delete'};
        this.courseService.updatedeltag(data).subscribe({
          next: data => {
            console.log(data);
            this.getallmytags();
            this._snackBar.open('Tag Deleted Successfully!', 'Close');
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
