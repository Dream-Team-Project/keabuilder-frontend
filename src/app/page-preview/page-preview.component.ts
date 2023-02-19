import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../_services/_builder/general.service';
import { FileUploadService } from '../_services/file-upload.service';

@Component({
  selector: 'app-page-preview',
  template: ``,
  styles: [''],
  encapsulation: ViewEncapsulation.None,
})
export class PagePreviewComponent implements OnInit {
  html:any;
  style:any = 'background-color: #2e2e2e; width:100%; height:100%; justify-content:center; align-items:center; display:flex;';
  loader = `<svg style="width: 100px; height: 100px; background-color: #dea641;" version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"> <rect fill="none" stroke="#fff" stroke-width="4" x="25" y="25" width="50" height="50"> <animateTransform attributeName="transform" dur="0.5s" from="0 50 50" to="180 50 50" type="rotate" id="strokeBox" attributeType="XML" begin="rectBox.end"></animateTransform> </rect> <rect x="27" y="27" fill="#fff" width="46" height="50"> <animate attributeName="height" dur="1.3s" attributeType="XML" from="50" to="0" id="rectBox" fill="freeze" begin="0s;strokeBox.end"></animate> </rect> </svg>`;
  constructor(
    private route: ActivatedRoute,
    private _file: FileUploadService,
    private _general: GeneralService
  ) {
    this.html = document.querySelectorAll('HTML')[0];
    this.html.style = this.style;
    document.body.innerHTML = this.loader;
    route.paramMap.subscribe((params: ParamMap) => {
      var page = { uuid: params.get('user_id'), website_id: params.get('website_id'), path: params.get('path_id'), dir: 'previews' };
      _file.getPreview(page).subscribe((data: any) => {
        data.html = _general.parser.parseFromString(data.html, 'text/html');
        data.tracking.header = _general.parser.parseFromString(data.tracking.header, 'text/html');
        data.tracking.footer = _general.parser.parseFromString(data.tracking.footer, 'text/html');
        var style = document.createElement('STYLE');
        style.innerHTML = data.css;
        data.html.head.appendChild(style);
        document.head.innerHTML = data.html.head.innerHTML;
        data.tracking.header.head.querySelectorAll('*').forEach((ele: any) => {
          var appEle = this.appendElement(ele);
          if(appEle) document.head.appendChild(appEle);
        })
        data.tracking.footer.head.querySelectorAll('*').forEach((ele: any) => {
          var appEle = this.appendElement(ele);
          if (appEle) document.body.appendChild(appEle);
        })
        setTimeout((e:any)=>{
          document.body.innerHTML = data.html.body.innerHTML;
          this.html.removeAttribute('style');
          var script = document.createElement('SCRIPT');
          script.innerHTML = `
          document.querySelectorAll('iframe').forEach((iframe)=>{
            iframe.onload = function($event) {
              var target = $event.target;
              setTimeout((e)=>{
                target.height = target.contentWindow.document.documentElement.scrollHeight+'px';
              }, 100)
            }
          })`;
          document.head.appendChild(script);
        }, 1000);
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
