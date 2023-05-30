import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrmTagsService } from '../_services/_crmservice/crm-tags.service';
import { CrmService } from '../_services/_crmservice/crm.service';
import { CrmListService } from '../_services/_crmservice/crm_list.service';
import { MatDialog } from '@angular/material/dialog';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  Form,
} from '@angular/forms';

export interface UserData {
  position: number;
  tag_name: string;
  contacts: string;
  automations: string;
  actions: string;
}

@Component({
  selector: 'app-crm-tags',
  templateUrl: './crm-tags.component.html',
  styleUrls: ['./crm-tags.component.css'],
})
export class CrmTagsComponent implements OnInit {
  displayedColumns: string[] = [
    'checkbox',
    'tag_name',
    'contacts',
    'automations',
    'actions',
  ];
  selection = new SelectionModel<UserData>(true, []);
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  populartags:any=[];
  recenttags:any=[];
  tagexist: any;
  tagchar:any=[];
  currencytype = '';
  kbduration = '';
  popupsidebar = false;
  contacts: any = [];
  deltag: any;
  tags:any = [];
  filteredtags: any = [];
  temptags: any = [];
  singletag: any;
  buttonText = 'add';
  sidebar = {
    open: false,
    anim: { open: false, close: false, time: 500 },
    animtime: 300,
  };
  order:any=[ 
            {value: 'ascending', viewValue: 'Ascending'},
            {value: 'descending', viewValue: 'Descending'},
          ];
 optionGroup:any=[
            {value: 'tag_name', viewValue: 'Name', order: this.order},
            {value: 'contacts', viewValue: 'Contacts', order: this.order},
        ]
  selectedForm:string = '';
 
  
  crmtagForm: any = this._frmbuidr.group({
    tag_name: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    ],
    uniqueid: '',
  });

 
  constructor(
    private _crmtagService: CrmTagsService,
    private _frmbuidr: FormBuilder,
    private _snackBar: MatSnackBar,
    private crmService: CrmService,
    private crmlistService: CrmListService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.tags);
   
  }
  ngOnInit(): void {
    this.fetchtags().then((resp1) => {
      console.log(resp1)
    this.sortTagcontacts().then((resp2:any) => {
      console.log(resp2)
          for(let i=0;i<5;i++){
            if(resp2[i])
            this.populartags[i]=resp2[i].tag_name;
          }
         
    })
    console.log(this.tags)
    })
    // setTimeout(() => {
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   this.filteredtags=this.tags;
    // }, 500);
  }
  sorttag(){
    console.log(this.selectedForm)
    if(this.selectedForm[0]=='tag_name' && this.selectedForm[1]=='Ascending'){
      this.tags.sort((a:any,b:any) =>a.tag_name.toLowerCase()>b.tag_name.toLowerCase() ? 1 :-1);
    }
    else if(this.selectedForm[0]=='tag_name' && this.selectedForm[1]=='Descending'){
      this.tags.sort((a:any,b:any) =>a.tag_name.toLowerCase()<b.tag_name.toLowerCase() ? 1 :-1);
    }
    else if(this.selectedForm[0]=='contacts' && this.selectedForm[1]=='Ascending'){
      this.tags.sort((a:any,b:any) =>a.contacts>b.contacts ? 1 :-1);
    }
    else if(this.selectedForm[0]=='contacts' && this.selectedForm[1]=='Descending'){
      this.tags.sort((a:any,b:any) =>a.contacts<b.contacts ? 1 :-1);
    }
    else{
      this.tags.sort((a:any,b:any) =>a.created_at<b.created_at ? 1 :-1);
    }
  }
  gettwochar(value:any){
    this.tagchar=value.trim().split(" ");
    return this.tagchar.length >= 2 ? this.tagchar[0][0]+this.tagchar[1][0] : this.tagchar[0][0]+this.tagchar[0][1];
  }
  validateTag_name() {
    return new Promise((resolve) => {
      var tag_name = this.crmtagForm.value.tag_name;
      this._crmtagService.crmDuplicatetagcheck(tag_name).subscribe((data) => {
        this.tagexist = data.data[0]['count(*)'];
        resolve(this.tagexist);
      });
    });

  }
  fetchtags() {
    return new Promise((resolve) => {
      this._crmtagService.getAllcrmtags().subscribe(
        (data) => {
          this.tags = data.data;
          let i=0;
          for(i=0;i<5;i++){
           
            if(this.tags[i])
            this.recenttags[i]=this.tags[i].tag_name;
          }
          // if(i==4){
          resolve(true);
          // }
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }
  sortTagcontacts() {
    return new Promise((resolve) => {
      var newtags=JSON.parse(JSON.stringify(this.tags));
      newtags.sort((a:any,b:any) =>a.activecontacts<b.activecontacts ? 1 :-1);
        resolve(newtags);
      },
      );
  }

  openDialog_tag(templateRef: TemplateRef<any>) {
    this.validateTag_name().then((data:any)=>{
      data != 0 ? this.dialog.open(templateRef) : this.addcrmtag();
    })
  }
  openSidebar() {
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e: any) => {
      this.sidebar.anim.open = false;
    }, this.sidebar.animtime);
  }

  hidepopupsidebar() {
    this.sidebar.anim.close = true;
    setTimeout((e: any) => {
      // this.popup=false;
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
      this.crmtagForm.reset();
      this.tagexist=0;
      this.buttonText = 'Add';
    }, this.sidebar.animtime);
  }
  openpopup() {
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e: any) => {
      this.sidebar.anim.open = false;
    }, this.sidebar.animtime);
    // this.popup = true;
  }

  addnewconnect() {
    this.popupsidebar = true;
  }
  addcrmtag() {
    // console.log(this.crmtagForm.value);
    // if (this.tagexist== 0) {
      this._crmtagService
        .createcrmtag(this.crmtagForm.value)
        .subscribe((data) => {
          // this.crmtagForm.reset();
          this.hidepopupsidebar();
          this.fetchtags();
          this._snackBar.open('CRM Tag added Succesfully !', 'OK');
        });
    // } else {
    //   this._snackBar.open('Please Enter Unique Tag Name', 'OK');
    // }
  }

  updatecrmtag() {
    // console.log(this.crmlistForm.value);
    // if (this.tagexist!== 0) {
      
      this._crmtagService
        .updatecrmtag(this.crmtagForm.value)
        .subscribe((data) => {
          // console.log(data.data);
          // this.crmtagForm.reset();
          this.hidepopupsidebar();
          this.fetchtags();
          this._snackBar.open('CRM Tag updated Succesfully !', 'OK');
        });
    // } else {
    //   this._snackBar.open('Please Enter Unique Tag Name', 'OK');
    // }
  }

  editcrmTag(tag: any) {
    this.crmtagForm.patchValue(tag);
    this.openSidebar();
    this.buttonText = 'Update';
    // console.log(tag);
  }
  // copycrmTag(tag: any) {
  //   // this.crmlistForm.patchValue(list);
  //   console.log(tag);
  //   this._crmtagService.createcrmtag(tag).subscribe((data) => {
  //     this.crmtagForm.reset();
  //     // this.hidepopupsidebar();
  //     this.ngOnInit();
  //     this._snackBar.open('CRM Tag Copied Succesfully !', 'OK');
  //   });
  // }

  openDialog(templateRef: TemplateRef<any>, tag: any) {
    this.deltag = tag;
    this.dialog.open(templateRef);
  }
  deletecrmTag(uniqueid: any) {
    // console.log(uniqueid);
    this._crmtagService.deletecrmtag(uniqueid).subscribe((data) => {
      this.fetchtags();
      this._snackBar.open('CRM Tag deleted Succesfully !', 'OK');
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    // let filterValue='';
    // filterValue += event.target.value.toLowerCase();
    // if(filterValue) this.filteredtags=this.tags.filter((element:any)=>element.name.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0);
    // else this.filteredtags=this.tags;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
