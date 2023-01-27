import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormService } from '../_services/_builder/form.service';
import { StyleService } from '../_services/_builder/style.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-fetch-form',
  templateUrl: './fetch-form.component.html',
  styleUrls: ['./fetch-form.component.css','../form-builder/form-builder.component.css']
})
export class FetchFormComponent implements OnInit {

  chngDetection:boolean = true;

  constructor(
    private route: ActivatedRoute,
    public _form: FormService,
    public _style: StyleService,
    public _image: ImageService
  ) { 
    route.paramMap.subscribe((params: ParamMap) => {
      var path:any = params.get('path');
      _form.formbypath(path).then((data:any)=>{
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

  getBlockStyle(en:string) {
    if(this._form.formEleTypes[en]) return this._style.getBlockStyle(this._form.formEleTypes[en]?.content.style);
    else return {}
  }
}
