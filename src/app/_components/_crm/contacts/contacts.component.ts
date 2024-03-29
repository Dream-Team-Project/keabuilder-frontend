import {Component, OnInit, ElementRef, ViewChild, TemplateRef} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '../../../_services/_crm/list.service';
import { TagService } from '../../../_services/_crm/tag.service';
import { ContactService } from 'src/app/_services/_crm/contact.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-crm-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class CrmContactsComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('delselecteddialog') delselecteddialog!: TemplateRef<any>;
  @ViewChild('importdialog') importdialog!: TemplateRef<any>;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  @ViewChild('paginator') paginator!: MatPaginator;

 
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fileFormControl= new FormControl('');
  tagsFormControl= new FormControl('');
  fieldsFormControl= new FormControl('');
  fetching:boolean = true;
  contacts:Array<any> = [];
  pagecontacts:Array<any> = [];
  lists:Array<any> = [];
  tags:Array<any> = [];
  contact:any = {};
  contactlength:any;
  contactObj = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    lists:'',
    tags:'',
    note:'',
    cron_date:'',
    pending_actions:'',
  }
  hasError:string = '';
  selectedLists:any = [];
  selectedTags:any = [];
  newtags: any = [];
  filteredTempIds:any = {
    lists: [],
    tags: []
  };
  filteredOptions:any = {
    lists: [],
    tags: []
  };
  tagCtrl = new FormControl(['']);
  error=false;
  errormessage='';
  document:any = '';
  uuid:any;
  listid:any;
  tagid:any;
  spinner=false;
  exportname:any;
  selectedContacts: any[] = [];
  checked_selected=false;
  listInp : string = '';
  tagInp : string = '';
  searchInp : string = ''; 
  sortInp : string = 'firstname DESC';

  constructor(
    private _contactService: ContactService,
    private _listService: ListService,
    private _tagService: TagService,
    private dialog: MatDialog,
    private _route: ActivatedRoute,
    private _general: GeneralService,
    private file:FileUploadService,
    private tokenStorage: TokenStorageService,
  ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
    })
    this.uuid = this.tokenStorage.getUser().uniqueid;
    this.fetchData(); 
  }
 

  ngOnInit(): void {
  }
  

  adjustdata(data:any){
    if(data) this.pagecontacts =data;
    this.fetching = false;
  }
  
  fetchData(){
    // this.fetchContacts();
    this.getpagecontacts({pageIndex:0,pageSize:20});
      this.fetchLists();
        this.fetchTags();
  }

  fetchLists() {
      this._listService.fetchlists().subscribe(
        (data) => {
          this.lists = data.data;
    });
  }

  fetchTags() {
      this._tagService.fetchtags().subscribe(
        (data) => {
          this.tags = data.data;
    });
  }

  toggleSort(column: string): void {
    // console.log(column)
    if (this.sortInp.includes(column)) {
      this.sortInp = this.sortInp.endsWith('ASC') ? `${column} DESC` : `${column} ASC`;
    } else {
      this.sortInp = `${column} ASC`;
    }
    this.searchContacts(this.searchInp, this.sortInp, this.listInp, this.tagInp);
  }

  searchContacts(search: any, sortInp:any, listInp:any, tagInp:any) {
   
    this.fetching = true;
    var obj = {
      search: search,
      sortInp: sortInp,
      listInp: listInp,
      tagInp: tagInp,
      pageIndex:this.paginator.pageIndex,
      pageSize:this.paginator.pageSize,

    }
    this._contactService.searchcontacts(obj).subscribe((resp:any)=>{
      this.adjustdata(resp?.data);
    });
  }

  addContact() {
    if(this.contact.email && this.isEmailValid(this.contact.email)) {
      this.hasError = '';
      delete this.contact.error;
      if(this.newtags.length>0) this.tagupdate().then((resp:any)=>this.addContactFunction());
      else this.addContactFunction();
    }
    else {
      let msg = this.contact.email ? 'Email is invalid' : 'Email should not be empty';
      this.setError(msg);
    }
  }

  addContactFunction(){
    this.contact.lists=this.filteredTempIds.lists.toString();
    this.contact.tags=this.filteredTempIds.tags.toString();
    this.contact.note='';
    this.contact.cron_date='';
    this.contact.pending_actions='';
    this._contactService.addcontact(this.contact).subscribe((resp) => {
      if(resp.success) {
        // this.fetchContacts();
        this.getpagecontacts({pageIndex:0,pageSize:20});
        this.resetobj();
        this._general.openSnackBar(false, 'Contact has been saved', 'OK', 'center', 'top');
      }
      else this.setError(resp.message);
    })
  }

  setError(msg:string) {
    this.hasError = msg;
    this.contact.error = true;
    this.openDialog(this.adddialog, this.contact);
  }

  deleteContact() {
    if(this.selectedContacts.length > 0){
      this.deleteSelectedContacts(this.selectedContacts);
    }
    else{
    this._contactService.deletecontact(this.contact.id).subscribe((resp) => {
      if(resp.success) 
      this.getpagecontacts({pageIndex:0,pageSize:20});
      //  this.fetchContacts();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }
  }

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str.toUpperCase();
  }

  isEmailValid(value:any) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  }

  openDialog(templateRef: TemplateRef<any>, contact: any) {
    if(!contact.error) {
      delete contact.error;
      this.hasError = '';
      this.contact = JSON.parse(JSON.stringify(contact));
    }
    this.dialog.open(templateRef).afterClosed().subscribe((data:any) => {
     this.fileFormControl.reset();
     this.resetobj();
     this.resetselecteddata();
    })
  }

  tagupdate() {
    return new Promise((resolve) => {
      this.newtags.forEach((tag: any, index: number) => {
        this._tagService.addtag(tag).subscribe((data: any) => {
          if(data.success){
          if(index==this.newtags.length-1) resolve(true);
          }
        });
      });
    });
  }

   // start list actions

   filterListData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.lists = this.lists.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedList(event:any, searchListInp:any): void {
    this.selectedLists.push(event.option.value);
    this.filteredTempIds.lists.push(event.option.value.uniqueid);
    searchListInp.value = '';
    this.filterListData('');
  }

  removeSelectedList(index:number): void {
    this.selectedLists.splice(index, 1);
    this.filteredTempIds.lists.splice(index, 1);
  }

  // end list actions

  // start tag actions

  filterTagData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.tags = this.tags.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedTag(event:any, searchTagInp:any): void {
    this.selectedTags.push(event.option.value);
    this.filteredTempIds.tags.push(event.option.value.uniqueid);
    searchTagInp.value = '';
    this.filterTagData('');
  }

  removeSelectedTag(index:number): void {
    this.selectedTags.splice(index, 1);
    this.filteredTempIds.tags.splice(index, 1);
  }
  
  addtag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      var obj: any = {
        uniqueid: Math.random().toString(20).slice(2),
        name: event.value,
      };
      this.selectedTags.push(obj);
      this.filteredTempIds.tags.push(obj.uniqueid);
      this.newtags.push(obj);
      
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  // end tag actions
// reset objects
resetobj(){
  this.selectedLists=[];
        this.selectedTags=[];
        this.filteredTempIds= {
          lists: [],
          tags: []
        };
        this.filteredOptions = {
          lists: [],
          tags: []
        };
        this.newtags=[];
        this.document='';
        this.exportname='';
        this.tagsFormControl.reset();
        this.fieldsFormControl.reset();
}
// file upload
documentChangeEvent(event:any){
  this.error=false;
  this.errormessage='';
  if(event.target.files[0]) {
    let ext=[];
    ext=event.target.files[0].name.split('.');
    let filename='upload-contacts'+'.'+ext[ext.length-1];
    let allowedExtension = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (ext.length==2 && allowedExtension.indexOf(event.target.files[0].type)>-1 && filename.match(/\.(xlsx)$/)) {
    this.document= event.target.files[0];
    this.document.filename=filename;
  }
  else{
    // this.dialog.open(this.importdialog);
      this.error=true;
      this.errormessage='File is not correct format'
      this.fileFormControl.reset();
      }
  }
  else{
    // this.dialog.open(this.importdialog);
    this.error=true;
    this.errormessage='Please Select File & List'
    this.fileFormControl.reset();
  }
}
uploadcontacts(){
  this.error=false;
  this.errormessage='';
  this.spinner=true;
  const reader = new FileReader();
  reader.onload = e => {reader.result}
  reader.readAsDataURL(this.document);
  this.file.uploadcontactsDocument(this.document, this.uuid).subscribe((file:any)=>{
    if(file){
      this.listid= this.filteredTempIds.lists?.length > 0 ? this.filteredTempIds.lists?.toString() : '';
      this.tagid= this.filteredTempIds.tags?.length > 0 ? this.filteredTempIds.tags?.toString() : '';
      let data = {
        file: file,
        listid: this.listid,
        tagid: this.tagid
      }
      this._contactService.uploadcontacts(data).subscribe((data:any)=>{
        if(data.success){
          this.spinner=false;
          this.dialog.closeAll();
          if(data?.errordata?.length > 0) {
            this._general.openSnackBar(true,data?.errordata?.length+' '+'contact not uploaded','Ok','center','top');
            this.resetobj();
          }
          else{
            this._general.openSnackBar(false,data?.message,'Ok','center','top');
          }
          // this.fetchContacts();
          this.getpagecontacts({pageIndex:0,pageSize:20});
        }
        else{
          if(data.errordata?.length > 0) this._general.openSnackBar(false,data?.errordata,'Ok','center','top');
          this.error=true;
          this.errormessage=data?.error;
          this.spinner=false;
        }
      
      })
    }
    else{
      this.spinner=false;
      // this.dialog.open(this.importdialog);
      this.error=true;
      this.errormessage='Error';
    }
  })
}

exportcontact(isList:boolean,type:any){
  // console.log(isList,type)
  this.spinner=true;
  let lists = isList ? this.filteredTempIds.lists?.length > 0 ? this.filteredTempIds.lists?.toString() : 'NULL' : 'NULL';
  if(lists || !isList) {
    // console.log(lists)
    this._contactService.exportcontacts({type:type,lists:lists,tags:this.tagsFormControl.value,fields:this.fieldsFormControl.value}).subscribe((resp:any)=>{
      if(resp.success){
        const worksheet:XLSX.WorkSheet=XLSX.utils.json_to_sheet(resp.data);
        const workbook:XLSX.WorkBook=XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,'Sheet1');
        XLSX.writeFile(workbook,this.exportname ? this.exportname+'.xlsx' :'Contacts-export.xlsx');
        this.resetobj();
        this.spinner=false;
        this.dialog.closeAll();
      }
      else{
        this._general.openSnackBar(true,resp?.message,'Ok','center','top');
        this.spinner=false;
      }
    })
  }
}

