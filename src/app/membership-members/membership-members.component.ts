import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { FormControl,Validators } from '@angular/forms';
import { CourseService } from '../_services/_membership/course.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface UserData {
  name: string;
  email: string;
  emailmarketing:string;
  addeddate: string;
  lastactivity: string;
  options: string;
}

export interface DialogData {
  name: string;
}

const ELEMENT_DATA: UserData[] = [];

@Component({
  selector: 'app-membership-members',
  templateUrl: './membership-members.component.html',
  styleUrls: ['./membership-members.component.css']
})
export class MembershipMembersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'emailmarketing', 'addeddate', 'lastactivity', 'options'];
  // dataSource: MatTableDataSource<UserData>;
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);

  selection = new SelectionModel<UserData>(true, []);
  currencytype = '';
  kbduration = '';
  popupsidebar = false;
  automationaddnewaction = false;
  productoptionals = new FormControl();
  productoptionalList: string[] = [];
  tagoptionals = new FormControl();
  tagoptionalList: string[] = [];
  addmemberobj = {firstname:'',lastname:'',email:'',marketing:false,tags:''};
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20) ]);
  users:any = [];

  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;


  constructor( private _snackBar: MatSnackBar,
                private courseService:CourseService,
                public dialog: MatDialog) {

    this.courseService.getalloffers().subscribe({
      next: data => {

        data.data.forEach((element: any) => {
          this.productoptionalList.push(element.title);
        });

      }
    });
    
    this.dataSource = new MatTableDataSource(this.users);

    this.courseService.getalltags().subscribe({
      next: data => {
        // console.log(data);
        data.data.forEach((element:any) => {
          this.tagoptionalList.push(element.name);
        }); 
      }
    });

    this.getallmymembers();

  }

  getallmymembers(){
    this.courseService.getallmembers().subscribe({
      next: data => {
        // console.log(data);
        this.users = [];
        this.dataSource.data = [];

        data.data.forEach((element:any) => {
          var mkname = element.firstname+' '+element.lastname;
          var mrktng = element.marketing == 0 ? 'Unsubscribe': 'Subscribed';
          var mycustomdate =  new Date(element.created_at);
          var text1 = mycustomdate.toDateString();    
          var text2 = mycustomdate.toLocaleTimeString();
          element.created_at = text1;
          var makenewobj = {id:element.id,name:mkname, email:element.email, emailmarketing:mrktng, addeddate:element.created_at, lastactivity:'---', options:''};
          this.users.push(makenewobj);
        }); 
        this.dataSource.data = this.users;
        this.table.renderRows();

      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addnewcontact(){
    this.popupsidebar = true;
    this.automationaddnewaction = true;
  }
  
  hidepopupsidebar(){
    this.popupsidebar = false;
  }

  createacontact(){
    var settags = this.tagoptionals.value == null ? '' : this.tagoptionals.value;
    if(settags!=''){
      this.addmemberobj.tags = settags.toString();
    }

    if(this.userFormControl.status=='VALID' && this.emailFormControl.status=='VALID'){

      this.courseService.addnewmember(this.addmemberobj).subscribe({
        next: data => {
          // console.log(data);

          if(data.already==1){
              this._snackBar.open('Email Already Exist!', 'Close');
          }else{
              this.getallmymembers();
              this._snackBar.open('Member Added Successfully!', 'Close');
          }
        
        }
      });

    }

  }

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: 'Member'},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(id);

      if(result.event == 'Delete'){
        var data = {id:id,name:'',type:'delete'};
        this.courseService.updatedelmember(data).subscribe({
          next: data => {
            // console.log(data);
            this.getallmymembers();
            this._snackBar.open('Member Deleted Successfully!', 'Close');
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
