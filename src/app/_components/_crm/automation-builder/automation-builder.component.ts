import { Component, ElementRef, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { AutomationService } from 'src/app/_services/_builder/automation.service';
import { ImageService } from 'src/app/_services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface TriggerGroup {
  list: Array<any>,
  search: String,
  index: number,
  update: boolean,
  temp: any,
  listField: any,
  tagField: any,
  formField: any,
  fieldField: any,
  emailField: any,
}

export interface ActionGroup {
  list: Array<any>,
  search: String,
  index: number,
  update: boolean,
  temp: any,
  listField: any,
  tagField: any,
  fieldField: any,
  emailField: any,
  noteField: any,
  waitField: any,
  ifelseField: any
}

export const _filter = (opt: any[], key: string, value: string): any[] => {
  const filterValue = value.toLowerCase();
  return opt.filter((item:any) => item[key].toLowerCase().includes(filterValue));
};

@Component({
  selector: 'app-crm-automation-builder',
  templateUrl: './automation-builder.component.html',
  styleUrls: ['./automation-builder.component.css', '../../material.component.css']
})

export class CrmAutomationBuilderComponent implements OnInit {

  @ViewChild('triggerSheet') triggerSheet!: TemplateRef<any>;
  @ViewChild('actionSheet') actionSheet!: TemplateRef<any>;
  @ViewChild('triggerDialog') triggerDialog!: TemplateRef<any>;
  @ViewChild('actionDialog') actionDialog!: TemplateRef<any>;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  automation = {
    id: '',
    name: '',
  }
  autosave:boolean = false;
  trigger:TriggerGroup = {
    list: [],
    search: '',
    index: -1,
    update: false,
    temp: '',
    listField: {},
    tagField: {},
    formField: {},
    fieldField: {},
    emailField: {}
  }
  action:ActionGroup = {
    list: [],
    search: '',
    index: -1,
    update: false,
    temp: '',
    listField: {},
    tagField: {},
    fieldField: {},
    emailField: {},
    noteField: {},
    waitField: {},
    ifelseField: []
  }
  ifelseFieldGroup = [{
    id: 'ifelse-list',
    label: 'List',
    expanded: false,
    types: [{
      id: 'subs-list',
      name: 'Subscribed to list',
      group: 'list'
    }, {
      id: 'not-subs-list',
      name: 'Not subscribed to list',
      group: 'list'
    }, {
      id: 'unsubs-list',
      name: 'Unsubscribed to list',
      group: 'list'
    }, {
      id: 'subs-list-with-form',
      name: 'Subscribed with form',
      group: 'list'
    }, {
      id: 'not-subs-list-with-form',
      name: 'Not subscribed with form',
      group: 'list'
    }]
    }, {
      id: 'ifelse-tag',
      label: 'Tag',
      expanded: false,
      types: [{
        id: 'tag-added',
        name: 'tag added',
        group: 'tag'
      }, {
        id: 'tag-not-added',
        name: 'tag not added',
        group: 'tag'
      }, {
        id: 'tag-removed',
        name: 'tag removed',
        group: 'tag'
      }]
    }, {
    id: 'ifelse-field',
    label: 'Field',
    expanded: false,
    types: [{
      id: 'is-field',
      name: 'Is',
      group: 'field'
    }, {
      id: 'is-field-not',
      name: 'Is not',
      group: 'field'
    }, {
      id: 'is-field-contains',
      name: 'Is contains',
      group: 'field'
    }, {
      id: 'does-field-not-contains',
      name: 'Does not contain',
      group: 'field'
    }]
  },{
    id: 'ifelse-form',
    label: 'Form',
    expanded: false,
    types: [{
      id: 'submitted-form',
      name: 'Submitted Form',
      group: 'form'
    }, {
      id: 'not-submitted-form',
      name: 'Not sumbmited form',
      group: 'form'
    }]
  }]
  ifelseFieldTypeObj:any = {
    type: {
      name: ''
    },
    filterGroup: [],
  }
  timepicker:any = {
    hours: [],
    minutes: [],
    ampm: ['AM', 'PM'],
  }
  currentDate:Date = new Date();
  timeUnits:Array<string> = ['Minute','Hour','Day','Week','Month','Year'];
  wfExpPanel:number = 0;
  isDisabled:boolean = false;

  constructor(
    public _automation: AutomationService,
    public _image: ImageService,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    this.resetTrigger();
    this.resetAction();
    this.createTimePicker();
  }

