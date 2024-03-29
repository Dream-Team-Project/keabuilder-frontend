import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FieldService } from 'src/app/_services/_crm/field.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-crm-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.css']
})
export class CrmFieldsComponent implements OnInit {

  @Input ('field_list') field_list:boolean = true;
  @Output ('fetch_fields') fetch_fields: EventEmitter<any> = new EventEmitter();
  @ViewChild('fieldsetting') fieldsetting!: TemplateRef<any>;
  @ViewChild('fieldlists') fieldlists!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;


    fieldTypes:Array<any> = this._field.fieldTypes;
    fields:Array<any> = this._field.defaultFields;
    fetching:boolean = true;
    selField:any = '';
    field_error:string = '';
    isCopied:boolean = false;
    fieldslength:any;
    pagefields:any;
    selectedFields: any[] = [];
    checked_selected=false;
    filterInp : any = '';
    searchInp : any = ''; 
    sortInp : any = 'name DESC';


  constructor(
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private _field: FieldService,
    private _general: GeneralService
    ) { 
    }

  ngOnInit(): void {
    if(this.field_list)  this.getpagefields({pageIndex:0,pageSize:20});
    // this.fetchFields();
  }

  adjustdata(data:any){
    if(data) this.pagefields = data;
    else this.searchInp='';
    this.fetching = false;
  }

  getpagefields(event:any){
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
      this._field.getpagefields(obj).subscribe(
        (data:any) => {
          this.fields = data?.data;
          this.fetch_fields.emit(data?.data);
          this.adjustdata(data?.data);
          this.fieldslength=data?.fields;
          this.fetching = false;
          // console.log(this.lists)
    });
 }
 toggleSort(column: string): void {
  // console.log(column)
  if (this.sortInp.includes(column)) {
    this.sortInp = this.sortInp.endsWith('ASC') ? `${column} DESC` : `${column} ASC`;
  } else {
    this.sortInp = `${column} ASC`;
  }
  this.searchFields(this.searchInp, this.sortInp, this.filterInp);
}
  searchFields(search: any, sort: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search,
      sort: sort,
      filter: filter,
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 20,
    }
    this._field.searchFields(obj).subscribe((resp:any)=>{
      this.adjustdata(resp.data);
    });
  }

  getFieldTag(field:any) {
    return '%'+field.label.toUpperCase().replaceAll(' ', '_')+'%';
  }

  setField(field:any) {
    if(field.label) {
      this.field_error = '';
      delete field.error;
      var tempObj = JSON.parse(JSON.stringify(field));
      tempObj.options = tempObj.options ? JSON.stringify(tempObj.options) : null;
      tempObj.field_tag = this.getFieldTag(field);
      if(field.id) this.updateField(tempObj);
      else this.addField(tempObj);
    }
    else this.setError('Field lable should not be empty');
  }

  addField(field:any) {
    this._field.addfield(field).subscribe((resp:any)=>{
      if(resp.success) {
        this.getpagefields({pageIndex:0,pageSize:20});
        this._general.openSnackBar(false, 'Field has been saved', 'OK', 'center', 'top');
      }
      else this.setError(resp.message);
    });
  }

  updateField(field:any) {
    this._field.updatefield(field).subscribe((resp:any)=>{
      if(resp.success) {
        this.getpagefields({pageIndex:0,pageSize:20});
        this._general.openSnackBar(false, 'Field has been updated', 'OK', 'center', 'top');
      }
      else this.setError(resp.message);
    });
  }

  setError(msg:string) {
    this.field_error = msg;
    this.selField.error = true;
    this.openDialog(this.fieldsetting, this.selField);
  }

  toggleRequired(field:any) {
    var stus = field.required ? 'required' : 'not required';
    this._field.updatefield(field).subscribe((resp:any)=>{
      this._general.openSnackBar(false, 'Field changed to '+stus, 'OK', 'center', 'top');
    });
  }

  deleteField(field:any) {
    this._field.deletefield(field.id).subscribe((resp:any)=>{
      if(resp.success) this.getpagefields({pageIndex:0,pageSize:20});
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    })
  }

  onSelChng(val:boolean, field:any, i:number) {
    if(field.type != 'checkbox') {
      var temp = JSON.stringify(field.options);
      temp = temp.replace(/"selected":true/g, '"selected":false');
      field.options = JSON.parse(temp);
      field.options[i].selected = val;
    }
    var valArr = field.options.filter((v:any)=> v.selected);
    field.value = valArr.map((v:any)=> v.value).join(', ');
  }

  addInput(options:any, i:number) {
    var obj:any = new Object();
    var len =  options.length;
    obj = { value: 'New option '+len, type: options[0].type};
    obj.id = this._general.createBlockId(obj);
    options.splice(i+1, 0, obj);
  }

  removeInput(options: any, i: number) {
    options.splice(i, 1);
  }

  // dialogs

  openDialog(templateRef: TemplateRef<any>, field: any) {
    if(!field.error) {
      this.closeBottomSheet();
      this.field_error = '';
      delete field.error;
      var tempObj = JSON.parse(JSON.stringify(field));
      if(tempObj.options && tempObj.id) tempObj.options = JSON.parse(tempObj.options);
      this.selField = tempObj;
    }
    this.dialog.open(templateRef);
  }
  
  openBottomSheet(): void {
    this._bottomSheet.open(this.fieldlists);
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
   
  }

  itemDropped(event: CdkDragDrop<any[]>) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  isDefaultVal(field:any) {
    return !field.options && field.type != 'date' && field.type != 'time';
  }

  isPlaceholder(field:any) {
    return (!field.options && field.type != 'date'  && field.type != 'time') || field.type == 'select';
  }

  textCopied(e:any) {
    this.isCopied = true;
    setTimeout(()=>this.isCopied = false, 1000)
  }


 selectFields(event: any, obj: any) {
  if (event) {
    this.selectedFields.push(obj);
  } else {
    const index = this.selectedFields.indexOf(obj);
    if (index !== -1) {
      this.selectedFields.splice(index, 1);
    }
  }
  // console.log(this.selectedFields)
}

selectAllFields(event: any) {
  // console.log(event)
  if(event){
  this.pagefields.map((ele:any) => {
    if(!ele?.default_field) { 
      ele.selected = true; 
      this.selectedFields.push(ele)
    }
  });
  }
  else{
    this.pagefields.map((ele:any)=>{
      if(!ele?.default_field) { 
        ele.selected = false;
        this.selectedFields=[]
        }
    });
  }
  // this.selectedFields = event ? [...this.pagefields] : [];
  // console.log(this.selectedFields)
}

deleteSelectedFields(obj:any) {
  this._field.deleteselectedfields({fields:obj}).subscribe((resp:any) => {
    if(resp.success) 
    this.getpagefields({pageIndex:0,pageSize:20});
    this.resetselecteddata();
    this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
  });
}

resetselecteddata(){
  this.pagefields=this.pagefields.map((ele:any)=>{ele.selected = false; return ele;});
  this.checked_selected=false;
  this.selectedFields=[];
  this.filterInp = '';
  this.searchInp = ''; 
  this.sortInp = 'name DESC';
  this.paginator.pageIndex = 0;
  this.paginator.pageSize =20;

}

}
