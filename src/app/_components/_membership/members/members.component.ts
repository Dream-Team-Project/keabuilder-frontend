import { Component, OnInit, ViewChild, Inject, TemplateRef, ElementRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatTable} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { FormControl,Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TagService } from 'src/app/_services/_crm/tag.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ListService } from 'src/app/_services/_crm/list.service';
import { MembersService } from 'src/app/_services/_membership/members.service';
import {hashSync} from 'bcryptjs';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { OfferService } from 'src/app/_services/_sales/offer.service';



@Component({
  selector: 'app-membership-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembershipMembersComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  @ViewChild('paginator') paginator!: MatPaginator;

  fetching:boolean = true;
  hide = true;
  currencytype = '';
  kbduration = '';
  popupsidebar = false;
  automationaddnewaction = false;
  productoptionals = new FormControl();
  productoptionalList: string[] = [];
  tagoptionals = new FormControl();
  // tagoptionalList: string[] = [];
  addmemberobj = {user_id:'',firstname:'',lastname:'',email:'',password:'',phone:'', marketing:false,lists:'',tags:'',offerid:'',registration_type:'free'};
  firstFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20) ]);
  passwordFormControl = new FormControl('',[Validators.required,Validators.minLength(6)]);
  users:any = [];
  member:any={};
  tagCtrl = new FormControl(['']);
  listCtrl = new FormControl(['']);
  tags:Array<any> = [];
  lists:Array<any> = [];
  filteredOptions:any = {
    offers:[],
    lsits:[],
    tags: []
  };
  filteredTempIds:any = {
    offers:[],
    lists:[],
    tags: []
  };
  hasError:string = '';
  error=false;
  contact:any = {};
  selectedTags:any = [];
  selectedLists:any = [];
  selectedoffers:any = [];
  newtags: any = [];
  courses:any=[];
  offers:any=[];
  user_id:any;
  memberslength:any;

  constructor( private _snackBar: MatSnackBar,
                private courseService:CourseService,
                public dialog: MatDialog,
                private _tagService: TagService,
                private _listService: ListService,
                private _general: GeneralService,
                private _memberService:MembersService,
                private tokenStorage: TokenStorageService,
                private _offerservice: OfferService,) {
                  this.user_id = this.tokenStorage?.getUser().uniqueid;
    this.getallmymembers();
    this.fetchTags();
    this.fetchLists();
    this.fetchOffers();

  }
  ngOnInit(): void {

  }

  fetchTags() {
    this._tagService.fetchtags().subscribe(
      (data) => {
        this.tags = data.data;
  });
}
fetchLists() {
  this._listService.fetchlists().subscribe(
    (data) => {
      this.lists = data.data;
});
}

fetchOffers() {
  this._offerservice.fetchoffers().subscribe((resp:any) => {
      this.offers = resp.data;
      // console.log(this.offers)
      
});
}

  getallmymembers(){
    this.courseService.getallmembers().subscribe({
      next: data => {
        // console.log(data);
        this.users =  data.data;
        this.memberslength=data?.data?.length;
        this.fetching = false;
      }
      
    });
  }

 

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str.toUpperCase();
  }


  // addnewcontact(){
  //   this.popupsidebar = true;
  //   this.automationaddnewaction = true;
  // }
  
  createmember(){
    this.addmemberobj.password=hashSync(this.addmemberobj.password,8);
    this.addmemberobj.user_id=this.user_id;
    if(this.selectedTags){
      this.addmemberobj.tags = this.filteredTempIds.tags.toString();
    }
    if(this.selectedLists){
      this.addmemberobj.lists = this.filteredTempIds.lists.toString();
    }
    this.addmemberobj.offerid = this.filteredTempIds.offers.toString();
    if(this.addmemberobj.email && this.isEmailValid(this.addmemberobj.email)) {
      if(this.addmemberobj.offerid){
      this.hasError = '';
      this.error=false;
      // delete this.addmemberobj.error;

      this._memberService.memberregister(this.addmemberobj).subscribe({
        next: data => {
          // console.log(data);

          if(data.already==1){
              this._general.openSnackBar(false,'Email Already Exist!', 'Close', 'center', 'top');
              this.resetobj();
          }else{
              this.getallmymembers();
              this._general.openSnackBar(false,'Member Added Successfully!', 'Close', 'center', 'top');
              this.resetobj();
          }
        
        }
      });

    }
  else{
    this.error=true;
    this.dialog.open(this.adddialog);
  }
}
else{
  let msg = this.addmemberobj.email ? 'Email is invalid' : 'Email should not be empty';
  this.setError(msg);
}
  }
  isEmailValid(value:any) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  }
  removespecialchar(data:any){
    let un = data.username.replace(/[^a-zA-Z0-9]/g, "");
    data.username = un.toLowerCase();
  }
  setError(msg:string) {
    this.hasError = msg;
    this.contact.error = true;
    this.openDialog(this.adddialog, this.addmemberobj);
  }
  deletemember(){
    var data = {uniqueid:this.member.uniqueid,contactid:this.member.contactid,name:'',type:'delete'};
        this.courseService.updatedelmember(data).subscribe({
          next: data => {
            if(data.success){
            this.getallmymembers();
            this._general.openSnackBar(false,'Member Deleted Successfully!', 'Close','center','top');
            }
            else{
              this._general.openSnackBar(true,'Member Not Deleted', 'Close','center','top');
            }
          }
          })
  }


  // openDialog(id:any): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {name: 'Member'},
  //   });
    
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(id);

  //     if(result.event == 'Delete'){
  //       var data = {id:id,name:'',type:'delete'};
  //       this.courseService.updatedelmember(data).subscribe({
  //         next: data => {
  //           // console.log(data);
  //           this.getallmymembers();
  //           this._general.openSnackBar(false,('Member Deleted Successfully!', 'Close');
  //         }
  //       });
  //     }
  //   });

  // }
  openDialog(templateRef: TemplateRef<any>, contact: any) {
    if(!this.contact.error) {
      delete contact.error;
      this.hasError = '';
      this.member = JSON.parse(JSON.stringify(contact));
    }
    this.dialog.open(templateRef).afterClosed().subscribe((data:any) => {
     
    })
  }
  resetobj(){
    this.addmemberobj = {user_id:'',firstname:'',lastname:'',email:'',password : '',phone:'',marketing:false,lists:'',tags:'',offerid:'',registration_type:'free'};
    this.member=[];
    this.filteredOptions.tags=[];
    this.filteredOptions.lists=[];
    this.filteredOptions.courses=[];
    this.filteredTempIds.tags=[];
    this.filteredTempIds.lists=[];
    this.filteredTempIds.courses=[];
    this.selectedTags=[];
    this.selectedLists=[];
    this.selectedoffers=[];
  }

  searchmembers(search: any, sortInp:any,listInp:any, tagInp:any) {
   
    this.fetching = true;
    var obj = {
      search: search.value,
      sortInp: sortInp.value,
      tagInp: tagInp.value,
      listInp: listInp.value,
    }
    this.courseService.searchmembers(obj).subscribe((data:any)=>{
      this.users=data.data;
      this.fetching=false;
    })
  }

   // start offer actions

   filterofferData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.offers = this.offers.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedoffer(event:any, searchcourseInp:any): void {
    this.selectedoffers.push(event.option.value);
    this.filteredTempIds.offers.push(event.option.value.uniqueid);
    searchcourseInp.value = '';
    this.filterofferData('');
  }

  removeSelectedoffer(index:number): void {
    this.selectedoffers.splice(index, 1);
    this.filteredTempIds.offers.splice(index, 1);
  }

  // end offer actions
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
}

