import { Injectable } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ListService } from '../_crm/list.service';
import { TagService } from '../_crm/tag.service';
import { FieldService } from '../_crm/field.service';
import { EmailService } from '../_crm/email.service';
import { AutomationGeneralService } from 'src/app/_services/_crm/automation-general.service';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  triggerList: any = [
    {
      id: 'trg-group-contacts', name: 'Contacts', hide: false, icon: '<i class="fa-solid fa-user"></i>',
      workflows: [
        { id: 'trg-sub-to-list', name: 'Subscribed to a List', target: {id: '', name: 'list', run_once: true}, icon: '<i class="fa-solid fa-user-plus"></i>', color: 'primary'},
        { id: 'trg-unsub-to-list', name: 'Unsubscribed to a List', target: {id: '', name: 'list', run_once: true}, icon: '<i class="fa-solid fa-user-minus"></i>', color: 'primary'},
        { id: 'trg-tag-add', name: 'Tag Added', target: {id: '', value: '', name: 'tag', run_once: true}, icon: '<i class="fa-solid fa-user-tag"></i>', color: 'primary'},
        { id: 'trg-tag-rm', name: 'Tag Removed', target: {id: '', value: '', name: 'tag', run_once: true}, icon: '<i class="fa-solid fa-user-xmark"></i>', color: 'primary'},
      ]
    },
    {
      id: 'trg-group-sub', name: 'Submissions', hide: false, icon: '<i class="fa-solid fa-paper-plane"></i>',
      workflows: [
        { id: 'trg-form-sub', name: 'Form Submitted', target: {id: '', name: 'form', run_once: true}, icon: '<i class="fa-solid fa-file-circle-check"></i>', color: 'primary'},
        // { id: 'trg-order-form-sub', name: 'Order Form Submitted', target: {id: '', name: 'Orderform', run_once: true}, icon: '<i class="fa-regular fa-credit-card"></i>', color: 'primary'},
      ]
    },
    // {
    //   id: 'trg-group-send', name: 'Email', hide: false, icon: '<i class="fa-solid fa-envelope"></i>',
    //   workflows: [
    //     { id: 'trg-opre-email', name: 'Opens/reads an email', target: {id: '', name: 'email', run_once: true}, icon: '<i class="fa-solid fa-envelope-open-text"></i>', color: 'primary'},
    //     { id: 'trg-reply-email', name: 'Replies to an email', target: {id: '', name: 'email', run_once: true}, icon: '<i class="fa-solid fa-reply"></i>', color: 'primary'},
    //   ]
    // },
    {
      id: 'trg-group-condition-workflow', name: 'Conditions', hide: false, icon: '<i class="fa-solid fa-pen-to-square"></i>',
      workflows: [
        { id: 'trg-field-chng', name: 'Field Updated', target: {id: '', name: 'field', change: { from: {any: true, value: ''}, to: {any: true, value: ''}}, run_once: true}, icon: '<i class="fa-solid fa-pen-to-square"></i>', color: 'primary'},
      ]
    }
  ];
  actionList: any = [
    {
      id: 'act-group-contacts', name: 'Contacts', hide: false, icon: '<i class="fa-solid fa-user"></i>',
      workflows: [
        { id: 'act-sub-to-list', name: 'Subscribe to Lists', target: {ids: [], name: 'list'}, icon: '<i class="fa-solid fa-user-plus"></i>', color: 'primary'},
        { id: 'act-unsub-to-list', name: 'Unsubscribe to Lists', target: {ids: [], name: 'list'}, icon: '<i class="fa-solid fa-user-minus"></i>', color: 'primary'},
        { id: 'act-add-tag', name: 'Add Tags', target: {ids: [], values: [], name: 'tag'}, icon: '<i class="fa-solid fa-user-tag"></i>', color: 'primary'},
        { id: 'act-rm-tag', name: 'Remove Tags', target: {ids: [], values: [], name: 'tag'}, icon: '<i class="fa-solid fa-user-xmark"></i>', color: 'primary'},
        { id: 'act-up-cont', name: 'Update a Contact', target: {values: [], name: 'field'}, icon: '<i class="fa-solid fa-user-pen"></i>', color: 'primary'},
        { id: 'act-add-note', name: 'Add a Note', target: {value: '', name: 'note'}, icon: '<i class="fa-solid fa-file-pen"></i>', color: 'primary'},
      ]
    },
    {
      id: 'act-group-send', name: 'Email', hide: false, icon: '<i class="fa-solid fa-envelope"></i>',
      workflows: [
        { id: 'act-send-email', name: 'Send Emails', target: {id: '', custom: {subject: '', content: ''}, type: 'template', name: 'email'}, icon: '<i class="fa-solid fa-envelope-open-text"></i>', color: 'primary'},
      ]
    },
    {
      id: 'act-group-condition-workflow', name: 'Conditions', hide: false, icon: '<i class="fa-solid fa-pen-to-square"></i>',
      workflows: [
        { id: 'act-wait', name: 'Wait', target: {type: {}, unit: '', name: 'wait'}, icon: '<i class="fa-regular fa-clock"></i>', color: 'primary'},
        { id: 'act-if-else', name: 'If & else', target: {types: [], logic: '', name: 'ifelse'}, node: {first: [], last: []}, icon: '<i class="fa-solid fa-arrows-split-up-and-left"></i>', color: 'primary'},
      ]
    }
  ];
  activeTriggers: any = [];
  activeActions: any = [];
  forms: Array<any> = [];
  lists: Array<any> = [];
  tags: Array<any> = [];
  fields: Array<any> = [];
  emails: Array<any> = [];
  allWorkFlowIds:Array<number> = [];
  wfSession:any = {undo: 0, redo: 0}
  wfSessionArr:any = [];
  nodeActions:any = null;
  wfChildLen = 0;

  constructor(public _general: GeneralService,
    private _file: FileUploadService,
    private _automationgeneralservice: AutomationGeneralService,
    private _list: ListService,
    private _tag: TagService,
    private _field: FieldService,
    private _email: EmailService) {
      this.saveWfSession();
      this.fetchallData();
  }
