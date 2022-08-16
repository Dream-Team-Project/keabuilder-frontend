import { Injectable } from '@angular/core';
import { RowService } from './row.service';
import { GeneralService } from './general.service';
import { SectionService } from './section.service';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  selectedColumn:any = '';
  constructor(private _general: GeneralService, private _row: RowService, private _section: SectionService) { }

  filterCls(row: { columnArr: any[]; rowSize: string; }) {
    var rowCls = 'kb-';
    row.columnArr.forEach(item=>{
      if(item.width != 'equal') {
        rowCls = rowCls + item.width + '-';
      }
    })
    rowCls != 'kb-' ? row.rowSize = rowCls + 'block' : '';
    this._section.savePageSession();
  }

  resizeColumn(columns: any[]) {
    this._row.selectedRow.rowSize = 'kb-'+this._row.rowTypes[columns.length-1].appendCls+'-block';
    columns.forEach((item: { width: string; })=>item.width='equal');
  }

  addColumn(rowSize: any, index: any) {
    var tempObj = this._row.createColumn(rowSize, index);
    this.appendColumn(tempObj, index);
  }

  duplicateColumn(column: any, index: any) {
    this.appendColumn(column, index);
  }

  deleteColumn(columns: any[], index: any) {
      columns.splice(index, 1);
      this.resizeColumn(columns);
      this._section.savePageSession();
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
    this._section.savePageSession();
  }
}


