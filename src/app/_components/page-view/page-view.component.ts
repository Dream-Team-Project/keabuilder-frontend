import { Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { WebpagesService } from 'src/app/_services/webpages.service';
import { FunnelService } from 'src/app/_services/funnels.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ElementService } from 'src/app/_services/_builder/element.service';
import { StyleService } from 'src/app/_services/_builder/style.service';
import { ImageService } from 'src/app/_services/image.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageViewComponent implements OnInit {

  @Input ('target') target:any = 'main';
  @Input ('target_id') target_id:any;
  @Input ('target_sections') target_sections:any;
  @Input ('target_style') target_style:any;

  req = {
    uid: '',
    wid: '',
    pid: '',
  }
  page_json:any = {
    header: {sections: []},
    footer: {sections: []},
    sections: [],
    mainstyle: '',
  };

  constructor(
    private route: ActivatedRoute, 
    private webpage: WebpagesService, 
    private funnel: FunnelService,
    private meta: Meta,
    private title: Title,
    private _general: GeneralService,
    private _element: ElementService,
    private _file: FileUploadService,
    public _style: StyleService,
    public _image: ImageService) {
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let view_type = params.get('view_type');
      let param_target = params.get('view_target');
      let uid = params.get('user_id');
      let wid = params.get('website_id');
      let pid = params.get('page_id');
      let tempid = params.get('template_id');
      if(view_type == 'preview' && param_target && uid && wid && pid && this.target == 'main') {
        this.req.uid = uid
        this.req.wid = wid;
        this.req.pid = pid;
        if(param_target == 'website') {
          this.webpage.getpreviewWebpage(this.req).subscribe((resp:any)=>{
            console.log(resp)
            if(resp?.data && resp?.data.length > 1) {
              this.page_json = this._general.decodeJSON(resp.data);
              this.loadScript(this.page_json.tracking.header, document.head);
              this.addHead(this.page_json.head);
              this.loadScript(this.page_json.tracking.footer, document.body);
              document.head.innerHTML += this.page_json.head;
              this._general.fetchMenus().then(resp => {
                this.setMenu(this.page_json.sections, resp);
              })
            }
            else this._general.redirectToPageNotFound();
          })
        }
        else if(param_target == 'funnel') {
          this.funnel.getpreviewfunnelstep(this.req.pid).subscribe((resp:any)=>{
            if(resp?.data && resp?.data.length > 1) {
              this.page_json = this._general.decodeJSON(resp.data);
              this.loadScript(this.page_json.tracking.header, document.head);
              this.addHead(this.page_json.head);
              this.loadScript(this.page_json.tracking.footer, document.body);
              document.head.innerHTML += this.page_json.head;
              this._general.fetchMenus().then(resp => {
                this.setMenu(this.page_json.sections, resp);
              })
            }
            else this._general.redirectToPageNotFound();
          })
        }
        else this._general.redirectToPageNotFound();
      }
      else if(view_type == 'template' && tempid) {
        let obj = {
          tempid: tempid,
          uid: this.req.uid,
        }
        this._file.previewpagetemplate(obj).subscribe((resp:any)=>{
          if(resp?.data && resp?.data.length > 1) {
            this.page_json = this._general.decodeJSON(resp.data);
            this.addHead(this.page_json.head);
            document.head.innerHTML += this.page_json.head;
            this._general.fetchMenus().then(resp => {
              this.setMenu(this.page_json.sections, resp);
            })
          }
          else this._general.redirectToPageNotFound();
        })
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['target_sections']) {
      const style = document.createElement('style');
      style.innerHTML = this.target_style;
      style.id = 'kb-'+this.target+'-style';
      document.head.appendChild(style);
      this.page_json.sections = this.target_sections;
      this._general.fetchMenus().then(resp => {
        this.setMenu(this.page_json.sections, resp);
      })
    }
    else if(changes['target_id']) this.fetchTarget();
  }

  fetchTarget() {
    if(this.target == 'header') {
      this._file.getheader(this.target_id).subscribe((resp:any)=>{
        if(resp.data[0].json) {
          this.page_json = this._general.decodeJSON(resp.data[0].json);
          const style = document.createElement('style');
          style.innerHTML = this.page_json.style;
          style.id = 'kb-header-style';
          document.head.appendChild(style);
          this._general.fetchMenus().then(resp => {
            this.setMenu(this.page_json.sections, resp);
          })
        }
        else this.page_json.sections = [];
      })
    }
    else if(this.target == 'footer') {
      this._file.getfooter(this.target_id).subscribe((resp:any)=>{
        if(resp.data[0].json) {
          this.page_json = this._general.decodeJSON(resp.data[0].json);
          const style = document.createElement('style');
          style.innerHTML = this.page_json.style;
          style.id = 'kb-footer-style';
          document.head.appendChild(style);
          this._general.fetchMenus().then(resp => {
            this.setMenu(this.page_json.sections, resp);
          })
        }
        else this.page_json.sections = [];
      })
    }
  }

  setMenu(sections:any, menus:any) {
    sections.forEach((sec:any)=>{
      sec.rowArr.forEach((row:any)=>{
        row.columnArr.forEach((col:any)=>{
          col.elementArr.forEach((ele:any)=>{
            var cont = ele.content;
            if(cont.name == 'menu') {
              menus.forEach((menu:any)=>{
                if(menu.id == cont.data_id) {
                  var menuObj = JSON.parse(JSON.stringify(menu));
                  ele.content = this._element.setMenu(cont, menuObj);
                }
              })
            }
        })
      })
      })
    })
  }

  addHead(head:any) {
    const link:any = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = '/assets/uploads/images/keaimage-favicon-'+this.req.wid+'.png';
    document.getElementsByTagName('head')[0].appendChild(link);
    this.title.setTitle(head.title);
    this.meta.addTag({ name: 'author', content: head.author });
    this.meta.addTag({ name: 'keywords', content: head.keywords });
    this.meta.addTag({ name: 'description', content: head.description });
    const style = document.createElement('style');
    style.innerHTML = head.style + head.page_code;
    style.id = 'kb-style-'+this.req.pid;
    document.head.appendChild(style);
    const script = document.createElement('script');
    script.src = '/assets/script/tracking.js';
    script.async = true;
    document.head.appendChild(script);
  }

  loadScript(code:any, targetElement:any) {
    const container = document.createElement('div');
    container.innerHTML = code;
    const scriptElements = container.querySelectorAll('script');
    scriptElements.forEach((scriptElement) => {
      const script:any = document.createElement('script');
      script.text = scriptElement.textContent;
      targetElement.appendChild(script);
    });
    const styleElements = container.querySelectorAll('style');
    styleElements.forEach((styleElement) => {
      const style:any = document.createElement('style');
      style.textContent = styleElement.textContent;
      targetElement.appendChild(style);
    });
  }
}