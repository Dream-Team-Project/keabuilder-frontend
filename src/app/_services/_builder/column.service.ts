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

  resizeColumn(row:any) {
    row.rowSize = 'kb-'+this._row.rowTypes[row.columnArr.length-1].appendCls+'-block';
  }

  addColumn(rowSize: any, index: any) {
    var tempObj = this._row.createColumn();
    this.appendColumn(tempObj, index);
  }

  duplicateColumn(column: any, index: any) {
    this.appendColumn(column, index);
  }

  deleteColumn(columns: any[], index: any) {
      columns.splice(index, 1);
      this.resizeColumn(this._row.selectedRow);
      this._section.savePageSession();
  }  
  
  appendColumn(column: any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(column));
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.name ? (tempObj.name += ' (copy)') : '';
    this._row.selectedRow.columnArr.splice(index+1, 0, tempObj);
    this.resizeColumn(this._row.selectedRow);
    if(this._row.selectedRow.columnArr[index+1] != undefined) {
      this._row.selectedRow.columnArr[index+1].elementArr.forEach((item: { id: any; })=>{
        item.id = this._general.createBlockId(item);
      })
    }
    this._section.savePageSession();
  }
}


