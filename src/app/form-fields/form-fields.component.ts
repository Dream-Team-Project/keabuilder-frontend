import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormFieldsService } from '../_services/_crmservice/form-fields.service';
import { GeneralService } from '../_services/_builder/general.service';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css']
})
export class FormFieldsComponent implements OnInit {

  @ViewChild('fieldsetting') fieldsetting!: TemplateRef<any>;

    fieldTypes:Array<any> = this._formfieldService.fieldTypes;
    fields:Array<any> = [
      { name: 'first-name', label: 'First Name', type: 'text', field_tag: '%FIRST_NAME%', placeholder: 'First Name', icon: '<i class="fas fa-user"></i>', value: '', required: true, default_field: true },
      { name: 'last-name', label: 'Last Name', type: 'text', field_tag: '%LAST_NAME%', placeholder: 'Last Name', icon: '<i class="fas fa-user"></i>', value: '', required: true, default_field: true },
      { name: 'email', label: 'Email', type: 'email', field_tag: '%EMAIL%', placeholder: 'Email Address', icon: '<i class="fas fa-envelope"></i>', value: '', required: true, default_field: true },
      { name: 'phone', label: 'Phone', type: 'tel', field_tag: '%PHONE%', placeholder: 'Phone Number', icon: '<i class="fas fa-phone"></i>', value: '', required: true, default_field: true },
    ];
    fetching:boolean = true;
    selField:any = '';
    field_error:string = '';

  constructor(
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private _formfieldService: FormFieldsService,
    private _general: GeneralService
    ) { 
      this.fetchFields();
    }

  ngOnInit(): void {
  }

  adjustdata(data:any){
    if(data) this.fields = data;
    this.fetching = false;
  }

  fetchFields() {
    this.fetching = true;
    this._formfieldService.fetchformfields().subscribe((resp:any)=>{
      this.adjustdata(resp?.data);
    })
  }

  searchFields(search: any, sort: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      sort: sort.value,
      filter: filter.value
    }
    this._formfieldService.searchFieldsquery(obj).subscribe((resp:any)=>{
      this.adjustdata(resp.data);
    });
  }

  setField(field:any) {
    this.field_error = '';
    var tempObj = JSON.parse(JSON.stringify(field));
    tempObj.options = tempObj.options ? JSON.stringify(tempObj.options) : null;
    tempObj.field_tag = '%'+field.label.toUpperCase().replaceAll(' ', '_')+'%';
    if(field.id) this.updateField(tempObj);
    else this.addField(tempObj);
  }

  addField(field:any) {
    this._formfieldService.addformfield(field).subscribe((resp:any)=>{
      if(resp.success) {
        this.fetchFields();
        this._general.openSnackBar(false, 'Field has been saved', 'OK', 'center', 'top');
      }
      else {
        this.openDialog(this.fieldsetting, this.selField);
        this.field_error = resp.message;
      }
    });
  }

  updateField(field:any) {
    this._formfieldService.updateformfield(field).subscribe((resp:any)=>{
      if(resp.success) {
        this.fetchFields();
        this._general.openSnackBar(false, 'Field has been updated', 'OK', 'center', 'top');
      }
      else {
        this.openDialog(this.fieldsetting, this.selField);
        this.field_error = resp.message;
      }
    });
  }

  toggleRequired(field:any) {
    var stus = field.required ? 'required' : 'not required';
    this._formfieldService.updateformfield(field).subscribe((resp:any)=>{
      this._general.openSnackBar(false, 'Field changed to '+stus, 'OK', 'center', 'top');
    });
  }

  deleteField(field:any) {
    this._formfieldService.deleteformfield(field.id).subscribe((resp:any)=>{
      if(resp.success) this.fetchFields();
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
    field.value = valArr.map((v:any)=> v.value).join(',');
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
      this.closeBottomSheet();
      var tempObj = JSON.parse(JSON.stringify(field));
      if(tempObj.options && tempObj.id) tempObj.options = JSON.parse(tempObj.options);
      this.selField = tempObj;
      this.dialog.open(templateRef);
  }
  openBottomSheet(templateRef: TemplateRef<any>): void {
    this._bottomSheet.open(templateRef);
   
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
}
