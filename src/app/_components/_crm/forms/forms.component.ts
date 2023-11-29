import { Component, ElementRef, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ImageService } from 'src/app/_services/image.service';
import { ListService } from 'src/app/_services/_crm/list.service';
import { TagService } from 'src/app/_services/_crm/tag.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-crm-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class CrmFormsComponent implements OnInit {
  
  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  @ViewChild('paginator') paginator!: MatPaginator;
  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  validate = {
    name: new FormControl('',[Validators.required]),
  }
  forms:any[] = [];
  toggleview = true;
  form: any = {
    name: '',
    lists:'',
    tags:'',
    thankyoumessage: '<h2>Thankyou</h2><p>The form has been submitted successfully!</p>',
  };

  delform:any;
  nodata = true;
  fetching:boolean = true;
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
  formslength:any;
  pageforms:any;
  selectedForms: any[] = [];
  checked_selected=false;
  

  constructor(private _file: FileUploadService,
              public _image: ImageService,
              public _general: GeneralService,
              public dialog: MatDialog, 
              private _listService: ListService,
              private _tagService: TagService,
              ) {
                  this.toggleview = _general.getStorage('form_toggle');
                  this._general.getAllWebPages();
                  this._general.getAllFunnels();
               }

  ngOnInit(): void {
    this.fetchData();   
  }

  fetchData(){
    this.getpageforms({pageIndex:0,pageSize:20});
    // this.fetchForms();
      this.fetchLists();
        this.fetchTags();       
  }
  
  // fetchForms(){
  //   this.fetching = true;
  //   this._file.fetchforms().subscribe((resp:any)=>{
  //       this.adjustdata(resp.data);
  //       this.fetching = false;
  //   })
  // }

  fetchLists() {
    this.fetching = true;
      this._listService.fetchlists().subscribe(
        (data) => {
          this.lists = data.data;
          this.fetching = false;
    });
  }

  fetchTags() {
    this.fetching = true;
      this._tagService.fetchtags().subscribe(
        (data) => {
          this.tags = data.data;
          this.fetching = false;
    });
  }

  createForm(): void {
    if(!this.validate.name.invalid ){
      if(this.newtags.length>0){
        this.tagupdate().then((resp)=>{
          this.addform();
        })
      }else{
        this.addform();
      }
    }
  }

  addform(){
    this.form.lists=this.filteredTempIds.lists.toString();
    this.form.tags=this.filteredTempIds.tags.toString();
    this._file.saveform(this.form).subscribe({
      next: data => {
        var msg, err = data.success==0;
        if(err){
          msg = 'Server Error';
        }
        else {
          msg = 'Form has been successfully created!';
          this._general.redirectToBuilder(data.uniqueid, 'form');
        }
        this._general.openSnackBar(err, msg, 'OK', 'center', 'top');
      }
    }); 
  }

  rename(data:any, inp:any){
    var newname = inp.value;
    if(data.name !== newname) {
      if(newname.length>3){
        data.name = newname;
        this._file.updateform(data).subscribe({
          next: data => {
            var msg, err = data.success==0;
            if(err){
              msg = 'Server Error';
            }
            else {
              msg = 'Form name updated successfully!';
              this.getpageforms({pageIndex:0,pageSize:20});
              // this.fetchForms();
            }
            this._general.openSnackBar(err, msg, 'OK', 'center', 'top');
          }
        }); 
      }else{
      this._general.openSnackBar(true, 'Form name must be at least 3 characters!', 'OK', 'center', 'top');
        inp.value = data.name;
      }
    }
  }

  deleteform(form:any){
    form.deleting = true;
    this._file.deleteform(form.id).subscribe({
      next: data => {        
        var genscrn = 'keaimage-form-'+form.uniqueid+'-screenshot.png';
        this._file.validateimg(genscrn).subscribe({
          next: datagen => {
            if(datagen.data==1){
              this._file.deleteimage('keaimage-form-'+form.uniqueid+'-screenshot.png').subscribe({
                next: data => {
                  this._general.openSnackBar(false, 'Form Deleted Successfully!', 'OK', 'center', 'top');
                  this.getpageforms({pageIndex:0,pageSize:20});
                  // this.fetchForms();
                }
              });
            }
            else {
              this._general.openSnackBar(false, 'Form Deleted Successfully!', 'OK', 'center', 'top');
              this.getpageforms({pageIndex:0,pageSize:20});
              // this.fetchForms();
            }
          }
        });

      }
    });
  }

  openDialog(templateRef: TemplateRef<any>, form:any ): void {
    this.delform = form;
    var dialog  = this.dialog.open(templateRef);
    dialog.afterClosed().subscribe((data:any) => {
      this.validate.name.reset();
    })
  }

  duplicateform(form:any){
    var datadup = JSON.parse(JSON.stringify(form));
    datadup.olduid = form.uniqueid;
    datadup.uniqueid = this._general.makeid(20);
    var regex = new RegExp(form.uniqueid, 'g');
    var decode = this._general.decodeData(datadup.appendstyle);
    var newapsty = decode.replace(regex, datadup.uniqueid);
    datadup.appendstyle = this._general.encodeData(newapsty);
    this._file.duplicateform(datadup).subscribe({
      next: data => {
          if(data.uniqueid!=''){
            var oldimg = 'keaimage-form-'+form.uniqueid+'-screenshot.png';
            this._file.validateimg(oldimg).subscribe({
              next: datagen => {
                if(datagen.data==1){
                  var imgobj  = {oldname:oldimg, newname:'keaimage-form-'+datadup.uniqueid+'-screenshot.png'};
                  this._file.copyimage(imgobj).subscribe({
                    next: data => {
                      this.getpageforms({pageIndex:0,pageSize:20});
                      // this.fetchForms();
                      this._general.openSnackBar(false, 'Form Duplicated Successfully!', 'OK', 'center', 'top');
                    }
                  });
                }else{
                  this.getpageforms({pageIndex:0,pageSize:20});
                  // this.fetchForms();
                  this._general.openSnackBar(false, 'Form Duplicated Successfully!', 'OK', 'center', 'top');
                }
  
              }
            });
          }
      }
    });
  }

  searchForms(search: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
      pageIndex:this.paginator.pageIndex,
      pageSize:this.paginator.pageSize,
    }
    this._file.searchformquery(obj).subscribe((resp:any)=>{
      this.adjustdata(resp.data);
    });
  }

  adjustdata(data:any){
    this.fetching = false;
    // this.forms = [];
    this.pageforms=[];
    this.nodata = data.length == 0;
    this.pageforms=data
    // this.forms = data;
  }

  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('form_toggle',this.toggleview);
  }

  tagupdate() {
    return new Promise((resolve) => {
      this.newtags.forEach((tag: any, index:number) => {
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
  
  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];};

  getpageforms(event:any){
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
      this._file.getpageforms(obj).subscribe(
        (data:any) => {
          this.forms = data?.data;
          this.pageforms=data?.data;
          this.formslength=data?.forms;
          this.fetching = false;
          // console.log(this.lists)
    });
 }
 selectForms(event: any, obj: any) {
  if (event) {
    this.selectedForms.push(obj);
  } else {
    const index = this.selectedForms.indexOf(obj);
    if (index !== -1) {
      this.selectedForms.splice(index, 1);
    }
  }
  // console.log(this.selectedContacts)
}

selectAllForms(event: any) {
  // console.log(event)
  if(event){
  this.pageforms=this.pageforms.map((ele:any)=>{ele.selected = true; return ele;});
  }
  else{
    this.pageforms=this.pageforms.map((ele:any)=>{ele.selected = false; return ele;});
  }
  this.selectedForms = event ? [...this.pageforms] : [];
  // console.log(this.selectedContacts)
}

deleteSelectedForms(obj:any) {
  this._file.deleteselectedforms({forms:obj}).subscribe((resp:any) => {
    if(resp.success) 
    this.getpageforms({pageIndex:0,pageSize:20});
    this.resetselecteddata();
    this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
  });
}

resetselecteddata(){
  this.pageforms=this.pageforms.map((ele:any)=>{ele.selected = false; return ele;});
  this.checked_selected=false;
  this.selectedForms=[];
}
  
}
