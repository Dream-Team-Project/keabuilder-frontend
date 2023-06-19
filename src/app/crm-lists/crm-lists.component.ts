import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '../_services/_crm/list.service';
import { GeneralService } from '../_services/_builder/general.service';

export interface UserData {
  position:number;
  list_name: string;
  activecontacts: any;
  actions:string;
}

@Component({
  selector: 'app-crm-lists',
  templateUrl: './crm-lists.component.html',
  styleUrls: ['./crm-lists.component.css']
})
export class CrmListsComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;

  fetching:boolean = true;
  lists:any=[];
  list:any = {};
  listObj = {
    list_name: '',
    uniqueid: '',
    id:'',
  }
  hasError:string = '';
  constructor( private _listservice:ListService, private dialog: MatDialog,private _general: GeneralService ) {}

  ngOnInit(): void {
    this.fetchLists().then((resp1) => {
      this.fetching = false;
    });
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
  addlist() {
    if(this.list.list_name && this.isListNameValid(this.list.list_name)) {
      this.hasError = '';
      delete this.list.error;
      console.log(this.list);
    this._listservice
      .addlist(this.list)
      .subscribe((resp) => {
       if(resp.success==true){
        this.fetchLists();
        this._general.openSnackBar(false, 'List has been saved', 'OK', 'center', 'top');
        }
        else this.setError(resp.message);
      })
    }
    else {
      let msg = this.list.list_name ? 'List Name is  invalid' : 'List Name should not be empty';
      this.setError(msg)
    }
  }
  updatelist(){
    if(this.list.list_name && this.isListNameValid(this.list.list_name)) {
    this._listservice.updatelist(this.list).subscribe((resp)=>{
      console.log(resp.data)
      if(resp.success==true){
        this.fetchLists();
        this._general.openSnackBar(false, 'List has been Updated', 'OK', 'center', 'top');
        }
        else this.setError(resp.message);
      })
    }
    else {
      let msg = this.list.list_name ? 'List Name is  invalid' : 'List Name should not be empty';
      this.setError(msg)
    }
  }
  copyList(list:any){
    
    let obj={list_name:list+' '+'copy'};
    this._listservice
    .addlist(obj)
    .subscribe((resp) => {
      if(resp.success) this.fetchLists();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }
  openDialog(templateRef: TemplateRef<any>, list: any) {
    if(!list.error) {
      delete list.error;
      this.hasError = '';
      this.list = JSON.parse(JSON.stringify(list));
    }
    this.dialog.open(templateRef);
  }
  deletelist(id:any){
    this._listservice.deletelist(id).subscribe((resp) => {
      if(resp.success) this.fetchLists();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });

  }
  searchLists(search: any,filter: any) {
    var obj = {
      search:search.value,
      filter:filter.value
    }
    console.log(obj);
    this._listservice.searchlists(obj).subscribe((data:any)=>{
      // console.log(data.data)
      this.lists = data.data;
    });
  }
  setError(msg:string) {
    this.hasError = msg;
    this.list.error = true;
    this.openDialog(this.adddialog, this.list);
  }
  isListNameValid(value:any) {
    // let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regex =/^[\w-_.]{4,}$/
    return regex.test(value);
  }
}
