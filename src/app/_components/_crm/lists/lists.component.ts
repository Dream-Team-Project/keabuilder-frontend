import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from 'src/app/_services/_crm/list.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MatPaginator } from '@angular/material/paginator';



export interface UserData {
  position: number;
  name: string;
  activecontacts: any;
  actions: string;
}

@Component({
  selector: 'app-crm-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class CrmListsComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('duplicatedialog') duplicatedialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  fetching:boolean = true;
  duplicateList:boolean = false;

  duplist:any='';
  listslength:any;
  pagelists:any;
  lists:any=[];
  list:any = {};
  listObj = {
    name: '',
    uniqueid: '',
    id: '',
  }
  hasError: string = '';
  selectedLists: any[] = [];
  checked_selected=false;
  searchInp : any = ''; 
  filterInp : any = 'name DESC';

  constructor(private _listservice: ListService, private dialog: MatDialog, private _general: GeneralService) {
    this.getpagelists({pageIndex:0,pageSize:20}).then((resp1) => {
      // this.fetchLists().then((resp1) => {
        this.fetching = false;
      });
   }

  ngOnInit(): void {
  }

  setList(list:any) {
    if(this.list.name && this.isListNameValid(this.list.name)) {
      this.hasError = '';
      delete this.list.error;
      var tempObj = JSON.parse(JSON.stringify(list));
      if(list.id) this.updateList(tempObj);
      else this.addList(tempObj);
    }
    else this.setError('List name must be atleast 4 characters');
  }

  addList(list:any) {
    this._listservice.addlist(list).subscribe((resp) => {
        if (resp.success) {
          // this.fetchLists();
          this.getpagelists({pageIndex:0,pageSize:20});
          this._general.openSnackBar(false, 'List has been saved', 'OK', 'center', 'top');
        }
        else this.setError(resp.message);
    })
  }

  updateList(list:any) {
      this._listservice.updatelist(list).subscribe((resp) => {
        if (resp.success) {
          // this.fetchLists();
          this.getpagelists({pageIndex:0,pageSize:20});
          this._general.openSnackBar(false, 'List has been Updated', 'OK', 'center', 'top');
        }
        else this.setError(resp.message);
      })
  }
  DuplicateList(list:any){
    if(this.duplist){
      list.name=this.duplist;
    list.duplicateList=true;
    this._listservice
    .addlist(list)
    .subscribe((resp) => {
      if(resp.success) {
        // this.fetchLists();
        this.getpagelists({pageIndex:0,pageSize:20});
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
      this.duplist='';
      }
      else { 
        this.setErrordup(resp.message);
        this.duplist='';
      }
    })
  } else {
    let msg='Please Enter List name'
    this.setErrordup(msg);
  }
  }

  deleteList(id: any) {
    this._listservice.deletelist(id).subscribe((resp) => {
      if (resp.success) this.getpagelists({pageIndex:0,pageSize:20});
      // this.fetchLists();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }
  toggleSort(column: string): void {
    // console.log(column)
    if (this.filterInp.includes(column)) {
      this.filterInp = this.filterInp.endsWith('ASC') ? `${column} DESC` : `${column} ASC`;
    } else {
      this.filterInp = `${column} ASC`;
    }
    this.searchLists(this.searchInp, this.filterInp);
  }
  
  searchLists(search: any, filter: any) {
    var obj = {
      search: search,
      filter: filter,
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 20,
    }
    this._listservice.searchlists(obj).subscribe((data: any) => {
      this.pagelists = data.data;
    });
  }

  setError(msg: string) {
    this.hasError = msg;
    this.list.error = true;
    this.openDialog(this.adddialog, this.list);
  }
  setErrordup(msg: string) {
    this.hasError = msg;
    this.list.error = true;
    this.openDialog(this.duplicatedialog, this.list);
  }
  isListNameValid(value:any) {
    let regex =/^[\w-_. ]{4,}$/
    return regex.test(value);
  }

  openDialog(templateRef: TemplateRef<any>, list: any) {
    if (!list.error) {
      delete list.error;
      this.hasError = '';
      this.list = JSON.parse(JSON.stringify(list));
    }
    this.dialog.open(templateRef);
  }
  getpagelists(event:any){
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
    return new Promise((resolve) => {
      this._listservice.getpagelists(obj).subscribe(
        (data:any) => {
          this.lists = data.data;
          this.pagelists=data?.data;
          this.listslength=data?.lists;
          // console.log(this.lists)
          resolve(true);
        },
        (error) => {
          resolve(false);
        }
      );
    });
 }
 selectList(event: any, list: any) {
  if (event) {
    this.selectedLists.push(list);
  } else {
    const index = this.selectedLists.indexOf(list);
    if (index !== -1) {
      this.selectedLists.splice(index, 1);
    }
  }
  // console.log(this.selectedContacts)
}

selectAllLists(event: any) {
  // console.log(event)
  if(event){
  this.pagelists=this.pagelists.map((ele:any)=>{ele.selected = true; return ele;});
  }
  else{
    this.pagelists=this.pagelists.map((ele:any)=>{ele.selected = false; return ele;});
  }
  this.selectedLists = event ? [...this.pagelists] : [];
  // console.log(this.selectedContacts)
}

deleteSelectedLists(lists:any) {
  this._listservice.deleteselectedlists({lists:lists}).subscribe((resp:any) => {
    if(resp.success) 
    this.getpagelists({pageIndex:0,pageSize:20});
    this.resetselecteddata();
    this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
  });
}

resetselecteddata(){
  this.pagelists=this.pagelists.map((ele:any)=>{ele.selected = false; return ele;});
  this.checked_selected=false;
  this.selectedLists=[];
  this. searchInp  = ''; 
  this.filterInp = 'name DESC';
  this.paginator.pageIndex = 0;
  this.paginator.pageSize =20;
}
}
