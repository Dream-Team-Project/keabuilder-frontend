import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formEle:any = [
    {name:'heading', subcontent:'form subtitle', content: 'form titile', icls: 'fas fa-heading'},
    {name:'paragraph', content: 'paragraph', icls: 'fas fa-paragraph'},
    {name:'full name', label: 'full name', type:'text', placeholder: 'type your name', icls: 'far fa-user'},
    {name:'split name', label: 'split name',  type:'text', icls: 'fas fa-user', split: [
      {name:'first name', label:'first name', placeholder: 'type your first name'},
      {name:'middle name', label:'middle name', placeholder: 'type your middle name'},
      {name:'last name', label:'last name', placeholder: 'type your last name'},
    ]},
    {name:'phone', label: 'phone', type:'phone', placeholder: 'type your phone number', icls: 'fas fa-phone'},
    {name:'email', label:'email', type:'email', placeholder: 'type your email address', icls: 'fas fa-envelope-open-text'},
    {name:'address', label:'address', type:'address', icls: 'far fa-address-card'},
    {name:'short text', label:'short text', type:'text', placeholder: 'type your short text', icls: 'fas fa-text-width'},
    {name:'long text', label:'long text', type:'textarea', placeholder: 'type your long text', icls: 'fas fa-text-height'},
    {name:'single choice', label:'single choice', type:'radio', icls: 'far fa-dot-circle'},
    {name:'multiple choice', label:'multiple choice', type:'checkbox', icls: 'far fa-check-circle'},
    {name:'number', label:'number', type:'number', placeholder: 'type your number', icls: 'fas fa-sort-numeric-down'},
    {name:'submit', label:'submit', type:'submit', icls:'fa-submit'},
    {name:'divider', icls:'fas fa-grip-lines'},
  ]


  constructor() { }
}
