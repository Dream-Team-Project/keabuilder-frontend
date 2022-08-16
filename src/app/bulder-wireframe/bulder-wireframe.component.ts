import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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

  @ViewChildren(CdkDropList)
  public dlq: QueryList<CdkDropList>[] = [];
  
  public secdls: CdkDropList[] = [];
  public coldls: CdkDropList[] = [];
  public rowdls: CdkDropList[] = [];
  public eledls: CdkDropList[] = [];

  get = false
  DialogParentToggle:boolean = false;
  navtimeStyle:any = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '32px',
    height: '32px'
  }
  
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

  ngAfterViewInit(): void {
  }

  verifyDrop(drag?: CdkDrag, drop?: CdkDropList) {
    return drop?.data.length != 6;
  };

  setDragDrop() {
    let secldls: CdkDropList[] = [];
    let colldls: CdkDropList[] = [];
    let rowldls: CdkDropList[] = [];
    let eleldls: CdkDropList[] = [];
    this.dlq.forEach((dl:any) => {
      if(dl.id.split('-')[0] == 'elegroup') {
        eleldls.push(dl);
      }
      else if(dl.id.split('-')[0] == 'colgroup') {
        colldls.push(dl);
      }
      else if(dl.id.split('-')[0] == 'rowgroup') {
        rowldls.push(dl);
      }
      else {
        secldls.push(dl);
      }
    });

    secldls = secldls.reverse();
    colldls = colldls.reverse();
    rowldls = rowldls.reverse();
    eleldls = eleldls.reverse();

    asapScheduler.schedule(() => { this.secdls = secldls; });
    asapScheduler.schedule(() => { this.coldls = colldls; });
    asapScheduler.schedule(() => { this.rowdls = rowldls; });
    asapScheduler.schedule(() => { this.eledls = eleldls; });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this._section.savePageSession();
  }  

  ngOnInit(): void {
  }

  openDialog(e:any) {
    this.DialogParentToggle = !this.DialogParentToggle;
  }
}
