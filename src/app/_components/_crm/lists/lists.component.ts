import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from 'src/app/_services/_crm/list.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';

export interface UserData {
  position: number;
  list_name: string;
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

  fetching:boolean = true;
  duplicateList:boolean = false;
  lists:any=[];
  list:any = {};
  listObj = {
    list_name: '',
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
          resolve(true);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }

  setList(list:any) {
    if(this.list.list_name && this.isListNameValid(this.list.list_name)) {
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
  copyList(list:any){
    // let obj={list_name:list.list_name,duplicateList:true};
    list.duplicateList=true;
    console.log(list)
    this._listservice
    .addlist(list)
    .subscribe((resp) => {
      console.log(resp.data)
      if(resp.success) this.fetchLists();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }
  // duplicate function need to be changed

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
    console.log(obj);
    this._listservice.searchlists(obj).subscribe((data: any) => {
      // console.log(data.data)
      this.lists = data.data;
    });
  }

  setError(msg: string) {
    this.hasError = msg;
    this.list.error = true;
    this.openDialog(this.adddialog, this.list);
  }
  isListNameValid(value:any) {
    // let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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