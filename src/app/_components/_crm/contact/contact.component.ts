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
  contctFieldJSON:Array<any> = [];
  searchField:string = '';

  constructor(
    private _route: ActivatedRoute,
    private _general: GeneralService,
    private _contactService: ContactService,
    private _field: FieldsService,
  ) {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.contact.id = params.get('id');
      this.fetchContact();
    });    
  }

  ngOnInit(): void {
  }

  fetchContact() {
      this._contactService.singlecontact(this.contact.id).subscribe((resp) => {
          this.contact = resp?.data[0];
          this.contact.icon = this.contactIcon(this.contact);
          if(this.contact.fieldans) {
            this.contctFieldJSON = this._general.decodeJSON(this.contact.fieldans);
            this.fetchFields();
          }
        }
      );
  }

  fetchFields() {
    this.contactFields = JSON.parse(JSON.stringify(this.contctFieldJSON));
    this._field.fetchfields().subscribe((resp:any)=>{
      if(resp?.data) {
        this.fields = resp.data;
        this.contactFields.forEach((cf:any)=>{
          for(let i = 0; i < this.fields.length - 1; i++) {
            var ff = this.fields[i];
            if(cf.id === ff.id) {
                cf.name = ff.name;
                cf.label = ff.label;
                cf.required = ff.required;
                cf.default_field = ff.default_field;
                break;
            }
          }
        })
      }
    })
  }

  verifyField(cf:any, i:number) {
    if(this.contctFieldJSON[i].value === cf.value) cf.edit = false;
    else if(cf.required) {
      delete cf.error;
      if(cf.value) this.updateContact(cf, i);
      else cf.error = true;
    }
    else this.updateContact(cf, i);
  }

  updateContact(cf:any, i:number) {
    this.contctFieldJSON[i].value = cf.value;
    if(cf.default_field) this.contact[cf.name.replaceAll('-','')] = cf.value;
    this.contact.fieldans = this._general.encodeJSON(this.contctFieldJSON);
    this._contactService.formsubmission(this.contact).subscribe(resp => {
      var msg;
      if(resp.success) msg = 'Contact has been updated';
      else {
        msg = 'Server Error';
        this.fetchContact();
      }
      this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
      cf.edit = false;
    });
  }

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str;
  }

}