fetchallData(){
  this._automationgeneralservice.fetchallcrmdata().subscribe((data:any)=>{
    // console.log(data)
    this.forms=data.forms;
    this.fields=data.fields;
    this.lists=data.lists;
    this.tags=data.tags;
    this.emails=data.emails;
  })
}
  // fetchForms() {
  //   this._file.fetchforms().subscribe((resp: any) => {
  //     this.forms = resp?.data;
  //   });
  // }

  // fetchLists() {
  //   this._list.fetchlists().subscribe((resp: any) => {
  //     this.lists = resp?.data;
  //   })
  // }

  // fetchTags() {
  //   this._tag.fetchtags().subscribe((resp: any) => {
  //     this.tags = resp?.data;
  //   })
  // }

  // fetchFields() {
  //   this._field.fetchfields().subscribe((resp: any) => {
  //     this.fields = resp?.data;
  //   })
  // }

  // fetchEmails() {
  //   this._email.fetchemails().subscribe((resp:any)=>{
  //     this.emails = resp?.data;
  //   })
  // }

  fetchData(name:string) {
    if(name == 'list') return this.lists;
    else if(name == 'tag') return this.tags;
    else if(name == 'field') return this.fields;
    else if(name == 'form') return this.forms;
    else if(name == 'emails') return this.emails;
    else return [];
  }

  fetchTargetName(wf:any, field:boolean) {
    if(wf?.target) {
      var name = '';
      var resp = [];
      if(wf.target.id == '*') name = 'Any';
      else if(wf.target.name == 'list') {
        resp = this.lists.filter((l:any) => l.uniqueid == wf.target.id);
        name = resp[0]?.name;
      }
      else if(wf.target.name == 'tag') {
        if(wf.target.value) name = wf.target.value;
        else {
          resp = this.tags.filter((t:any) => t.uniqueid == wf.target.id);
          name = resp[0]?.name;
        }
      }
      else if(wf.target.name == 'form') {
        resp = this.forms.filter((f:any) => f.uniqueid == wf.target.id);
        name = resp[0]?.name;
      }
      else if(wf.target.name == 'field') {
        resp = this.fields.filter((f:any) => f.uniqueid == wf.target.id);
        name = resp[0]?.label;
      }
      else if(wf.target.name == 'email') {
        resp = this.emails.filter((t:any) => t.uniqueid == wf.target.id);
        name = resp[0]?.name;
      }
      return name ? (field ? name : '('+name+')') : '';
    }
    else return '';
  }

  fetchMultipleTargetName(wf:any) {
    if(wf?.target) {
      var name = '';
      var resp = [];
      var allid = wf.target.ids ?  wf.target.ids[0] : '';
      if(allid == '*' && wf.target.ids?.length == 1) name = 'Select All';
      else if(wf.target.name == 'list') {
        let lLen =  wf.target.ids.length;
        resp = this.lists.filter((l:any) => l.uniqueid == wf.target.ids[0]);
        name = resp[0]?.name + (lLen == 1 ? '' : '+' + (lLen - 1));
      }
      else if(wf.target.name == 'tag') {
        let tLen =  wf.target.ids.length + wf.target.values.length;
        let nmbyid = this.tags.filter((t:any) => t.uniqueid == wf.target.ids[0])[0]?.name;
        let nmbyval = wf.target.values[0];
        name = (nmbyid ? nmbyid : nmbyval) + (tLen == 1 ? '' : '+' + (tLen - 1));
      }
      else if(wf.target.name == 'field') {
        let fLen =  wf.target.values.length;
        resp = this.fields.filter((f:any) => f.uniqueid == wf.target.values[0].id);
        name = resp[0]?.label + (fLen == 1 ? '' : '+' + (fLen - 1));
      }
      else if(wf.target.name == 'email') {
        if(wf.target.type == 'template') {
          let tLen =  wf.target.ids.length;
          resp = this.emails.filter((e:any) => e.uniqueid == wf.target.ids[0]);
          name = resp[0]?.name + (tLen == 1 ? '' : '+' + (tLen - 1));
        }
        else name = wf.target.custom.subject;
      }
      else if(wf.target.name == 'note') {
        name = wf.target.value;
      }
      else if(wf.target.name == 'wait') {
        let type = wf.target.type;
        if(type.id == 'wait-spot') {
          name = type.value + ' ' + type.unit + (type.value > 1 ? 's' : '');
        }
        else if(type.id == 'wait-sd&t') {
         let dt=new Date(type.date);
          name = dt.toDateString() + ' | ' + type.time.hh + ':' + type.time.mm + ':' + type.time.ap;
        }
      }
      return name ? '('+name+')' : '';
    }
    else return '';
  }
 
  fetchMultipleTargets(wf:any) {
    if(wf?.target) {
      var resp = [];
      var allid = wf.target.ids ?  wf.target.ids[0] : '';
      if(allid == '*' && wf.target.ids?.length == 1) return [{id: '*', name: 'Select All'}];
      else if(wf.target.name == 'list') {
        resp = this.lists.filter((l:any) => wf.target.ids.includes(l.uniqueid));
        return resp.map((l:any)=> {
          return {id: l.uniqueid, name: l.name};
        });
      }
      else if(wf.target.name == 'tag') {
        resp = this.tags.filter((t:any) => wf.target.ids.includes(t.uniqueid));
        let ids = resp.map((t:any)=> {
          return {id: t.uniqueid, name: t.name};
        });
        let values = wf.target.values.map((val:any)=> {
          return {id: '', name: val};
        });
        return [...ids, ...values];
      }
      else if(wf.target.name == 'field') {
        resp = this.fields.filter((f:any) => {
          return wf.target.values.some((tv:any) => {
            if(f.uniqueid == tv.id) {
              f.updatedvalue = tv.updatedvalue;
              return true;
            }
            else return false;
          });
        });
        return resp.map((f:any)=> {
          return {id: f.uniqueid, label: f.label, updatedvalue: f.updatedvalue};
        });
      }
      else if(wf.target.name == 'email') {
          resp = this.emails.filter((e:any) => wf.target.ids?.includes(e.uniqueid));
          return resp.map((e:any)=> {
            return {id: e.uniqueid, name: e.name};
          });
      }
      else return '';
    }
    else return '';
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
    this.saveWfSession();
  }

  addAction(action: any, index: number, update:boolean) {
    return new Promise<any>((resolve, reject) => {
        if(update) {
          if(this.nodeActions) this.nodeActions[index] = action;
          else this.activeActions[index] = action;
        }
        else {
          action.id = this.createWorkflowId(action);
          if(this.nodeActions) {
            if(action.target.name == 'ifelse') {
              var tempaction = this.nodeActions.slice(0, index);
              var tempNode = this.nodeActions.slice(index);
              action.node.first = tempNode;
              tempaction.push(action);
              this.nodeActions.splice(0, this.nodeActions.length);
              this.nodeActions.push(...tempaction);
            }
            else this.nodeActions.splice(index, 0, action);
          }
          else {
            if(action.target.name == 'ifelse') {
              var tempaction = this.activeActions.slice(0, index);
              var tempNode = this.activeActions.slice(index);
              action.node.first = tempNode;
              tempaction.push(action);
              this.activeActions = tempaction;
            }
            else this.activeActions.splice(index, 0, action);
          }
        }
        resolve(true);
    });
  }

  deleteAction(index: number) {
    if(this.nodeActions) this.nodeActions.splice(index, 1);
    else this.activeActions.splice(index, 1);
    this.saveWfSession();
  }

  createWorkflowId(temp:any):any {
    temp.id += '-'+this._general.makeid(20);
    if(this.allWorkFlowIds.includes(temp.id)) {
      return this.createWorkflowId(temp);
    }
    this.allWorkFlowIds.push(temp.id);
    return temp.id;
  }

  saveWfSession() {
    var sessionArr = {actTrg: this.activeTriggers, actAct: this.activeActions};
    var sessionStr = JSON.stringify(sessionArr);
    if(this.wfSessionArr[this.wfSessionArr.length-1] != sessionStr && this.wfSessionArr[this.wfSession.undo] != sessionStr) {
      this.wfSessionArr.push(sessionStr);
      this.wfSession.undo = this.wfSessionArr.length-1; 
      this.wfSession.redo = this.wfSessionArr.length; 
    }
  }

  undo() {
    var sObj = this.wfSessionArr[this.wfSession.undo-1];
    if(sObj) {
      this.setPrevSession(JSON.parse(sObj));
      this.wfSession.undo--;
      this.wfSession.redo--;
    }
  }

  redo() {
    var sObj = this.wfSessionArr[this.wfSession.redo];
    if(sObj) {
      this.setPrevSession(JSON.parse(sObj));
      this.wfSession.undo++;
      this.wfSession.redo++;
    }
  }

  setPrevSession(sObj:any) {
    this.activeTriggers = sObj.actTrg;
    this.activeActions = sObj.actAct;
  }
}
