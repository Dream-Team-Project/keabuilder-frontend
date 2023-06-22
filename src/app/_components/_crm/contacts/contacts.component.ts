import {Component, OnInit, ElementRef, ViewChild, TemplateRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '../../../_services/_crm/list.service';
import { TagService } from '../../../_services/_crm/tag.service';
import { ContactService } from 'src/app/_services/_crm/contact.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-crm-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class CrmContactsComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fetching:boolean = true;
  contacts:Array<any> = [];
  lists:Array<any> = [];
  tags:Array<any> = [];
  contact:any = {};
  contactObj = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    lists:'',
    tags:'',
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
  constructor(
    private _contactService: ContactService,
    private _listService: ListService,
    private _tagService: TagService,
    private dialog: MatDialog,
    private _route: ActivatedRoute,
    private _general: GeneralService
  ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
    })
  }

  ngOnInit(): void {
   this.fetchData(); 
  }

  adjustdata(data:any){
    if(data) this.contacts = data;
    this.fetching = false;
  }
  
  fetchData(){
    this.fetchContacts().then((resp1:any)=>{
      this.fetchLists().then((resp2:any)=>{
        this.fetchTags().then((resp3:any)=>{
        })
      }) 
    })
  }

  fetchContacts() {
    return new Promise((resolve) => {
    this._contactService.fetchcontacts().subscribe((resp) => {
      this.adjustdata(resp?.data);
      resolve(true);
    },
    (error) => {
      resolve(false);
    }
  );
});
  }

  fetchLists() {
    return new Promise((resolve) => {
      this._listService.fetchlists().subscribe(
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

  fetchTags() {
    return new Promise((resolve) => {
      this._tagService.fetchtags().subscribe(
        (data) => {
          this.tags = data.data;
          resolve(true);
        },
        (error: any) => {
          resolve(false);
        }
      );
    });
  }

  searchContacts(search: any, sortInp:any, listInp:any, tagInp:any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      sortInp: sortInp.value,
      listInp: listInp.value,
      tagInp: tagInp.value,
    }
    this._contactService.searchcontacts(obj).subscribe((resp:any)=>{
      this.adjustdata(resp?.data);
    });
  }

  addContact() {
    if(this.contact.email && this.isEmailValid(this.contact.email)) {
      this.hasError = '';
      delete this.contact.error;
      if(this.newtags.length>0) this.tagupdate().then((resp)=>this.addContactFunction());
      else this.addContactFunction();
    }
    else {
      let msg = this.contact.email ? 'Email is invalid' : 'Email should not be empty';
      this.setError(msg)
    }
  }

  addContactFunction(){
    this.contact.lists=this.filteredTempIds.lists.toString();
    this.contact.tags=this.filteredTempIds.tags.toString();
    this._contactService.addcontact(this.contact).subscribe((resp) => {
      if(resp.success) {
        this.fetchContacts();
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
    this._contactService.deletecontact(this.contact.id).subscribe((resp) => {
      if(resp.success) this.fetchContacts();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });
  }

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str;
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
    this.dialog.open(templateRef);
  }

  tagupdate() {
    return new Promise((resolve) => {
      let i=0;
      this.newtags.forEach((tag: any) => {
        this._tagService.addtag(tag).subscribe((data: any) => {
          this.filteredTempIds.tags=this.filteredTempIds.tags.map((e:any)=>{
            if(e==data.data.uniqueid) e=data.data.id;
            return e;
          })
          // console.log(data.data)
          if(i=this.newtags.length-1)resolve(data.data);
        });
        i++;
      });
    });
  }

   // start list actions

   filterListData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.lists = this.lists.filter((option:any) => option.list_name.toLowerCase().includes(value));
  }

  addSelectedList(event:any, searchListInp:any): void {
    this.selectedLists.push(event.option.value);
    this.filteredTempIds.lists.push(event.option.value.id);
    // this.formlists.push(event.option.value.uniqueid)
    searchListInp.value = '';
    this.filterListData('');
  }

  removeSelectedList(index:number): void {
    this.selectedLists.splice(index, 1);
    this.filteredTempIds.lists.splice(index, 1);
    // this.formlists.splice(index, 1);

  }

  // end list actions

  // start tag actions

  filterTagData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.tags = this.tags.filter((option:any) => option.tag_name.toLowerCase().includes(value));
  }

  addSelectedTag(event:any, searchTagInp:any): void {
    this.selectedTags.push(event.option.value);
    this.filteredTempIds.tags.push(event.option.value.id);
    // this.formtags.push(event.option.value.uniqueid)
    searchTagInp.value = '';
    this.filterTagData('');
  }

  removeSelectedTag(index:number): void {
    this.selectedTags.splice(index, 1);
    this.filteredTempIds.tags.splice(index, 1);
    // this.formtags.splice(index, 1);
  }
  
  addtag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      var obj: any = {
        uniqueid: Math.random().toString(20).slice(2),
        tag_name: event.value,
      };
      this.selectedTags.push(obj);
      this.filteredTempIds.tags.push(obj.uniqueid);
    // this.formtags.push(obj.uniqueid);
    this.newtags.push(obj);
      
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  // end tag actions

}