downloaduploadformat(){
  this.file.getuploadfileformat().subscribe((blob:any)=>{
    saveAs(blob, 'Contacts-template.xlsx');
  })
}

getpagecontacts(event:any){
let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
this._contactService.getpagecontacts(obj).subscribe((data:any)=>{ 
  if(data?.success){
  this.pagecontacts=data?.data;
  this.contactlength=data?.contacts;
  this.fetching = false;
  }else{
    this.fetching = false;
  }
});
}

selectContact(event: any, contact: any) {
  if (event) {
    this.selectedContacts.push(contact);
  } else {
    const index = this.selectedContacts.indexOf(contact);
    if (index !== -1) {
      this.selectedContacts.splice(index, 1);
    }
  }
  // console.log(this.selectedContacts)
}

selectAllContacts(event: any) {
  // console.log(event)
  if(event){
  this.pagecontacts=this.pagecontacts.map((ele:any)=>{ele.selected = true; return ele;});
  }
  else{
    this.pagecontacts=this.pagecontacts.map((ele:any)=>{ele.selected = false; return ele;});
  }
  this.selectedContacts = event ? [...this.pagecontacts] : [];
  // if(event) this.dialog.open(this.delselecteddialog);
  // console.log(this.selectedContacts)
}

deleteSelectedContacts(contacts:any) {
  this._contactService.deleteselectedcontacts({contacts:contacts}).subscribe((resp:any) => {
    if(resp.success) 
    this.getpagecontacts({pageIndex:0,pageSize:20});
  this.resetselecteddata();
    //  this.fetchContacts();
    this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
  });
}

resetselecteddata(){
  this.pagecontacts=this.pagecontacts.map((ele:any)=>{ele.selected = false; return ele;});
  this.checked_selected=false;
  this.selectedContacts=[];
  this.listInp = '';
  this.tagInp = '';
  this.searchInp = ''; 
}
}
