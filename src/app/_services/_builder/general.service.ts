import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from '../file-upload.service';
import {A, B, COMMA, ENTER} from '@angular/cdk/keycodes';
import { TokenStorageService } from '../token-storage.service';
import { AuthService } from '../auth.service';
import { WebpagesService } from '../webpages.service';
import { WebsiteService } from '../website.service';
import { FunnelService } from '../funnels.service';
import { UserService } from '../user.service';
import { FormControl, Validators } from '@angular/forms';
import { NgxCaptureService } from 'ngx-capture';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  userdomain:string = 'keapages.com';
  includeLayout:any = {header:true, footer:true};
  user:any;
  autosave:any = '';
  autosaveopt:any = [{value:10, unit:'sec'}, {value:30, unit:'sec'}, {value:1, unit:'min'}, {value:2, unit:'min'}, {value:5, unit:'min'}];
  subdomain:string = '';
  target:any = {
    id: '',
    name: '',
    type: ''
  };
  webpage:any = {uniqueid: ''};
  page_general_tab:any = 'info';
  main:any = {id: 'kb-main', name: 'New Page', title: 'New Page', path: 'new-page', description: 'This page is built using Keabuilder.', keywords: [], author: '', meta_img: '', type: 'main', publish_status: true, style: {desktop:'', tablet_h:'', tablet_v:'', mobile:'', hover: ''}};
  page_name = '';
  page_title = '';
  page_path = '';
  description = '';
  keywords:any = [];
  author = '';
  meta_img = '';
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  lastDevList:any;
  respDevices:any = {
    'desktop': {name:'desktop', width:''},
    'tablet-h':{name:'tablet-h', width:'1024px'},
    'tablet-v':{name:'tablet-v', width:'768px'},
    'mobile':{name:'mobile', width:'425px'},
    'hover': {name:'hover', width:''},
  };
  respToggleDevice:any = this.respDevices['desktop'];
  undoRedo:any = {toggle: false, open: false, close: false};
  allBlocksIds:Array<number> = [];
  selectedBlock:any = {};
  showBackToRowOption:boolean = false;
  sideFloatBtnAnim = {open: false, close: false};
  blockSelection:string = '';
  imgSelection:boolean = false;
  minimize:boolean=false;
  expand:boolean= false;
  screenWidth:any;
  screenHeight:any;
  showEditor:boolean = false;
  showInlineEditor:boolean = false;
  insideEditor:boolean = false;
  selectedTab:any;
  expPanelStep = 0;
  config: any = {
    height: 250,
    plugins:
      'image print preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen link template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars',
    toolbar:
      'undo redo | bold italic underline strikethrough link blockquote | forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist table outdent indent charmap | formatselect fontselect fontsizeselect | code',
    content_css: [
      // '../builder/material.component.css',
      // '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      // '//www.tinymce.com/css/codepen.min.css',
    ],
    images_upload_base_path: '/some/basepath',
    images_upload_credentials: true,
  images_upload_url: './api/uploadfile',
  images_upload_handler: function (blobInfo:any, success:any, failure:any) {
    setTimeout(function () {
      success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
    }, 2000);
  },
    importcss_append: true,
    menubar: false,
    statusbar: false,
    branding: false,
    setup: (editor: { ui: any; }) => {
      // console.log(editor.ui);
    },
    diskCache: true
  };
  includeCond:string = `if(file_exists('../'.$path)) include('../'.$path); else if(file_exists($path)) include($path);`;
  pagehtml:any;
  pageObj:any;
  pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: '', hover: ''};
  parser = new DOMParser();
  loading = {
    success: false,
    error: false
  };
  saveDisabled:boolean = false;
  pathError:boolean = false;
  sectionTemplates:any = [];
  forms:any = [];
  menus:any = [];
  headers:any = [];
  footers:any = [];
  deletedMenuIds:any = [];
  selectedMenu:any = {};
  selectedHeader:any = {};
  selectedFooter:any = {};
  existwebpages:any = [];
  funnels:any = [];
  step_products:any = [];
  page_code:any = '';
  menu_target_types = [
    { name: 'same tab', value: '_self' },
    { name: 'new tab', value: '_blank' },
    { name: 'linked new tab', value: 'framename' },
  ];
  templatesUpdated = new BehaviorSubject(false);
  filterOrder:any = [{icon: 'ascending', name:'Ascending By Name', value: 'asc', type: 'name'}, {icon: 'ascending', name:'Ascending By Date', value: 'asc', type: 'id'}, {icon: 'descending', name:'Descending By Name', value: 'desc', type: 'name'}, {icon: 'descending', name:'Descending By Date', value: 'desc', type: 'id'}];
  searchFilter:any = this.filterOrder[3];
  pageSaved:boolean = true;

  constructor(public userService: UserService, private _snackBar: MatSnackBar, public _file: FileUploadService, public tokenStorageService: TokenStorageService, public authService: AuthService, public webPageService: WebpagesService, public websiteService: WebsiteService, public funnelService: FunnelService, private captureService: NgxCaptureService) {
    if(this.tokenStorageService.getToken()) {
        this.user = this.tokenStorageService.getUser();
        this.userService.getUsersDetails().subscribe(data=>{
        this.user = {...this.user, ...data.data[0]};
        this.user.name = this.user.username;
        this.main.author = this.user.name;
        this.subdomain = 'https://'+this.joinWthDash(this.user.subdomain)+'.'+this.userdomain+'/';
        this.screenWidth = window.innerWidth;  
        this.screenHeight = window.innerHeight; 
      })
    }
  }

  fetchSectionTemplates() {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchtemplates().subscribe((data:any)=>{
        this.sectionTemplates = data.data;
        this.templatesUpdated.next(!this.templatesUpdated.value);
        resolve(true);
      })
    });
  }

  fetchMenus() {
    const menus:any = [];
    return new Promise<any>((resolve, reject) => {
      this._file.fetchFiles('menus').subscribe((data:any)=>{
        if(!data.success) resolve(menus);
        var ulc = 0;
        data.data.forEach((html:any)=>{
          var doc = this.parser.parseFromString(html, 'text/html');
          var ul = doc.querySelector('ul');
          var menu:any = {id: ul?.id, name: ul?.getAttribute('data-name'), type: 'menu', html: html, items: []}
          var lic = 0;
          var list:any = ul?.querySelectorAll('li');
          list.forEach((li:any) => {
            var anc:any = li.querySelector('a');
            var item = {id: anc?.id, name: anc?.innerText, type: 'item', link: anc.getAttribute('href'), target: anc?.target };
            menu.items.push(item);
            if(ulc == data.data.length-1 && lic == list.length-1) {
              resolve(menus);
            }
            lic++;
          })
          menus.push(menu);
          ulc++;
        })
      })
    })
  }

  fetchForms() {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchforms().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }

  fetchHeaders() {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchheaders().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }

  fetchFooters() {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchfooters().subscribe((resp:any)=>{
        resolve(resp.data);
      })
    })
  }

  getBuilderData(id:any) {
    return new Promise<any>((resolve, reject) => {
      this.fetchMenus().then(data=>{
        this.menus = data;
        if(this.target.type != 'header' && this.target.type != 'footer') {
          this.fetchHeaders().then(data=>{
            this.headers = data;
          })
          this.fetchFooters().then(data=>{
            this.footers = data;
          })
          this.fetchForms().then(data=>{
            this.forms = data;
          })
        }
        if(this.target.type == 'website') {
          this.webPageService.getSingleWebpage(id).subscribe(
            (e:any)=>{
              this.setBuilder(e).then(resp=>{
                resolve(resp);
              })
            },
            (err:any) => {
              this.loading.error = true;
              resolve(false);
            }
          )
        }
        else if(this.target.type == 'funnel') {
          this.funnelService.getSingleFunnelpage(id).subscribe(
            (e:any)=>{
              this.setBuilder(e).then(resp=>{
                resolve(resp);
              })
            },
            (err:any) => {
              this.loading.error = true;
              resolve(false);
            }
          )
        }
        else if(this.target.type == 'header') {
          this._file.getheader(id).subscribe((resp:any)=>{
            resolve(resp.data[0]);
          })
        }
        else if(this.target.type == 'footer') {
          this._file.getfooter(id).subscribe((resp:any)=>{
            resolve(resp.data[0]);
          })
        }
        else resolve(false);
      });
    })
  }

  setMenu(html:any) {
    return new Promise<any>((resolve, reject) => {
      var i = 0;
      var doc = this.parser.parseFromString(html, 'text/html');
      var appendmenus = doc.querySelectorAll('[data-name="menu"]');
      if(appendmenus.length == 0) resolve(doc);
      appendmenus.forEach((data:any)=>{
        if(data) {
          var menu = this.menus.filter((m:any)=>m.id == data.getAttribute('data-id'))
          if(menu.length != 0) {
            data.innerHTML = menu[0].html;
            if(appendmenus.length-1 == i) {
              resolve(doc);
            }
          }
          i++;
        }
      })
    })
  }

  setHeader(headid:any) {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchFile('kb-header-'+headid, 'headers').subscribe((data1)=>{
        this.setMenu(data1.html).then(data2=>{
          data1.id = headid;
          data1.html = data1.html ? data2.querySelector('STYLE').outerHTML+data2.querySelector('BODY').innerHTML : null;
          this.selectedHeader = data1;
          this.includeLayout.header = true;
          resolve(true);
        });
      })
    })
  }

  setFooter(footid:any) {
    return new Promise<any>((resolve, reject) => {
      this._file.fetchFile('kb-footer-'+footid, 'footers').subscribe((data1)=>{
        this.setMenu(data1.html).then(data2=>{
          data1.id = footid;
          data1.html = data1.html ? data2.querySelector('STYLE').outerHTML+data2.querySelector('BODY').innerHTML : null;
          this.selectedFooter = data1;
          this.includeLayout.footer = true;
          resolve(true);
        });
      })
    })
  }
  
  setBuilder(e:any) {
    return new Promise<any>((resolve, reject) => {
      if(e.data.length == 0) this.redirectToPageNotFound();
      this.webpage = e.data[0];
      this.main.name = this.webpage.page_name;
      this.main.title = this.webpage.page_title;
      this.main.path = this.webpage.page_path;
      this.main.website_id = this.webpage.funnelid ? this.webpage.funnelid : this.webpage.website_id;
      if(this.webpage.page_description) this.main.description = this.webpage.page_description;
      if(this.webpage.page_keywords) this.main.keywords = this.webpage.page_keywords.split(',');
      this.main.author = this.webpage.page_author;
      var status = this.webpage.publish_status == 1;
      this.main.publish_status = status;
      this.main.dir = status ? 'pages' : 'drafts';
      this._file.getPage(this.main).subscribe({
        next: (file:any)=>{
          resolve(file);
        },
        error: (err:any) => {
          this.loading.error = true;
          resolve(false);
        }
      });
    })
  }

  preview() {
    var uniqueid = this.target.type == 'funnel' ? this.webpage.funnelid : this.webpage.website_id;
    window.open(window.location.protocol+'//'+window.location.host+'/preview/'+uniqueid+'/'+this.webpage.uniqueid, 'framename');
  }

  saveHeaderFooter(main:any, sections:any) {
    this.pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: '', hover: ''};
    return new Promise<any>((resolve, reject) => {
      this.pagehtml = this.parser.parseFromString(main.children[0].innerHTML, 'text/html');
      this.removeExtra(false);
      this.setPageStyle(sections);
      var obj:any = new Object();
      obj.id  = 'kb-'+this.target.type+'-'+this.target.id;
      obj.html = '<style>'+this.getAllStyle()+'</style>'+this.removeCommments(this.pagehtml.querySelector('body').innerHTML);
      var dbobj:any = new Object();
      dbobj.name = this.target.name;
      dbobj.uniqueid = this.target.id;
      var jsonObj = {sections: sections};
      dbobj.json = this.encodeJSON(jsonObj);
      if(this.target.type == 'header') {
        this._file.saveFile(obj, 'headers').subscribe(e=>{
          this._file.updateheader(dbobj).subscribe((resp:any)=>{
            this.pageSaved = true;
            resolve(true);
          })
        },
        error=>{resolve(false);});
      }
      else if(this.target.type == 'footer') {
        this._file.saveFile(obj, 'footers').subscribe(e=>{
          this._file.updatefooter(dbobj).subscribe((resp:any)=>{
            this.pageSaved = true;
            resolve(true);
          })
        },
        error=>{resolve(false);});
      }
    });
  }

  saveHTML(main:any, sections:any, preview:boolean, tglDraft:boolean) {
    return new Promise<any>((resolve, reject) => {
      this.pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: '', hover: ''};
      this.setPageStyle(sections);
      var websiteid = this.webpage.website_id;
      var jsonObj = {header: false, footer: false, mainstyle: this.main.style, sections: sections};
      this.pagehtml = this.parser.parseFromString(main.innerHTML, 'text/html');
      var header = this.pagehtml.querySelector('header');
      if(this.includeLayout.header && this.selectedHeader.html) {
        if(header) header.innerHTML = this.selectedHeader.html;
        else if(preview) {
          var h = document.createElement('HEADER');
          h.id = this.selectedHeader.id;
          h.innerHTML = this.selectedHeader.html;
          this.pagehtml.body.insertBefore(h, this.pagehtml.getElementById('kb-main'));
        }
        if(!preview) {
          header.id = 'kb-header-'+this.selectedHeader.id;
          header.innerHTML = `<?php $path="../../../headers/${header.id}.php"; `+this.includeCond+` ?>`;
        }
        jsonObj.header = this.selectedHeader;
      }
      else header?.remove();
      var footer = this.pagehtml.querySelector('footer');
      if(this.includeLayout.footer && this.selectedFooter.html) {
        if(footer) footer.innerHTML = this.selectedFooter.html;
        else if(preview) {
          var f = document.createElement('FOOTER');
          f.id = this.selectedFooter.id;
          f.innerHTML = this.selectedFooter.html;
          this.pagehtml.body.appendChild(f);
        }
        if(!preview) {
          footer.id = 'kb-footer-'+this.selectedFooter.id;
          footer.innerHTML = `<?php $path="../../../footers/${footer.id}.php"; `+this.includeCond+` ?>`;
        }
        jsonObj.footer = this.selectedFooter;
      }
      else footer?.remove();
      this.webpage.page_json = this.encodeJSON(jsonObj);
      this.removeExtra(preview);
      this.pagehtml.querySelector('head').innerHTML = 
      '<link rel="icon" type="image/x-icon" href="'+window.location.origin+'/assets/uploads/images/keaimage-favicon-'+websiteid+'.png'+'">' +
      '<meta charset="UTF-8">' +
      '<meta name="description" content="'+this.main.description+'">' +
      '<meta name="keywords" content="'+this.main.keywords+'">' +
      '<meta name="author" content="'+this.main.author+'">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      '<title>'+this.main.title+'</title>' +        
      '<link rel="stylesheet" href="'+window.location.origin+'/assets/style/builder.css">';
      this.pagehtml.querySelector('body').innerHTML += `<?php $path="../tracking/footer-tracking.php"; `+this.includeCond+` ?>`;
      this.pageObj = {
        head: this.removeCommments(this.pagehtml.querySelector('head').outerHTML),
        body: this.removeCommments(this.pagehtml.querySelector('body').outerHTML),
        style: this.getAllStyle(),
        website_id: websiteid
      }
      if(preview) {
        var prevObj = JSON.parse(JSON.stringify(this.pageObj));
        prevObj.prevFolder = this.webpage.uniqueid;
        prevObj.folder = this.webpage.uniqueid;
        prevObj.dir = 'previews';
        this._file.savePage(prevObj).subscribe((event:any)=>{
          resolve(true);
        },
        error=>{
          this.openSnackBar(true, 'Server Error! Please try to save your page.', 'OK', 'center', 'top');
          resolve(false);
        });
      }
      else {
        var status = this.main.publish_status;
        this.pageObj.head = `<?php $path="../tracking/header-tracking.php"; `+this.includeCond+` ?>` + '<link rel="stylesheet" href="../'+this.main.path+'/style.css">' + this.pageObj.head;
        this.pageObj.folder = this.main.path;
        this.pageObj.prevFolder = this.webpage.page_path;
        this.pageObj.dir = status ? 'pages' : 'drafts';
        if(tglDraft) {
          var td = {
            status:(status ? 'publish' : 'draft'), 
            path: this.main.path,
            website_id: websiteid
          }
          this._file.toggleDraft(td).subscribe((data:any)=>{
            this.savePage().then(resp=>resolve(resp));
          })
        }
        else this.savePage().then(resp=>resolve(resp));
      }
    });
  }

  savePage() {
    return new Promise<any>((resolve, reject) => {
      this.updatePageDB().then(e=>{
        if(e.found == 0) {
          this._file.savePage(this.pageObj).subscribe(
            (event:any) => {
              if(e.ishome) {
                var obj = {
                  dir: this.main.publish_status ? 'pages' : 'drafts',
                  path: event.data.folder,
                  website_id: this.webpage.website_id
                }
                if(obj.dir == 'drafts') {
                  this._file.createdefaulthome(obj).subscribe((d:any)=>{
                      this.pageSaved = true;
                      resolve(true);
                  });
                }
                else {
                  this._file.updateHome(obj).subscribe((d:any)=>{
                    this.pageSaved = true;
                    resolve(true);
                });
                }
              }
              else {
                this.pageSaved = true;
                resolve(true);
              }
            },
          error=>{
            this.openSnackBar(true, 'Server Error!', 'OK', 'center', 'top');
            resolve(false);
          })
        }
        else if(e.found == 1) {
          this.pathError = true;
          resolve(false);
        }
        else resolve(false);
      })
    })
  }

  updatePageDB() {
    return new Promise<any>((resolve, reject) => {
      var status = this.main.publish_status;
      var dbobj:any = {
        id: this.webpage.id,
        uniqueid: this.webpage.uniqueid,
        page_name: this.main.name,
        page_title: this.main.title,
        page_path: this.main.path,
        page_description: this.main.description,
        page_keywords: this.main.keywords ? this.main.keywords.join(',') : '',
        page_author: this.main.author,
        page_json: this.webpage.page_json,
        publish_status: status ? 1 : 0,
      }
      if(this.target.type == 'website'){
        this.webPageService.updateWebpage(dbobj).subscribe(
          (e:any)=>{
            resolve(e);
          })
      }
      else if(this.target.type == 'funnel'){
        dbobj.funneltype = this.webpage.funneltype;
        this.funnelService.updatefunnelpage(dbobj).subscribe(
          (e:any)=>{
            resolve(e);
          })
      }
      else resolve(false);
    })
  }

  removeCommments(html:any) {
    html = html.replaceAll('<!--?php','<?php').replaceAll('?-->','?>');
    return html.replace(/\r?\n|\r/g, "").replace(/<!--[\s\S]*?-->/g,"")
  }

  removeExtra(preview:boolean) {
    var body = this.pagehtml.querySelector('BODY');
    var regExpArr = [/style="(.*?)"/g, /cdkdrag="(.*?)"/g, /cdkdroplist="(.*?)"/g, /ng-reflect-id="(.*?)"/g, /ng-reflect-data="(.*?)"/g, 
    /ng-reflect-ng-="(.*?)"/g, /ng-reflect-ng-style="(.*?)"/g, /ng-reflect-ng-class="(.*?)"/g, /ng-reflect-ng-switch="(.*?)"/g, /ng-reflect-connected-to="(.*?)"/g, 
    /ng-reflect-enter-predicate="(.*?)"/g, /ng-star-inserted/g, /cdk-drag/g, /cdk-drag-handle/g, /cdk-drop-list/g, 
    /id="sectiongroup-(.*?)"/g, /id="rowgroup-(.*?)"/g, /id="elementgroup-(.*?)"/g];
    body.querySelectorAll('.kb-ispan-add').forEach((item:any)=>item.remove());
    body.querySelectorAll('.kb-module-setting').forEach((item:any)=>item.remove());
    regExpArr.forEach((re:any)=>{
      body.innerHTML = body.innerHTML.replace(re, '');
    })
    if(!preview) this.pagehtml.querySelectorAll('.kb-menu').forEach((item:any)=>{
      item.outerHTML = `<?php $path="../../../menus/`+item.id+`.php"; `+this.includeCond+` ?>`;
    });
    body.querySelectorAll('.kb-code-block').forEach((item:any)=>{
      var cb = this.decodeData(item.getAttribute('html-data'));
      item.removeAttribute('html-data');
      var doc = this.parser.parseFromString(cb, 'text/html');
      item.innerHTML = doc.body.innerHTML;
    });
    this.pagehtml.querySelector('BODY').innerHTML = body.innerHTML;
  }

  getAllStyle() {
    var querry = '@media only screen and (max-width:';
    return this.pagestyling.desktop + this.pagestyling.hover +
    querry + '1024px) and (min-width:769px){'+this.pagestyling.tablet_h+'}' +
    querry + '768px) and (min-width:426px){'+this.pagestyling.tablet_v+'}' +
    querry + '426px){'+this.pagestyling.mobile+'}';
  }

  setPageStyle(sections:any) {
    if(this.target.type == 'website' || this.target.type == 'funnel') this.blockStyling(this.main);
    sections.forEach((sec:any)=>{
      this.blockStyling(sec);
      sec.rowArr.forEach((row:any)=>{
        this.blockStyling(row);
        row.columnArr.forEach((col:any)=>{
          this.blockStyling(col);
          col.elementArr.forEach((ele:any)=>{
            if(ele.content.name != 'iframe') this.elementStyling(ele);
            if(ele.content?.item) {
              var tempObj = JSON.parse(JSON.stringify(ele.content.item))
              var pseudoEle:string = '';
              if(ele.content.name == 'menu') pseudoEle = 'ul a';
              tempObj.id = ele.id + ' .kb-element-content ' + pseudoEle;
              this.blockStyling(tempObj);
            }
          })
        })
      })
    })
  }

  blockStyling(block:any) {
    this.pagestyling.desktop += '#' + block.id + '{' + Object.entries(block.style.desktop).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(block.style.tablet_h)) this.pagestyling.tablet_h += '#' + block.id + '{' + Object.entries(block.style.tablet_h).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(block.style.tablet_v)) this.pagestyling.tablet_v += '#' + block.id + '{' + Object.entries(block.style.tablet_v).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(block.style.mobile)) this.pagestyling.mobile += '#' + block.id + '{' + Object.entries(block.style.mobile).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(block.style.hover)) this.pagestyling.hover += '#' + block.id + ':hover{' + Object.entries(block.style.hover).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(block.type == 'row') {
      var clmwrp = ['#' + block.id + ' .kb-column-wrap{gap:', 'rem;}'];
      if(block.columnGap.desktop) this.pagestyling.desktop += clmwrp.join(block.columnGap.desktop);
      if(block.columnGap.tablet_h != 'auto') this.pagestyling.tablet_h += clmwrp.join(block.columnGap.tablet_h);
      if(block.columnGap.tablet_v != 'auto') this.pagestyling.tablet_v += clmwrp.join(block.columnGap.tablet_v);
      if(block.columnGap.mobile != 'auto') this.pagestyling.mobile += clmwrp.join(block.columnGap.mobile);
    }
  }

  elementStyling(ele:any) {
    var pseudoEle:string = '';
    if(ele.content.name == 'text' || ele.content.name == 'heading') {
      pseudoEle = '> div';
    }
    if(ele.content.name == 'divider') {
      pseudoEle = '> hr';
    }
    else if(ele.content.name == 'image') {
      pseudoEle = 'img';
    }
    else if(ele.content.name == 'button') {
      pseudoEle = 'a';
    }
    else if(ele.content.name == 'menu') {
      pseudoEle = 'ul';
    }
    var elestl = {
      selector: '#'+ele.id+'{',
      jc: 'justify-content:',
      mar: 'margin:',
    }
    var deskjc = ele.item_alignment.desktop ? elestl.jc + ele.item_alignment.desktop + ';' : '';
    this.pagestyling.desktop += elestl.selector + deskjc + ';}';

    var tabhjc = ele.item_alignment.tablet_h ? elestl.jc + ele.item_alignment.tablet_h + ';' : '';
    this.pagestyling.tablet_h += elestl.selector + tabhjc + ';}';

    var tabvjc = ele.item_alignment.tablet_v ? elestl.jc + ele.item_alignment.tablet_v + ';' : '';
    this.pagestyling.tablet_v += elestl.selector + tabvjc + ';}';

    var mobjc = ele.item_alignment.mobile ? elestl.jc + ele.item_alignment.mobile + ';' : '';
    this.pagestyling.mobile += elestl.selector + mobjc + ';}';

    var style = JSON.parse(JSON.stringify(ele.content.style));

    var selector = '#' + ele.id + ' .kb-element-content ' + pseudoEle;

    style.desktop.margin = style.desktop.margin?.replace(/auto/g,'0px');
    this.pagestyling.desktop += selector + '{' + Object.entries({...style.desktop}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(!this.isObjEmpty(ele.content.style.tablet_h)) {
      if(style.tablet_h.margin) style.tablet_h.margin = style.tablet_h.margin?.replace(/auto/g,'0px');
      this.pagestyling.tablet_h += selector + '{' + Object.entries({...style.tablet_h}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    }
    if(!this.isObjEmpty(ele.content.style.tablet_v)) {
      if(style.tablet_v.margin) style.tablet_v.margin = style.tablet_v.margin?.replace(/auto/g,'0px');
      this.pagestyling.tablet_v += selector + '{' + Object.entries({...style.tablet_v}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    }
    if(!this.isObjEmpty(ele.content.style.mobile)) {
      if(style.mobile.margin) style.mobile.margin = style.mobile.margin?.replace(/auto/g,'0px');
      this.pagestyling.mobile += selector + '{' + Object.entries({...style.mobile}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    }
    if(!this.isObjEmpty(ele.content.style.hover)) {
      if(style.hover.margin) style.hover.margin = style.hover.margin?.replace(/auto/g,'0px');
      this.pagestyling.hover += selector + ':hover{' + Object.entries({...style.hover}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    }
  }

  isObjEmpty(obj:any){
    return JSON.stringify(obj) === '{}' || obj === '' || !obj;
  }

  getAllWebPages() {
    this.webPageService.getWebpages().subscribe(pages=>{
      this.existwebpages = pages.data;
    });
  }

  getAllFunnels() {
    this.funnelService.getallfunnelandstep().subscribe(data=>{
      var steps = data.data;
      this.funnels = data.data2;
      this.funnels.forEach((fp:any)=>{
        if(!fp.step_pages) fp.steps = [];
        steps.forEach((s:any)=>{
          if(fp.id == s.funnelid) {
            fp.steps.push(s);
          }
        })
      })
    })
  }

  getAllProducts() {
    var dataobj = {stepid: this.webpage.uniqueid,name: '', price: '', priceoverride: '',type:'get'};
    this.funnelService.funneladdeditproduct(dataobj).subscribe(data=>{
      this.step_products = data.data;
    })
  }

  joinWthDash(item:string) {
    if(item) return item.toLowerCase().replace(/ /g, '-');
    return '';
  }

  addKeyword(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.push(value);
    }
    event.chipInput!.clear();
  }

  removeKeyword(keyword:any): void {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  isAllHide(hide:any): boolean {
    return hide.desktop && hide.tablet_h && hide.tablet_v && hide.mobile;
  }

  someComplete(hide:any): boolean {
    return (hide.desktop || hide.tablet_h || hide.tablet_v || hide.mobile) && !this.isAllHide(hide);
  }

  setAll( hide: any, completed: boolean) {
    hide.desktop = completed;
    hide.tablet_h = completed;
    hide.tablet_v = completed;
    hide.mobile = completed;
  }

  expandDevList(id:string) {
    var devList:any = document.getElementById(id);
    if(devList.hasAttribute('style')) devList.removeAttribute('style'); 
    else devList.style.maxHeight = devList.scrollHeight+'px';
    this.lastDevList = devList;
  }

  expandAll(ele:any, action:boolean) {
    ele.querySelectorAll('UL').forEach((temp: any)=>{
      !action ? temp.classList.add('kb-d-none') : temp.classList.remove('kb-d-none');;
    })
  }

  expandToggle(ele:any) {
    ele.classList.toggle('kb-d-none');
  }

  respToggle(device:any) {
    if(device == this.respToggleDevice.name) device = 'desktop';
    this.respToggleDevice = this.respDevices[device];
  }

  sidefloatbtnopen(action:boolean) {
    if(action) {
      this.sideFloatBtnAnim.open = true;
      this.showBackToRowOption = true;
    } 
    else {
      this.sideFloatBtnAnim.close = true;
    }
    setTimeout(()=>{
      if(!action) {
        this.showBackToRowOption = false;
      }
      this.sideFloatBtnAnim.open = false;
      this.sideFloatBtnAnim.close = false;
    },300);
  }
 
  setExpPanelStep(index: number) {
    this.expPanelStep = index;
  }

  nextExpPanelStep() {
    this.expPanelStep++;
  }

  prevExpPanelStep() {
    this.expPanelStep--;
  }

  resetInlineEditor() {
      this.selectedBlock.content.editor = false;
      this.selectedBlock = false;
      this.showInlineEditor = false;
  }

  openSnackBar(alert: boolean, message: string, action: string, hpos: any, vpos: any) {
    if(alert) this._snackBar.open(message, action, {
      horizontalPosition: hpos,
      verticalPosition: vpos,
      panelClass: ['bg-danger']
    });
    else this._snackBar.open(message, action, {
      horizontalPosition: hpos,
      verticalPosition: vpos
    });
  }

  selectedTabChange(e:any) {
    if(this.selectedBlock.type == 'element') this.showEditor = false;
    this.selectedTab = e.tab ? e.tab['textLabel'].toLowerCase() : '';
  }

  encodeJSON(data:any) {
    return this.encodeData(JSON.stringify(data));
  }

  decodeJSON(data:string) {
    return JSON.parse(this.decodeData(data));
  }

  encodeData(data:any) {
    return btoa(data);
  }

  decodeData(data:any) {
    return atob(data);
  }

  makeid(length:number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  createBlockId(temp: any):any {
    temp.id = this.makeid(20);
    if(this.allBlocksIds.includes(temp.id)) {
      return this.createBlockId(temp);
    }
    this.allBlocksIds.push(temp.id);
    return 'kb-'+temp.type+'-'+temp.id;
  }

  compareOptValue(item1: any, item2: any) {
    return item1.name === item2.name && item1.value === item2.value;
  }

  getSSPath(path:string) {
    return 'keaimage-'+path+ '-screenshot.png'
  }

  backBtn() {
    var link:any = this.userService.navPath[1];
    if(!link) link = '/';
    window.open(window.origin+link, '_self');
  }

  redirectLink(link:string) {
    window.open(window.origin+link, '_blank');
  }

  redirectToWebsite() {
    return window.location.replace('https:/keabuilder.com');
  }

  redirectToBuilder(id:any, type:string) {
    return window.location.replace('/builder/'+type+'/'+id);
  }

  redirectToPageNotFound() {
    window.location.href = './page-not-found';
  }

  setStorage(key:string, value:any) {
    return window.localStorage.setItem(key, value);
  } 

  getStorage(key:string) {
    return window.localStorage.getItem(key) === 'true';
  }

  dateformat(value:any){
    var dt = new Date(value);
    var text1 = dt.toDateString();    
    var text2 = dt.toLocaleTimeString();
    return text1+' '+text2;
  }

}
