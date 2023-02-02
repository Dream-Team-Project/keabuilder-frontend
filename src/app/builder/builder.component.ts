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
  transferData:any;
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
            if(!data) _general.openSnackBar(true, 'Server Error', 'OK', 'center', 'top');
            else if(!_general.isObjEmpty(data)) {
              if(this.ishf) _general.target.name = data.name;
              else {
                data.html = _general.parser.parseFromString(data.html, 'text/html');
                var header = data.html.querySelector('header');
                var footer = data.html.querySelector('footer');
                if(header) {
                  var headid = header.id.split('kb-header-')[1];
                  _general.headers.forEach((head:any)=>{ if(head.uniqueid == headid) _general.setHeader(head); })
                }
                else _general.includeLayout.header = false;
                if(footer) {
                  var footid = footer.id.split('kb-footer-')[1];
                  _general.footers.forEach((foot:any)=>{ if(foot.uniqueid == footid) _general.setFooter(foot); })
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
                data.json = _general.webpage.page_json;
              }
              if(data.json) {
                var jsonObj = _general.decodeJSON(data.json);
                if(!this.ishf) _general.main.style = jsonObj.mainstyle;
                _section.sections = jsonObj.sections;
                _section.pageSessionArr = [];
                _section.sections.forEach((sec:any)=>{
                  sec.rowArr.forEach((row:any)=>{
                    row.columnArr.forEach((col:any)=>{
                      col.elementArr.forEach((ele:any)=>{
                        var cont = ele.content;
                        if(cont.name == 'menu') {
                          this._general.menus.forEach((menu:any)=>{
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
              else this._section.addSection(0);
              this._section.savePageSession();
              this._general.loading.success = true;
            }
            else _general.redirectToPageNotFound();
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
        if(!res) this._general.openSnackBar(true, 'Server Error', 'OK', 'center', 'top');
        else if(res) this.takePageSS(this._general.target.type+'-'+this._general.target.id, this._general.target.type);
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
    this._general.saveHTML(main, this._section.sections, false, tglDraft).then(res =>{
      if(!this.autoSaving) {
        if(this._general.pathError) {
          this._general.saveDisabled = false;
          this.openPageSetting(null);
        }
        else if(!res) {
          this._general.saveDisabled = false;
          this._general.openSnackBar(true, 'Server Error', 'OK', 'center', 'top');
        }
        else this.takePageSS('page-'+this._general.webpage.uniqueid, 'Page');
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
    if(this.transferData) {
      var appendIndex =  event.currentIndex-1;
      var appendData = this.transferData;
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
      this.transferData = '';
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

