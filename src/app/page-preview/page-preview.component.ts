import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../_services/_builder/general.service';
import { FileUploadService } from '../_services/file-upload.service';

@Component({
  selector: 'app-page-preview',
  template: ``,
  styles: ["body.kb-preview:after {content: 'Preview is loading...';position: absolute;background: #fff;left: 0;top: 0;width: 100%;height: 100%;justify-content: center;align-items: center;display: flex;color: var(--section-color);}"],
  encapsulation: ViewEncapsulation.None,
})
export class PagePreviewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _file: FileUploadService,
    private _general: GeneralService
  ) {
    document.body.classList.add('kb-preview');
    route.paramMap.subscribe((params: ParamMap) => {
      var page = { path: params.get('id'), dir: 'previews' };
      _file.getPage(page).subscribe((data: any) => {
        data.html = _general.parser.parseFromString(data.html, 'text/html');
        data.tracking.header = _general.parser.parseFromString(data.tracking.header, 'text/html');
        data.tracking.footer = _general.parser.parseFromString(data.tracking.footer, 'text/html');
        var style = document.createElement('STYLE');
        style.innerHTML = data.css+`div.kb-element-content *:not(.kb-content-item) {margin: 0!important;} body.kb-preview:after {content: 'Preview is loading...';position: absolute;background: #fff;left: 0;top: 0;width: 100%;height: 100%;justify-content: center;align-items: center;display: flex;color: var(--section-color);}`;
        data.html.head.appendChild(style);
        document.head.innerHTML = data.html.head.innerHTML;
        document.body.innerHTML = data.html.body.innerHTML;
        data.tracking.header.head.querySelectorAll('*').forEach((ele: any) => {
          var appEle = this.appendElement(ele);
          if (appEle) document.head.appendChild(appEle);
        })
        data.tracking.footer.head.querySelectorAll('*').forEach((ele: any) => {
          var appEle = this.appendElement(ele);
          if (appEle) document.body.appendChild(appEle);
        })
        setTimeout((e:any)=>{
          document.body.classList.remove('kb-preview');
        }, 1000)
      })
    })
  }

  ngOnInit(): void {
  }

  appendElement(ele: any) {
    var appEle;
    if (ele.tagName == 'STYLE') {
      appEle = document.createElement('STYLE');
      appEle.innerHTML = ele.innerHTML;
    }
    else {
      appEle = document.createElement('SCRIPT');
      appEle.innerHTML = ele.innerHTML;
    }
    return appEle;
  }

}
