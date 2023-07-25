import { Injectable } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ListService } from '../_crm/list.service';
import { TagService } from '../_crm/tag.service';
import { FieldService } from '../_crm/field.service';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  triggerList: any = [
    {
      id: 'trg-group-contacts', name: 'Contacts', hide: false, icon: '<i class="fa-solid fa-user"></i>',
      workflows: [
        { id: 'trg-sub-to-list', name: 'Subscribed to a List', group: 'trigger', target: {id: '', name: 'list'}, icon: '<i class="fa-solid fa-list-check"></i>', color: 'primary'},
        { id: 'trg-unsub-to-list', name: 'Unsubscribed to a List', group: 'trigger', target: {id: '', name: 'list'}, icon: '<i class="fa-solid fa-list-ul"></i>', color: 'primary'},
        { id: 'trg-tag-add', name: 'Tag Added', group: 'trigger', target: {id: '', name: 'tag'}, icon: '<i class="fa-solid fa-user-tag"></i>', color: 'primary'},
        { id: 'trg-tag-rm', name: 'Tag Removed', group: 'trigger', target: {id: '', name: 'tag'}, icon: '<i class="fa-solid fa-tag"></i>', color: 'primary'},
      ]
    },
    {
      id: 'trg-group-sub', name: 'Submissions', hide: false, icon: '<i class="fa-solid fa-paper-plane"></i>',
      workflows: [
        { id: 'trg-form-sub', name: 'Form Submitted', group: 'trigger', target: {id: '', name: 'form'}, icon: '<i class="fa-solid fa-file-circle-check"></i>', color: 'primary'},
        // { id: 'trg-chckot-sub', name: 'Checkout Submitted', group: 'trigger', target: {id: '', name: 'form'}, icon: '<i class="fa-regular fa-credit-card"></i>', color: 'primary'},
      ]
    },
    {
      id: 'trg-group-send', name: 'Email', hide: false, icon: '<i class="fa-solid fa-envelope"></i>',
      workflows: [
        { id: 'trg-opre-email', name: 'Opens/reads an email', group: 'trigger', target: {id: '', name: 'email'}, icon: '<i class="fa-solid fa-envelope-open-text"></i>', color: 'primary'},
        { id: 'trg-reply-email', name: 'Replies to an email', group: 'trigger', target: {id: '', name: 'email'}, icon: '<i class="fa-solid fa-reply"></i>', color: 'primary'},
      ]
    },
    {
      id: 'trg-group-condition-workflow', name: 'Conditions', hide: false, icon: '<i class="fa-solid fa-pen-to-square"></i>',
      workflows: [
        { id: 'trg-date', name: 'Date', group: 'trigger', target: {id: '', name: 'date'}, icon: '<i class="fa-solid fa-calendar-days"></i>', color: 'primary'},
        { id: 'trg-pg-vstd', name: 'Page Visited', group: 'trigger', target: {id: '', name: 'page'}, icon: '<i class="fa-solid fa-plane-arrival"></i>', color: 'primary'},
      ]
    }
  ];
  actionList: any = [
    {
      id: 'act-group-contacts', name: 'Contacts', hide: false, icon: '<i class="fa-solid fa-user"></i>',
      workflows: [
        { id: 'act-sub-to-list', name: 'Subscribe to a List', group: 'action', target: {id: '', name: 'list'}, icon: '<i class="fa-solid fa-list-check"></i>', color: 'primary'},
        { id: 'act-unsub-to-list', name: 'Unsubscribe to a List', group: 'action', target: {id: '', name: 'list'}, icon: '<i class="fa-solid fa-list-ul"></i>', color: 'primary'},
        { id: 'act-add-tag', name: 'Add a Tag', group: 'action', target: {id: '', name: 'tag'}, icon: '<i class="fa-solid fa-user-tag"></i>', color: 'primary'},
        { id: 'act-rm-tag', name: 'Remove a Tag', group: 'action', target: {id: '', name: 'tag'}, icon: '<i class="fa-solid fa-tag"></i>', color: 'primary'},
        { id: 'act-add-cont', name: 'Add a Contact', group: 'trigger', target: {id: '', name: 'contact'}, icon: '<i class="fa-solid fa-user-plus"></i>', color: 'primary'},
        { id: 'act-up-cont', name: 'Update a Contact', group: 'trigger', target: {id: '', name: 'contact'}, icon: '<i class="fa-solid fa-user-pen"></i>', color: 'primary'},
        { id: 'act-rm-cont', name: 'Remove a Contact', group: 'trigger', target: {id: '', name: 'contact'}, icon: '<i class="fa-solid fa-user-minus"></i>', color: 'primary'},
        { id: 'act-add-note', name: 'Add a Note', group: 'trigger', target: {id: '', name: 'contact'}, icon: '<i class="fa-solid fa-file-pen"></i>', color: 'primary'},
      ]
    },
    {
      id: 'act-group-send', name: 'Email', hide: false, icon: '<i class="fa-solid fa-envelope"></i>',
      workflows: [
        { id: 'act-send-email', name: 'Send an email', group: 'action', target: {id: '', name: 'email'}, icon: '<i class="fa-solid fa-envelope-open-text"></i>', color: 'primary'},
      ]
    },
    {
      id: 'act-group-condition-workflow', name: 'Conditions', hide: false, icon: '<i class="fa-solid fa-pen-to-square"></i>',
      workflows: [
        { id: 'act-if-else', name: 'Condition if/else', group: 'action', target: {id: '', name: 'condition'}, icon: '<i class="fa-solid fa-arrows-split-up-and-left"></i>', color: '' },
        { id: 'act-wait', name: 'Wait', group: 'action', target: {id: '', name: 'wait'}, icon: '<i class="fa-solid fa-clock"></i>', color: '' },
        { id: 'act-date', name: 'Date', group: 'action', target: {id: '', name: 'date'}, icon: '<i class="fa-solid fa-calendar-days"></i>', color: 'primary'},
        { id: 'act-pg-vstd', name: 'Page Visited', group: 'action', target: {id: '', name: 'page'}, icon: '<i class="fa-solid fa-plane-arrival"></i>', color: 'primary'},
      ]
    }
  ];
  activeTriggers: any = [];
  activeActions: any = [];
  forms: Array<any> = [];
  lists: Array<any> = [];
  tags: Array<any> = [];
  fields: Array<any> = [];
  anyTarget:any = {id: 'all', name: 'Any'};
  allWorkFlowIds:Array<number> = [];

  constructor(public _general: GeneralService,
    private _file: FileUploadService,
    private _list: ListService,
    private _tag: TagService,
    private _field: FieldService) {
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

  fetchTargetName(wf:any) {
    if(wf?.target) {
      var resp = [];
      if(wf.target.id == 'all') resp.push(this.anyTarget);
      else if(wf.target.name == 'form') resp = this.forms.filter((f:any) => f.id == wf.target.id);
      else if(wf.target.name == 'list') resp = this.lists.filter((l:any) => l.id == wf.target.id);
      else if(wf.target.name == 'tag') resp = this.tags.filter((t:any) => t.id == wf.target.id);
      return resp[0]?.name;
    }
    else return '';
  }

  addAction(action: any, index: number, update:boolean) {
    return new Promise<any>((resolve, reject) => {
        var exst = this.activeActions.filter((act:any)=> action.target.id == act.target.id && action.name == act.name && action.id != act.id);
        if(exst.length == 0) {
          if(update) this.activeActions[index] = action;
          else {
            action.id = this.createWorkflowId(action);
            this.activeActions.splice(index, 0, action);
          }
          resolve(true);
        }
        else resolve(false);
    });
  }

  deleteAction(index: number) {
    this.activeActions.splice(index, 1);
  }

  addTrigger(trigger: any, index: number, update:boolean) {
    return new Promise<any>((resolve, reject) => {
      var exst = this.activeTriggers.filter((trg:any)=> trigger.target.id == trg.target.id && trigger.name == trg.name && trigger.id != trg.id);
      if(exst.length == 0) {
        if(update) this.activeTriggers[index] = trigger;
        else {
          trigger.id = this.createWorkflowId(trigger);
          this.activeTriggers.splice(index, 0, trigger);
        }
        resolve(true);
      }
      else resolve(false);
    });
  }

  deleteTrigger(index: number) {
    this.activeTriggers.splice(index, 1);
  }

  createWorkflowId(temp:any):any {
    temp.id += '-'+this._general.makeid(20);
    if(this.allWorkFlowIds.includes(temp.id)) {
      return this.createWorkflowId(temp);
    }
    this.allWorkFlowIds.push(temp.id);
    return temp.id;
  }
}
