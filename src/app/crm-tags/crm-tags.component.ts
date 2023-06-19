import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagService } from '../_services/_crm/tag.service';
import { GeneralService } from '../_services/_builder/general.service';

export interface UserData {
  position: number;
  tag_name: string;
  contacts: string;
  automations: string;
  actions: string;
}

@Component({
  selector: 'app-crm-tags',
  templateUrl: './crm-tags.component.html',
  styleUrls: ['./crm-tags.component.css'],
})
export class CrmTagsComponent implements OnInit {
  displayedColumns: string[] = [
    'checkbox',
    'tag_name',
    'contacts',
    'automations',
    'actions',
  ];
  @ViewChild('adddialog') adddialog!: TemplateRef<any>;

  fetching:boolean = true;
  tags:any=[];
  tag:any = {};
  tagObj = {
    tag_name: '',
    uniqueid: '',
    id:'',
    
  }
  hasError:string = '';
  filteredtags: any = [];
  temptags: any = [];
 populartags:any=[];
 recenttags:any=[];
  

 
  constructor(private _tagService: TagService,private dialog: MatDialog,private _general: GeneralService) {};

  ngOnInit(): void {
    this.fetchtags().then((resp1) => {
      console.log(resp1)
    this.sortTagcontacts().then((resp2:any) => {
      console.log(resp2)
          for(let i=0;i<5;i++){
            if(resp2[i])
            this.populartags[i]=resp2[i].tag_name;
          }
          this.fetching = false;  
    })
    })
  }
 
  fetchtags() {
    return new Promise((resolve) => {
      this._tagService.fetchtags().subscribe(
        (data) => {
          this.tags = data.data;
          let i=0;
          for(i=0;i<5;i++){
            if(this.tags[i])
            this.recenttags[i]=this.tags[i].tag_name;
          }
          resolve(true);
        },
        (error) => {
          resolve(false);
        }
      );
    });
  }
  sortTagcontacts() {
    return new Promise((resolve) => {
      var newtags=JSON.parse(JSON.stringify(this.tags));
      newtags.sort((a:any,b:any) =>a.activecontacts<b.activecontacts ? 1 :-1);
        resolve(newtags);
      },
      );
  }
  addtag() {
    if(this.tag.tag_name && this.isTagNameValid(this.tag.tag_name)) {
      this.hasError = '';
      delete this.tag.error;
      this._tagService
        .addtag(this.tag)
        .subscribe((resp) => {
          if(resp.success==true){
            this.fetchtags();
            this._general.openSnackBar(false, 'Tag has been saved', 'OK', 'center', 'top');
            }
            else this.setError(resp.message);
          })
        }
        else {
          let msg = this.tag.tag_name ? 'Tag Name is  invalid' : 'Tag Name should not be empty';
          this.setError(msg)
        }
  }

  updatetag() {
    if(this.tag.tag_name && this.isTagNameValid(this.tag.tag_name)) {
      console.log(this.tag)
      this._tagService.updatetag(this.tag).subscribe((resp) => {
        console.log(resp.data)
        if(resp.success==true){
          this.fetchtags();
        this._general.openSnackBar(false, 'Tag has been Updated', 'OK', 'center', 'top');
        }
        else this.setError(resp.message);
      })
    }
    else {
      let msg = this.tag.tag_name ? 'Tag Name is  invalid' : 'Tag Name should not be empty';
      this.setError(msg)
    }
  }
 
  // copycrmTag(tag: any) {
  //   // this.crmlistForm.patchValue(list);
  //   console.log(tag);
  //   this._crmtagService.createcrmtag(tag).subscribe((data) => {
  //     this.crmtagForm.reset();
  //     // this.hidepopupsidebar();
  //     this.ngOnInit();
  //     this._snackBar.open('CRM Tag Copied Succesfully !', 'OK');
  //   });
  // }

  
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
      if(resp.success) this.fetchtags();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    });

  }

  setError(msg:string) {
    this.hasError = msg;
    this.tag.error = true;
    this.openDialog(this.adddialog, this.tag);
  }
  isTagNameValid(value:any) {
    let regex =/^[\w-_.]{4,}$/
    return regex.test(value);
  }
  searchTags(search: any,filter: any) {
    var obj = {
      search:search.value,
      filter:filter.value
    }
    console.log(obj);
    this._tagService.searchtags(obj).subscribe((data:any)=>{
      // console.log(data.data)
      this.tags = data.data;
    });
  }
}
