import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RowService {

  distroyDialogue = new Subject<any>();
  selectedRow:any = '';
  rowObj:any = {id: '', type: 'row', columnArr: [], setting: false, columnSetting: true, rowSize: '', style: '', columnGap: 0};
  selectedSectionRows = [];
  row_index:number = 0;
  columnObj:any = {id: '', type: 'column', elementArr: [], name: '', chngName: false, style: '', };
  rowTypes:Array<any> = [{cls: '1', appendCls: 'full', nofcolumn: 1}, {cls: '1-2', appendCls: 'half', nofcolumn: 2}, {cls: '1-3', appendCls: 'three', nofcolumn: 3}, 
  {cls: '1-4', appendCls: 'four', nofcolumn: 4}, {cls: '1-5', appendCls: 'five', nofcolumn: 5}, {cls: '1-6', appendCls: 'six', nofcolumn: 6}, 
  {cls: '40-60', appendCls: 'f-s', nofcolumn: 2}, {cls: '60-40', appendCls: 's-f', nofcolumn: 2}, {cls: '25-75', appendCls: 'tf-sf', nofcolumn: 2},
  {cls: '75-25', appendCls: 'sf-tf', nofcolumn: 2}, {cls: '20-80', appendCls: 't-e', nofcolumn: 2}, {cls: '80-20', appendCls: 'e-t', nofcolumn: 2}, 
  {cls: '10-90', appendCls: 't-n', nofcolumn: 2}, {cls: '90-10', appendCls: 'n-t', nofcolumn: 2}, {cls: '30-40-30', appendCls: 't-f-t', nofcolumn: 3}, 
  {cls: '20-60-20', appendCls: 't-s-t', nofcolumn: 3}, {cls: '15-70-15', appendCls: 'ft-s-ft', nofcolumn: 3}, {cls: '10-80-10', appendCls: 't-e-t', nofcolumn: 3},
  {cls: '30-30-40', appendCls: 't-t-f', nofcolumn: 3}, {cls: '40-30-30', appendCls: 'f-t-t', nofcolumn: 3}, {cls: '20-20-60', appendCls: 't-t-s', nofcolumn: 3}, 
  {cls: '60-20-20', appendCls: 's-t-t', nofcolumn: 3}, {cls: '15-15-70', appendCls: 'ft-ft-s', nofcolumn: 3}, {cls: '70-15-15', appendCls: 's-ft-ft', nofcolumn: 3}, 
  {cls: '10-10-80', appendCls: 't-t-e', nofcolumn: 3}, {cls: '80-10-10', appendCls: 'e-t-t', nofcolumn: 3}];

  constructor(private _general: GeneralService) {
    var num = 0;
    this.rowTypes.forEach(item=>{
      item.nofcolumn = Array(item.nofcolumn).fill(num++).map((i)=> {
        return i;
      });
    })
  }

  getDialogueEvent():Observable<any> {
    return this.distroyDialogue.asObservable();
  }

  addRow(rowSize: string, column: any[]) {
    if(!this.selectedRow) {
      var tempObj = JSON.parse(JSON.stringify(this.rowObj));
      // console.log(column);
      for(var i=0; i<column.length; i++) {
        tempObj.columnArr.push(this.createColumn(rowSize,i));
      }
      tempObj.rowSize = rowSize;
      console.log(this.selectedSectionRows);
      this.appendRow(this.selectedSectionRows, tempObj, this.row_index);
      this.row_index = 0;
    }
    else {
      this.selectedRow.columnArr = [];
      for(var i=0; i<column.length; i++) {
        this.selectedRow.columnArr.push(this.createColumn(rowSize,i));
      }
      this.selectedRow.rowSize = rowSize;
    }
    this.selectedRow = '';
    this.distroyDialogue.next(void 0);
  }

  duplicateRow(rowArr: any[], row: any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(row));
    this.appendRow(rowArr, tempObj, index);
  }

  deleteRow(rowArr: any[], index: any) {
    console.log(index);
    rowArr.splice(index, 1);
  }    

  appendRow(rowArr: any[], tempObj: any, index: number) {
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.setting = false;
    rowArr.splice(index+1, 0, tempObj);
    if(rowArr[index+1] != undefined) {
        rowArr[index+1].columnArr.forEach((item: { id: any; elementArr?: any; })=>{
          item.id = this._general.createBlockId(item);
          item.elementArr.forEach((item2: { id: any; })=>{
            item2.id = this._general.createBlockId(item2);
          })
      })
    }
  }

  createColumn(rowSize: string, i: number) {
    var width = rowSize.split('-');
    var tempObj = JSON.parse(JSON.stringify(this.columnObj));
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.width = width.length > 3 ? width[i+1] : 'equal';
    return tempObj;
  }
}
