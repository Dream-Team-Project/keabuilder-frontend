import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../_services/_builder/general.service';
import { FileUploadService } from '../_services/file-upload.service';

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
  header:any = '';
  footer:any = '';

  constructor(
    private route: ActivatedRoute,
    private _file: FileUploadService,
    private _general: GeneralService
  ) {
    // _file.gettrackingHTML('').subscribe(data=>{
    //   var html = _general.parser.parseFromString(data.html, 'text/html');
    //   this.header = html.querySelector('#kb-header-html');
    //   this.footer = html.querySelector('#kb-footer-html');
    //   this.route.paramMap.subscribe((params: ParamMap) => {
    //     var pagePrev:any = localStorage.getItem('preview-'+params.get('id'));
    //     if(pagePrev) {
    //       var ppObj:any = JSON.parse(pagePrev);
    //       var head:any = document.querySelector('head');
    //       var body:any = document.querySelector('body');
    //       var style:any = document.createElement("STYLE");
    //       body.setAttribute('style','display:none;');
    //       style.innerHTML = ppObj.style;
    //       head.innerHTML = ppObj.head;
    //       head.append(style);
    //       body.innerHTML = ppObj.body;
    //       var header = body.querySelector('HEADER');
    //       var footer = body.querySelector('FOOTER');
    //       if(header && footer) {
    //         if(header.getAttribute('kb-include-html') == 'true') {
    //           header.innerHTML = this.header.innerHTML;
    //         }
    //         if(footer.getAttribute('kb-include-html') == 'true') {
    //           footer.innerHTML = this.footer.innerHTML;
    //         }
    //       }
    //       var scrs = body.querySelectorAll('script');
    //       scrs.forEach((s:any)=>{
    //         var as = document.createElement('script');
    //         as.innerHTML = s.innerHTML;
    //         s.parentElement.append(as);
    //         s.remove();
    //       })
    //       setTimeout((e:any)=>{
    //         body.removeAttribute('style','display:none;');
    //       },500)
    //     }
    //     else _general.redirectToWebsite();
    //   })
    // })
   }

  ngOnInit(): void {
  }

}