  createTimePicker() {
    let h = 1, m = 0;
    while (h <= 12) {
      this.timepicker.hours.push((h < 10 ? '0' : '')+h);
      h++;
    }
    while (m < 60) {
      this.timepicker.minutes.push((m < 10 ? '0' : '')+m);
      m++;
    }
  }

  // start trigger

  openTriggerDialog(templateRef: TemplateRef<any>): void {
    this.closeBottomSheet();
    this.dialog.open(templateRef);
  }

  openTriggerSheet(templateRef: TemplateRef<any>, index:number): void {
    this.trigger.list = JSON.parse(JSON.stringify(this._automation.triggerList));
    this.trigger.index = index;
    var bottomSheet = this._bottomSheet.open(templateRef);
    bottomSheet.afterDismissed().subscribe((data:any)=>{
      this.trigger.search = '';
      this.wfExpPanel = 0;
    })
  }

  showTriggerFieldError(error:string) {
    var trgtNm = this.trigger.temp.target.name;
    if(trgtNm == 'list')  this.trigger.listField.error = error;
    else if(trgtNm == 'tag') this.trigger.tagField.error = error;
    else if(trgtNm == 'form') this.trigger.formField.error = error;
    else if(trgtNm == 'field') this.trigger.fieldField.error = error;
    else if(trgtNm == 'email') this.trigger.emailField.error = error;
  }

  validateTrigger() {
    return new Promise<any>((resolve, reject) => {
      var tempTrgt = this.trigger.temp.target;
      var tempTrgtObj:any = {};
      if(tempTrgt.name == 'list') tempTrgtObj = JSON.parse(JSON.stringify(this.trigger.listField));
      else if(tempTrgt.name == 'tag') tempTrgtObj = JSON.parse(JSON.stringify(this.trigger.tagField));
      else if(tempTrgt.name == 'form') tempTrgtObj = JSON.parse(JSON.stringify(this.trigger.formField));
      else if(tempTrgt.name == 'field') tempTrgtObj = JSON.parse(JSON.stringify(this.trigger.fieldField));
      else if(tempTrgt.name == 'email') tempTrgtObj = JSON.parse(JSON.stringify(this.trigger.emailField));
      if(tempTrgtObj.id || tempTrgtObj.value) {
        this.trigger.temp.target.id = tempTrgtObj.id;
        this.trigger.temp.target.run_once = tempTrgtObj.run_once;
        if(tempTrgtObj.value) this.trigger.temp.target.value = tempTrgtObj.value;
        if(tempTrgtObj.change) this.trigger.temp.target.change = JSON.parse(JSON.stringify(tempTrgtObj.change));
        resolve(true);
      }
      else resolve(false);
    });
  }

  addTrigger(e:any) {
    this.isDisabled = true;
    this.validateTrigger().then(resp=>{
      if(resp) {
        this._automation.addTrigger(this.trigger.temp, this.trigger.index, this.trigger.update).then(resp=>{
          if(resp) {
            this._automation.saveWfSession();
            this.dialog.closeAll();
          }
          else this.showTriggerFieldError('Trigger allready added');
          this.isDisabled = false;
        })
      }
      else {
        this.showTriggerFieldError('Please select a '+this.trigger.temp.target.name);
        this.isDisabled = false;
      }
    })
  }

  selectTrigger(wf:any, index:number, update:boolean) {
    this.resetTrigger();
    if(update) {
      if(wf.target.name == 'list') {
        this.trigger.listField.id = wf.target.id;
        this.trigger.listField.value = this._automation.fetchTargetName(wf, true);
        this.trigger.listField.run_once = wf.target.run_once;
      }
      else if(wf.target.name == 'tag') {
        this.trigger.tagField.id = wf.target.id;
        this.trigger.tagField.value = this._automation.fetchTargetName(wf, true);
        this.trigger.tagField.run_once = wf.target.run_once;
      }
      else if(wf.target.name == 'form') {
        this.trigger.formField.id = wf.target.id;
        this.trigger.formField.value = this._automation.fetchTargetName(wf, true);
        this.trigger.formField.run_once = wf.target.run_once;
      }
      else if(wf.target.name == 'field') {
        this.trigger.fieldField.id = wf.target.id;
        this.trigger.fieldField.value = this._automation.fetchTargetName(wf, true);
        this.trigger.fieldField.change = JSON.parse(JSON.stringify(wf.target.change));
        this.trigger.fieldField.run_once = wf.target.run_once;
      }
      else if(wf.target.name == 'email') {
        this.trigger.emailField.id = wf.target.id;
        this.trigger.emailField.value = this._automation.fetchTargetName(wf, true);
        this.trigger.emailField.run_once = wf.target.run_once;
      }
      this.trigger.index = index;
    }
    this.trigger.update = update;
    this.trigger.temp = JSON.parse(JSON.stringify(wf));
    this.openTriggerDialog(this.triggerDialog);
  }

