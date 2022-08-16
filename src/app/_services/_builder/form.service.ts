import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formEle:any = [
    {name:'heading', content: 'Form titile', icls: 'fas fa-heading'},
    {name:'sub heading', content: 'Form sub titile', icls: 'fas fa-heading fa-subh'},
    {name:'paragraph', content: 'Paragraph', icls: 'fas fa-paragraph'},
    {name:'full name', label: 'Full name', type:'text', placeholder: 'type your name', icls: 'fas fa-user'},
    {name:'split name', label: 'Split name',  type:'text', icls: 'far fa-user', split: [
      {name:'first name', label:'First name', placeholder: 'type your first name'},
      {name:'middle name', label:'Middle name', placeholder: 'type your middle name'},
      {name:'last name', label:'Last name', placeholder: 'type your last name'},
    ]},
    {name:'phone', label: 'Phone', type:'phone', placeholder: 'type your phone number', icls: 'fas fa-phone'},
    {name:'email', label:'Email', type:'email', placeholder: 'type your email address', icls: 'fas fa-envelope-open-text'},
    {name:'address', label:'Address', type:'address', icls: 'far fa-address-card'},
    {name:'short text', label:'Short text', type:'text', placeholder: 'type your short text', icls: 'fas fa-text-width'},
    {name:'long text', label:'Long text', type:'textarea', placeholder: 'type your long text', icls: 'fas fa-text-height'},
    {name:'single choice', label:'Single choice', type:'radio', icls: 'far fa-dot-circle'},
    {name:'multiple choice', label:'Multiple choice', type:'checkbox', icls: 'far fa-check-circle'},
    {name:'number', label:'Number', type:'number', placeholder: 'type your number', icls: 'fas fa-sort-numeric-down'},
    {name:'submit', label:'Submit', type:'submit', icls:'far fa-paper-plane'},
    {name:'divider', icls:'fas fa-grip-lines'},
  ];

  formOpt:any = [];


  constructor() { }
}
