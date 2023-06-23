import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContactService } from 'src/app/_services/_crm/contact.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FieldsService } from 'src/app/_services/_crm/field.service';

@Component({
  selector: 'app-crm-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../../material.component.css']
})
export class CrmContactComponent implements OnInit {

  
  contact:any = {};
  fields:Array<any> = [];
  contactFields:Array<any> = [];
  searchField:string = '';

  constructor(
    private _route: ActivatedRoute,
    private _general: GeneralService,
    private _contactService: ContactService,
    private _field: FieldsService,
  ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.contact.uniqueid = params.get('uniqueid');
      this.fetchContact();
    });    
  }

  ngOnInit(): void {
  }

  fetchContact() {
      this._contactService.singlecontact(this.contact.uniqueid).subscribe((resp) => {
          this.contact = resp?.data[0];
          this.contact.icon = this.contactIcon(this.contact);
          if(this.contact.fieldans) this.fetchFields(this.contact.fieldans);
        }
      );
  }

  fetchFields(fieldAns:any) {
    this.contactFields = this._general.decodeJSON(fieldAns);
    this._field.fetchfields().subscribe((resp:any)=>{
      if(resp?.data) {
        this.fields = resp.data;
        this.contactFields.forEach((cf:any)=>{
          for(let i = 0; i < this.fields.length - 1; i++) {
            var ff = this.fields[i];
            if(cf.id === ff.id) {
                cf.label = ff.label;
                cf.required = ff.required;
                break;
            }
          }
        })
      }
    })
  }

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str;
  }

}