  resetTrigger() {
    this.trigger.temp = '';
    this.trigger.listField = {
      id: '',
      value: '',
      error: '',
      filter: [],
      run_once: true
    };
    this.trigger.tagField = {
      id: '',
      value: '',
      error: '',
      filter: [],
      run_once: true
    };
    this.trigger.formField = {
      id: '',
      value: '',
      error: '',
      filter: [],
      run_once: true
    };
    this.trigger.fieldField = {
      id: '',
      value: '',
      error: '',
      filter: [],
      change: {
        from: {any: true, value: ''},
        to: {any: true, value: ''},
      },
      run_once: true
    };
    this.trigger.emailField = {
      id: '',
      value: '',
      error: '',
      filter: [],
      run_once: true
    };
  }

  // end trigger

  // start action

  openActionDialog(templateRef: TemplateRef<any>): void {
    this.closeBottomSheet();
    this.dialog.open(templateRef);
  }

  openActionSheet(templateRef: TemplateRef<any>, index:number): void {
    this.action.list = JSON.parse(JSON.stringify(this._automation.actionList));
    this.action.index = index;
    var bottomSheet = this._bottomSheet.open(templateRef);
    bottomSheet.afterDismissed().subscribe((data:any)=>{
      this.action.search = '';
      this.wfExpPanel = 0;
    })
  }

  showActionFieldError(error:string) {
    var actNm = this.action.temp.target.name;
    if(actNm == 'list')  this.action.listField.error = error;
    else if(actNm == 'tag') this.action.tagField.error = error;
    else if(actNm == 'field') this.action.fieldField.error = error;
    else if(actNm == 'email') {
      this.action.emailField.error = this.action.emailField.type == 'custom' ? 
      'Email subject and content are required' : error;
    }
    else if(actNm == 'note') this.action.noteField.error = 'Please write a note';
    else if(actNm == 'wait') this.action.waitField.error = 'Please write or select a valid input';
    else if(actNm == 'ifelse') this.action.ifelseField.error = 'Please select or fill all the required fields';
  }

  validateAction() {
    return new Promise<any>((resolve, reject) => {
      var resp:boolean = false;
      var tempTrgt = this.action.temp.target;
      if(tempTrgt.name == 'list') {
        let ids = this.action.listField.values.map((lf:any) => lf.id);
        if(ids?.length != 0) {
          this.action.temp.target.ids = ids;
          resp = true;
        }
      }
      else if(tempTrgt.name == 'tag') {
        let ids:any = [], values:any = [];
        this.action.tagField.values.forEach((tf:any) => {
          if(tf.id) ids.push(tf.id);
          else values.push(tf.name);
        })
        if(ids?.length != 0 || values.length != 0) {
          this.action.temp.target.ids = ids;
          this.action.temp.target.values = values;
          resp = true;
        }
      }
      else if(tempTrgt.name == 'field') {
        let values = this.action.fieldField.values.map((ff:any) => {
          return {id: ff.id, updatedvalue: ff.updatedvalue};
        });
        if(values?.length != 0) {
          this.action.temp.target.values = values;
          resp = true;
        }
      }
      else if(tempTrgt.name == 'email') {
        let ef = this.action.emailField;
        let ids = ef.values.map((ef:any) => ef.id);
        if(ids?.length != 0) this.action.temp.target.ids = ids;
        this.action.temp.target.custom.subject = ef.custom.subject;
        this.action.temp.target.custom.content = ef.custom.content;
        if(ef.type == 'template' && this.action.temp.target.ids) resp = true;
        else if(ef.custom.subject && ef.custom.content) {
          this.action.temp.target.custom.subject = ef.custom.subject;
          this.action.temp.target.custom.content = ef.custom.content;
          resp = true;
        }
        this.action.temp.target.type = ef.type;
      }
      else if(tempTrgt.name == 'note') {
        let value = this.action.noteField.value;
        if(value) {
          this.action.temp.target.value = value;
          resp = true;
        }
      }
      else if(tempTrgt.name == 'wait') {
        let type = {};
        let awtype = this.action.waitField.type;
        if(awtype.id == 'wait-spot' && awtype?.value && (awtype?.value >= 5 || awtype?.unit.toLowerCase() != 'minute')) type = this.action.waitField.type;
        else if(awtype.id == 'wait-sd&t' && awtype.date && awtype.time) type = awtype;
        if(JSON.stringify(type) != '{}' && type) {
          this.action.temp.target.type = type;
          resp = true;          
        }
      }
      else if(tempTrgt.name == 'ifelse') {
        let types = this.action.ifelseField.types.filter((ft:any)=>ft.type.id);
        if(types.length == this.action.ifelseField.types.length) {
          this.action.temp.target.types = types.map((ft:any)=>{
            let t = ft.type;
            return {
              id: t.id, 
              name: t.name, 
              value: t.value, 
              match: t.match ? t.match : null, 
              type_id: t.type_id, 
              group: t.group
            }
          });
          this.action.temp.target.logic = this.action.ifelseField.logic;
          console.log(this.action.temp.target);
          resp = true;
        }
      }
      resolve(resp);
    });
  }

