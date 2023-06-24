import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { ListService } from '../_crm/list.service';
import { TagService } from '../_crm/tag.service';
=======
>>>>>>> d43259a4066bc7912ffb010e5e03f7671ac0097e
import { FileUploadService } from '../file-upload.service';
import { ListService } from '../_crm/list.service';
import { TagService } from '../_crm/tag.service';
import { FieldService } from '../_crm/field.service';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  defaultWfList = [
    {
      id: 'wrkfl-group-sub', name: 'Submissions', hide: false, icon: '<i class="fa-solid fa-paper-plane"></i>',
      workflows: [
        { id: 'wrkfl-form-submtd', name: 'Form Submitted', type: 'form', icon: '<i class="fa-solid fa-file-circle-check"></i>', color: 'primary'},
        { id: 'wrkfl-chckot-submtd', name: 'Checkout Submitted', type: 'form', icon: '<i class="fa-regular fa-credit-card"></i>', color: 'primary'},
      ]
    },
    {
      id: 'wrkfl-group-contacts', name: 'Contacts', hide: false, icon: '<i class="fa-solid fa-user"></i>',
      workflows: [
        { id: 'wrkfl-sub-to-list', name: 'Subscribe to a List', type: 'list', icon: '<i class="fa-solid fa-list-ul"></i>', color: 'primary'},
        { id: 'wrkfl-unsub-to-list', name: 'Unsubscribe to a List', type: 'list', icon: '<i class="fa-solid fa-list-check"></i>', color: 'primary'},
        { id: 'wrkfl-tag-add', name: 'Tag Added', type: 'tag', icon: '<i class="fa-solid fa-user-tag"></i>', color: 'primary'},
        { id: 'wrkfl-tag-remove', name: 'Tag Removed', type: 'tag', icon: '<i class="fa-solid fa-tag"></i>', color: 'primary'},
        { id: 'wrkfl-cont-add', name: 'Contact Added', type: 'contact', icon: '<i class="fa-solid fa-user-plus"></i>', color: 'primary'},
        { id: 'wrkfl-cont-updt', name: 'Contact Updated', type: 'contact', icon: '<i class="fa-solid fa-user-pen"></i>', color: 'primary'},
        { id: 'wrkfl-cont-dnd', name: 'Contact DND (Do Not Disturbed)', type: 'contact', icon: '<i class="fa-solid fa-user-lock"></i>', color: 'primary'},
      ]
    },
    {
      id: 'wrkfl-group-send', name: 'Sending', hide: false, icon: '<i class="fa-solid fa-envelope"></i>',
      workflows: [
        { id: 'wrkfl-opre-email', name: 'Opens/reads an email', type: 'email', icon: '<i class="fa-solid fa-envelope-open-text"></i>', color: 'primary'},
      ]
    },
    {
      id: 'wrkfl-group-others', name: 'Others', hide: false, icon: '<i class="fa-solid fa-ellipsis-vertical"></i>',
      workflows: [
        { id: 'wrkfl-date-bsd', name: 'Date Based', type: 'date', icon: '<i class="fa-solid fa-calendar-days"></i>', color: 'primary'},
        { id: 'wrkfl-pg-vstd', name: 'Page Visited', type: 'page', icon: '<i class="fa-solid fa-plane-arrival"></i>', color: 'primary'},
      ]
    },
  ]
  triggerList: any = this.defaultWfList;
  actionList: any = [
    {
      id: 'act-group-condition-workflow', name: 'Conditions and Workflow', hide: false, icon: '<i class="fa-solid fa-pen-to-square"></i>',
      workflows: [
        { id: 'act-if-else', name: 'Condition if/else', type: 'condition', icon: '<i class="fa-solid fa-arrows-split-up-and-left"></i>', color: '' },
        { id: 'act-wait', name: 'Wait', type: 'wait', icon: '<i class="fa-solid fa-clock"></i>', color: '' },
      ]
    },
  ];
  activeTriggers: any = [];
  activeActions: any = [
    { id: 'act-finished', name: 'Finished', icon: '<i class="fa-solid fa-flag-checkered"></i>', color: 'secondary' },
  ];
  selectedWfData:any = [];
  forms: Array<any> = [];
  lists: Array<any> = [];
  tags: Array<any> = [];
  fields: Array<any> = [];

  constructor(private _file: FileUploadService,
    private _list: ListService,
<<<<<<< HEAD
    private _tag: TagService) {
      this.actionsList = this.actionsList.concat(this.workflowList);
=======
    private _tag: TagService,
    private _field: FieldService) {
      this.actionList = this.actionList.concat(this.defaultWfList);
>>>>>>> d43259a4066bc7912ffb010e5e03f7671ac0097e
      this.fetchForms();
      this.fetchLists();
      this.fetchTags();
      this.fetchFields();
  }

  fetchForms() {
    this._file.fetchforms().subscribe((resp: any) => {
      this.forms = resp?.data;
    });
  }

  fetchLists() {
    this._list.fetchlists().subscribe((resp: any) => {
      this.lists = resp?.data;
    })
  }

  fetchTags() {
    this._tag.fetchtags().subscribe((resp: any) => {
      this.tags = resp?.data;
    })
  }

  fetchFields() {
    this._field.fetchfields().subscribe((resp: any) => {
      this.fields = resp?.data;
    })
  }

  fetchWfTarget(wf:any) {
    if(wf.working.target) {
      var resp = [];
      if(wf.type == 'form') resp = this.forms.filter((f:any) => f.id == wf.working.target.id);
      if(wf.type == 'list') resp = this.lists.filter((l:any) => l.id == wf.working.target.id);
      if(wf.type == 'tag') resp = this.tags.filter((t:any) => t.id == wf.working.target.id);
      return ': '+resp[0]?.name;
    }
    else return '';
  }

  addAction(action: any, index: number) {
    this.activeActions.splice(index, 0, action);
  }

  removeAction(index: number) {
    this.activeActions.splice(index, 1);
  }

  addTrigger(trigger: any) {
    this.activeTriggers.push(trigger);
  }

  removeTrigger(index: number) {
    this.activeTriggers.splice(index, 1);
  }
}
