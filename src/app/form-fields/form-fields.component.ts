import { Component, OnInit, TemplateRef } from '@angular/core';
import { FieldService } from '../_services/_builder/field.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css', '../form-builder/form-builder.component.css','../builder/material.component.css']
})
export class FormFieldsComponent implements OnInit {

  fetching:boolean = true;
  selField:any = '';
  selFieldIndx = -1;

  constructor(
    public _field: FieldService,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
    ) { }

  ngOnInit(): void {
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
    // this._file.searchformquery(obj).subscribe((resp:any)=>{
    //   this.adjustdata(resp.data);
    // });
  }

}
