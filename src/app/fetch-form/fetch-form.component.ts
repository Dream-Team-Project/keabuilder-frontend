import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormService } from '../_services/_builder/form.service';
import { StyleService } from '../_services/_builder/style.service';
import { ImageService } from '../_services/image.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fetch-form',
  templateUrl: './fetch-form.component.html',
  styleUrls: ['./fetch-form.component.css','../form-builder/form-builder.component.css']
})
export class FetchFormComponent implements OnInit {

  submitting:boolean = false;
  thankyou:boolean = false;

  constructor(
    private route: ActivatedRoute,
    public _form: FormService,
    public _style: StyleService,
    public _image: ImageService
  ) { 
    route.paramMap.subscribe((params: ParamMap) => {
      var obj:any = {user_id: params.get('user_id'), form_id: params.get('form_id')};
      _form.formbypath(obj).then((data:any)=>{
        var style = document.createElement('STYLE');
        style.innerHTML = data.appendstyle;
        document.head.appendChild(style);
        this._form.answers.form_id = data.uniqueid;
        this._form.formField.forEach((fe:any)=>{
          if(fe.input) this._form.inpAns(fe);
        })
      })
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this._form.currentScrWdth = window.innerWidth;
  }

  ngOnInit(): void {
  }

  formSubmit() {
    this.submitting = true;
    this._form.checkFields().then(res=>{
      if(res) {
        this._form.formSubmit().then((res:any)=>{
          if(res.success == 1) {
            var redirection = this._form.form.redirection;
            if(redirection) window.location.replace(redirection);
            else this.thankyou = true;
          }
          else this.submitting = false;
        });
      }
      else this.submitting = false;
    });;
  }

  getBlockStyle(en:string) {
    if(this._form.formEleTypes[en]) return this._style.getBlockStyle(this._form.formEleTypes[en]?.content.style);
    else return {}
  }

}
