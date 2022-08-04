import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormService } from '../_services/_builderService/form.service';
import { CdkDragStart, CdkDragMove, CdkDragDrop, moveItemInArray, copyArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  constructor(
    public _formS: FormService
  ) { }

  ngOnInit(): void {
  }

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this._formS.formOpt, event.previousIndex, event.currentIndex);
    } else {
      this.addField(event.item.data, event.currentIndex);
    }
  }

  addField(fieldType: string, index: number) {
    this._formS.formOpt.splice(index, 0, fieldType)
  }
  
}
