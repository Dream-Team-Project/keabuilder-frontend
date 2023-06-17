import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormService } from '../_services/_builder/form.service';
import { StyleService } from '../_services/_builder/style.service';
import { ImageService } from '../_services/image.service';
import { CrmService } from '../_services/_crmservice/crm.service';
import { GeneralService } from '../_services/_builder/general.service';

@Component({
  selector: 'app-form-fetch',
  templateUrl: './form-fetch.component.html',
  styleUrls: ['./form-fetch.component.css','../form-builder/form-builder.component.css']
})
export class FormFetchComponent implements OnInit { 
  
  submitting:boolean = false;
  thankyou:boolean = false;
  showErrors:boolean = false;
  formans:Array<any> = [];
  contact = {
    fistname: '',
    lastname: '',
    email: '',
    phone: '',
    fieldans: '',
    lists: '',
    tags: ''
  }

  constructor(
    private route: ActivatedRoute,
    public _form: FormService,
    public _style: StyleService,
    public _image: ImageService,
    public crmService: CrmService,
    public _general: GeneralService,
  ) { 
    route.paramMap.subscribe((params: ParamMap) => {
      var form_id = params.get('form_id');
      _form.getForm(form_id).then((data:any)=>{
        var style = document.createElement('STYLE');
        style.innerHTML = data.appendstyle;
        document.head.appendChild(style);
      })
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this._form.currentScrWdth = window.innerWidth;
  }

  ngOnInit(): void {
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
        ff.value = tempVal.map((v:any)=> v.value).join(',');
    }
    else ff.value = ff.options[i].value;
  }

  validateFields() {
    return new Promise((resolve, reject)=>{
      var loop = 0;
      var res = true;
      this.formans = this._form.formField.filter((fe:any)=> fe.field_tag);
      this.formans.forEach((ff:any)=>{
        ff.error = !ff.value && ff.required;
        if(ff.type == 'email') ff.invalid = !this.validateEmail(ff.value);
        if(ff.error || ff.invalid) res = false;
        if(this.formans.length-1 == loop) resolve(res);
        loop++;
      })
    })
  }

  validateEmail(value:any) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
  }

  formSubmit() {
    // this.submitting = true;
    this.validateFields().then(res=>{
      if(res) {
        var formAnsJSON = this.formans.map((obj:any)=>{return {id: obj.id, value: obj.value}});
        this.contact.fieldans = this._general.encodeJSON(formAnsJSON);
        console.log(this.contact.fieldans);
        // this._form.formSubmit().then((res:any)=>{
        //   if(res.success == 1) {
        //     var redirection = this._form.form.redirection;
        //     if(this._form.form.redirenbled && redirection) window.location.replace(redirection);
        //     else this.thankyou = true;
        //   }
        //   else this.submitting = false;
        // });
      }
      else {
        var element:any = document.getElementById('kb-form-'+this._form.submission.form_id);
        element?.scrollIntoView();
        this.submitting = false;
      }
    });
  }

  getBlockStyle(en:string) {
    if(this._form.formEleTypes[en]) return this._style.getBlockStyle(this._form.formEleTypes[en]?.content.style);
    else return {}
  }

}
