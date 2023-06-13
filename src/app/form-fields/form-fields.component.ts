import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormFieldsService } from '../_services/_crmservice/form-fields.service';
import { GeneralService } from '../_services/_builder/general.service';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css', '../form-builder/form-builder.component.css','../builder/material.component.css']
})
export class FormFieldsComponent implements OnInit {

    fieldTypes:Array<any> = [
      { name: 'email', label: 'Secondary Email', type: 'email', placeholder: 'Email Address', icon: '<i class="fas fa-envelope"></i>', value: '', required: true },
      { name: 'phone', label: 'Secondary Phone', type: 'tel', placeholder: 'Phone Number', icon: '<i class="fas fa-phone"></i>', value: '', required: false },
      { name: 'short-text', label: 'Short Text', type: 'text', tag: '', placeholder: 'Short Text', icon: '<i class="fas fa-text-width"></i>', value: '', required: false},
      { name: 'long-text', label: 'Long Text', type: 'textarea', tag: '', placeholder: 'Long Text', icon: '<i class="fas fa-text-height"></i>', value: '', required: false},
      {
        name: 'checkbox', label: 'Multiple Choice', tag: '', type: 'checkbox', icon: '<i class="far fa-check-square"></i>', value: '', required: false, split: [
          { value: 'First option', type: 'checkbox-option', selected: false},
          { value: 'Second option', type: 'checkbox-option', selected: false },
          { value: 'Third option', type: 'checkbox-option', selected: false },
        ]
      },
      {
        name: 'radio', label: 'Single Choice', tag: '', type: 'radio', icon: '<i class="far fa-dot-circle"></i>', value: '', required: false, split: [
          { value: 'First option', type: 'radio-option', selected: false },
          { value: 'Second option', type: 'radio-option', selected: false },
          { value: 'Third option', type: 'radio-option', selected: false },
        ]
      },
      { name: 'select', label: 'Select Option', tag: '', type: 'select', placeholder: 'Choose Option', icon: '<i class="far fa-list-alt"></i>', value: 'none', required: false, split: [
        { value: 'First option', type: 'select-option', selected: false },
        { value: 'Second option', type: 'select-option', selected: false },
        { value: 'Third option', type: 'select-option', selected: false },
      ] },
      { name: 'number', label: 'Number', tag: '', type: 'number', placeholder: 'Number', icon: '<i class="fas fa-hashtag"></i>', value: '', required: false},
      { name: 'date', label: 'Date', tag: '', type: 'date', icon: '<i class="far fa-calendar-alt"></i>', value: '', required: false},
      { name: 'time', label: 'Time', tag: '', type: 'time', icon: '<i class="far fa-clock"></i>', value: '', required: false},
    ];
    fields:Array<any> = [
      { name: 'first-name', label: 'First Name', type: 'text', placeholder: 'First Name', icon: '<i class="fas fa-user"></i>', value: '', required: true, default: true },
      { name: 'last-name', label: 'Last Name', type: 'text', placeholder: 'Last Name', icon: '<i class="fas fa-user"></i>', value: '', required: true, default: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Email Address', icon: '<i class="fas fa-envelope"></i>', value: '', required: true, default: true },
      { name: 'phone', label: 'Phone', type: 'tel', placeholder: 'Phone Number', icon: '<i class="fas fa-phone"></i>', value: '', required: true, default: true },
    ];
    fetching:boolean = true;
    selField:any = '';
    selFieldIndx = -1;

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

  fetchFields() {
    this._formfieldService.allformfields().subscribe((resp:any)=>{
      // if(resp?.data) this.fields = resp.data;
    })
  }

  addField(field:any) {
    var tempObj = JSON.parse(JSON.stringify(field));
    if(!tempObj.type) tempObj.type = tempObj.name;
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj?.split?.forEach((split: any) => split.id = this._general.createBlockId(split));
    this.fields.push(tempObj);
  }

  updateField(field:any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(field));
    this.fields.splice(index + 1, 0, tempObj);
  }

  deleteField(field:any) {

  }

  onSelChng(val:boolean, field:any, i:number) {
    if(field.name != 'checkbox') {
      var temp = JSON.stringify(field.split);
      temp = temp.replace(/"selected":true/g, '"selected":false');
      field.split = JSON.parse(temp);
      field.split[i].selected = val;
    }
  }

  addInput(split:any, i:number) {
    var obj:any = new Object();
    var len =  split.length;
    obj = { value: 'New option '+len, type: split[0].type};
    obj.id = this._general.createBlockId(obj);
    split.splice(i+1, 0, obj);
  }

  removeInput(split: any, i: number) {
    split.splice(i, 1);
  }

  openDialog(templateRef: TemplateRef<any>, field: any, index: number) {
      this.closeBottomSheet();
      var tempObj = JSON.parse(JSON.stringify(field));
      this.selField = tempObj;
      this.selFieldIndx = index;
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

  searchFields(search: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
    }
    console.log(obj)
    // this._field.searchFieldsquery(obj).subscribe((resp:any)=>{
    //   this.adjustdata(resp.data);
    //   console.log(resp.data)
    // });
  }
  adjustdata(data:any){
    this.fields = data;
    this.fetching = false;
  }
}
