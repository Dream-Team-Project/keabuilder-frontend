import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RowService } from './row.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  selectedColumn:any = '';
  rowTypes:Array<any> = [{cls: '1', appendCls: 'full', nofcolumn: 1}, {cls: '1-2', appendCls: 'half', nofcolumn: 2}, {cls: '1-3', appendCls: 'three', nofcolumn: 3}, 
  {cls: '1-4', appendCls: 'four', nofcolumn: 4}, {cls: '1-5', appendCls: 'five', nofcolumn: 5}, {cls: '1-6', appendCls: 'six', nofcolumn: 6}, 
  {cls: '40-60', appendCls: 'f-s', nofcolumn: 2}, {cls: '60-40', appendCls: 's-f', nofcolumn: 2}, {cls: '25-75', appendCls: 'tf-sf', nofcolumn: 2},
  {cls: '75-25', appendCls: 'sf-tf', nofcolumn: 2}, {cls: '20-80', appendCls: 't-e', nofcolumn: 2}, {cls: '80-20', appendCls: 'e-t', nofcolumn: 2}, 
  {cls: '10-90', appendCls: 't-n', nofcolumn: 2}, {cls: '90-10', appendCls: 'n-t', nofcolumn: 2}, {cls: '30-40-30', appendCls: 't-f-t', nofcolumn: 3}, 
  {cls: '20-60-20', appendCls: 't-s-t', nofcolumn: 3}, {cls: '15-70-15', appendCls: 'ft-s-ft', nofcolumn: 3}, {cls: '10-80-10', appendCls: 't-e-t', nofcolumn: 3},
  {cls: '30-30-40', appendCls: 't-t-f', nofcolumn: 3}, {cls: '40-30-30', appendCls: 'f-t-t', nofcolumn: 3}, {cls: '20-20-60', appendCls: 't-t-s', nofcolumn: 3}, 
  {cls: '60-20-20', appendCls: 's-t-t', nofcolumn: 3}, {cls: '15-15-70', appendCls: 'ft-ft-s', nofcolumn: 3}, {cls: '70-15-15', appendCls: 's-ft-ft', nofcolumn: 3}, 
  {cls: '10-10-80', appendCls: 't-t-e', nofcolumn: 3}, {cls: '80-10-10', appendCls: 'e-t-t', nofcolumn: 3}];
  
  constructor(private _general: GeneralService, private _row: RowService) { }

 
  createColumn(rowSize: string, i: number) {
    var width = rowSize.split('-');
    var tempObj = JSON.parse(JSON.stringify(this._row.columnObj));
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.width = width.length > 3 ? width[i+1] : 'equal';
    return tempObj;
  }

  resizeColumn(columns: any[]) {
    this._row.selectedRow.rowSize = 'kb-'+this.rowTypes[columns.length-1].appendCls+'-block';
    columns.forEach((item: { width: string; })=>item.width='equal');
  }

  appendColumn(column: any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(column));
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.name ? (tempObj.name = tempObj.name + ' (copy)') : '';
    this._row.selectedRow.columnArr.splice(index+1, 0, tempObj);
    this.resizeColumn(this._row.selectedRow.columnArr);
    if(this._row.selectedRow.columnArr[index+1] != undefined) {
      this._row.selectedRow.columnArr[index+1].elementArr.forEach((item: { id: any; })=>{
        item.id = this._general.createBlockId(item);
      })
    }
  }

  addColumn(rowSize: any, index: any) {
    var tempObj = this.createColumn(rowSize, index);
    this.appendColumn(tempObj, index);
  }

  duplicateColumn(column: any, index: any) {
    this.appendColumn(column, index);
  }

  deleteColumn(columns: any[], index: any) {
    console.log('hello');
      columns.splice(index, 1);
      this.resizeColumn(columns);
  }    
}


