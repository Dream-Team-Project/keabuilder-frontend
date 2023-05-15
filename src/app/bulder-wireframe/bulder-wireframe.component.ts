import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { SectionService } from '../_services/_builder/section.service';
import { RowService } from '../_services/_builder/row.service';
import { ColumnService } from '../_services/_builder/column.service';
import { ElementService } from '../_services/_builder/element.service';
import { StyleService } from '../_services/_builder/style.service';
import { GeneralService } from '../_services/_builder/general.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'app-bulder-wireframe',
  templateUrl: './bulder-wireframe.component.html',
  styleUrls: ['./bulder-wireframe.component.css']
})
export class BulderWireframeComponent implements OnInit, AfterViewInit {

  @Output('dialogToggle') dialogToggle: EventEmitter<any> = new EventEmitter();
  @Output('wfpos') wfpos: EventEmitter<any> = new EventEmitter();
  @Output('saveastemp') saveastemp: EventEmitter<any> = new EventEmitter();
  @ViewChildren(CdkDropList)
  public dlq: QueryList<CdkDropList>[] = [];
  public sectionConnect: CdkDropList[] = [];
  public rowConnect: CdkDropList[] = [];
  public columnConnect: CdkDropList[] = [];
  public elementConnect: CdkDropList[] = [];
  wfposStart:boolean = false;
  colDragRow:any;
  colDropRow:any;

  DialogParentToggle:boolean = false;
    
  constructor(
        // builder services start
        public _style: StyleService,
        public _section: SectionService,
        public _row: RowService,
        public _column: ColumnService,
        public _element: ElementService,
        public _general: GeneralService,
        // builder services end
  ) {
    _section.builderCDKMethodCalled$.subscribe(() => {
      setTimeout((e:any)=>{
        this.setDragDrop();
      })
    });
   }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  wfposToggle() {
    this.wfposStart = !this.wfposStart;
    this.wfpos.emit(this.wfposStart ? 'start' : 'end');
  }

  verifyDrop(drag?: CdkDrag, drop?: CdkDropList) {
    return true;
    // return drop?.data.length != 6;
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      if(this.colDragRow && this.colDropRow) {
        this._column.resizeColumn(this.colDragRow);
        this._column.resizeColumn(this.colDropRow);
        this.colDragRow = '';
        this.colDropRow = '';
      }
    }
    this._section.savePageSession();
  } 

  setDragDrop() {
    let secdls: CdkDropList[] = [];
    let coldls: CdkDropList[] = [];
    let rowdls: CdkDropList[] = [];
    let eledls: CdkDropList[] = [];

    this.dlq.forEach((dl:any) => {
      switch(dl.id.split('-')[0]) {
      case 'elementgroup': 
        eledls.push(dl);
      break;
      case 'columngroup':
        coldls.push(dl);
      break;
      case 'rowgroup':
        rowdls.push(dl);
      break;
      default:
        secdls.push(dl);
      }
    });

    secdls = secdls.reverse();
    rowdls = rowdls.reverse();
    coldls = coldls.reverse();
    eledls = eledls.reverse();

    asapScheduler.schedule(() => { this.sectionConnect = secdls; });
    asapScheduler.schedule(() => { this.rowConnect = rowdls; });
    asapScheduler.schedule(() => { this.columnConnect = coldls; });
    asapScheduler.schedule(() => { this.elementConnect = eledls; });
  }  

  openDialog(e:any) {
    this.dialogToggle.emit(true);
  }

  sectionActivated(section:any) {
    document.getElementById(section.id)?.scrollIntoView();
  }
}
