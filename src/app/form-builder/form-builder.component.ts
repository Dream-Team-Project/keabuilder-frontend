import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormService } from '../_services/_builder/form.service';
import { CdkDragStart, CdkDragMove, CdkDragDrop, moveItemInArray, copyArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  constructor(
    public _form: FormService
  ) { }

  ngOnInit(): void {
  }

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this._form.formOpt, event.previousIndex, event.currentIndex);
    } else {
      this.addField(event.item.data, event.currentIndex);
    }
  }

  addField(field: any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(field));
    tempObj.id = this._form.createBlockId(tempObj);
    tempObj?.split?.forEach((split:any)=>{
      split.id = this._form.createBlockId(split);
      split?.subsplit?.forEach((subsplit:any)=>{
        subsplit.id = this._form.createBlockId(subsplit);
      })
    })
    this._form.formOpt.splice(index, 0, tempObj)
  }
  
}
