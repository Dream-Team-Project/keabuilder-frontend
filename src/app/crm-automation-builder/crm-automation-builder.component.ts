import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { AutomationService } from '../_services/_builder/automation.service';
import { GeneralService } from '../_services/_builder/general.service';
import { ImageService } from '../_services/image.service';
import { MatDialog } from '@angular/material/dialog';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-crm-automation-builder',
  templateUrl: './crm-automation-builder.component.html',
  styleUrls: ['./crm-automation-builder.component.css', '../builder/material.component.css']
})
export class CrmAutomationBuilderComponent implements OnInit {

  @ViewChild('triggerDialog') triggerDialog!: TemplateRef<any>;
  @ViewChild('actionDialog') actionDialog!: TemplateRef<any>;
  @ViewChild('delTriggerDialog') delTriggerDialog!: TemplateRef<any>;
  @ViewChild('delActionDialog') delActionDialog!: TemplateRef<any>;

  automation = {
    id: '',
    name: '',
  }
  autosave:boolean = false;
  selTrg:any = '';
  selAct:any = '';
  searchVal:string = '';
  appendIndex = 0;

  constructor(
    public _automation: AutomationService,
    public _general: GeneralService,
    public _image: ImageService,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,) { }

  ngOnInit(): void {
  }

  openActionDialog(templateRef: TemplateRef<any>, act:number) {
    this.selAct = act;
    this.openDialog(templateRef);
    this.closeBottomSheet();
  }

  toggleTrigger(trg:any) {
    this.selTrg = trg; 
    if(this.selTrg.active) this.openDialog(this.delTriggerDialog);
    else this.openDialog(this.triggerDialog);
  }

  openBottomSheet(templateRef: TemplateRef<any>, index:number): void {
    var bottomSheet = this._bottomSheet.open(templateRef);
    this.appendIndex = index;
    bottomSheet.afterDismissed().subscribe((data:any)=>{
      this.searchVal = '';
      this.isFilter('action');
      this.isFilter('trigger');
    })
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }

  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
  }

  setTrigger(value:boolean) {
    this.autosave = value;
  }

  isFilter(type:string) {
    var intial = true;
    var wrkfList = type == 'action' ? this._automation.actionsList : this._automation.triggersList;
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
}
