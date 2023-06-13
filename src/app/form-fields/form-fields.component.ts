import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SelectionModel } from '@angular/cdk/collections';
import { FormFieldsService } from '../_services/_builder/form-fields.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css', '../form-builder/form-builder.component.css','../builder/material.component.css']
})
export class FormFieldsComponent implements OnInit {

  fetching:boolean = true;
  delfield:any;
  constructor(
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    public _formfields:FormFieldsService,
    private _snackBar: MatSnackBar,
    ) { 
      this.getallformfields();
    }

  ngOnInit(): void {
  }
  getallformfields(){
    this._formfields.allformfields().subscribe((data:any)=>{
      this._formfields.fields=data.data;
      console.log(this._formfields.fields);
    })
  }

  openDialog(templateRef: TemplateRef<any>, field: any) {
      this.closeBottomSheet();
      this._formfields.selField = field;
      this.dialog.open(templateRef);
  }
  openDialog1(templateRef: TemplateRef<any>,obj:any): void {
    this.delfield = obj.uniqueid;
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
  addField() {
    var temp = JSON.parse(JSON.stringify(this._formfields.selField));
    console.log(temp);
    this._formfields.fields.push(temp);
    this._formfields.addField(temp).subscribe((data:any)=>{
      if(data.success==1){
        this.getallformfields();
      }
    })
  }
  deleteformfield(){
    console.log(this.delfield)
    let obj={uniqueid:this.delfield};
    this._formfields.deleteformfield(obj).subscribe((data:any)=>{
      if(data.success==1){
        this.getallformfields();
        this._snackBar.open("Form Field Deleted Succesfully","Ok",{duration:2000});
        
      }
    });
  }
}
