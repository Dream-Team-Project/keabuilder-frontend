import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RowService {
  selectedRow:any = '';
  rowObj = {id: 0, type: 'row', columnArr: [], setting: false, columnSetting: true, rowSize: '', style: ''};
  selectedSectionRows = [];
  allBlocksIds:Array<number> = [];
  row_index:number = 0;
  columnObj = {id: 0, type: 'column', elementArr: [], name: '', chngName: false, style: '', };
  rowTypes:Array<any> = [{cls: '1', appendCls: 'full', nofcolumn: 1}, {cls: '1-2', appendCls: 'half', nofcolumn: 2}, {cls: '1-3', appendCls: 'three', nofcolumn: 3}, 
  {cls: '1-4', appendCls: 'four', nofcolumn: 4}, {cls: '1-5', appendCls: 'five', nofcolumn: 5}, {cls: '1-6', appendCls: 'six', nofcolumn: 6}, 
  {cls: '40-60', appendCls: 'f-s', nofcolumn: 2}, {cls: '60-40', appendCls: 's-f', nofcolumn: 2}, {cls: '25-75', appendCls: 'tf-sf', nofcolumn: 2},
  {cls: '75-25', appendCls: 'sf-tf', nofcolumn: 2}, {cls: '20-80', appendCls: 't-e', nofcolumn: 2}, {cls: '80-20', appendCls: 'e-t', nofcolumn: 2}, 
  {cls: '10-90', appendCls: 't-n', nofcolumn: 2}, {cls: '90-10', appendCls: 'n-t', nofcolumn: 2}, {cls: '30-40-30', appendCls: 't-f-t', nofcolumn: 3}, 
  {cls: '20-60-20', appendCls: 't-s-t', nofcolumn: 3}, {cls: '15-70-15', appendCls: 'ft-s-ft', nofcolumn: 3}, {cls: '10-80-10', appendCls: 't-e-t', nofcolumn: 3},
  {cls: '30-30-40', appendCls: 't-t-f', nofcolumn: 3}, {cls: '40-30-30', appendCls: 'f-t-t', nofcolumn: 3}, {cls: '20-20-60', appendCls: 't-t-s', nofcolumn: 3}, 
  {cls: '60-20-20', appendCls: 's-t-t', nofcolumn: 3}, {cls: '15-15-70', appendCls: 'ft-ft-s', nofcolumn: 3}, {cls: '70-15-15', appendCls: 's-ft-ft', nofcolumn: 3}, 
  {cls: '10-10-80', appendCls: 't-t-e', nofcolumn: 3}, {cls: '80-10-10', appendCls: 'e-t-t', nofcolumn: 3}];

  constructor() {
    var num = 0;
    this.rowTypes.forEach(item=>{
      item.nofcolumn = Array(item.nofcolumn).fill(num++).map((i)=> {
        return i;
      });
    })
  }

  addRow(rowSize: string, column: any[]) {
    if(!this.selectedRow) {
    var tempObj = JSON.parse(JSON.stringify(this.rowObj));
      for(var i=0; i<column.length; i++) {
        tempObj.columnArr.push(this.createColumn(rowSize,i));
      }
      tempObj.rowSize = rowSize;
      this.appendRow(this.selectedSectionRows, tempObj, this.row_index);
      this.row_index = 0;
    }
    else {
      this.selectedRow.columnArr = [];
      for(var i=0; i<column.length; i++) {
        this.selectedRow.columnArr.push(this.createColumn(rowSize,i));
      }
      this.selectedRow.rowSize = rowSize;
      this.selectedRow = '';
    }
  }

  appendRow(rowArr: any[], tempObj: { id: any; }, index: number) {
    tempObj.id = this.createBlockId(tempObj);
    rowArr.splice(index+1, 0, tempObj);
    if(rowArr[index+1] != undefined) {
        rowArr[index+1].columnArr.forEach((item: { id: any; elementArr?: any; })=>{
          item.id = this.createBlockId(item);
          item.elementArr.forEach((item2: { id: any; })=>{
            item2.id = this.createBlockId(item2);
          })
      })
    }
  }

  createColumn(rowSize: string, i: number) {
    var width = rowSize.split('-');
    var tempObj = JSON.parse(JSON.stringify(this.columnObj));
    tempObj.id = this.createBlockId(tempObj);
    tempObj.width = width.length > 3 ? width[i+1] : 'equal';
    return tempObj;
  }

  createBlockId(temp: { id: number; }):any {
    temp.id = Math.floor(Math.random() * 10000000000);
    if(this.allBlocksIds.includes(temp.id)) {
      return this.createBlockId(temp);
    }
    this.allBlocksIds.push(temp.id);
    return temp.id;
  }
}
