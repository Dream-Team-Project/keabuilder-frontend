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
  formField:any = {
    selected: [],
    filter: [],
    error: ''
  }
  listField:any = {
    value: '',
    error: '',
    filter: []
  }
  tagField:any = {
    value: '',
    error: '',
    filter: []
  }
  tempTrgtErr = '';
  searchTrgtInp = '';
  updateTempTrgt = false;


  constructor(
    public _automation: AutomationService,
    public _image: ImageService,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}

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

  validateFormField() {
    return this.formField.selected.length != 0 || this.listField.selected.length != 0 || this.tagField.selected.length != 0;
  }

  addWorkflow(isAction:boolean) {
    var isValid = this.validateFormField();
    if(isValid) {
      if(isAction) {
        this._automation.addAction(this.tempWf, this.appendIndex, this.updateTempTrgt).then(resp=>{
          if(resp) this.resetWorkflow();
          else this.openDialog(this.wfDialog, 'Action allready added');
        })
      }
      else {
        this._automation.addTrigger(this.tempWf, this.appendIndex, this.updateTempTrgt).then(resp=>{
          if(resp) this.resetWorkflow();
          else this.openDialog(this.wfDialog, 'Trigger allready added');
        })
      }
    }
    else this.openDialog(this.wfDialog, 'Please select a '+this.tempWf.target);
  }

  deleteWorkflow(isAction:boolean) {
    isAction ? this._automation.deleteAction(this.appendIndex) : this._automation.deleteTrigger(this.appendIndex); 
  }

  selectWf(wf:any, update:boolean) {
    if(!update) this.resetWorkflow();
    this.updateTempTrgt = update;
    this.tempWf = JSON.parse(JSON.stringify(wf));
    this.openDialog(this.wfDialog, '');
  }
  
  editWf(wf:any, i:number) {
    this.searchTrgtInp = this._automation.fetchTargetName(wf);
    this.appendIndex = i;
    this.selectWf(wf, true);
  }

  resetWorkflow() {
    this.formField.selected = [];
    this.formField.filter = [];
    this.formField.error = '';
    this.tempWf = '';
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
    this._automation.anyTarget.name = 'Any ' + this.tempWf.target;
    data.unshift(this._automation.anyTarget);
    this.filteredData = data.filter((option:any) => option.name.toLowerCase().includes(this.searchTrgtInp.toLowerCase()));
  }

  selectedOption(e:any) {
    this.tempWf.target = {id: e.option.value.id};
    this.searchTrgtInp = e.option.value.name;
    this.tempTrgtErr = '';
  }

  // form

  filterForm(formInp:any) {
    var data = JSON.parse(JSON.stringify(this._automation.forms));
    this.formField.filter = data.filter((option:any) => option.name.toLowerCase().includes(formInp.value.toLowerCase()));
  }

  selectForm(e:any, formInp:any) {
    this.formField.selected.push(e.option.value.id);
    formInp.value = '';
    this.formField.error = '';
  }

  removeForm(index:number) {
    this.formField.selected.splice(index, 1);
  }

  // form

  // list

  resetFilterList() {
    this.listField.value=''; 
    this.filterList();
  }

  filterList() {
    var data = JSON.parse(JSON.stringify(this._automation.lists));
    this._automation.anyTarget.name = 'Any List';
    data.unshift(this._automation.anyTarget);
    this.listField.filter = data.filter((option:any) => option.name.toLowerCase().includes(this.listField.value.toLowerCase()));
  }

  selectedList(e:any) {
    this.tempWf.list = {id: e.option.value.id};
    this.listField.value = e.option.value.name;
    this.listField.error = '';
  }

  // list

  // tag

  resetFilterTag() {
    this.formField.value=''; 
    this.filterTag();
  }

  filterTag() {
    var data = JSON.parse(JSON.stringify(this._automation.tags));
    this._automation.anyTarget.name = 'Any Tag';
    data.unshift(this._automation.anyTarget);
    this.tagField.filter = data.filter((option:any) => option.name.toLowerCase().includes(this.tagField.value.toLowerCase()));
  }

  selectedTag(e:any) {
    this.tempWf.tag = {id: e.option.value.id};
    this.tagField.value = e.option.value.name;
    this.tagField.error = '';
  }

  // tag

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }

  toggleAutoSave(value:boolean) {
    this.autosave = value;
  }
}
