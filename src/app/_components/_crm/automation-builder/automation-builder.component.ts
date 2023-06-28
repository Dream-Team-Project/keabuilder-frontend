import { Component, ElementRef, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { AutomationService } from 'src/app/_services/_builder/automation.service';
import { ImageService } from 'src/app/_services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-crm-automation-builder',
  templateUrl: './automation-builder.component.html',
  styleUrls: ['./automation-builder.component.css', '../../material.component.css']
})
export class CrmAutomationBuilderComponent implements OnInit {

  @ViewChild('wfDialog') wfDialog!: TemplateRef<any>;

  automation = {
    id: '',
    name: '',
  }
  autosave:boolean = false;
  isAction:boolean = false;
  tempWf:any;
  appendIndex = -1;
  searchWf:string = '';
  workflowList:Array<any> = [];
  filteredData:Array<any> = [];
  tempTrgtErr = '';
  searchTrgtInp = '';


  constructor(
    public _automation: AutomationService,
    public _image: ImageService,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}

  selectedWf(wf:any) {
    this.tempWf = JSON.parse(JSON.stringify(wf));
    this.openDialog(this.wfDialog, '');
  }

  editWf(wf:any, i:number) {
    this.searchTrgtInp = this._automation.fetchWfTarget(wf);
    this.appendIndex = i;
    this.selectedWf(wf);
  }

  openDialog(templateRef: TemplateRef<any>, err:string): void {
    this.closeBottomSheet();
    this.tempTrgtErr = err;
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
      this.searchWf = '';
    })
  }

  addWorkflow(workflow:any, isAction:boolean) {
    this._automation.addTrigger(workflow, this.appendIndex);
    return false;
    if(workflow.target && this.searchTrgtInp) {
      var exst = '';
      if(isAction) exst = this._automation.activeActions.filter((act:any)=> workflow.target.id == act.target.id && workflow.name == act.name);
      else exst = this._automation.activeTriggers.filter((trg:any)=> workflow.target.id == trg.target.id && workflow.name == trg.name);
      if(exst.length == 0) {
        isAction ? this._automation.addAction(workflow, this.appendIndex) : this._automation.addTrigger(workflow, this.appendIndex);
        this.filteredData = [];
        this.searchTrgtInp=''; 
        this.tempWf = '';
      }
      // else this.openDialog(this.wfDialog, (isAction ? 'Action' : 'Trigger')+' allready added');
    }
    else this.openDialog(this.wfDialog, 'Please select a '+workflow.type);
  }

  filterWorkflow() {
    var intial = true;
    var wrkfList = this.workflowList;
    for(let i = 0; i < wrkfList.length; i++) {
      for(let j = 0; j < wrkfList[i].workflows.length; j++) {
        let cond = wrkfList[i].workflows[j].name?.toLowerCase().indexOf(this.searchWf.toLowerCase()) >= 0;
        wrkfList[i].hide = !cond;
        if(cond) {
          if(intial) {
            this._automation._general.expPanelStep = i;
            intial = false;
          }
          break;
        }
      }
    }
  }

  resetFilterTarget(data:any) {
    this.searchTrgtInp=''; 
    this.filterTarget(data);
  }

  filterTarget(data:any) {
    data = JSON.parse(JSON.stringify(data));
    this._automation.anyTarget.name = 'Any ' + this.tempWf.type;
    data.unshift(this._automation.anyTarget);
    this.filteredData = data.filter((option:any) => option.name.toLowerCase().includes(this.searchTrgtInp.toLowerCase()));
  }

  selectedOption(e:any) {
    this.tempWf.target = {id: e.option.value.id};
    this.searchTrgtInp = e.option.value.name;
    this.tempTrgtErr = '';
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }

  toggleAutoSave(value:boolean) {
    this.autosave = value;
  }
}
