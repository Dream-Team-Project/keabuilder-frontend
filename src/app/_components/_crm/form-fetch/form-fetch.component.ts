import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormService } from 'src/app/_services/_crm/form.service';
import { StyleService } from 'src/app/_services/_builder/style.service';
import { ImageService } from 'src/app/_services/image.service';
import { ContactService } from 'src/app/_services/_crm/contact.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { MailerService } from 'src/app/_services/mailer.service';
import { EmailService } from 'src/app/_services/_crm/email.service';

@Component({
  selector: 'app-crm-form-fetch',
  templateUrl: './form-fetch.component.html',
  styleUrls: ['./form-fetch.component.css','../form-builder/form-builder.component.css']
})
export class CrmFormFetchComponent implements OnInit { 
  
  @Input ('append_form_id') append_form_id:any = '';

  formObj:any = {
    form: this._form.form,
    formField: [],
    submitting: false,
    thankyou: false,
    formans: [],
    error: false,
    errormessage: '',
    currentScrWdth: ''
  }
  contact:any = {};
  
  constructor(
    private route: ActivatedRoute,
    public _form: FormService,
    public _style: StyleService,
    public _image: ImageService,
    public _contact: ContactService,
    public _general: GeneralService,
    private mailerService: MailerService,
    private email:EmailService,
  ) { 
    route.paramMap.subscribe((params: ParamMap) => {
      var form_id = params.get('form_id');
      if(form_id) this.fetchForm(form_id);
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this._form.currentScrWdth = window.innerWidth;
  }

  ngOnInit(): void {
    if(this.append_form_id) this.fetchForm(this.append_form_id);
  };

  fetchForm(form_id:string) {
    this._form.getForm(form_id).then((data:any)=>{
      this.formObj.form = data;
      this.formObj.formField = this._form.formField;
      var style = document.createElement('STYLE');
      style.innerHTML = data.appendstyle;
      document.head.appendChild(style);
      this.fetchsingleemail();
    })
  }

  fetchsingleemail(){
    this.email.getsingleemail({uniqueid:this.formObj.emailid}).subscribe((data:any)=>{
      if(data.success==true){
        this._form.singleemail.id=data.data[0].id;
        this._form.singleemail.uniqueid=data.data[0].uniqueid;
        this._form.singleemail.name=data.data[0].name;
        this._form.singleemail.subject=data.data[0].subject;
        this._form.singleemail.body=data.data[0].body;
      }
    })
  }

  valChng(ff:any, i:number) {
    var value:boolean = !ff.options[i].selected;
    if(ff.type == 'radio') {
      var temp = JSON.stringify(ff.options);
      temp = temp.replace(/"selected":true/g, '"selected":false');
      ff.options = JSON.parse(temp);
      value = true;
    }
    ff.options[i].selected = value;
    if(ff.type == 'checkbox') {
        var tempVal = ff.options.filter((v:any)=> v.selected);
        ff.value = tempVal.map((v:any)=> v.value).join(', ');
    }
    else ff.value = ff.options[i].value;
  }

  validateFields() {
    return new Promise((resolve, reject)=>{
      var res = true;
      this.formObj.formans = this.formObj.formField.filter((fe:any)=> fe.field_tag);
      this.formObj.formans.forEach((ff:any, index:number)=>{
        ff.error = !ff.value && ff.required;
        if(ff.type == 'email') ff.invalid = !this.isEmailValid(ff.value);
        if(ff.error || ff.invalid) res = false;
        if(this.formObj.formans.length-1 == index) resolve(res);
      })
    })
  }

  isEmailValid(value:any) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  }

  formSubmit() {
    this.formObj.submitting = true;
    this.validateFields().then(res=>{
      if(res) {
        var formAnsJSON = this.formObj.formans.map((obj:any)=>{
          if(obj.default_field) this.contact[obj.name.replaceAll('-', '')] = obj.value;
          return {id: obj.id, value: obj.value}
        });
        this.contact.fieldans = JSON.stringify(formAnsJSON);
        this._contact.formsubmission(this.contact).subscribe((resp:any)=>{
          if(resp.success) {
            this.formObj.error=false;
            this.formObj.errormessage='';
            this.emailSent().then(resp=>{
              this.notifyemailSent().then(resp=>{
                var redirection = this._form.form.redirection;
                if(this._form.form.redirectionenabled && redirection) window.location.replace(redirection);
                else this.formObj.thankyou = true;
              })
            })
          }
          else {
            this.formObj.submitting = false;
            this.formObj.error=true;
            this.formObj.errormessage=resp?.message;
            
          }
        });
      }
      else {
        var element:any = document.getElementById('kb-form-'+this._form.submission.form_id);
        element?.scrollIntoView();
        this.formObj.submitting = false;
      }
    });
  }
  notifyemailSent() {
    return new Promise((resolve, reject)=>{
      if(this._form.form.notifyemail) {
        var emailhtmlbody=`Hello Admin,<br>
        <br>
        New Contact is added/updated in your Contact list.The detail of your new contact are as follows-<br>
        Email is - `+this.contact.email+`,<br>
        First Name is - `+this.contact.firstname+` ,<br>
        Last name is - ` +this.contact.lastname+`,<br>
        Phone No is - `+this.contact.phone+` ,<br>
        Subscribe Lists are - `+this.contact.lists+` ,<br>
        Subscribe Tags are - `+this.contact.tags+` ,<br>
        <br>
        Thanks & regards<br>
        Kea Team`;
        var maildata = {
          tomailid: this.contact.notifyemail.split(','), 
          frommailid: 'support@keasolution.com',  
          subject: 'New Contact Added ', 
          html: emailhtmlbody,
        }
        this.mailerService.sendmailform(maildata).subscribe((data:any) => {
          // if(data.success==1)this._general.openSnackBar(false,'Notify Email Sent successfully!', 'OK', 'center', 'top');
        })
        resolve(true);
      }
      else resolve(true);
    })
  }

  emailSent() {
    return new Promise((resolve, reject)=>{
      if(this._form.form.emailenabled) {
        var maildata = {
          tomailid: this.contact.email, 
          frommailid: 'support@keasolution.com', 
          subject: this._form.singleemail.subject, 
          html: this._form.singleemail.body, 
        }
        this.mailerService.sendmailform(maildata).subscribe((data:any) => {
          // if(data.success==1)this._general.openSnackBar(false,'Email Sent successfully!', 'OK', 'center', 'top');
        })
        resolve(true);
      }
      else resolve(true);
    })
  }

  getBlockStyle(en:string) {
    if(this._form.formEleTypes[en]) return this._style.getBlockStyle(this._form.formEleTypes[en]?.content.style);
    else return {}
  }

}
