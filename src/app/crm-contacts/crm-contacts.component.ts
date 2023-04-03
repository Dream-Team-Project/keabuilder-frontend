import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { CrmService } from '../_services/_crmservice/crm.service';
import { A, B, COMMA, ENTER } from '@angular/cdk/keycodes';
import { CrmListService } from '../_services/_crmservice/crm_list.service';
import { CrmTagsService } from '../_services/_crmservice/crm-tags.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  Form,
} from '@angular/forms';

export interface CrmData {
  fullname: string;
  email: string;
  phone: string;
  list_name: string;
  created_at: string;
  // updated_at: string;
}

@Component({
  selector: 'app-crm-contacts',
  templateUrl: './crm-contacts.component.html',
  styleUrls: ['./crm-contacts.component.css'],
})
export class CrmContactsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;

  // errors= errorMessages;
  uniqueid: any;
  obj: any;
  contactchar:any;
  fetchList = false;
  lists: any = [];
  tags: any = [];
  // newlists: any = [];
  newtags: any = [];
  listarr: any[] = [];
  tagarr: any[] = [];
  delcontact: any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // tagarr_uniqueid: any = [];
  listCtrl = new FormControl(['']);
  tagCtrl = new FormControl(['']);
  // listarr_uniqueid: any = [];
  filteredList: Observable<any>;
  filteredTag: Observable<any>;

  displayedColumns: string[] = [
    'fullname',
    'email',
    'phone',
    'list_name',
    'created_at',
    // 'updated_at',
  ];
  sidebar = {
    open: false,
    anim: { open: false, close: false, time: 500 },
    animtime: 300,
  };
  selection = new SelectionModel<CrmData>(true, []);
  dataSource: MatTableDataSource<CrmData>;
  uniqueEmail: any;
  popup: any;
  userId: any;
  contacts: any = [];
  addOnBlur = true;
  // singlecontact: any;
  buttonText = 'Add';
  order:any=[ 
    {value: 'ascending', viewValue: 'Ascending'},
    {value: 'descending', viewValue: 'Descending'},
  ];
optionGroup:any=[
    {value: 'firstname', viewValue: 'Name', order: this.order},
    {value: 'email', viewValue: 'EmailId', order: this.order},
]

