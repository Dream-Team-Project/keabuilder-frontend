import {Component, OnInit, ElementRef, ViewChild, TemplateRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CrmListService } from '../_services/_crmservice/crm_list.service';
import { CrmTagsService } from '../_services/_crmservice/crm-tags.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../_services/_crm/contact.service';
import { GeneralService } from '../_services/_builder/general.service';

@Component({
  selector: 'app-crm-contacts',
  templateUrl: './crm-contacts.component.html',
  styleUrls: ['./crm-contacts.component.css'],
})
export class CrmContactsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('adddialog') adddialog!: TemplateRef<any>;

  fetching:boolean = true;
  contacts:Array<any> = [];
  lists:Array<any> = [];
  tags:Array<any> = [];
  contact:any = {};
  contactObj = {
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  }
  hasError:string = '';

  constructor(
    private _contactService: ContactService,
    private _crmlistService: CrmListService,
    private _crmtagService: CrmTagsService,
    private dialog: MatDialog,
    private _route: ActivatedRoute,
    private _general: GeneralService
  ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
    })
  }

  ngOnInit(): void {
    this.fetchContacts();
  }

  adjustdata(data:any){
    if(data) this.contacts = data;
    this.fetching = false;
    
  }

  fetchContacts() {
    this._contactService.fetchcontacts().subscribe((resp) => {
      this.adjustdata(resp?.data);
    });
  }

  fetchLists() {
    return new Promise((resolve) => {
      this._crmlistService.getAllcrmlists().subscribe(
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

  fetchTags() {
    return new Promise((resolve) => {
      this._crmtagService.getAllcrmtags().subscribe(
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
      console.log(this.contact);
      this._contactService.addcontact(this.contact).subscribe((resp) => {
        if(resp.success) {
          this.fetchContacts();
          this._general.openSnackBar(false, 'Contact has been saved', 'OK', 'center', 'top');
        }
        else this.setError(resp.message);
      })
    }
    else {
      let msg = this.contact.email ? 'Email is invalid' : 'Email should not be empty';
      this.setError(msg)
    }
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

}
