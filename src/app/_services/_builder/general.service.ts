import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResizeEvent } from 'angular-resizable-element';
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

@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  userdomain:string = 'keapages.com';
  showLayout:any = {header:true, footer:true};
  includeLayout:any = {header:false, footer:false};
  user:any;
  subdomain:string = '';
  target:any = {
    id: '',
    name: '',
    type: ''
  };
  webpage:any = {uniqueid: ''};
  page_general_tab:any = 'info';
  main:any = {id: 'kb-main', name: 'New Page', title: 'New Page', path: 'new-page', description: 'This page is built using Keabuilder.', keywords: [], author: '', meta_img: '', type: 'main', style: {desktop:'', tablet_h:'', tablet_v:'', mobile:''}};
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
  respDevices:any = [
  {name:'tablet-h', width:'1024px'},
  {name:'tablet-v', width:'768px'},
  {name:'mobile', width:'425px'}];
  respToggleDevice:any = this.respDevices[2];
  showResp:any = {toggle: false, open: false, close: false};
  undoRedo:any = {toggle: false, open: false, close: false};
  wireframe = {toggle: false, open: false, close: false};
  showNavAnim = {open: false, close: false, show: false, toggle: true, navopen: false};
  allBlocksIds:Array<number> = [];
  selectedBlock:any = [];
  showBackToRowOption:boolean = false;
  sideFloatBtnAnim = {open: false, close: false};
  blockSelection:string = '';
  imgSelection:boolean = false;
  minimize:boolean=false;
  expand:boolean= false;
  screenWidth:any = 1000;
  screenHeight:any;
  showEditor:boolean = false;
  showInlineEditor:boolean = false;
  insideEditor:boolean = false;
  selectedTab:any;
  expPanelStep = 0;
  wfmW = '420px';
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
      /* without images_upload_url set, Upload tab won't show up*/
  images_upload_url: './api/uploadfile',
  /* we override default upload handler to simulate successful upload*/
  images_upload_handler: function (blobInfo:any, success:any, failure:any) {
    setTimeout(function () {
      /* no matter what you upload, we will turn it into TinyMCE logo :)*/
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
  pagehtml:any;
  pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: ''};
  parser = new DOMParser();
  // file:any = {
  //   html: '',
  //   css: '',
  //   load: false
  // };
  loading = {
    success: false,
    error: false
  };
  saveDisabled:boolean = false;
  pathError:boolean = false;
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
  validatelink = new FormControl('', [Validators.required, Validators.pattern(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi)]);

  constructor(private UserService: UserService, private _snackBar: MatSnackBar, public fileUploadService: FileUploadService, public tokenStorageService: TokenStorageService, public authService: AuthService, public webPageService: WebpagesService, public websiteService: WebsiteService, public funnelService: FunnelService, private captureService: NgxCaptureService) {
    if(this.tokenStorageService.getToken()) {
        this.user = this.tokenStorageService.getUser();
        this.UserService.getUsersDetails().subscribe(data=>{
        this.user = {...this.user, ...data.data[0]};
        this.user.name = this.user.username;
        this.main.author = this.user.name;
        this.subdomain = 'https://'+this.joinWthDash(this.user.subdomain)+'.'+this.userdomain+'/';
        this.screenWidth = window.innerWidth;  
        this.screenHeight = window.innerHeight; 
      })
    }
  }

  fetchMenus() {
    const menus:any = [];
    return new Promise<any>((resolve, reject) => {
      this.fileUploadService.fetchFiles('menus').subscribe((data:any)=>{
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

  fetchHeaders() {
    const headers:any = [];
    return new Promise<any>((resolve, reject) => {
      this.fileUploadService.fetchFiles('headers').subscribe((data:any)=>{
        if(!data.success) resolve(headers);
        var count = 0;
        data.data.forEach((html:any)=>{
          var doc = this.parser.parseFromString(html, 'text/html');
          var head = doc.body.children[0];
          var header:any = {id: head?.id, name: head?.getAttribute('data-name'), html: html, defaultname: 'Header '+(count+1), thumbnail: 'keaimage-'+head?.id.split('kb-')[1]+ '-screenshot.png', type: 'header'}
          headers.push(header);
          if(count == data.data.length-1) {
            resolve(headers);
          }
          count++;
        })
      })
    })
  }

  fetchFooters() {
    const footers:any = [];
    return new Promise<any>((resolve, reject) => {
      this.fileUploadService.fetchFiles('footers').subscribe((data:any)=>{
        if(!data.success) resolve(footers);
        var count = 0;
        data.data.forEach((html:any)=>{
          var doc = this.parser.parseFromString(html, 'text/html');
          var foot = doc.body.children[0];
          var footer:any = {id: foot?.id, name: foot?.getAttribute('data-name'), html: html, defaultname: 'Footer '+(count+1), thumbnail: 'keaimage-'+foot?.id.split('kb-')[1]+ '-screenshot.png', type: 'footer'}
          footers.push(footer);
          if(count == data.data.length-1) {
            resolve(footers);
          }
          count++;
        })
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
          if(this.target.type == 'website') {
            this.getWebPageDetails(id).then(data=> {
              resolve(data);
            })
          }
          else if(this.target.type == 'funnel') {
            this.getFunnelDetails(id).then(data=> {
              resolve(data);
            })
          }
        }
        else {
          if(this.target.type == 'header') {
            this.getHeader('kb-header-'+id).then(data=>{
              resolve(data);
            });
          }
          else if(this.target.type == 'footer') {
            this.getFooter('kb-footer-'+id).then(data=>{
              resolve(data);
            });
          }
        }
      });
    })
  }

  setMenu(html:any) {
    return new Promise<any>((resolve, reject) => {
      var i = 0;
      var doc = this.parser.parseFromString(html, 'text/html');
      var appendmenus = doc.querySelectorAll('[data-name="menu"]');
      if(appendmenus.length == 0) resolve(doc.body.innerHTML);
      appendmenus.forEach((data:any)=>{
        var menu = this.menus.filter((m:any)=>m.id == data.children[0].getAttribute('data-id'))
          data.children[0].innerHTML = menu[0].html;
          if(appendmenus.length-1 == i) {
            resolve(doc.body.innerHTML);
          }
        i++;
      })
    })
  }

  setHeader(head:any) {
    this.setMenu(head.html).then(data=>{
      head.html = data;
      this.selectedHeader = head;
    });
  }

  setFooter(foot:any) {
    this.setMenu(foot.html).then(data=>{
      foot.html = data;
      this.selectedFooter = foot;
    });
  }

  getHeader(id:any) {
    return new Promise<any>((resolve, reject) => {
      this.fileUploadService.fetchFile(id, 'headers').subscribe({
        next: (file:any)=>{
          resolve(file);
        },
        error: (err:any) => {
          this.loading.error = true;
          resolve(false);
        }
      })
    });
  }

  getFooter(id:any) {
    return new Promise<any>((resolve, reject) => {
      this.fileUploadService.fetchFile(id, 'footers').subscribe({
        next: (file:any)=>{
          resolve(file);
        },
        error: (err:any) => {
          this.loading.error = true;
          resolve(false);
        }
      })
    });
  }
  
  getWebPageDetails(uniqueid:any) {
    return new Promise<any>((resolve, reject) => {
      this.webpage.uniqueid = uniqueid;
      this.webPageService.getSingleWebpage(this.webpage.uniqueid).subscribe(
        (e:any)=>{
            if(e.data.length == 0) this.redirectToPageNotFound();
            this.webpage = e.data[0];
            this.main.name = this.webpage.page_name;
            this.main.title = this.webpage.page_title;
            this.main.path = this.webpage.page_path;
            if(this.webpage.page_description) this.main.description = this.webpage.page_description;
            if(this.webpage.page_keywords) this.main.keywords = this.webpage.page_keywords.split(',');
            this.main.author = this.webpage.page_author;
            this.fileUploadService.getPage(this.webpage).subscribe({
              next: (file:any)=>{
                resolve(file);
              },
              error: (err:any) => {
                this.loading.error = true;
                resolve(false);
              }
            });
        },
        (err:any) => {
          this.loading.error = true;
          resolve(false);
        }
      )
    })
  }

  getFunnelDetails(uniqueid:any) {
    return new Promise<any>((resolve, reject) => {
      this.webpage.uniqueid = uniqueid;
      this.funnelService.getSingleFunnelpage(this.webpage.uniqueid).subscribe(
        (e:any)=>{
            if(e.data.length == 0) window.location.replace(window.location.origin);
            this.webpage = e.data[0];
            this.main.name = this.webpage.title;
            this.main.title = this.webpage.title;
            this.main.path = this.webpage.page_path;
            // if(this.webpage.page_description) this.main.description = this.webpage.page_description;
            // if(this.webpage.page_keywords) this.main.keywords = this.webpage.page_keywords.split(',');
            // this.main.author = this.webpage.page_author;
            this.main.description = '';
            this.main.keywords = '';
            this.main.author = '';
            this.fileUploadService.getPage(this.webpage).subscribe({
              next: (file:any)=>{
                resolve(file);
              },
              error: (err:any) => {
                this.loading.error = true;
                resolve(false);
              }
            });
        },
        (err:any) => {
          this.loading.error = true;
          resolve(false);
        }
      )
    })
  }

  checkExstingPath(main:any, sections:any) {
    return new Promise<any>((resolve, reject) => {
      var data = {
        path: this.main.path
      }
      this.webPageService.getWebPageByPath(data).subscribe((e:any)=>{
        if(this.main.path && (this.main.path == this.webpage.page_path || e.data.length == 0)) {
            this.saveHTML(main, sections, false).then(data => {
              if(data) resolve(true);
              else resolve(false);
            });
        }
        else {
            this.pathError = true;
            resolve(false);
        }
      })
    })
  }

  preview(main:any, sections:any) {
    this.saveHTML(main, sections, true);
  }

  removeCommments(html:any) {
    html = html.replaceAll('<!--?php','<?php').replaceAll('?-->','?>');
    return html.replace(/\r?\n|\r/g, "").replace(/<!--[\s\S]*?-->/g,"")
  }

  saveHeaderFooter(main:any, sections:any) {
    return new Promise<any>((resolve, reject) => {
      this.pagehtml = this.parser.parseFromString(main.children[0].innerHTML, 'text/html');
      this.removeExtra();
      this.setPageStyle(sections);
      var obj:any = new Object();
      obj.id  = 'kb-'+this.target.type+'-'+this.target.id;
      obj.html = '<style>'+this.getAllStyle()+'</style>'+this.removeCommments(this.pagehtml.querySelector('body').innerHTML);
      
      if(this.target.type == 'header') {
        obj.html = '<div id="'+obj.id+'" data-name="'+this.target.name+'">' + obj.html + '</div>';
        this.fileUploadService.saveFile(obj, 'headers').subscribe(e=>{
          this.pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: ''};
          resolve(true);
        },
        error=>{
          this.openSnackBar('Server Error', 'OK', 'center', 'top');
          resolve(false);
        });
      }
      else if(this.target.type == 'footer') {
        obj.html = '<div id="'+obj.id+'" data-name="'+this.target.name+'">' + obj.html + '</div>';
        this.fileUploadService.saveFile(obj, 'footers').subscribe(e=>{
          this.pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: ''};
          resolve(true);
        },
        error=>{
          this.openSnackBar('Server Error', 'OK', 'center', 'top');
          resolve(false);
        });
      }
    });
  }

  saveHTML(main:any, sections:any, preview:boolean) {
    return new Promise<any>((resolve, reject) => {
      this.websiteService.getWebsite().subscribe((e:any)=>{
        var web = e.data[0];
        this.pagehtml = this.parser.parseFromString(main.innerHTML, 'text/html');
        if(this.includeLayout.header && this.selectedHeader.html) {
          var header = this.pagehtml.querySelector('header');
          header.innerHTML = `<?php $path="../../headers/${header.children[0].id}.php"; if(file_exists($path)) include($path); ?>`;
        }
        if(this.includeLayout.footer && this.selectedFooter.html) {
          var footer = this.pagehtml.querySelector('footer');
          footer.innerHTML = `<?php $path="../../footers/${footer.children[0].id}.php"; if(file_exists($path)) include($path); ?>`;
        }
        this.removeExtra();
        this.setPageStyle(sections);
        console.log(web.favicon);
        this.pagehtml.querySelector('head').innerHTML = 
        '<?php $path="../../tracking/header-tracking.php"; if(file_exists($path)) include($path); ?>' +
        '<link rel="icon" type="image/x-icon" href="'+window.location.origin+'/assets/uploads/images/'+web.favicon+'">' +
        '<meta charset="UTF-8">' +
        '<meta name="description" content="'+this.main.description+'">' +
        '<meta name="keywords" content="'+this.main.keywords+'">' +
        '<meta name="author" content="'+this.main.author+'">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '<title>'+this.main.title+'</title>' +        
        '<link rel="stylesheet" href="'+window.location.origin+'/assets/style/builder.css">' +
        (!preview ? '<link rel="stylesheet" href="./style.css">':'');
        this.pagehtml.querySelector('body').innerHTML += '<?php $path="../../tracking/footer-tracking.php"; if(file_exists($path)) include($path); ?>';
        var page = {
          head: this.removeCommments(this.pagehtml.querySelector('head').outerHTML),
          body: this.removeCommments(this.pagehtml.querySelector('body').outerHTML),
          style: this.getAllStyle(),
          folder: this.main.path,
          prevFolder: this.webpage.page_path
        }
        if(preview) {
          page.body = this.removeCommments(main.innerHTML);
          page.prevFolder = 'kb-page-'+this.webpage.uniqueid;
          page.folder = 'kb-page-'+this.webpage.uniqueid;
          this.fileUploadService.createpreview(page).subscribe((event:any)=>{
            window.open(window.location.protocol+'//'+window.location.host+'/preview/'+page.folder, '_blank');
          });
        }
        else {
          this.fileUploadService.createpage(page).subscribe(
            (event:any) => {
              if(this.webpage.uniqueid ==  web.homepage && this.target.type == 'website') {
                var obj = {
                  path:event.data.folder
                };
                this.fileUploadService.updateHome(obj).subscribe({
                  next: data => {}
                });
              }
              this.updatePageDB().then(e=>{
                this.pagestyling = {desktop: '', tablet_h: '', tablet_v: '', mobile: ''};
                this.getBuilderData(this.webpage.uniqueid);
                resolve(true);
              })
            },
          error=>{
            this.openSnackBar('Server Error', 'OK', 'center', 'top');
            resolve(false);
          })
        }
      })
    });
  }

  updatePageDB() {
    return new Promise<any>((resolve, reject) => {
      if(this.target.type == 'website'){
        var pagedata = {
          id: this.webpage.id,
          page_name: this.main.name,
          page_title: this.main.title,
          page_path: this.main.path,
          page_description: this.main.description,
          page_keywords: this.main.keywords ? this.main.keywords.join(',') : '',
          page_author: this.main.author,
          publish_status: this.webpage.publish_status,
          thumbnail: '',
          tracking_code: '',
        }
        this.webPageService.updateWebpage(pagedata).subscribe(
          (e:any)=>{
            resolve(e);
          })
      }
      else if(this.target.type == 'funnel'){
        var funnelstepdata = {
            id: this.webpage.id,
            funnelid: this.webpage.funnelid,
            funneltype: this.webpage.funneltype,
            page_name: this.main.name,
            page_title: this.main.title,
            page_path: this.main.path,
            page_description: this.main.description,
            page_keywords: this.main.keywords ? this.main.keywords.join(',') : '',
            page_author: this.main.author,
            publish_status: this.webpage.publish_status,
            thumbnail: '',
            tracking_code: ''
        }
        this.funnelService.updatefunnelpage(funnelstepdata).subscribe(
          (e:any)=>{
            resolve(e);
          })
      }
      else{
        this.openSnackBar('Server Error', 'OK', 'center', 'top');
        resolve(false);
      }
    })
  }

  removeExtra() {
    this.pagehtml.querySelectorAll('*').forEach((item:any)=>{
      item.removeAttribute('style');
      item.classList.remove('cdk-drag');
      item.removeAttribute('ng-reflect-id');
      item.removeAttribute('ng-reflect-data');
      item.classList.remove('cdk-drag-handle');
      item.removeAttribute('ng-reflect-ng-style');
      item.removeAttribute('ng-reflect-ng-class');
      item.removeAttribute('ng-reflect-ng-switch');
      item.removeAttribute('ng-reflect-connected-to');
      if(item.classList.contains('kb-ispan-add')) {
        item.remove();
      }
      if(item.classList.contains('cdk-drop-list')) {
        item.removeAttribute('id');
        item.classList.remove('cdk-drop-list');
      }
      if(item.classList.contains('kb-menu')) {
        item.outerHTML = '<?php $path="../../menus/'+item.id+'.php"; if(file_exists($path)) include($path); ?>';
      }
      if(item.classList.contains('kb-code-block')) {
        var cb = this.decodeData(item.getAttribute('html-data'));
        item.removeAttribute('html-data');
        var doc = this.parser.parseFromString(cb, 'text/html');
        item.innerHTML = doc.body.innerHTML;
      }
    })
  }

  getAllStyle() {
    var querry = '@media only screen and (max-width:';
    return this.pagestyling.desktop +
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
            this.elementStyling(ele);
            if(ele.content?.item) {
              var tempObj = JSON.parse(JSON.stringify(ele.content.item))
              var pseudoEle:string = '';
              if(ele.content.name == 'menu') {
                pseudoEle = 'ul a';
              }
              tempObj.id = ele.id + ' .kb-element-content ' + pseudoEle;
              this.blockStyling(tempObj);
            }
          })
        })
      })
    })
  }

  blockStyling(block:any) {
    this.pagestyling.desktop = this.pagestyling.desktop + '#' + block.id + '{' + Object.entries(block.style.desktop).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(block.style.tablet_h) this.pagestyling.tablet_h = this.pagestyling.tablet_h + '#' + block.id + '{' + Object.entries(block.style.tablet_h).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(block.style.tablet_v) this.pagestyling.tablet_v = this.pagestyling.tablet_v + '#' + block.id + '{' + Object.entries(block.style.tablet_v).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(block.style.mobile) this.pagestyling.mobile = this.pagestyling.mobile + '#' + block.id + '{' + Object.entries(block.style.mobile).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(block.type == 'row') {
      var clmwrp = ['#' + block.id + ' .kb-column-wrap{gap:', 'rem;}']
      this.pagestyling.desktop = this.pagestyling.desktop + clmwrp.join(block.columnGap.desktop);
      if(block.columnGap.tablet_h != 'auto') this.pagestyling.tablet_h = this.pagestyling.tablet_h + clmwrp.join(block.columnGap.tablet_h);
      if(block.columnGap.tablet_v != 'auto') this.pagestyling.tablet_v = this.pagestyling.tablet_v + clmwrp.join(block.columnGap.tablet_v);
      if(block.columnGap.mobile != 'auto') this.pagestyling.mobile = this.pagestyling.mobile + clmwrp.join(block.columnGap.mobile);
    }
  }

  elementStyling(ele:any) {
    var pseudoEle:string = '';
    if(ele.content.name == 'text' || ele.content.name == 'heading') {
      pseudoEle = 'div>div';
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
    this.pagestyling.desktop = this.pagestyling.desktop + '#' + ele.id + ' .kb-element-content ' + pseudoEle + '{' + Object.entries({...ele.content.style.desktop, ...ele.style.desktop}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(ele.style.tablet_h || ele.content.style.tablet_h) this.pagestyling.tablet_h = this.pagestyling.tablet_h + '#' + ele.id + ' .kb-element-content ' + pseudoEle + '{' + Object.entries({...ele.content.style.tablet_h, ...ele.style.tablet_h}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(ele.style.tablet_v || ele.content.style.tablet_v) this.pagestyling.tablet_v = this.pagestyling.tablet_v + '#' + ele.id + ' .kb-element-content ' + pseudoEle + '{' + Object.entries({...ele.content.style.tablet_v, ...ele.style.tablet_v}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    if(ele.style.mobile || ele.content.style.mobile) this.pagestyling.mobile = this.pagestyling.mobile + '#' + ele.id + ' .kb-element-content ' + pseudoEle + '{' + Object.entries({...ele.content.style.mobile, ...ele.style.mobile}).map(([a, b]) => `${a}:${b}`).join(';')+';}';
    
    var eleitma = ['#' + ele.id + '{justify-content:', ';}']
    if(ele.item_alignment.desktop != '') this.pagestyling.desktop = this.pagestyling.desktop + eleitma.join(ele.item_alignment.desktop);
    if(ele.item_alignment.tablet_h != 'auto') this.pagestyling.tablet_h = this.pagestyling.tablet_h + eleitma.join(ele.item_alignment.tablet_h);
    if(ele.item_alignment.tablet_v != 'auto') this.pagestyling.tablet_v = this.pagestyling.tablet_v + eleitma.join(ele.item_alignment.tablet_v);
    if(ele.item_alignment.mobile != 'auto') this.pagestyling.mobile = this.pagestyling.mobile + eleitma.join(ele.item_alignment.mobile);
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

  selRespDevice(index:number) {
    this.respToggleDevice = this.respDevices[index];
    this.showResp.toggle = true;
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
    if (devList.style.maxHeight != '0px'){
      devList.style.maxHeight = '0px';
    }
    else {
      devList.style.maxHeight = devList.scrollHeight + 'px';
    }
    this.lastDevList = devList;
  }

  expandAll(ele:any, action:boolean) {
    for(var x = 0; x <= 1; x++) {
      ele.querySelectorAll('UL').forEach((temp: any)=>{
        temp.classList.add('kb-hidden');
        temp.style.maxHeight = (action ? 'fit-content' : '0px');
        setTimeout(()=>{
          if(!action) ele.classList.remove('kb-hidden');
        },300)
      })
    }
  }

  expandOnAction(ele:any) {
    setTimeout(()=>{
      ele.style.maxHeight = ele.scrollHeight + 'px';
    },10)
  }

  expandToggle(ele:any) {
    ele.classList.add('kb-hidden');
    if (ele.style.maxHeight != '0px'){
      ele.style.maxHeight = '0px';
    } else {
      ele.style.maxHeight = ele.scrollHeight * 2 + 'px';
    } 
    setTimeout(()=>{
      if(ele.style.maxHeight != '0px') { 
        ele.classList.remove('kb-hidden');
        ele.style.maxHeight = '';
      }
    },300)
  }

  onResizeEnd(event: ResizeEvent ,rect:any): void {
    var rw:any = event.rectangle.width;
    if(rw < 420) {
      this.wfmW = '420px';
    }
    else if( rw > screen.width/2) {
      this.wfmW = screen.width/2 + 'px';
    }
    else {
      this.wfmW = event.rectangle.width + 'px';
    }
  }

  responsiveToggle(navtoggle:boolean) {
    if(!this.showResp.toggle) {
      this.showResp.open = true;
      this.showResp.toggle = true;
    }
    else {
      this.showResp.close = true;
    }
    setTimeout(()=>{
      this.showResp.close ? this.showResp.toggle = false : '';
      this.showResp.open = false;
      this.showResp.close = false;
  },300)
    if(navtoggle) this.showfloatnavtoggle();
  }

  wireframeToggle(navtoggle:any) {
    if(!this.wireframe.toggle) {
      this.wireframe.open = true;
      this.wireframe.toggle = true;
    }
    else {
      this.wireframe.close = true;
    }
    setTimeout(()=>{
      this.wireframe.close ? this.wireframe.toggle = false : '';
      this.wireframe.open = false;
      this.wireframe.close = false;
    },300)
    if(navtoggle) this.showfloatnavtoggle();
  }

  showfloatnavtoggle() {
    if(this.showNavAnim.toggle) {
      this.showNavAnim.open = true;
      this.showNavAnim.show  = true;
      this.showNavAnim.navopen = true;
    }
    else {
      this.showNavAnim.close = true; 
    }
    var temp = this.showNavAnim.toggle;
    setTimeout(()=>{
      this.showNavAnim.open = false;
      this.showNavAnim.close = false;
      if(!temp) {
        this.showNavAnim.show  = false;
        this.showNavAnim.navopen = false;
      }
    },400)
    this.showNavAnim.toggle = !this.showNavAnim.toggle;
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

  openSnackBar(message: string, action: string, hpos: any, vpos: any) {
    this._snackBar.open(message, action, {
      horizontalPosition: hpos,
      verticalPosition: vpos
    });
  }

  openSnackBarAlert(message: string, action: string, hpos: any, vpos: any) {
    this._snackBar.open(message, action, {
      horizontalPosition: hpos,
      verticalPosition: vpos,
      panelClass: ['bg-danger']
    });
  }

  selectTabChange(e:any) {
    this.selectedTab = e.tab['textLabel'];
  }
  
  detectTabChange() {
    if(this.selectedBlock.type == 'element') {
        this.showEditor = false;
    }
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

  redirectToWebsite() {
    return window.location.replace('https:/keabuilder.com');
  }

  redirectToBuilder(id:any, type:string) {
    return window.location.replace('/builder/'+type+'/'+id);
  }

  redirectToPageNotFound() {
    window.location.href = './page-not-found';
  }

}
