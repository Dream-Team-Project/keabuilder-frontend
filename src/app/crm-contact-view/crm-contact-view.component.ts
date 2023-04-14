import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CrmTagsService } from '../_services/_crmservice/crm-tags.service';
import { CrmService } from '../_services/_crmservice/crm.service';
import { CrmListService } from '../_services/_crmservice/crm_list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { A, B, COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { CrmUserAddressService } from '../_services/_crmservice/crm-user-address.service';

@Component({
  selector: 'app-crm-contact-view',
  templateUrl: './crm-contact-view.component.html',
  styleUrls: ['./crm-contact-view.component.css']
})
export class CrmContactViewComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  
  panelOpenState = false;
  fetchList = false;
  lists: any = [];
  tags: any = [];
  contact: any = [];
  uniqueid: any;
  hideany: any = true;
  buttontext:any=true;
  taghideany: any = true;
  tagbuttontext:any=true;
  listhideany: any = true;
  listbuttontext:any=true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredList: Observable<any>;
  filteredTag: Observable<any>;
  uniqueEmail: any;
   newlists: any = [];
  newtags: any = [];
  listarr: any[] = [];
  tagarr: any[] = [];
  
   userAddress:any;
   step:any;
   activities=[
    {value: 'All Activities', viewValue: 'All Activities'},
    {value: 'Emails', viewValue: 'Emails'},
    {value: 'Notes', viewValue: 'Notes'},
    {value: 'Automations', viewValue: 'Automations'},
    {value: 'Campaign Activity', viewValue: 'Campaign Activity'},
  ]
  crmcontactForm: any = this._frmbuidr.group({
    firstname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(140),
      ]),
    ],
    lastname: [
      '',
      Validators.compose([Validators.minLength(3), Validators.maxLength(50)]),
    ],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        Validators.email,
      ]),
    ],
    phone: [
      '',
      Validators.compose([Validators.minLength(10), Validators.maxLength(50)]),
    ],
    // list_uniqueid: [''],
    // tags: [''],
    uniqueid: '',
  });
  crmcontactListForm: any = this._frmbuidr.group({
    list_uniqueid: [''],
    uniqueid: '',
  });
  crmcontactTagForm: any = this._frmbuidr.group({
    tags: [''],
    uniqueid: '',
  });

  listCtrl = new FormControl([''], Validators.compose([Validators.minLength(2)]),);
  tagCtrl = new FormControl([''], Validators.compose([Validators.minLength(2)]),);
  constructor(
    private _crmtagService: CrmTagsService,
    private crmService: CrmService,
    private _crmlistService: CrmListService,
    private crmAddressService: CrmUserAddressService,
    private _route: ActivatedRoute,
    private _frmbuidr: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.uniqueid = params.get('uniqueid');
      // console.log(this.uniqueid);
    });
    
    this.filteredList = this.listCtrl.valueChanges.pipe(
      startWith(null),
      map((list: string | null) =>
        list ? this._filterList(list) : this.lists.slice()
      )
    );

    this.filteredTag = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filterTag(tag) : this.tags.slice()
      )
    );
    
  }

  ngOnInit(): void {
    this.fetchAddress().then((resp5)=>{console.log(resp5)});
    this.fetchContact(this.uniqueid).then((resp2) => {
      this.fetchLists().then((resp1) => {
        this.fetchTags().then((resp) => {
          var i = 0;
          this.contact.temp_lists = [];
          this.contact.temp_tags = [];
          this.contact.list_name = [];
          this.contact.tag_name = [];
          this.contact.list_uniqueid.split(',').forEach((lid: any) => {
            this.lists.forEach((list: any) => {
              if (lid == list.uniqueid) {
                 var tl = { uniqueid: lid, list_name: list.list_name };
                this.contact.temp_lists.push(tl);
                this.contact.list_name.push(list.list_name);
              
              }
            });
            
          });
          this.tags.forEach((tag: any) => {
            this.contact.tags.split(',').forEach((tid: any) => {
              if (tid == tag.uniqueid) {
                 var tt = { uniqueid: tid, tag_name: tag.tag_name };
                 this.contact.temp_tags.push(tt);
                this.contact.tag_name.push(tag.tag_name);
              }
            });
          });
           
          this.contact.list_name.toString();
          this.contact.tag_name.toString();
          if (i == this.contact.length - 1) this.fetchList = true;
          i++;

          this.listarr= this.contact.temp_lists.map((tl: any) => tl);
          this.tagarr= this.contact.temp_tags.map((tt: any) => tt);
         
        });
        
      });
    });
    this.hideany = true;
    this.buttontext=true;
    this.taghideany = true;
    this.tagbuttontext=true;
    this.listhideany = true;
    this.listbuttontext=true;
   
      // this.newlists = [];
      // this.newtags = [];
      this.listarr = [];
      this.tagarr = [];
      this.uniqueEmail=0;
  }
  validateEmail(event: any) {
    var email = event.target.value;
    this.crmService.crmcontactCheckEmail(email).subscribe((data) => {
      this.uniqueEmail = data.data[0]['count(*)'];
      
    });
  }
  fetchContact(uniqueid: any) {
    return new Promise((resolve) => {
      this.crmService.getcrmcontact(uniqueid).subscribe(
        (data) => {
          this.contact = data.data[0];
          // console.log(this.contact)
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
  fetchAddress(){
    return new Promise((resolve) => {
      this.crmAddressService.getAlluserAddress().subscribe(
        (data) => {
          console.log(data.data[0])
          this.userAddress = data.data[0];
           
          resolve(true);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }
  editcrmContact(user: any) {
    this.crmcontactForm.patchValue(user);
    this.buttontext=false;
    this.hideany = false;
  }
  editcrmContactTags(user:any){
    this.crmcontactTagForm.patchValue(user);
    this.tagbuttontext=false;
    this.taghideany = false;

  }
  updatecrmcontactTags(){
    this.tagupdate().then((resp2: any) => {
      // console.log('tag updated');
    });
    this.crmcontactTagForm.value.tags = this.tagarr
      .map((ta: any) => ta.uniqueid)
      .toString();
      this.crmService
      .updatecrmcontactTags(this.crmcontactTagForm.value)
      .subscribe((data) => {
        // this.hidepopupsidebar();
        this.crmcontactTagForm.reset();
        this.ngOnInit();
        this._snackBar.open('CRM Tags updated Succesfully !', 'OK');
      });
  }
  editcrmContactLists(user:any){
    this.crmcontactListForm.patchValue(user);
    this.listbuttontext=false;
    this.listhideany = false;

  }
  updatecrmcontactLists(){
    this.crmcontactListForm.value.list_uniqueid = this.listarr
    .map((la: any) => la.uniqueid)
    .toString();
    this.crmService
    .updatecrmcontactLists(this.crmcontactListForm.value)
    .subscribe((data) => {
      // this.hidepopupsidebar();
      this.crmcontactListForm.reset();
      this.ngOnInit();
      this._snackBar.open('CRM List updated Succesfully !', 'OK');
    });
  }
  updatecrmcontact() {
    // console.log(this.crmcontactForm.value);
    this.crmService
      .updatecrmcontactGenralDeatils(this.crmcontactForm.value)
      .subscribe((data) => {
        // this.hidepopupsidebar();
        this.crmcontactForm.reset();
        this.ngOnInit();
        this._snackBar.open('CRM Contact updated Succesfully !', 'OK');
      });
      
  }
  editcancel(){
    this.crmcontactForm.reset();
    this.ngOnInit();
   
   
  }
  resetlist(){
    this.crmcontactListForm.reset();
    this.ngOnInit();
  }
  resettag(){
    this.crmcontactTagForm.reset();
    this.ngOnInit();
  }
  tagupdate() {
    return new Promise((resolve) => {
      var i = 0;
      this.newtags.forEach((tag: any) => {
        this._crmtagService.createcrmtag(tag).subscribe((data: any) => {
          if (i == this.lists.length - 1) 
          resolve(true);
          i++;
        // this.ngOnInit();
        });
      });
    });
  }

  // listupdate() {
  //   return new Promise((resolve) => {
  //     var i = 0;
  //     this.newlists.forEach((list: any) => {
  //       this._crmlistService.createcrmlist(list).subscribe((data: any) => {
  //         if (i == this.lists.length - 1) resolve(true);
  //         i++;
  //       });
  //     // this.ngOnInit();
  //      });
  //   });
  // }
  isNaN(num: any) {
    return !isNaN(num) && num ? num : '--';
  }

  isExistB(str: any) {
    return str && str != 'null' ? str : '';
  }

  isExistD(str: any) {
    return str && str != 'null' ? str : '--';
  }
  
  addtag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      var obj: any = {
        uniqueid: Math.random().toString(20).slice(2),
        tag_name: event.value,
      };
      this.tagarr.push(obj);
      this.newtags.push(obj);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }
  
  removetag(event: string): void {
    const index = this.tagarr.indexOf(event);
    if (index >= 0) {
      this.tagarr.splice(index, 1);
      this.newtags.splice(index, 1);
    }
  }
  selectedTag(event: MatAutocompleteSelectedEvent): void {
    var obj: any = {
      uniqueid: event.option.value,
      tag_name: event.option.viewValue,
    };
    this.tagarr.push(obj);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
  
  private _filterTag(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter((tag: any) =>
      tag.tag_name.toLowerCase().includes(filterValue)
    );
  }

  addlist(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      var obj: any = {
        uniqueid: Math.random().toString(20).slice(2),
        list_name: event.value,
      };
      this.listarr.push(obj);
      this.newlists.push(obj);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.listCtrl.setValue(null);
  }
  removelist(event: string): void {
    const index = this.listarr.indexOf(event);
    if (index >= 0) {
      this.listarr.splice(index, 1);
      // this.newlists.splice(index, 1);
    }
  }

  selectedList(event: MatAutocompleteSelectedEvent): void {
    var obj: any = {
      uniqueid: event.option.value,
      list_name: event.option.viewValue,
    };
    this.listarr.push(obj);
    this.listInput.nativeElement.value = '';
    this.listCtrl.setValue(null);
  }

  private _filterList(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.lists.filter((list: any) =>
      list.list_name.toLowerCase().includes(filterValue)
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
}