selectedForm:string = '';
filterlistid:any='';
filtertagid:any='';
selectedlistForm=new FormControl('') ;
selectedtagForm=new FormControl('');

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
    list_uniqueid: [''],
    tags: [''],
    uniqueid: '',
  });
  constructor(
    private _crmtagService: CrmTagsService,
    private crmService: CrmService,
    private _frmbuidr: FormBuilder,
    private _crmlistService: CrmListService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _route: ActivatedRoute,
  ) {
    this.dataSource = new MatTableDataSource(this.contacts);
    this.filteredList = this.listCtrl.valueChanges.pipe(
      startWith(null),
      map((list: string | null) =>
        list ? this._filterList(list) : this.lists.slice()
      )
    );
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.uniqueid = params.get('uniqueid');
      // console.log(params.get('list'))
      // console.log(params.get('tag'))
      this.obj = params.get('name');
      // if(params.get('name')=='tag'){this.obj = params.get('tag');}
     
    })
   
    this.filteredTag = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filterTag(tag) : this.tags.slice()
      )
    );
  }

  ngOnInit(): void {
    this.fetchAlldata();

    if(this.uniqueid && this.obj=='list' ){
      this.filterlistid=this.uniqueid;
      // this.selectedlistForm=this.uniqueid;
      this.sortlist();
      // this.sortlist().then((resp1)=>{
      //   this.patchlistname().then(()=>{
      //     this.patchtagname();
      //   }) 
      // })
    }
    else if(this.uniqueid && this.obj=='tag' ){
      this.filtertagid=this.uniqueid;
      // this.selectedtagForm=this.uniqueid;
      this.sorttag();
      // this.sortlist().then((resp1)=>{
      //   this.patchlistname();
      //     this.patchtagname();
        
      // })
    }
  }
  fetchAlldata(){
    this.fetchContacts().then((resp2) => {
      this.fetchLists().then((resp1) => {
        this.fetchTags().then((resp) => {
          var i = 0;
          this.contacts.forEach((contact: any) => {
            contact.temp_lists = [];
            contact.temp_tags = [];
            contact.list_name = [];
            contact.tag_name = [];
            contact.list_uniqueid.split(',').forEach((lid: any) => {
              this.lists.forEach((list: any) => {
                if (lid == list.uniqueid) {
                  var tl = { uniqueid: lid, list_name: list.list_name };
                  contact.temp_lists.push(tl);
                  contact.list_name.push(list.list_name);
                }
              });
            });
            this.tags.forEach((tag: any) => {
              contact.tags.split(',').forEach((tid: any) => {
                if (tid == tag.uniqueid) {
                  var tt = { uniqueid: tid, tag_name: tag.tag_name };
                  contact.temp_tags.push(tt);
                  contact.tag_name.push(tag.tag_name);
                }
              });
            });
            contact.list_name.toString();
            contact.tag_name.toString();
            if (i == this.contacts.length - 1) this.fetchList = true;
            i++;
          });
        });
      });
    });
  }
  patchlistname(){
    // return new Promise((resolve) => {
    this.contacts.forEach((contact: any) => {
      var i=0;
      contact.temp_lists = [];
      // contact.temp_tags = [];
      contact.list_name = [];
      // contact.tag_name = [];
      contact.list_uniqueid.split(',').forEach((lid: any) => {
        // console.log(this.lists); 
        this.lists.forEach((list: any) => {
          if (lid == list.uniqueid) {
            var tl = { uniqueid: lid, list_name: list.list_name };
            contact.temp_lists.push(tl);
            contact.list_name.push(list.list_name);
          }
        });
      });
      if (i == this.contacts.length - 1) this.fetchList = true;
      i++;
    //   resolve(true);
    // },
    // (error:any) => {
    //   resolve(false);
    // }
  // );
});
  }
  patchtagname(){
    // return new Promise((resolve) => {
    this.contacts.forEach((contact: any) => {
      // contact.temp_lists = [];
      contact.temp_tags = [];
      // contact.list_name = [];
      contact.tag_name = [];
    this.tags.forEach((tag: any) => {
      contact.tags.split(',').forEach((tid: any) => {
        if (tid == tag.uniqueid) {
          var tt = { uniqueid: tid, tag_name: tag.tag_name };
          contact.temp_tags.push(tt);
          contact.tag_name.push(tag.tag_name);
        }
      });
    });
//     resolve(true);
//   },
//   (error:any) => {
//     resolve(false);
//   }
// );
});
  }
  

  sortcontact(){
    // console.log(this.selectedForm)
    if(this.selectedForm[0]=='firstname' && this.selectedForm[1]=='Ascending'){
      this.contacts.sort((a:any,b:any) =>a.firstname.toLowerCase()>b.firstname.toLowerCase() ? 1 :-1);
    }
    else if(this.selectedForm[0]=='firstname' && this.selectedForm[1]=='Descending'){
      this.contacts.sort((a:any,b:any) =>a.firstname.toLowerCase()<b.firstname.toLowerCase() ? 1 :-1);
    }
    else if(this.selectedForm[0]=='email' && this.selectedForm[1]=='Ascending'){
      this.contacts.sort((a:any,b:any) =>a.email.toLowerCase()>b.email.toLowerCase() ? 1 :-1);
    }
    else if(this.selectedForm[0]=='email' && this.selectedForm[1]=='Descending'){
      this.contacts.sort((a:any,b:any) =>a.email.toLowerCase()<b.email.toLowerCase() ? 1 :-1);
    }
    else{
      this.contacts.sort((a:any,b:any) =>a.created_at<b.created_at ? 1 :-1);
    }
  }
  
  sortlist(){
    // console.log(this.filterlistid)
    // console.log(this.contacts);
    // return new Promise((resolve) => {
      if(this.filterlistid){
      this.crmService.filtercrmcontactlists(this.filterlistid).subscribe((data)=>{
        if(data.data.length!=0){

          this.fetchList=true;
          this.contacts=data.data;
          // console.log(this.contacts);

          this.patchlistname();
          this.patchtagname();
        }
        else{
          this._snackBar.open('List Data not Find !', 'OK'); 
          this.contacts=[];
        }
        //   resolve(true);
        // },
        // (error) => {
        //   resolve(false);
        });      
        }
   
  }
  sorttag(){
    // console.log(this.filtertagid)
    // return new Promise((resolve) => {
    if(this.filtertagid){
    this.crmService.filtercrmcontacttags(this.filtertagid).subscribe((data)=>{
      if (data.data.length!=0){
        this.contacts=data.data;
        this.patchlistname();
        this.patchtagname(); 
      }
      else{
        this._snackBar.open('Tag Data not Find !', 'OK');
        this.contacts=[];
    
    }
      //   resolve(true);
      // },
      // (error) => {
      //   resolve(false);
      }); 
         
      }
}
  gettwochar(value:any){
    this.contactchar=value.trim().split(" ");
    return this.contactchar.length == 2 ? this.contactchar[0][0]+this.contactchar[1][0] : this.contactchar[0][0]+this.contactchar[0][1];
  }

  validateEmail(event: any) {
    var email = event.target.value;
    this.crmService.crmcontactCheckEmail(email).subscribe((data) => {
      this.uniqueEmail = data.data[0]['count(*)'];
      // console.log(this.uniqueEmail);
      // return this.uniqueEmail;
    });
  }

  fetchContacts() {
    return new Promise((resolve) => {
      this.crmService.getAllcrmcontacts().subscribe(
        (data) => {
          this.contacts = data.data;
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

  openSidebar() {
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e: any) => {
      this.sidebar.anim.open = false;
    }, this.sidebar.animtime);
  }

  hidepopupsidebar() {
    this.sidebar.anim.close = true;
    setTimeout((e: any) => {
      this.popup = false;
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
      this.crmcontactForm.reset();
      // this.newlists = [];
      this.newtags = [];
      this.listarr = [];
      this.tagarr = [];
      this.buttonText = 'Add';
      // this.singlecontact = [];
      this.uniqueEmail=0;
    }, this.sidebar.animtime);
  }
  openpopup() {
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e: any) => {
      this.sidebar.anim.open = false;
    }, this.sidebar.animtime);
    this.popup = true;
  }

  // hidepopup() {
  //   this.sidebar.anim.close = true;
  //   setTimeout((e: any) => {
  //      this.popup = false;
  //     this.sidebar.anim.close = false;
  //     this.sidebar.open = false;
  //   }, this.sidebar.animtime);

  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  datecusfilter(value: any) {
    var dt = new Date(value);
    var text1 = dt.toDateString();
    var text2 = dt.toLocaleTimeString();
    return text1 + ' ' + text2;
  }
  addcrmcontact() {
    // this.listupdate().then((resp1: any) => {
    //   console.log('list uodated');
    // });
    this.tagupdate().then((resp2: any) => {
      // console.log('tag updated');
    });
    this.crmcontactForm.value.list_uniqueid = this.listarr
      .map((la: any) => la.uniqueid)
      .toString();
    this.crmcontactForm.value.tags = this.tagarr
      .map((ta: any) => ta.uniqueid)
      .toString();
    // console.log(this.crmcontactForm.value);
    this.crmService
      .createcrmcontact(this.crmcontactForm.value)
      .subscribe((data) => {
        this.hidepopupsidebar();
        this.ngOnInit();
        this._snackBar.open('CRM Contact added Succesfully !', 'OK');
      });
  }

  editcrmContact(user: any) {
    // console.log(user);
    this.listarr = user.temp_lists.map((tl: any) => tl);
    this.tagarr = user.temp_tags.map((tt: any) => tt);
    // console.log(this.listarr)
    // console.log(this.tagarr)
    this.crmcontactForm.patchValue(user);
    this.openSidebar();
    this.buttonText = 'Update';
  }

  tagupdate() {
    return new Promise((resolve) => {
      var i = 0;
      this.newtags.forEach((tag: any) => {
        this._crmtagService.createcrmtag(tag).subscribe((data: any) => {
          if (i == this.lists.length - 1) resolve(true);
          i++;
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
  //     });
  //   });
  // }

  updatecrmcontact() {
    // this.listupdate().then((resp1: any) => {
    //   console.log('list updated');
    // });
    this.tagupdate().then((resp2: any) => {
      // console.log('tag updated');
    });
    this.crmcontactForm.value.list_uniqueid = this.listarr
      .map((la: any) => la.uniqueid)
      .toString();
    this.crmcontactForm.value.tags = this.tagarr
      .map((ta: any) => ta.uniqueid)
      .toString();
    // console.log(this.crmcontactForm.value);
    this.crmService
      .updatecrmcontact(this.crmcontactForm.value)
      .subscribe((data) => {
        this.hidepopupsidebar();
        this.ngOnInit();
        this._snackBar.open('CRM Contact updated Succesfully !', 'OK');
      });
  }

  openDialog(templateRef: TemplateRef<any>, contact: any) {
    this.delcontact = contact;
    this.dialog.open(templateRef);
  }

  deletecrmContact(uniqueid: any) {
    this.crmService.deletecrmcontact(uniqueid).subscribe((data) => {
      this.ngOnInit();
      this._snackBar.open('CRM Contact deleted Succesfully !', 'OK');
    });
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

  // addlist(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();
  //   if (value) {
  //     var obj: any = {
  //       uniqueid: Math.random().toString(20).slice(2),
  //       list_name: event.value,
  //     };
  //     this.listarr.push(obj);
  //     this.newlists.push(obj);
  //   }
  //   // Clear the input value
  //   event.chipInput!.clear();
  //   this.listCtrl.setValue(null);
  // }

  removetag(event: string): void {
    const index = this.tagarr.indexOf(event);
    if (index >= 0) {
      this.tagarr.splice(index, 1);
      this.newtags.splice(index, 1);
    }
  }
  removelist(event: string): void {
    const index = this.listarr.indexOf(event);
    if (index >= 0) {
      this.listarr.splice(index, 1);
      // this.newlists.splice(index, 1);
    }
  }

  selectedTag(event: any): void {
    var obj: any = {
      uniqueid: event.option.value,
      tag_name: event.option.viewValue,
    };
    this.tagarr.push(obj);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  selectedList(event: any): void {
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

  private _filterTag(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter((tag: any) =>
      tag.tag_name.toLowerCase().includes(filterValue)
    );
  }

  isNaN(num:any) {
    return !isNaN(num) && num ?  num : '--';
  }

  isExistB(str:any) {
    return str && str!='null' ?  str : '';
  }

  isExistD(str:any) {
    return str && str!='null' ?  str : '--';
  }
}
