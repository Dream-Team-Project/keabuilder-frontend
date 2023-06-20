import { Injectable } from '@angular/core';
import { FormService } from '../_crm/form.service';
import { CrmListService } from '../_crmservice/crm_list.service';
import { CrmTagsService } from '../_crmservice/crm-tags.service';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  workflowList = [
    {
      id: 'wrkfl-group-sub', name: 'Submissions', hide: false, icon: '<i class="fa-solid fa-paper-plane"></i>',
      workflows: [
        { id: 'wrkfl-form-submtd', name: 'Form Submitted', icon: '<i class="fa-solid fa-file-circle-check"></i>', color: 'primary', active: false },
        { id: 'wrkfl-chckot-submtd', name: 'Checkout Submitted', icon: '<i class="fa-regular fa-credit-card"></i>', color: 'primary', active: false },
      ]
    },
    {
      id: 'wrkfl-group-contacts', name: 'Contacts', hide: false, icon: '<i class="fa-solid fa-user"></i>',
      workflows: [
        { id: 'wrkfl-sub-to-list', name: 'Subscribe to a List', icon: '<i class="fa-solid fa-list-ul"></i>', color: 'primary', active: false },
        { id: 'wrkfl-unsub-to-list', name: 'Unsubscribe to a List', icon: '<i class="fa-solid fa-list-check"></i>', color: 'primary', active: false },
        { id: 'wrkfl-tag-add', name: 'Tag Added', icon: '<i class="fa-solid fa-user-tag"></i>', color: 'primary', active: false },
        { id: 'wrkfl-tag-remove', name: 'Tag Removed', icon: '<i class="fa-solid fa-tag"></i>', color: 'primary', active: false },
        { id: 'wrkfl-cont-add', name: 'Contact Added', icon: '<i class="fa-solid fa-user-plus"></i>', color: 'primary', active: false },
        { id: 'wrkfl-cont-updt', name: 'Contact Updated', icon: '<i class="fa-solid fa-user-pen"></i>', color: 'primary', active: false },
        { id: 'wrkfl-cont-dnd', name: 'Contact DND (Do Not Disturbed)', icon: '<i class="fa-solid fa-user-lock"></i>', color: 'primary', active: false },
      ]
    },
    {
      id: 'wrkfl-group-send', name: 'Sending', hide: false, icon: '<i class="fa-solid fa-envelope"></i>',
      workflows: [
        { id: 'wrkfl-opre-email', name: 'Opens/reads an email', icon: '<i class="fa-solid fa-envelope-open-text"></i>', color: 'primary', active: false },
      ]
    },
    {
      id: 'wrkfl-group-others', name: 'Others', hide: false, icon: '<i class="fa-solid fa-ellipsis-vertical"></i>',
      workflows: [
        { id: 'wrkfl-date-bsd', name: 'Date Based', icon: '<i class="fa-solid fa-calendar-days"></i>', color: 'primary', active: false },
        { id: 'wrkfl-pg-vstd', name: 'Page Visited', icon: '<i class="fa-solid fa-plane-arrival"></i>', color: 'primary', active: false },
      ]
    },
  ]

  triggersList: any = this.workflowList;
  actionsList: any = [
    {
      id: 'act-group-condition-workflow', name: 'Conditions and Workflow', hide: false, icon: '<i class="fa-solid fa-pen-to-square"></i>',
      workflows: [
        { id: 'act-if-else', name: 'Condition if/else', icon: '<i class="fa-solid fa-arrows-split-up-and-left"></i>', color: '' },
        { id: 'act-wait', name: 'Wait', icon: '<i class="fa-solid fa-clock"></i>', color: '' },
      ]
    },
  ];
  activeTriggers: any = [];
  activeActions: any = [
    { id: 'act-finished', name: 'Finished', icon: '<i class="fa-solid fa-flag-checkered"></i>', color: 'secondary' },
  ];
  selectedWfData:any = [];
  forms: any = [];
  lists: any = [];
  tags: any = [];

  constructor(private _form: FormService,
    private _crm_list: CrmListService,
    private _crm_tag: CrmTagsService) {
    this.actionsList = this.actionsList.concat(this.workflowList);
    this._form.fetchforms().subscribe((resp: any) => {
      this.forms = resp?.data;
    });
    this._crm_list.getAllcrmlists().subscribe((resp: any) => {
      this.lists = resp?.data;
    })
    this._crm_tag.getAllcrmtags().subscribe((resp: any) => {
      this.tags = resp?.data;
    })
  }

  addAction(action: any, index: number) {
    this.activeActions.splice(index, 0, action);
  }

  removeAction(index: number) {
    this.activeActions.splice(index, 1);
  }

  addTrigger(trigger: any) {
    trigger.active = true;
    this.activeTriggers.push(trigger);
  }

  removeTrigger(trigger: any) {
    var actT = this.activeTriggers;
    for (var i = 0; i < actT.length; i++) {
      if (trigger.id == actT[i].id) {
        trigger.active = false;
        this.activeTriggers.splice(i, 1);
        break;
      }
    }
  }
}
