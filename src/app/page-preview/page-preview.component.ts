import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../_services/_builderService/general.service';
import { SectionService } from '../_services/_builderService/section.service';

@Component({
  selector: 'app-page-preview',
  template: `
    <div id="preview">
      Preview is loading...
    </div>
  `,
  styles: ["#preview{color: var(--section-color); text-align: center; display: block; margin-top: 50px; font-weight: 500;}"]
})
export class PagePreviewComponent implements OnInit {
  loaded:boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _general: GeneralService,
    private _section: SectionService
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      var pagePrev:any = localStorage.getItem('preview-'+params.get('id'));
      if(pagePrev) {
        var ppObj:any = JSON.parse(pagePrev);
        var head:any = document.querySelector('head');
        var body:any = document.querySelector('body');
        var style:any = document.createElement("STYLE");
        style.innerHTML = ppObj.style;
        head.innerHTML = ppObj.head;
        body.innerHTML = ppObj.body;
        head.append(style);
      }
      else _general.redirectToWebsite();
    })
   }

  ngOnInit(): void {
  }

}
