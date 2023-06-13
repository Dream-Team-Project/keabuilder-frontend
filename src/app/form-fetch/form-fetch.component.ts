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

  constructor(
    private route: ActivatedRoute,
    public _form: FormService,
    public _style: StyleService,
    public _image: ImageService,
    public crmService: CrmService,
    public _general: GeneralService,
  ) { 
    route.paramMap.subscribe((params: ParamMap) => {
      var prmObj = {
        user_id: params.get('user_id'),
        form_id: params.get('form_id')
      }
      _form.formbypath(prmObj).then((data:any)=>{
        var style = document.createElement('STYLE');
        style.innerHTML = data.appendstyle;
        document.head.appendChild(style);
        _form.submission.user_id = data.user_id;
        _form.submission.form_id = data.uniqueid;
        this.setFormValidation(_form.formField);
      })
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this._form.currentScrWdth = window.innerWidth;
  }

  ngOnInit(): void {
  }

  setFormValidation(ff:any) {
    ff.forEach((e:any)=>{
      if(e.input) {
        if(e.name != 'split-text' && e.name != 'name') e.value = e.name == 'select' ? 'none' : '';
        this._form.inpAns(e);
        e.split?.forEach((spl:any)=>{
          this._form.inpAns(spl);
          spl.subsplit?.forEach((subspl:any)=>{
            this._form.inpAns(subspl);
            delete subspl?.error;
          })
          delete spl?.error;
        })
        delete e?.error;
      }
    })
  }

  formSubmit() {
    console.log(this._form.form);
    console.log(this._form.submission.email);
    console.log(this._form.ansjson);
    this.submitting = true;
    this._form.checkFields().then(res=>{
      if(res) {
        this._form.formSubmit().then((res:any)=>{
          if(res.success == 1) {
            this.createCrmContact();
            var redirection = this._form.form.redirection;
            if(this._form.form.redirenbled && redirection) window.location.replace(redirection);
            else this.thankyou = true;
          }
          else this.submitting = false;
        });
      }
      else {
        var element:any = document.getElementById('kb-form-'+this._form.submission.form_id);
        element?.scrollIntoView();
        this.submitting = false;
      }
    });
  }

  createCrmContact(){
    let data = this._general.decodeJSON(this._form.submission.json);
    var temp:any = new Object();  
    data.forEach((sub:any)=>{
      if(sub.split && sub.name != 'select' && sub.name != 'checkbox' && sub.name != 'radio') {
          sub.split?.forEach((spl:any)=>{
          if(spl.subsplit) {
            spl.subsplit?.forEach((subspl:any)=>{
              temp[subspl.placeholder.replace(/\s/g, '')] = subspl.value;
            })
          }
          else temp[spl.placeholder.replace(/\s/g, '')] = spl.value;
        })
      } 
      else temp[sub.label.replace(/\s/g, '')] = sub.value;
    })
    console.log(temp);
    let obj={firstname:temp?.FullName?temp?.FullName:temp?.FirstName,lastname:temp?.FullName?temp?.FullName:temp?.LastName,email:this._form.submission?.email,phone:temp?.Phone,list_uniqueid:this._form.form.lists,tags:this._form.form.tags,};
    console.log(obj);
    this.crmService.createcrmcontact(obj).subscribe((data:any)=>{

    });
    }

  getBlockStyle(en:string) {
    if(this._form.formEleTypes[en]) return this._style.getBlockStyle(this._form.formEleTypes[en]?.content.style);
    else return {}
  }

}
