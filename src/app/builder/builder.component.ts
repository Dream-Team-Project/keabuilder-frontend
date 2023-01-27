import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ElementRef, QueryList, ViewChildren, ViewEncapsulation, HostListener, TemplateRef} from '@angular/core';
import { SectionService } from '../_services/_builder/section.service';
import { RowService } from '../_services/_builder/row.service';
import { ColumnService } from '../_services/_builder/column.service';
import { ElementService } from '../_services/_builder/element.service';
import { StyleService } from '../_services/_builder/style.service';
import { GeneralService } from '../_services/_builder/general.service';
import { ImageService } from '../_services/image.service';
import { NgxMatColorPickerInput } from '@angular-material-components/color-picker';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { NgxCaptureService } from 'ngx-capture';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { asapScheduler} from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css','./material.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class BuilderComponent implements OnInit {

  @ViewChildren(CdkDropList)
  public dlq: QueryList<CdkDropList>[] = [];

  DialogParentToggle:boolean = false;
  DialogImageToggle:boolean = false;

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  @ViewChild('askforsave') askforsave!: ElementRef;
  @ViewChild('wireframe') wireframe: any;
  @ViewChild('main') main!: ElementRef;
  @ViewChild('main', { static: true }) screen: any;
  @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput | any;

  showNavFrom:string = 'bottom';
  trigger:string = 'Saved';
  contextMenuPosition = { x: '0px', y: '0px' };
  transferIndex:number = -1;
  wfpos:any = 'end';
  saveTemplateSection:any;
  wfhide:any = true;
  initial = true;
  autoSaveInterval:any;
  autoSaving:boolean = false;
  askForSaveInterval:any;
  dntaskforsave:boolean = false;
  ishf:boolean = false;
  zoom:any = false;

  constructor(
    private route: ActivatedRoute,
    // builder services start
    public _style: StyleService,
    public _section: SectionService,
    public _row: RowService,
    public _column: ColumnService,
    public _element: ElementService,
    public _general: GeneralService,
    public _image: ImageService,
    // builder services end
    private dialog: MatDialog,
    private captureService: NgxCaptureService) {
    _section.sections = [];
    _general.loading.success = false;
    _general.loading.error = false;
    route.paramMap.subscribe((params: ParamMap) => {
      _general.target = {
        id: params.get('id'),
        type: params.get('target')
      }
      this.ishf = _general.target.type == 'header' || _general.target.type == 'footer';
      if(_general.target.type == 'website' || _general.target.type == 'funnel' || this.ishf) {
        _general.getBuilderData(_general.target.id).then(data=> {
            data.html = _general.parser.parseFromString(data.html, 'text/html');
            if(_general.target.type == 'header') {
              _general.target.name = data.html.body.children[0].getAttribute('data-name');
              data.css = data.html.querySelector('STYLE')?.innerHTML;
              this.setBuilder(data.html, data.css);
            }
            else if(_general.target.type == 'footer') {
              _general.target.name = data.html.body.children[0].getAttribute('data-name');
              data.css = data.html.querySelector('STYLE')?.innerHTML;
              this.setBuilder(data.html, data.css);
            }
            else {
              var header = data.html.querySelector('header');
              var footer = data.html.querySelector('footer');
              if(header) {
                header = header.innerHTML;
                var headid = header.slice(header.indexOf('../../headers/')+14, header.indexOf('.php'));
                _general.headers.forEach((head:any)=>{ if(head.id == headid) _general.setHeader(head); })
              }
              else _general.includeLayout.header = false;
              if(footer) {
                footer = footer.innerHTML;
                var footid = footer.slice(footer.indexOf('../../footers/')+14, footer.indexOf('.php'));
                _general.footers.forEach((foot:any)=>{ if(foot.id == footid) _general.setFooter(foot); })
              }
              else _general.includeLayout.footer = false;
              if(_general.target.type == 'funnel') {
                this._general.getAllProducts();
                if(_general.webpage.funneltype == 'order') {
                  _element.elementList['checkout'] = { content: { name: 'checkout'}, iconCls: 'fab fa-wpforms' };
                }
                else if(_general.webpage.funneltype == 'upsell') {
                  _element.elementList['button'].content.btntype = 'upsell';
                  _element.elementList['button'].content.productid = '';
                  _element.elementList['button'].content.text = 'Upsell Button';
                }
                else if(_general.webpage.funneltype == 'downsell') {
                  _element.elementList['button'].content.btntype = 'downsell';
                  _element.elementList['button'].content.productid = '';
                  _element.elementList['button'].content.text = 'Downsell Button';
                }
              }
              if(_general.webpage.tracking_code) {
                _section.sections = _general.decodeJSON(_general.webpage.tracking_code);
                _section.pageSessionArr = [];
              }
              else this._section.addSection(0);
              this._section.savePageSession();
              this._general.loading.success = true;
            }
        })
        _section.builderCDKMethodCalled$.subscribe(() => {
          setTimeout((e:any)=>{
            this.setDragDrop();
            this.savePreview();
          })
        })
        document.addEventListener('contextmenu', event => event.preventDefault());
      }
      else _general.redirectToPageNotFound();
   })
  }

  @HostListener('document:keydown.control.s', ['$event'])  
  onKeydownHandler(event:KeyboardEvent) {
    var main = this.main.nativeElement;
    event.preventDefault();
    this.savePage(main,  false);
  }

  ngOnInit(): void {
    var vm = this;
    window.addEventListener('beforeunload', function (e) {
      if(!vm._general.pageSaved) {
        e.preventDefault();
        e.returnValue = '';
      }
    });
  }

  takePageSS(id:any, stxt:any) {
    var scr = stxt == 'template' ? document.getElementById(this.saveTemplateSection.id) : this.screen.nativeElement;
    this.captureService.getImage(scr, true).subscribe(e=>{
      var file:any = this._image.base64ToFile(e, id+'-screenshot.png');
      this._general.fileUploadService.upload(file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {
              var msg =  stxt.charAt(0).toUpperCase() + stxt.slice(1) +' has been '+this.trigger;
              this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
              this._general.saveDisabled = false;
              this.trigger = 'Saved';
            }
        })
    })
  }

  saveAsTemplate() {
    this._general.saveDisabled = true;
    var section = this.saveTemplateSection;
    var obj = {uniqueid: this._general.makeid(20), name: section.name, template: this._general.encodeJSON(section)};
    this._general.fileUploadService.savetemplate(obj).subscribe((resp:any)=>{
      this.takePageSS('section-'+obj.uniqueid, 'template');
      this._general.fetchSectionTemplates();
    })
  }

  saveHeaderFooter(main:any) {
    if(!this.autoSaving) this._general.saveDisabled = true;
    this._general.pathError = false;
    this._general.saveHeaderFooter(main, this._section.sections).then(res =>{
      if(!this.autoSaving) {
        if(res) this.takePageSS(this._general.target.type+'-'+this._general.target.id, this._general.target.type);
        else this._general.saveDisabled = false;
        clearInterval(this.askForSaveInterval);
        this.askForSaveInterval;
      }
      else this.autoSaving = false;
      this.autoSaveTrigger();
    });
  }

  saveHTML(main:any, tglDraft:boolean) {
    if(!this.autoSaving) this._general.saveDisabled = true;
    this._general.pathError = false;
    this._general.checkExstingPath(main, this._section.sections, tglDraft).then(res =>{
      if(!this.autoSaving) {
        if(res) this.takePageSS('page-'+this._general.webpage.uniqueid, 'Page');
        else {
          this._general.saveDisabled = false;
          this.openPageSetting(null);
        }
        clearInterval(this.askForSaveInterval);
        this.askForSaveInterval;
      }
      else this.autoSaving = false;
      this.autoSaveTrigger();
    });
  }

  savePage(main:any, tglDraft:boolean) {
    !this.ishf ? this.saveHTML(main, tglDraft) : this.saveHeaderFooter(main);
  }

  savePreview() {
    if(!this.ishf) this._general.saveHTML(this.main.nativeElement, this._section.sections, true, false).then(e=>{
      if(this.initial) {
        this._general.pageSaved = true;
        this.initial = false;
      }
    });
    this._general.pageSaved = false;
  }

  openPageSetting(event:any) {
    this._general.blockSelection = '';
    this._general.selectedBlock = this._general.main;
    this._style.blockSetting(this._general.main);
    this.openDialog();
  }

  filterStyle(id:any, css:any, media:string) {
    if(css) {
      if(media) css = css.split('@media only screen and (max-width:'+media.split(',')[0]+'px)'+ (media.split(',')[1] != undefined ? ' and (min-width:'+media.split(',')[1]+'px)' : '')+'{')[1].split('}')[0];
      if(css && css.split(id+'{')[1] != ';' && css.split(id+'{').length != 1) {
        var styleArr = css.split(id+'{')[1].split('}')[0].split(';');
        styleArr.pop();
        for(var i = 0; i < styleArr.length; i++) {
          styleArr[i] = '"'+styleArr[i].split(':')[0]+'"'+':'+'"'+styleArr[i].split(':')[1]+'"';
        }
        return JSON.parse('{'+styleArr.toString()+'}');
      }  
      else {
        return '';
      }
    }
  }

  setBuilder(html:any, css:any) {
    if(html && css) {
      this._general.main.style = {
        desktop: this.filterStyle('kb-main',css,''),
        tablet_h: this.filterStyle('kb-main',css,'1024,769'),
        tablet_v: this.filterStyle('kb-main',css,'768,426'),
        mobile: this.filterStyle('kb-main',css,'426')
      }
      this._section.sections = [];
      html.querySelectorAll('.kb-section').forEach((sec:any)=>{
        var secObj = JSON.parse(JSON.stringify(this._section.sectionObj));
        secObj.id = sec.id;
        this._general.allBlocksIds.push(sec.id);
        secObj.style = {
          desktop: this.filterStyle(sec.id,css,''),
          tablet_h: this.filterStyle(sec.id,css,'1024,769'),
          tablet_v: this.filterStyle(sec.id,css,'768,426'),
          mobile: this.filterStyle(sec.id,css,'426')
        }
        sec.querySelectorAll('.kb-row').forEach((row:any)=>{
          var rowObj = JSON.parse(JSON.stringify(this._row.rowObj));
          rowObj.id = row.id;
          this._general.allBlocksIds.push(row.id);
          rowObj.style = {
            desktop: this.filterStyle(row.id,css,''),
            tablet_h: this.filterStyle(row.id,css,'1024,769'),
            tablet_v: this.filterStyle(row.id,css,'768,426'),
            mobile: this.filterStyle(row.id,css,'426')
          }
          var cw = ' .kb-column-wrap';
          rowObj.columnGap = {
            desktop: this.filterStyle(row.id+cw,css,''),
            tablet_h: this.filterStyle(row.id+cw,css,'1024,769'),
            tablet_v: this.filterStyle(row.id+cw,css,'768,426'),
            mobile: this.filterStyle(row.id+cw,css,'426')            
          }
          var colWrap = row.querySelector('.kb-column-wrap');
          rowObj.columnRev = {
            desktop: colWrap.classList.contains('kb-desk-flex-rev'),
            tablet_h: colWrap.classList.contains('kb-tab-h-flex-rev'),
            tablet_v: colWrap.classList.contains('kb-tab-v-flex-rev'),
            mobile: colWrap.classList.contains('kb-mob-flex-rev')  
          }
          rowObj.columnGap.desktop = rowObj.columnGap.desktop ? rowObj.columnGap.desktop.gap.split('rem')[0] : 0;
          rowObj.columnGap.tablet_h = rowObj.columnGap.tablet_h ? rowObj.columnGap.tablet_h.gap.split('rem')[0] : 'auto';
          rowObj.columnGap.tablet_v = rowObj.columnGap.tablet_v ? rowObj.columnGap.tablet_v.gap.split('rem')[0] : 'auto';
          rowObj.columnGap.mobile = rowObj.columnGap.mobile ? rowObj.columnGap.mobile.gap.split('rem')[0] : 'auto';
          row.querySelectorAll('.kb-column').forEach((col:any)=>{
            rowObj.rowSize = col.classList[2];
            var colObj = JSON.parse(JSON.stringify(this._row.columnObj));
            colObj.id = col.id;
            this._general.allBlocksIds.push(col.id);
            colObj.style = {
              desktop: this.filterStyle(col.id,css,''),
              tablet_h: this.filterStyle(col.id,css,'1024,769'),
              tablet_v: this.filterStyle(col.id,css,'768,426'),
              mobile: this.filterStyle(col.id,css,'426')
            }
            col.querySelectorAll('.kb-element').forEach((ele:any)=>{
              var eleSel = '';
              var eleSelItem = '';
              var content = ele.querySelector('.kb-element-content');
              var eleObj = JSON.parse(JSON.stringify(this._element.elementObj));
              eleObj.itemstyle = false;
              eleObj.content.name = ele.children[0].getAttribute('data-name');
              if(eleObj.content.name == 'heading' || eleObj.content.name == 'text') {
                eleSel = '> div';
                eleObj.content.html = content.children[0].innerHTML;
              }
              else if(eleObj.content.name == 'image') {
                eleSel = 'img';
                eleObj.content.src = content.querySelector('IMG').src;
              }
              else if(eleObj.content.name == 'button') {
                eleSel = 'a';
                var anchor = content.querySelector('A');
                var bt = anchor.getAttribute('kb-btn-type');
                eleObj.content.btntype = bt ? bt : 'regular';
                if(eleObj.content.btntype != 'regular') {
                  eleObj.content.link = anchor.getAttribute('kb-redirect-link');
                  eleObj.content.productid = anchor.getAttribute('kb-product-id');
                }
                else eleObj.content.link = anchor.href.split('#').length > 1 ? '#no-link' : anchor.href;
                eleObj.content.text = anchor.querySelectorAll('DIV')[0].innerText;
                eleObj.content.subtext = anchor.querySelectorAll('DIV')[1].innerText;
                eleObj.content.subfont_size = anchor.querySelectorAll('DIV')[1].style['font-size'];
                eleObj.content.target = anchor.target;
                // eleObj.content.
              }
              else if(eleObj.content.name == 'menu') {
                eleObj.itemstyle = true;
                eleSel = 'ul';
                eleSelItem = 'ul a';
                var id = content.getAttribute('data-id');
                this._general.allBlocksIds.push(id);
                this._general.menus.forEach((menu:any)=>{
                  if(menu.id == id) {
                    var menuObj = JSON.parse(JSON.stringify(menu));
                    eleObj.content = this._element.setMenu(eleObj.content, menuObj);
                  }
                })
              }
              else if(eleObj.content.name == 'code') {
                eleObj.content.html = content.querySelector('.kb-code-block').innerHTML;
              }
              eleObj.id = ele.id;
              this._general.allBlocksIds.push(ele.id);
              if(eleObj.itemstyle) {
                var itemselector = ele.id+' .kb-element-content '+eleSelItem;
                eleObj.content.item = {
                  style: {
                    desktop: this.filterStyle(itemselector,css,''),
                    tablet_h: this.filterStyle(itemselector,css,'1024,769'),
                    tablet_v: this.filterStyle(itemselector,css,'768,426'),
                    mobile: this.filterStyle(itemselector,css,'426')
                  } 
                }
              }
              var eleid = {
                desktop: this.filterStyle(ele.id,css,''),
                tablet_h: this.filterStyle(ele.id,css,'1024,769'),
                tablet_v: this.filterStyle(ele.id,css,'768,426'),
                mobile: this.filterStyle(ele.id,css,'426')
              }
              eleObj.item_alignment = {
                desktop: eleid.desktop ? eleid.desktop['justify-content'] : '',
                tablet_h: eleid.tablet_h ? eleid.tablet_h['justify-content'] : 'auto',
                tablet_v: eleid.tablet_v ? eleid.tablet_v['justify-content'] : 'auto',
                mobile: eleid.mobile ? eleid.mobile['justify-content'] : 'auto',
              }
              eleObj.hide = {
                desktop: ele.classList.contains('kb-d-desk-none'),
                tablet_h: ele.classList.contains('kb-d-tab-h-none'),
                tablet_v: ele.classList.contains('kb-d-tab-v-none'),
                mobile: ele.classList.contains('kb-d-mob-none')  
              }
              var selector = ele.id+' .kb-element-content '+eleSel;
              eleObj.style = {
                desktop: {...this.filterStyle(selector,css,''), ...{margin: eleid.desktop['margin']}},
                tablet_h: {...this.filterStyle(selector,css,'1024,769'), ...{margin: eleid.tablet_h['margin']}},
                tablet_v: {...this.filterStyle(selector,css,'768,426'), ...{margin: eleid.tablet_v['margin']}},
                mobile: {...this.filterStyle(selector,css,'426'), ...{margin: eleid.mobile['margin']}}
              } 
              eleObj.content.style = JSON.parse(JSON.stringify(eleObj.style));
              eleObj.name = ele.getAttribute('data-name');
              if(eleObj.content.name) colObj.elementArr.push(eleObj);
            })
            colObj.hide = {
              desktop: col.classList.contains('kb-d-desk-none'),
              tablet_h: col.classList.contains('kb-d-tab-h-none'),
              tablet_v: col.classList.contains('kb-d-tab-v-none'),
              mobile: col.classList.contains('kb-d-mob-none')  
            }
            colObj.name = col.getAttribute('data-name');
            rowObj.columnArr.push(colObj);
          })
          rowObj.hide = {
            desktop: row.classList.contains('kb-d-desk-none'),
            tablet_h: row.classList.contains('kb-d-tab-h-none'),
            tablet_v: row.classList.contains('kb-d-tab-v-none'),
            mobile: row.classList.contains('kb-d-mob-none')  
          }
          rowObj.name = row.getAttribute('data-name');
          secObj.rowArr.push(rowObj);          
        })
        secObj.hide = {
          desktop: sec.classList.contains('kb-d-desk-none'),
          tablet_h: sec.classList.contains('kb-d-tab-h-none'),
          tablet_v: sec.classList.contains('kb-d-tab-v-none'),
          mobile: sec.classList.contains('kb-d-mob-none')  
        }
        secObj.name = sec.getAttribute('data-name');
        this._section.sections.push(secObj);
        if(html.querySelectorAll('.kb-section').length == this._section.sections.length) {
          this._section.pageSessionArr = [];
          this._section.savePageSession();
          this._general.loading.success = true;
        }
      })
    }
    else {
      this._section.addSection(0);
      this._general.loading.success = true;
    }
  }

  elementDblClk(element: any, event:any) {
    if(element.content.name != 'checkout') {
      this._general.blockSelection = '';
      this._general.selectedBlock = element;
      this._style.blockSetting(element);
      this.openDialog()
    }
    // else if(element.content.name == 'text' || element.content.name == 'heading') {
    //   this._general.showInlineEditor = true;
    //   element.content.editor = true;
    //   this._general.selectedBlock = element;
    // }
  }

  // dialog box

  openDialog() {
      this._general.pageSaved = false;
      this.DialogParentToggle = !this.DialogParentToggle;
  }

  openImageDialog(e:any) {
    this.DialogImageToggle = !this.DialogImageToggle;
  }

  saveAsTemplateDialog(templateRef:any, section:any) {
    this.saveTemplateSection = JSON.parse(JSON.stringify(section));
    this.dialog.open(templateRef);
  } 

  askForSaveDialog(templateRef:any) {
    this.dialog.open(templateRef, { disableClose: true });
  } 

  // dialog box

  // triggers

  autoSaveTrigger() {
    clearInterval(this.autoSaveInterval);
    var ast = this._general.autosave;
    if(ast) {
      var vm = this;
      var tm = ast.value * 1000;
      if(ast.unit == 'min') tm = tm * 60;
      this.autoSaveInterval = setInterval(()=>{
        if(!vm._general.pageSaved && vm._general.autosave) {
          vm.autoSaving = true;
          vm.savePage(vm.main.nativeElement, false);
        }
      }, tm);
      this.autoSaveInterval;
    }
  }
  
  askForAutoSave() {
    clearInterval(this.askForSaveInterval);
    var vm = this;
    var tm = 10 * 60000;
    this.askForSaveInterval = setInterval((e:any)=>{
      if(!vm.dntaskforsave && !vm._general.autosave) vm.askForSaveDialog(vm.askforsave)
    },tm)
    this.askForSaveInterval;
  }

  getTrigger(e:any) {
    var main = this.main.nativeElement;
    if(e == 'preview') this.savePreview();
    else if(e == 'save') {
      this.trigger = 'Saved'; 
      this.savePage(main, false);
    }
    else if(e == 'publish' || e == 'draft') {
      this._general.main.publish_status = e == 'publish';
      this.trigger = this._general.main.publish_status ? 'Published' : 'Draft';
      this.savePage(main, true);
    }
    else if(e == 'autosave') this.autoSaveTrigger();
    else if(e == 'setting') this.openPageSetting(null);
  }

  // triggers

  // drag & drops

  drop(event: CdkDragDrop<any>) {
    if(this.transferIndex != -1) {
      var appendIndex =  event.currentIndex-1;
      var appendData = event.previousContainer.data[this.transferIndex];
      if(appendData.type == 'image') {
        var image = JSON.parse(JSON.stringify(this._element.elementList['image']));
        image.content.src = appendData.ext_link ? appendData.path : this._image.uploadImgPath+appendData.path;
        image.content.itemset = true;
        appendData = image;
      }
      if(appendData.type == 'menu') {
        var menu = JSON.parse(JSON.stringify(this._element.elementList['menu']));
        menu.content = this._element.setMenu(this._element.elementList['menu'].content, appendData);
        menu.content.itemset = true;
        appendData = menu;
      }
      if(appendData.content) appendData.type = 'element';
      switch(appendData.type) {
        case 'element':
          this._element.element_index = appendIndex;
          this._element.addElement(appendData.content);
          break;
        case 'row':
          this._row.selectedRow = '';
          this._row.row_index = appendIndex;
          this._row.addRow('kb-'+appendData.appendCls+'-block', appendData.nofcolumn);
          break;
        default:
          var temp = JSON.parse(JSON.stringify(this._section.sectionObj));
          if(appendData.template) temp = this._general.decodeJSON(appendData.template);
          else temp.style.desktop.width = appendData.width;
          this._section.appendSection(temp, appendIndex);
      }
      this.transferIndex = -1;
    }
    else {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
      else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
    this._section.savePageSession();
  }  

  setDragDrop() {
    let secdls: CdkDropList[] = [];
    let rowdls: CdkDropList[] = [];
    let eledls: CdkDropList[] = [];

    this.dlq.forEach((dl:any) => {
      switch(dl.id.split('-')[0]) {
      case 'elementgroup': 
        eledls.push(dl);
      break;
      case 'rowgroup':
        rowdls.push(dl);
      break;
      default:
        secdls.push(dl);
        
      }
    });

    secdls = secdls.reverse();
    rowdls = rowdls.reverse();
    eledls = eledls.reverse();

    asapScheduler.schedule(() => { this._section.sectionConnect = secdls; });
    asapScheduler.schedule(() => { this._row.rowConnect = rowdls; });
    asapScheduler.schedule(() => { this._element.elementConnect = eledls; });

  }

  // drag & drops

  wireframeToggle() {
    if(!this.wireframe.opened) this.wfhide = false;
    this.wireframe.toggle();
    this.closewf();
  }

  closewf() {
    setTimeout((e:any) => { 
      if(!this.wireframe.opened) this.wfhide = true; 
    }, 300);
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': '' };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  dropAllow() {
    return (item: CdkDrag<any>)=>{
      return this._section.sectionDrop;
   }
  }

}

