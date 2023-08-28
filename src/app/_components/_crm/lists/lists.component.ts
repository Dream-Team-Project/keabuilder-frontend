import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from 'src/app/_services/_crm/list.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';


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

  fetching:boolean = true;
  duplicateList:boolean = false;

  duplist:any='';
;  lists:any=[];
  list:any = {};
  listObj = {
    name: '',
    uniqueid: '',
    id: '',
  }
  hasError: string = '';

  constructor(private _listservice: ListService, private dialog: MatDialog, private _general: GeneralService) {
      this.fetchLists().then((resp1) => {
        this.fetching = false;
      });
   }

  ngOnInit(): void {
  }

  fetchLists() {
    return new Promise((resolve) => {
      this._listservice.fetchlists().subscribe(
        (data) => {
          this.lists = data.data;
          console.log(this.lists)
          resolve(true);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }

  setList(list:any) {
    if(this.list.name && this.isListNameValid(this.list.name)) {
      this.hasError = '';
      delete this.list.error;
      var tempObj = JSON.parse(JSON.stringify(list));
      if(list.id) this.updateList(tempObj);
      else this.addList(tempObj);
    }
    else this.setError('List name must be atleast 3 characters');
  }

  addList(list:any) {
    this._listservice.addlist(list).subscribe((resp) => {
        if (resp.success) {
          this.fetchLists();
          this._general.openSnackBar(false, 'List has been saved', 'OK', 'center', 'top');
        }
        else this.setError(resp.message);
    })
  }

  updateList(list:any) {
      this._listservice.updatelist(list).subscribe((resp) => {
        if (resp.success) {
          this.fetchLists();
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
        this.fetchLists();
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
      if (resp.success) this.fetchLists();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });

  }
  
  searchLists(search: any, filter: any) {
    var obj = {
      search: search.value,
      filter: filter.value
    }
    this._listservice.searchlists(obj).subscribe((data: any) => {
      this.lists = data.data;
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
}
