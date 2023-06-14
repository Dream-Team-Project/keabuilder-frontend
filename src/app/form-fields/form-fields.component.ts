import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormFieldsService } from '../_services/_crmservice/form-fields.service';
import { GeneralService } from '../_services/_builder/general.service';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css', '../builder/material.component.css']
})
export class FormFieldsComponent implements OnInit {

  @ViewChild('fieldsetting') fieldsetting!: TemplateRef<any>;

    fieldTypes:Array<any> = [
      { name: 'email', label: 'Email 2', type: 'email', placeholder: 'Email Address', icon: '<i class="fas fa-envelope"></i>', value: '', required: true },
      { name: 'phone', label: 'Phone 2', type: 'tel', placeholder: 'Phone Number', icon: '<i class="fas fa-phone"></i>', value: '', required: false },
      { name: 'short-text', label: 'Short Text', type: 'text', field_tag: '', placeholder: 'Short Text', icon: '<i class="fas fa-text-width"></i>', value: '', required: false},
      { name: 'long-text', label: 'Long Text', type: 'textarea', field_tag: '', placeholder: 'Long Text', icon: '<i class="fas fa-text-height"></i>', value: '', required: false},
      { name: 'multiple-choice', label: 'Multiple Choice', field_tag: '', type: 'checkbox', icon: '<i class="far fa-check-square"></i>', value: '', required: false, options: [
          { value: 'First option', type: 'checkbox-option', selected: false},
          { value: 'Second option', type: 'checkbox-option', selected: false },
          { value: 'Third option', type: 'checkbox-option', selected: false },
        ] },
      { name: 'single-choice', label: 'Single Choice', field_tag: '', type: 'radio', icon: '<i class="far fa-dot-circle"></i>', value: '', required: false, options: [
          { value: 'First option', type: 'radio-option', selected: false },
          { value: 'Second option', type: 'radio-option', selected: false },
          { value: 'Third option', type: 'radio-option', selected: false },
        ] },
      { name: 'dropdown', label: 'Dropdown', field_tag: '', type: 'select', placeholder: 'Choose Option', icon: '<i class="far fa-list-alt"></i>', value: 'none', required: false, options: [
        { value: 'First option', type: 'select-option', selected: false },
        { value: 'Second option', type: 'select-option', selected: false },
        { value: 'Third option', type: 'select-option', selected: false },
      ] },
      { name: 'number', label: 'Number', field_tag: '', type: 'number', placeholder: 'Number', icon: '<i class="fas fa-hashtag"></i>', value: '', required: false},
      { name: 'date', label: 'Date', field_tag: '', type: 'date', icon: '<i class="far fa-calendar-alt"></i>', value: '', required: false},
      { name: 'time', label: 'Time', field_tag: '', type: 'time', icon: '<i class="far fa-clock"></i>', value: '', required: false},
    ];
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
    console.log(obj);
    this._formfieldService.searchFieldsquery(obj).subscribe((resp:any)=>{
      this.adjustdata(resp.data);
    });
  }

  setField(field:any) {
    this.field_error = '';
    var tempObj = JSON.parse(JSON.stringify(field));
    tempObj.options = tempObj.options ? JSON.stringify(tempObj.options) : null;
    tempObj.field_tag = '%'+field.label.toUpperCase().replaceAll(' ', '_')+'%';
    tempObj.required = tempObj.required ? 1 : 0;
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

  deleteField(field:any) {
    this._formfieldService.deleteformfield(field.id).subscribe((resp:any)=>{
      if(resp.success) this.fetchFields();
      this._general.openSnackBar(!resp.success, resp.message, 'OK', 'center', 'top');
    })
  }

  onSelChng(val:boolean, field:any, i:number) {
    if(field.name != 'checkbox') {
      var temp = JSON.stringify(field.options);
      temp = temp.replace(/"selected":true/g, '"selected":false');
      field.options = JSON.parse(temp);
      field.options[i].selected = val;
    }
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

  isPlaceholder(field:any) {
    return (!field.options && field.type != 'date'  && field.type != 'time') || field.type == 'select';
  }
}
