import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagService } from 'src/app/_services/_crm/tag.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MatPaginator } from '@angular/material/paginator';

export interface UserData {
  position: number;
  name: string;
  contacts: string;
  automations: string;
  actions: string;
}

@Component({
  selector: 'app-crm-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class CrmTagsComponent implements OnInit {
  displayedColumns: string[] = [
    'checkbox',
    'name',
    'contacts',
    'automations',
    'actions',
  ];
  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  fetching:boolean = true;
  tags:any=[];
  tag:any = {};
  tagObj = {
    name: '',
    uniqueid: '',
    id:'',
    
  }
  hasError:string = '';
  filteredtags: any = [];
  temptags: any = [];
  populartags:any=[];
  recenttags:any=[];
  tagslength:any;
  pagetags:any;
  selectedTags: any[] = [];
  checked_selected=false;
  searchInp : any = ''; 
  filterInp : any = 'name DESC';
  

 
  constructor(private _tagService: TagService,private dialog: MatDialog,private _general: GeneralService) {};

  ngOnInit(): void {
    this.getpagetags({pageIndex:0,pageSize:20}).then((resp1:any) => {
    // this.fetchtags().then((resp1) => {
    this.sortTagcontacts().then((resp2:any) => {
          for(let i=0;i<5;i++){
            if(resp2[i])
            this.populartags[i]=resp2[i].name;
          }
          this.fetching = false;  
    })
    })
  }
 
  // fetchtags() {
  //   return new Promise((resolve) => {
  //     this._tagService.fetchtags().subscribe(
  //       (data) => {
  //         this.tags = data.data;
  //         let i=0;
  //         for(i=0;i<5;i++){
  //           if(this.tags[i])
  //           this.recenttags[i]=this.tags[i].name;
  //         }
  //         resolve(true);
  //       },
  //       (error) => {
  //         resolve(false);
  //       }
  //     );
  //   });
  // }

  sortTagcontacts() {
    return new Promise((resolve) => {
      var newtags=JSON.parse(JSON.stringify(this.tags));
      newtags.sort((a:any,b:any) =>a.activecontacts<b.activecontacts ? 1 :-1);
        resolve(newtags);
      },
      );
  }
  addtag() {
    if(this.tag.name && this.isTagNameValid(this.tag.name)) {
      this.hasError = '';
      delete this.tag.error;
      this._tagService
        .addtag(this.tag)
        .subscribe((resp) => {
          if(resp.success==true){
            // this.fetchtags();
             this.getpagetags({pageIndex:0,pageSize:20})
            this._general.openSnackBar(false, 'Tag has been saved', 'OK', 'center', 'top');
            }
            else this.setError(resp.message);
          })
        }
        else {
          let msg = this.tag.name ? 'Tag Name is  invalid' : 'Tag Name should not be empty';
          this.setError(msg)
        }
  }

  updatetag() {
    if(this.tag.name && this.isTagNameValid(this.tag.name)) {
      this._tagService.updatetag(this.tag).subscribe((resp) => {
        if(resp.success==true){
          // this.fetchtags();
           this.getpagetags({pageIndex:0,pageSize:20})
        this._general.openSnackBar(false, 'Tag has been Updated', 'OK', 'center', 'top');
        }
        else this.setError(resp.message);
      })
    }
    else {
      let msg = this.tag.name ? 'Tag Name is  invalid' : 'Tag Name should not be empty';
      this.setError(msg)
    }
  }
  
  openDialog(templateRef: TemplateRef<any>, tag: any) {
    if(!tag.error) {
      delete tag.error;
      this.hasError = '';
      this.tag = JSON.parse(JSON.stringify(tag));
    }
    this.dialog.open(templateRef);
  }
 
  deletetag(id:any){
    this._tagService.deletetag(id).subscribe((resp) => {
      if(resp.success)   this.getpagetags({pageIndex:0,pageSize:20})
      // this.fetchtags();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });

  }

  setError(msg:string) {
    this.hasError = msg;
    this.tag.error = true;
    this.openDialog(this.adddialog, this.tag);
  }
  isTagNameValid(value:any) {
    let regex =/^[\w-_. ]{4,}$/
    return regex.test(value);
  }
  toggleSort(column: string): void {
    // console.log(column)
    if (this.filterInp.includes(column)) {
      this.filterInp = this.filterInp.endsWith('ASC') ? `${column} DESC` : `${column} ASC`;
    } else {
      this.filterInp = `${column} ASC`;
    }
    this.searchTags(this.searchInp, this.filterInp);
  }

  searchTags(search: any,filter: any) {
    var obj = {
      search:search,
      filter:filter,
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 20,
    }
    this._tagService.searchtags(obj).subscribe((data:any)=>{
      this.pagetags = data.data;
    });
  }
  getpagetags(event:any){
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
    return new Promise((resolve) => {
      this._tagService.getpagetags(obj).subscribe(
        (data:any) => {
          this.tags = data.data;
          this.pagetags=data?.data;
          this.tagslength=data?.tags;
          let i=0;
          for(i=0;i<5;i++){
            if(this.tags[i])
            this.recenttags[i]=this.tags[i].name;
          }
          // console.log(this.lists)
          resolve(true);
        },
        (error) => {
          resolve(false);
        }
      );
    });
 }
 selectTag(event: any, tag: any) {
  if (event) {
    this.selectedTags.push(tag);
  } else {
    const index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    }
  }
  // console.log(this.selectedContacts)
}

selectAllTags(event: any) {
  // console.log(event)
  if(event){
  this.pagetags=this.pagetags.map((ele:any)=>{ele.selected = true; return ele;});
  }
  else{
    this.pagetags=this.pagetags.map((ele:any)=>{ele.selected = false; return ele;});
  }
  this.selectedTags = event ? [...this.pagetags] : [];
  // console.log(this.selectedContacts)
}

deleteSelectedTags(tags:any) {
  this._tagService.deleteselectedtags({tags:tags}).subscribe((resp:any) => {
    if(resp.success) 
    this.getpagetags({pageIndex:0,pageSize:20});
    this.resetselecteddata();
    this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
  });
}

resetselecteddata(){
  this.pagetags=this.pagetags.map((ele:any)=>{ele.selected = false; return ele;});
  this.checked_selected=false;
  this.selectedTags=[];
  this.searchInp = ''; 
  this.filterInp = 'name DESC';
  this.paginator.pageIndex = 0;
  this.paginator.pageSize =20;
}
}