  addAction() {
    this.isDisabled = true;
    this.validateAction().then(resp=>{
      if(resp) {
        this._automation.addAction(this.action.temp, this.action.index, this.action.update).then(resp=>{
          if(resp) {
            this._automation.saveWfSession();
            this.dialog.closeAll();
          }
          this.isDisabled = false;
        })
      }
      else {
        this.showActionFieldError('Please select '+this.action.temp.target.name);
        this.isDisabled = false;
      }
    })
  }

  getSelectAction(e:any) {
    this.selectAction(e.action, e.index, true);
  }

  selectAction(wf:any, index:number, update:boolean) {
    this.resetAction();
    if(update) {
      if(wf.target.name == 'list') {
        this.action.listField.values = this._automation.fetchMultipleTargets(wf);
      }
      else if(wf.target.name == 'tag') {
        this.action.tagField.values = this._automation.fetchMultipleTargets(wf);
      }
      else if(wf.target.name == 'field') {
        this.action.fieldField.values = this._automation.fetchMultipleTargets(wf);
      }
      else if(wf.target.name == 'email') {
        this.action.emailField.values = this._automation.fetchMultipleTargets(wf);
        this.action.emailField.custom.subject = wf.target.custom.subject;
        this.action.emailField.custom.content = wf.target.custom.content;
        this.action.emailField.type = wf.target.type;
      }
      else if(wf.target.name == 'note') {
        this.action.noteField.value = wf.target.value;
      }
      else if(wf.target.name == 'wait') {
        this.action.waitField.type = this.action.waitField.types.filter((wt:any) => wt.id == wf.target.type.id)[0];
        if(wf.target.type.id == 'wait-spot') {
          this.action.waitField.type.value = wf.target.type.value;
          this.action.waitField.type.unit = wf.target.type.unit;
        }
        else if(wf.target.type.id == 'wait-sd&t') {
          this.action.waitField.type.date = wf.target.type.date;
          this.action.waitField.type.time = wf.target.type.time;
        }
      }
      else if(wf.target.name == 'ifelse') {
        this.action.ifelseField.logic = wf.target.logic;
        this.action.ifelseField.types = wf.target.types.map((t:any) => {
          let temp = JSON.parse(JSON.stringify(this.ifelseFieldTypeObj));
          t.data = this._automation.fetchData(t.group);
          temp.type = t;
          return temp;
        })
      }
      this.action.index = index;
    }
    this.action.update = update;
    this.action.temp = JSON.parse(JSON.stringify(wf));
    this.openActionDialog(this.actionDialog);
  }

  resetAction() {
    this.action.temp = '';
    this.action.listField = {
      values: [],
      error: '',
      filter: []
    };
    this.action.tagField = {
      values: [],
      error: '',
      filter: []
    };
    this.action.fieldField = {
      values: [],
      error: '',
      filter: []
    };
    this.action.emailField = {
      values: [],
      error: '',
      filter: [],
      type: 'template',
      custom: {subject: '', content: ''}
    };
    this.action.noteField = {
      value: '',
      error: '',
    }
    this.action.waitField = {
      type: {},
      types: [{
        id: 'wait-spot',
        name: 'Specific period of time',
        value: 5,
        unit: this.timeUnits[0]
      }, { 
        id: 'wait-sd&t',
        name: 'Specific data & time', 
        date:  new Date(),
        time: {
          hh: '12',
          mm: '30',
          ap: 'AM',
        },
      }],
      error: '',
    }
    this.action.waitField.type = this.action.waitField.types[0];
    this.action.waitField.types[1].date.setDate(this.currentDate.getDate() + 1);
    this.action.ifelseField = {logic: 'and', types: [], group: this.ifelseFieldGroup, error: ''};
    this.addCondition(this.action.ifelseField);
  }

