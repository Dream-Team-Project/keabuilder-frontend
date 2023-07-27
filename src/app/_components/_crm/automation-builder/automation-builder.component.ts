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
    id: '',
    value: '',
    error: '',
    filter: []
  }
  listField:any = {
    id: '',
    value: '',
    error: '',
    filter: []
  }
  tagField:any = {
    id: '',
    value: '',
    error: '',
    filter: []
  }
  emailField:any = {
    id: '',
    value: '',
    error: '',
    filter: []
  }
  webpageField:any = {
    id: '',
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
    private _bottomSheet: MatBottomSheet,) {}

  ngOnInit(): void {}

  openDialog(templateRef: TemplateRef<any>, error:string): void {
    if(error) this.showFieldError(error);
    this.closeBottomSheet();
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

  showFieldError(error:string) {
    var trgtNm = this.tempWf.target.name;
    if(trgtNm == 'form') this.formField.error = error;
    else if(trgtNm == 'list')  this.listField.error = error;
    else if(trgtNm == 'tag') this.tagField.error = error;
    else if(trgtNm == 'email') this.emailField.error = error;
    else if(trgtNm == 'webpage') this.webpageField.error = error;
  }

  validateTarget() {
    return new Promise<any>((resolve, reject) => {
      var trgtNm = this.tempWf.target.name;
      if(trgtNm == 'form') this.tempWf.target.id = this.formField.id;
      else if(trgtNm == 'list') this.tempWf.target.id = this.listField.id;
      else if(trgtNm == 'tag') this.tempWf.target.id = this.tagField.id;
      else if(trgtNm == 'email') this.tempWf.target.id = this.emailField.id;
      else if(trgtNm == 'webpage') this.tempWf.target.id = this.webpageField.id;
      resolve(true);
    });
  }

  addWorkflow(isAction:boolean) {
    this.validateTarget().then(resp=>{
      if(this.tempWf.target.id) {
        if(isAction) {
          this._automation.addAction(this.tempWf, this.appendIndex, this.updateTempTrgt).then(resp=>{
            if(!resp) this.openDialog(this.wfDialog, 'Action allready added');
          })
        }
        else {
          this._automation.addTrigger(this.tempWf, this.appendIndex, this.updateTempTrgt).then(resp=>{
            if(!resp) this.openDialog(this.wfDialog, 'Trigger allready added');
          })
        }
      }
      else this.openDialog(this.wfDialog, 'Please select a '+this.tempWf.target.name);
    })
  }

  deleteWorkflow(isAction:boolean) {
    isAction ? this._automation.deleteAction(this.appendIndex) : this._automation.deleteTrigger(this.appendIndex); 
  }

  selectWf(wf:any, index:number, update:boolean) {
    this.resetWorkflow();
    if(update) {
      if(wf.target.name == 'form') {
        this.formField.id = wf.target.id;
        this.formField.value = this._automation.fetchTargetName(wf);
      }
      else if(wf.target.name == 'list') {
        this.listField.id = wf.target.id;
        this.listField.value = this._automation.fetchTargetName(wf);
      }
      else if(wf.target.name == 'tag') {
        this.tagField.id = wf.target.id;
        this.tagField.value = this._automation.fetchTargetName(wf);
      }
      else if(wf.target.name == 'email') {
        this.emailField.id = wf.target.id;
        this.emailField.value = this._automation.fetchTargetName(wf);
      }
      else if(wf.target.name == 'webpage') {
        this.webpageField.id = wf.target.id;
        this.webpageField.value = this._automation.fetchTargetName(wf);
      }
      this.appendIndex = index;
    }
    this.updateTempTrgt = update;
    this.tempWf = JSON.parse(JSON.stringify(wf));
    this.openDialog(this.wfDialog, '');
  }

  resetWorkflow() {
    this.formField = {
      id: '',
      value: '',
      error: '',
      filter: []
    }
    this.listField = {
      id: '',
      value: '',
      error: '',
      filter: []
    }
    this.tagField = {
      id: '',
      value: '',
      error: '',
      filter: []
    }
    this.emailField = {
      id: '',
      value: '',
      error: '',
      filter: []
    }
    this.webpageField = {
      id: '',
      value: '',
      error: '',
      filter: []
    }
    this.tempWf = '';
  }

  filterWorkflow() {
    var intial = true;
    var wrkfList = this.workflowList;
    for(let i = 0; i < wrkfList.length; i++) {
      for(let j = 0; j < wrkfList[i].workflows.length; j++) {
        let cond = wrkfList[i].workflows[j].name?.toLowerCase().indexOf(this.searchWf?.toLowerCase()) >= 0;
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

  // form

  resetFilterForm() {
    this.formField.value = '';
    this.formField.id = ''; 
    this.filterForm();
  }

  filterForm() {
    var data = JSON.parse(JSON.stringify(this._automation.forms));
    data.unshift(this._automation.anyTarget);
    this.formField.filter = data.filter((option:any) => option?.name?.toLowerCase().includes(this.formField?.value?.toLowerCase()));
  }

  selectForm(e:any) {
    this.formField.value = e.option.value.name;
    this.formField.id = e.option.value.id;
    this.formField.error = '';
  }

  // form

  // list

  resetFilterList() {
    this.listField.value=''; 
    this.listField.id = ''; 
    this.filterList();
  }

  filterList() {
    var data = JSON.parse(JSON.stringify(this._automation.lists));
    data.unshift(this._automation.anyTarget);
    this.listField.filter = data.filter((option:any) => option?.name?.toLowerCase().includes(this.listField?.value?.toLowerCase()));
  }

  selectList(e:any) {
    this.listField.value = e.option.value.name;
    this.listField.id = e.option.value.id;
    this.listField.error = '';
  }

  // list

  // tag

  resetFilterTag() {
    this.tagField.value=''; 
    this.tagField.id = ''; 
    this.filterTag();
  }

  filterTag() {
    var data = JSON.parse(JSON.stringify(this._automation.tags));
    data.unshift(this._automation.anyTarget);
    this.tagField.filter = data.filter((option:any) => option.name?.toLowerCase().includes(this.tagField?.value?.toLowerCase()));
  }

  selectTag(e:any) {
    this.tagField.value = e.option.value.name;
    this.tagField.id = e.option.value.id;
    this.tagField.error = '';
  }

  // tag

  // email

  resetFilterEmail() {
    this.emailField.value=''; 
    this.emailField.id = ''; 
    this.filterEmail();
  }

  filterEmail() {
    var data = JSON.parse(JSON.stringify(this._automation.emails));
    data.unshift(this._automation.anyTarget);
    this.emailField.filter = data.filter((option:any) => option?.name?.toLowerCase().includes(this.emailField?.value?.toLowerCase()));
  }

  selectEmail(e:any) {
    this.emailField.value = e.option.value.name;
    this.emailField.id = e.option.value.id;
    this.emailField.error = '';
  }

  // email

  // webpage

resetFilterWebpage() {
  this.webpageField.value=''; 
  this.webpageField.id = ''; 
  this.filterWebpage();
}

filterWebpage() {
  var data = JSON.parse(JSON.stringify(this._automation.webpages));
  data.unshift(this._automation.anyPgTarget);
  this.webpageField.filter = data.filter((option:any) => option?.page_name?.toLowerCase().includes(this.webpageField?.value?.toLowerCase()));
}

selectWebpage(e:any) {
  this.webpageField.value = e.option.value.page_name;
  this.webpageField.id = e.option.value.id;
  this.webpageField.error = '';
}

// webpage

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }

  toggleAutoSave(value:boolean) {
    this.autosave = value;
  }
}
