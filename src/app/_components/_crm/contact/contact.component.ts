import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContactService } from 'src/app/_services/_crm/contact.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FieldService } from 'src/app/_services/_crm/field.service';

@Component({
  selector: 'app-crm-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class CrmContactComponent implements OnInit {

  
  contact:any = {};
  fields:Array<any> = [];
  contactFields:Array<any> = [];
  contactFieldJSON:Array<any> = [];
  searchField:string = '';

  constructor(
    private _route: ActivatedRoute,
    private _general: GeneralService,
    private _contactService: ContactService,
    private _field: FieldService,
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
          if(this.contact.fieldans) this.contactFieldJSON = JSON.parse(this.contact.fieldans);
          this.fetchFields();
        }
      );
  }

  fetchFields() {
    this._field.fetchfields().subscribe((resp:any)=>{
      if(resp?.data) {
        this.fields = resp.data;
        if(this.contactFieldJSON.length == 0) {
          this.contactFieldJSON = this.fields.filter(ff=>ff.default_field).map(fm=>{
            var cf:any = new Object();
            cf.id = fm.id;
            cf.value = this.contact[fm.name.replaceAll('-', '')];
            return cf;
          })
        }
        this.contactFields = JSON.parse(JSON.stringify(this.contactFieldJSON));
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

  undoField(cf:any, i:number) {
    if(cf.default_field && cf.name == 'email') cf.value = this.contact.email;
    else cf.value = this.contactFieldJSON[i].value;
    cf.edit = false;
    delete cf.error;
    delete cf.uniqueErr;
  }

  verifyField(cf:any, i:number) {
    if(this.contactFieldJSON[i].value === cf.value && !cf.uniqueErr) cf.edit = false;
    else if(cf.required) {
      if(cf.value) this.updateContact(cf, i);
      else cf.error = true;
    }
    else this.updateContact(cf, i);
  }

  updateContact(cf:any, i:number) {
    var contact = JSON.parse(JSON.stringify(this.contact));
    this.contactFieldJSON[i].value = cf.value;
    contact.fieldans = JSON.stringify(this.contactFieldJSON);
    if(cf.default_field) contact[cf.name.replaceAll('-', '')] = cf.value;
    this._contactService.updatecontact(contact).subscribe(resp => {
      var msg;
      if(resp.exist) cf.uniqueErr = true;
      else {
        if(resp.success) {
          msg = 'Contact has been updated';
          this.contact = contact;
          delete cf.error;
          delete cf.uniqueErr;
        }
        else msg = 'Server Error';
        this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
        cf.edit = false;
      }
    });
  }

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str.toUpperCase();
  }

}
