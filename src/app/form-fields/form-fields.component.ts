import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FieldService } from '../_services/_builder/field.service';

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
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    public _field: FieldService,
    ) { 
    }

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
    console.log(obj)
    // this._field.searchFieldsquery(obj).subscribe((resp:any)=>{
    //   this.adjustdata(resp.data);
    //   console.log(resp.data)
    // });
  }
  adjustdata(data:any){
    this._field.fields = data;
    this.fetching = false;
  }
}
