import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutomationService } from 'src/app/_services/_builder/automation.service';

@Component({
  selector: 'app-crm-automation-workflow',
  templateUrl: './automation-workflow.component.html',
  styleUrls: ['./automation-workflow.component.css', '../automation-builder/automation-builder.component.css', '../../material.component.css']
})
export class CrmAutomationWorkflowComponent implements OnInit {
  
  @Input ('nodes') nodes:any = '';
  @Input ('acti') acti:number = -1;
  @Input ('action') action:any = '';
  @Input ('activeActions') activeActions:any[] = [];
  @Output('openActionSheet') openActionSheet: EventEmitter<any> = new EventEmitter();
  @Output('selectAction') selectAction: EventEmitter<any> = new EventEmitter();

  constructor(
    public _automation: AutomationService) { }

  ngOnInit(): void {
  }

  setNode(nodeArr:any) {
    if(nodeArr) this._automation.nodeActions = nodeArr;
    else this._automation.nodeActions = null;
  }

  openNodeActionSheet(nodeArr:any, index:number) {
    this.setNode(nodeArr);
    this.openActionSheet.emit(index);
  }

  selectActionEmit(nodeArr:any, action:any, index:number) {
    this.setNode(nodeArr);
    let obj = {action: action, index: index};
    this.selectAction.emit(obj);
  }
}