  // end action

  // start single target selection

  selectTarget(e:any, field:any, key:string) {
    let opt = e.option.value;
    field.value = opt[key];
    field.id = opt.id;
    field.error = '';
  }

  filterTarget(data:any, field:any, key:string) {
    let anyObj:any = {id: '*'};
    anyObj[key] = 'Any';
    var data = JSON.parse(JSON.stringify(data));
    data.unshift(anyObj);
    field.filter = _filter(data, key, field?.value);
  }

  resetTarget(data:any, field:any, key:string) {
    field.value=''; 
    field.id = ''; 
    this.filterTarget(data, field, key);
  }

  // end single target selection

  // start multiple target selection

  addTag(e:any, field:any, inp:any, key:string) {
    if(inp.value && field.values[0]?.id != '*') {
      let obj:any = {id: ''};
      obj[key] = e.value;
      field.values.push(obj);
      inp.value = '';
      field.error = '';
    }
    else this._automation._general.openSnackBar(false, 'All Tags are selected', 'OK', 'center', 'top');
  } 

  selectMultipleTarget(e:any, field:any, inp:any, key:string) {
    let opt = e.option.value;
    let obj:any = {id: opt.id};
    obj[key] = opt[key];
    if(key == 'label') obj['updatedvalue'] = '';
    if(obj.id == '*') field.values = [];
    field.values.push(obj);
    inp.value = '';
    field.error = '';
  }

  filterMultipleTarget(data:any, field:any, inp:any, key:string) {
    let anyObj:any = {id: '*'};
    anyObj[key] = 'Select All';
    var data = JSON.parse(JSON.stringify(data));
    if(key != 'label') data.unshift(anyObj);
    field.filter = _filter(data, key, inp?.value);
  }

  removeSelectedTarget(field:any, index:number): void {
    field.values.splice(index, 1);
  }

  isTargetDisabled(values:any, id:any) {
    if(values[0]?.id == '*' && values.length == 1) return true;
    else {
      let vArr = values.filter((v:any) => v.id == id);
      return vArr.length != 0;
    }
  }

  // end multiple target selection

  // start workflow selection

  filterWorkflows(wf:any) {
    var intial = true;
    for(let i = 0; i < wf.list.length; i++) {
      for(let j = 0; j < wf.list[i].workflows.length; j++) {
        let cond = wf.list[i].workflows[j].name?.toLowerCase().indexOf(wf.search?.toLowerCase()) >= 0;
        wf.list[i].hide = !cond;
        if(cond) {
          if(intial) {
            this.wfExpPanel = i;
            intial = false;
          }
          break;
        }
      }
    }
  }

  resetWorkflows(wf:any) {
    wf.search = '';
    this.filterWorkflows(wf);
  }

  // end workflow selection

  // start group autocomplete

  filterGroup(field: any, group: any) {
    let value = field.type.name;
    field.filterGroup = group
      .map((group:any) => ({id: group.id, label: group.label, expanded: value ? true : group.expanded, types: _filter(group.types, 'name', value)}))
      .filter((group:any) => group.types.length > 0);
  }

  groupExpand(fg:any, gi:number) {
    fg.forEach((group:any, index:number)=> {
      if(index == gi) group.expanded = !group.expanded;
      else group.expanded = false;
    });
  }

  selectGroup(e:any, field:any) {
    let opt = e.option.value;
    opt['type_id'] = opt.id;
    delete opt.id;
    let subSelObj:any = {id: '', value: '', filter: [], data: []}
    subSelObj.data = this._automation.fetchData(opt.group);
    field.type = {...JSON.parse(JSON.stringify(opt)), ...subSelObj};
  }

  removeSelectedGroup(field:any) {
    field.type = {name: ''};
  }

  setGroupTargetAction(e:any, type:any, action:string) {
    let key = type.group == 'field' ? 'label' : 'name';
    if(action == 'filter') this.filterTarget(type.data, type, key) 
    else if(action == 'reset') this.resetTarget(type.data, type, key);
    else if(action == 'select') this.selectTarget(e, type, key);
  }

  addCondition(field:any) {
    let temp = JSON.parse(JSON.stringify(this.ifelseFieldTypeObj));
    field.types.push(temp);
    field.error = '';
  }

  removeCondition(fieldGroup:any, index:any) {
    fieldGroup.splice(index, 1);
  }

  // end group autocomplete

  toggleAutoSave(value:boolean) {
    this.autosave = value;
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }
}
