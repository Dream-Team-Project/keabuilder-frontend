import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContactService } from 'src/app/_services/_crm/contact.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FieldService } from 'src/app/_services/_crm/field.service';
import { ListService } from '../../../_services/_crm/list.service';
import { TagService } from '../../../_services/_crm/tag.service';

@Component({
  selector: 'app-crm-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class CrmContactComponent implements OnInit {
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  fetching:boolean = true;;
  contact:any = {};
  fields:Array<any> = [];
  contactFields:Array<any> = [];
  contactFieldJSON:Array<any> = [];
  searchField:string = '';
  lists:any= [];
  tags:any= [];
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
  listCtrl = new FormControl(['']);
  constructor(
    private _route: ActivatedRoute,
    private _general: GeneralService,
    private _contactService: ContactService,
    private _field: FieldService,
    private _listService: ListService,
    private _tagService: TagService,
  ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.contact.uniqueid = params.get('uniqueid');
    });    
   
  }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.fetching = true;
    this.fetchContact();
      this.fetchLists();
        this.fetchTags();
          this.fetching = false;
  }
  fetchContact() {
      this._contactService.singlecontact(this.contact.uniqueid).subscribe((resp) => {
          this.contact = resp?.data[0];
          console.log(this.contact)
          this.contact.icon = this.contactIcon(this.contact);
          if(this.contact.fieldans) this.contactFieldJSON = JSON.parse(this.contact.fieldans);
          this.fetchFields();
          this.selectedLists=resp?.data[0].temp_lists;
          this.filteredTempIds.lists=resp?.data[0].listid;
          this.selectedTags=resp?.data[0].temp_tags;
          this.filteredTempIds.tags=resp?.data[0].tagid;
          // console.log(this.selectedLists)
          // console.log(this.selectedTags)
        }
      );
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
  fetchFields() {
    this._field.fetchfields().subscribe((resp:any)=>{
      if(resp?.data) {
        this.fields = resp.data;
        if(this.contactFieldJSON.length == 0) {
          this.contactFieldJSON = this.fields.filter(ff=>ff.default_field).map(fm=>{
            var cf:any = new Object();
            cf.id = fm.id;
            cf.value = this.contact[fm.name.replaceAll('-', '')];
            return cf;
          })
        }
        this.contactFields = JSON.parse(JSON.stringify(this.contactFieldJSON));
        this.contactFields.forEach((cf:any)=>{
          for(let i = 0; i < this.fields.length - 1; i++) {
            var ff = this.fields[i];
            if(cf.id === ff.id) {
                cf.name = ff.name;
                cf.label = ff.label;
                cf.required = ff.required;
                cf.default_field = ff.default_field;
                break;
            }
          }
        })
      }
    })
  }

  undoField(cf:any, i:number) {
    if(cf.default_field && cf.name == 'email') cf.value = this.contact.email;
    else cf.value = this.contactFieldJSON[i].value;
    cf.edit = false;
    delete cf.error;
    delete cf.uniqueErr;
  }

  verifyField(cf:any, i:number) {
    if(this.contactFieldJSON[i].value === cf.value && !cf.uniqueErr) cf.edit = false;
    else if(cf.required) {
      if(cf.value) this.updateContact(cf, i);
      else cf.error = true;
    }
    else this.updateContact(cf, i);
  }

  updateContact(cf:any, i:number) {
    this.contact.lists=this.filteredTempIds.lists.toString();
    this.contact.tags=this.filteredTempIds.tags.toString();
    var contact = JSON.parse(JSON.stringify(this.contact));
    this.contactFieldJSON[i].value = cf.value;
    contact.fieldans = JSON.stringify(this.contactFieldJSON);
    if(cf.default_field) contact[cf.name.replaceAll('-', '')] = cf.value;
    this._contactService.updatecontact(contact).subscribe(resp => {
      var msg;
      if(resp.exist) cf.uniqueErr = true;
      else {
        if(resp.success) {
          msg = 'Contact has been updated';
          this.contact = contact;
          delete cf.error;
          delete cf.uniqueErr;
        }
        else msg = 'Server Error';
        this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
        cf.edit = false;
      }
    });
  }

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str.toUpperCase();
  }
  tagupdate(tag:any) {
    return new Promise((resolve) => {
        this._tagService.addtag(tag).subscribe((data: any) => {
          if(data.success==true) resolve(data.data);
        });
      });
  }

   // start list actions

  filterListData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.lists = this.lists?.filter((option:any) => option?.name.toLowerCase().includes(value.toLowerCase()));
   
  }

  addSelectedList(event:any, searchListInp:any): void {
    this.selectedLists.push(event.option.value);
    this.filteredTempIds.lists.push(event.option.value.uniqueid);
    this.updatelist_tag();
    searchListInp.value = '';
    this.filterListData('');
  }

  removeSelectedList(index:number): void {
    this.selectedLists.splice(index, 1);
    this.filteredTempIds?.lists?.splice(index, 1);
    this.updatelist_tag();
  }

  // end list actions

  // start tag actions

  filterTagData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.tags =this.tags.filter((option:any) => option?.name.toLowerCase().includes(value.toLowerCase()));
  }

  addSelectedTag(event:any, searchTagInp:any): void {
    this.selectedTags.push(event.option.value);
    this.filteredTempIds.tags.push(event.option.value.uniqueid);
    this.updatelist_tag();
    searchTagInp.value = '';
    this.filterTagData('');
  }

  removeSelectedTag(index:number): void {
    this.selectedTags?.splice(index, 1);
    this.filteredTempIds?.tags?.splice(index, 1);
    this.updatelist_tag();
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
      this.tagupdate(obj).then((resp:any)=>{this.updatelist_tag()})
      this.newtags=[];
         
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }
  updatelist_tag(){
    this.contact.lists=this.filteredTempIds.lists.toString();
    this.contact.tags=this.filteredTempIds.tags.toString();
    var contact = JSON.parse(JSON.stringify(this.contact));
    contact.fieldans = JSON.stringify(this.contactFieldJSON);
    this._contactService.updatecontact(contact).subscribe(resp => {
      if(resp.success==true){
        let msg = 'List & Tag Updated Successfully!';
        this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
      }
    })
  }
}
