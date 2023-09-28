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
import { environment } from 'src/environments/environment';
import { PageViewService } from 'src/app/_services/page-view.service';


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
  @Input ('target_menus') target_menus:any;

  appHost:any = environment.appHost;
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
  defaultPage:boolean = false;
  pageNotFound:boolean = false;

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
    public _image: ImageService,
    private _pageviewService:PageViewService,) {
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if(this.target == 'main') {
        const routeData:any = this.route.snapshot.data;
        const domain = routeData.domain;
        const path = routeData.path;
        // const domain = 'kailashCrXPpiAtnpILHji.keapages.com';
        // const path = '/test';
        if(this.appHost === domain) {
          let param_target = params.get('view_target');
          let uid = params.get('user_id');
          let wid = params.get('website_id');
          let pid = params.get('page_id');
          let tempid = params.get('template_id');
          if(param_target == 'template' && tempid) {
            let obj = {
              tempid: tempid,
              uid: this.req.uid,
            }
            this._file.previewpagetemplate(obj).subscribe((resp:any)=>{
              if(resp?.data && resp?.data.length > 0) {
                this.page_json = this._general.decodeJSON(resp.data);
                if(this.page_json) {
                  this.addHead(this.page_json.head);
                  this.setMenu(this.page_json);
                }
              }
              else this._general.redirectToPageNotFound();
            })
          }
          else if(param_target && uid && wid && pid) {
            this.req.uid = uid;
            this.req.wid = wid;
            this.req.pid = pid;
            if(param_target == 'website') {
              this.webpage.getpreviewWebpage(this.req).subscribe((resp:any)=>{
                if(resp?.data && resp?.data.length > 0) {
                  this.setLoadScript(resp.data);
                }
                else this._general.redirectToPageNotFound();
              })
            }
            else if(param_target == 'funnel') {
              this.funnel.getpreviewfunnelstep(this.req).subscribe((resp:any)=>{
                if(resp?.data && resp?.data.length > 0) {
                  this.setLoadScript(resp.data);
                }
                else this._general.redirectToPageNotFound();
              })
            }
          }
          else this._general.redirectToPageNotFound();
        }
        else if(domain){
          let obj={
            domain:domain,
            path:path.split('/')[1]
          };
          this._pageviewService.fetchPageByDomain(obj).subscribe((resp:any)=>{
            if(resp.data == 'default') {
              this.addFavicon(resp.wid);
              this.defaultPage = true;
            }
            else if(resp?.success && resp?.data && resp?.data.length > 0) {
                this.req.uid = resp.uid;
                this.req.wid = resp.wid;
                this.req.pid = resp.pid;
                this.setLoadScript(resp.data);
            }
            else this.pageNotFound = true;
          })
        }
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
      this.page_json.menus = this.target_menus;
      this.setMenu(this.page_json);
    }
    else if(changes['target_id']) this.fetchTarget();
  }

  fetchTarget() {
    if(this.target == 'header') {
      this._file.getheader(this.target_id).subscribe((resp:any)=>{
        if(resp.data[0]?.json) {
          this.page_json = this._general.decodeJSON(resp.data[0].json);
          if(this.page_json) {
            if(resp.menus) this.page_json.menus = resp.menus;
            const style = document.createElement('style');
            style.innerHTML = this.page_json.style;
            style.id = 'kb-header-style';
            document.head.appendChild(style);
            this.loadCustomCode();
            this.setMenu(this.page_json);
          }
        }
        else this.page_json.sections = [];
      })
    }
    else if(this.target == 'footer') {
      this._file.getfooter(this.target_id).subscribe((resp:any)=>{
        if(resp.data[0]?.json) {
          this.page_json = this._general.decodeJSON(resp.data[0].json);
          if(this.page_json) {
            if(resp.menus) this.page_json.menus = resp.menus;
            const style = document.createElement('style');
            style.innerHTML = this.page_json.style;
            style.id = 'kb-footer-style';
            document.head.appendChild(style);
            this.loadCustomCode();
            this.setMenu(this.page_json);
          }
        }
        else this.page_json.sections = [];
      })
    }
  }

  addFavicon(wid:string) {
    const link:any = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = '/assets/uploads/images/keaimage-favicon-'+wid+'.png';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  addHead(head:any) {
    if(head) {
      this.addFavicon(this.req.wid);
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
      script.type = 'text/javascript'; 
      script.async = true;
      document.head.appendChild(script);
      const hmscript = document.createElement('script');
      hmscript.src = '/assets/script/heatmap.js';
      hmscript.type = 'text/javascript'; 
      hmscript.async = true;
      document.head.appendChild(hmscript);
    }
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

  loadCustomCode() {
    setTimeout(()=>{
      document.querySelectorAll('app-page-view .kb-element-content .kb-code-block').forEach((item:any)=>{
        let htmlData = item.getAttribute('html-data');
        this.loadScript(htmlData, document.body);
      })
    }, 10)
  }

  setLoadScript(data:any) {
    this.page_json = this._general.decodeJSON(data);
    this.loadScript(this.page_json.tracking.header, document.head);
    this.addHead(this.page_json.head);
    this.loadScript(this.page_json.tracking.footer, document.body);
    if(this.page_json.sections) {
      this.setMenu(this.page_json);
      this.loadCustomCode();
    }
  }

  setMenu(data:any) {
    if(data.sections) {
      data.sections.flatMap((sec:any)=>{
        sec.rowArr.flatMap((row:any)=>{
          row.columnArr.flatMap((col:any)=>{
            col.elementArr.filter((ele:any)=>{
              var cont = ele.content;
              if(cont.name == 'menu') {
                data.menus?.filter((menu:any)=>{
                  if(menu.uniqueid == cont.data_id) {
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
  }

  redirectLink(redir:any) {
    console.log(redir);
    if(redir?.link) window.open(redir.link, redir.target);
  }

  toggleRespMenu(menu:any) {
    menu.menuOpen = !menu.menuOpen
  }

}
