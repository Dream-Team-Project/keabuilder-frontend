import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContactService } from 'src/app/_services/_crm/contact.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FieldService } from 'src/app/_services/_crm/field.service';
import { ListService } from '../../../_services/_crm/list.service';
import { TagService } from '../../../_services/_crm/tag.service';
import { MailerService } from 'src/app/_services/mailer.service';
import { OfferService } from 'src/app/_services/_sales/offer.service';
import { CourseService } from 'src/app/_services/_membership/course.service';

@Component({
  selector: 'app-crm-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class CrmContactComponent implements OnInit {

  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;

  selIndex = 1;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fetching:boolean = true;
  contact:any = {};
  member:any = {};
  offers:any = {};
  fields:Array<any> = [];
  contactFields:Array<any> = [];
  contactFieldJSON:Array<any> = [];
  searchField:string = '';
  searchactivity:string = '';
  activitylist:Array<any> = ['activity1','activity2','activity3','activity4','activity5','activity6','activity7','activity8'];
  lists:any= [];
  tags:any= [];
  selectedLists:any = [];
  selectedTags:any = [];
  selectedoffers:any = [];
  newtags: any = [];
  filteredTempIds:any = {
    offers:[],
    lists: [],
    tags: []
  };
  filteredOptions:any = {
    offers:[],
    lists: [],
    tags: []
  };
  tagCtrl = new FormControl(['']);
  listCtrl = new FormControl(['']);
  emailsubject = new FormControl('', [Validators.required]);
  emailtoCtrl = new FormControl('', [Validators.email]);
  emailto:any=[];
  emailerror:boolean = false;
  email={
    subject:'',
    emailbody:'',
    emailto:[],
  }
  noteEdit:boolean = false;
  addressEdit:boolean = false;
 
  constructor(
    private _route: ActivatedRoute,
    public _general: GeneralService,
    private _contactService: ContactService,
    private _field: FieldService,
    private _listService: ListService,
    private _tagService: TagService,
    private MailerService: MailerService,
    private _offerservice: OfferService,
    private courseService:CourseService,
  ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.contact.uniqueid = params.get('uniqueid');
    }); 
    this._route.paramMap.subscribe((params: ParamMap) => { 
      this.member.uniqueid=params.get('memberid');
      if(params.get('memberid')) {
      this.fetchmember(params.get('memberid'));
      }
      else{
        this.fetchmember(params.get('uniqueid'));
      }
    })  
  }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
   
    this.fetchContact();
      this.fetchLists();
        this.fetchTags();
        this.fetchOffers();
          
  }
  fetchContact() {
    this.fetching = true;
      this._contactService.singlecontact(this.contact.uniqueid).subscribe((resp) => {
        // console.log(resp)
          this.contact = resp?.data;
          this.contact.oldlists=resp?.data?.lists;
          this.contact.oldtags=resp?.data?.tags;
          this.contact.icon = this.contactIcon(this.contact);
          if(this.contact.fieldans) this.contactFieldJSON = JSON.parse(this.contact.fieldans);
          this.fetchFields();
          this.selectedLists=resp?.data?.temp_lists;
          this.filteredTempIds.lists=resp?.data?.listid;
          this.selectedTags=resp?.data?.temp_tags;
          this.filteredTempIds.tags=resp?.data?.tagid;
          this.contact.olddata=JSON.stringify(resp?.data);
          this.fetching = false;
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
        this.fields.forEach((ff:any, findex)=>{
          this.contactFields[findex] = JSON.parse(JSON.stringify(ff));
          for(let i = 0; i < this.contactFieldJSON.length; i++) {
            let cf = this.contactFieldJSON[i];
            if(ff.id == cf.id) {
              this.contactFields[findex].value = cf.value;
              break;
            }
            else if(i == this.contactFieldJSON.length-1) {
              this.contactFields[findex].value = ff.value;
            }
          }
        })
        this.contactFieldJSON = this.contactFields.map((cf:any) => {
          return  {id: cf.id, value: cf.value};
        });
        // console.log(this.contactFields);
      }
    })
   
  }
  fetchmember(uniqueid:any){
    this.courseService.getsinglemember(uniqueid).subscribe((data:any)=>{
      if(data.success){
      this.member=data?.data[0];
      this.selectedoffers=this.member?.temp_offers;
      this.filteredTempIds.offers=this?.member.offer_id;
      }
      // console.log(data)
    })
  }
  fetchOffers() {
    this._offerservice.fetchoffers().subscribe((resp:any) => {
        this.offers = resp?.data;
        // console.log(this.offers)
        
  });
  }
  undoField(cf:any, i:number) {
    cf.value = this.contactFieldJSON[i].value;
    cf.edit = false;
    delete cf.error;
    delete cf.uniqueErr;
    delete cf.invalid;
  }

  verifyField(cf:any, i:number) {
    if(this.contactFieldJSON[i].value == cf.value && !cf.uniqueErr) this.undoField(cf, i);
    else if(cf.type == 'email' && !this.isEmailValid(cf.value)) cf.invalid = true;
    else if(cf.required && !cf.value) cf.error = true;
    else {
      cf.invalid = false;
      cf.error = false;
      this.updateContact(cf, i);
    }
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
          delete cf.invalid;
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
    if(str.length != 2) str = fullname ? fullname?.slice(0, 2) : contact?.email?.slice(0, 2);
    return str?.toUpperCase();
  }

  tagupdate(tag:any) {
    return new Promise((resolve) => {
        this._tagService.addtag(tag).subscribe((data: any) => {
          if(data.success==true) resolve(data.data);
        });
      });
  }
  sendemail(){
    // console.log(this.email)
    this.email.emailto=this.emailto;
    if(this.email.subject && this.email.emailbody && this.email.emailto){
      let obj={
        tomailid:this.email.emailto, 
        frommailid:'Support@keasolution.com',
        subject:this.email.subject,
        html:this.email.emailbody,
        };
        this.MailerService.sendmailform(obj).subscribe((data:any)=>{
        if(data.success){ 
          this._general.openSnackBar(false, 'Email has been send', 'OK', 'center', 'top');
          this.resetemail();
        }
      })
    }
    else{
      this._general.openSnackBar(true, 'Please Fill All Details', 'OK', 'center', 'top');
    }

  }
   // start list actions

  filterListData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.lists = this.lists?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedList(event:any, searchListInp:any): void {
    this.selectedLists.push(event.option.value);
    this.filteredTempIds.lists.push(event.option.value.uniqueid);
    this.update_static();
    searchListInp.value = '';
    this.filterListData('');
  }

  removeSelectedList(index:number): void {
    this.selectedLists.splice(index, 1);
    this.filteredTempIds?.lists?.splice(index, 1);
    this.update_static();
  }

  // end list actions

  // start tag actions

  filterTagData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.tags =this.tags.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedTag(event:any, searchTagInp:any): void {
    this.selectedTags.push(event.option.value);
    this.filteredTempIds.tags.push(event.option.value.uniqueid);
    this.update_static();
    searchTagInp.value = '';
    this.filterTagData('');
  }

  removeSelectedTag(index:number): void {
    this.selectedTags?.splice(index, 1);
    this.filteredTempIds?.tags?.splice(index, 1);
    this.update_static();
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
      this.tagupdate(obj).then((resp:any)=>{this.update_static()})
      this.newtags=[];
         
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

   // start offer actions

   filterofferData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.offers = this.offers.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedoffer(event:any, searchcourseInp:any): void {
    this.selectedoffers.push(event.option.value);
    this.filteredTempIds.offers.push(event.option.value.uniqueid);
    this.updatememberOffer(this.member);
    searchcourseInp.value = '';
    this.filterofferData('');
  }

  removeSelectedoffer(index:number): void {
    this.selectedoffers.splice(index, 1);
    this.filteredTempIds.offers.splice(index, 1);
    this.updatememberOffer(this.member);
  }

  // end offer actions

  updatememberOffer(member:any) {
    member.type='update';
    member.offerid= this.filteredTempIds.offers.toString();
    member.contactid=this.contact.uniqueid;
    member.registration_type = member?.registration_type  ? member?.registration_type : 'free';
    // console.log(member)
    this.courseService.updatedelmember(member).subscribe((resp:any)=>{
      if(resp.success)  this._general.openSnackBar(false, resp.message, 'OK', 'center', 'top');

    })
  
  }

  update_static(){
    this.contact.lists=this.filteredTempIds.lists.toString();
    this.contact.tags=this.filteredTempIds.tags.toString();
    var contact = JSON.parse(JSON.stringify(this.contact));
    contact.fieldans = JSON.stringify(this.contactFieldJSON);
    this._contactService.updatecontact(contact).subscribe(resp => {
      let msg = resp.success ? 'Contact has been Updated' : 'Server Error';
      this._general.openSnackBar(!resp.success, msg, 'OK', 'center', 'top');
      this.noteEdit = false;
      this.addressEdit = false;
    })
  }
  
  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}
 
  //  emails send
  addemailto(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && this.isEmailValid(value)==true) {
      this.emailto.push(value); 
       // Clear the input value
      event.chipInput!.clear();
      this.emailtoCtrl.reset();
    }
     else if(this.isEmailValid(value)==false && value){
      this.emailtoCtrl.setValue(value);
    }
  }
  removeemailto(index:number): void {
    this.emailto.splice(index, 1);
  }
  //  emails send

  isEmailValid(value:any) {
    let regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(value);
  }

  resetemail(){
    this.email.subject='';
    this.email.emailbody='';
    this.emailto=[];
    this.email.emailto=[];
  }
  getactivetab(e:any){
    if(e == 0) this._general.prevRoute();
    this._general.showEditor = e == 2;
  }
}
