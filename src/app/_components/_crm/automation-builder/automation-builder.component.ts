import { Component, ElementRef, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { AutomationService } from 'src/app/_services/_builder/automation.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ImageService } from 'src/app/_services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-crm-automation-builder',
  templateUrl: './automation-builder.component.html',
  styleUrls: ['./automation-builder.component.css', '../../material.component.css']
})
export class CrmAutomationBuilderComponent implements OnInit {

  automation = {
    id: '',
    name: '',
  }
  autosave:boolean = false;
  isAction:boolean = false;
  selWf:any;
  selOption:any;
  appendIndex = -1;
  searchVal:string = '';
  workflowList:Array<any> = [];
  filteredData:Array<any> = [];

  constructor(
    public _automation: AutomationService,
    public _general: GeneralService,
    public _image: ImageService,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}

  openDialog(templateRef: TemplateRef<any>, wf:any): void {
    this.closeBottomSheet();
    this.selWf = wf;
    this.dialog.open(templateRef);
  }

  openBottomSheet(templateRef: TemplateRef<any>, isAction:boolean, index:number): void {
    this.workflowList = JSON.parse(JSON.stringify(
      isAction ? 
      this._automation.actionList :
      this._automation.triggerList));
    this.isAction = isAction;
    this.appendIndex = index;
    var bottomSheet = this._bottomSheet.open(templateRef);
    bottomSheet.afterDismissed().subscribe((data:any)=>{
      this.searchVal = '';
    })
  }

  addWorkflow(workflow:any, option:any, isAction:boolean, index:number) {
    if(isAction) {
      this._automation.activeActions.filter((act:any)=>act.id);
    } 
    workflow.working = {
      target: option,
    };
    isAction ? this._automation.addAction(workflow, index) : this._automation.addTrigger(workflow);
  }

  filterWorkflow() {
    var intial = true;
    var wrkfList = this.workflowList;
    for(let i = 0; i < wrkfList.length; i++) {
      for(let j = 0; j < wrkfList[i].workflows.length; j++) {
        let cond = wrkfList[i].workflows[j].name?.toLowerCase().indexOf(this.searchVal.toLowerCase()) >= 0;
        wrkfList[i].hide = !cond;
        if(cond) {
          if(intial) {
            this._general.expPanelStep = i;
            intial = false;
          }
          break;
        }
      }
    }
  }

  filterData(event:any, data:any) {
    var value = event ? event.target.value : '';
    this.filteredData = data.filter((option:any) => option.name.toLowerCase().includes(value.toLowerCase()));
  }

  selectedOption(e:any, searchDataInp:any) {
    this.selOption = {id: e.option.value.id};
    searchDataInp.value = e.option.value.name;
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }

  toggleAutoSave(value:boolean) {
    this.autosave = value;
  }
}
