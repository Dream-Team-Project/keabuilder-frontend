import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ElementRef, QueryList, ViewChildren, ViewEncapsulation, HostListener, TemplateRef} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgxMatColorPickerInput } from '@angular-material-components/color-picker';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { NgxCaptureService } from 'ngx-capture';
import { asapScheduler} from 'rxjs';
import { ImageService } from 'src/app/_services/image.service';
import { StyleService } from 'src/app/_services/_builder/style.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { SectionService } from 'src/app/_services/_builder/section.service';
import { RowService } from 'src/app/_services/_builder/row.service';
import { ColumnService } from 'src/app/_services/_builder/column.service';
import { ElementService } from 'src/app/_services/_builder/element.service';


@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css','../../material.component.css'],
  encapsulation: ViewEncapsulation.None
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
  @ViewChild('main', { static: false }) screen: any;
  @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput | any;
  
  validate = {
    tempname: new FormControl('', [Validators.required]),
  }
  showNavFrom:string = 'bottom';
  trigger:string = 'saved';
  contextMenuPosition = { x: '0px', y: '0px' };
  transferData:any;
  wfpos:any = 'end';
  saveTemplateSection:any;
  wfhide:any = true;
  autoSaveInterval:any;
  autoSaving:boolean = false;
  askForSaveInterval:any;
  dntaskforsave:boolean = false;
  ishf:boolean = false;
  zoom:any = false;
  initial:boolean = true;
  matMenuEle:any;
  saveTempAs:string = '';

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
                data.json = _general.webpage.page_json;
                if(_general.target.type == 'funnel') {
                  if(_general.webpage.funneltype == 'order') {
                    _general.fetchOrderForms().then(data=>{
                      _general.order_forms = data;
                      this._element.elementList['order_form'] = { content: { name: 'order-form-component', type: 'order_form' }, iconCls: 'fab fa-wpforms' };
                    });
                  }
                  else {
                    _general.fetchOffers().then(data=>{
                      _general.offers = data;
                    });
                    if(_general.webpage.funneltype == 'upsell') {
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
                }
              }
              _section.pageSessionArr = [];
              if(data.json) {
                var jsonObj = _general.decodeJSON(data.json);
                if(!this.ishf) {
                  _general.main.style = jsonObj.mainstyle;
                  _general.main.page_code = jsonObj.head.page_code;
                  var style = document.createElement('STYLE');
                  style.id = 'kb-append-style';
                  style.innerHTML = _general.main.page_code;
                  document.head.appendChild(style);
                } 
                jsonObj.header ? _general.selectedHeader = jsonObj.header : _general.includeLayout.header = false;
                jsonObj.footer ? _general.selectedFooter = jsonObj.footer : _general.includeLayout.footer = false;
                _section.sections = jsonObj.sections;
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
                this._section.savePageSession();
              }
              else this._section.addSection(0);
              this._general.loading.success = true;
            }
            else _general.redirectToPageNotFound();
        })
        _section.builderCDKMethodCalled$.subscribe(() => {
          setTimeout((e:any)=>{
            this.setDragDrop();
            this._general.pageSaved = false;
            if(!this.ishf) this.savePreview();
            else if(this.initial) {
                this._general.pageSaved = true;
                this.initial = false;
            }
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
    this.savePage();
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
      this._general._file.upload(file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {
              var msg =  stxt.charAt(0).toUpperCase() + stxt.slice(1) +' has been '+this.trigger;
              this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
              this._general.saveDisabled = false;
              this.trigger = 'saved';
            }
        })
    })
  }

  saveTemplate(main:any) {
    if(!this.validate.tempname.invalid) {
      var temp = this.saveTemplateSection;
      var obj = {uniqueid: this._general.makeid(20), name: temp.name, template: this._general.encodeJSON(temp)};
      if(this.saveTempAs == 'section') this.saveSectionTemplate(obj);
      else this.savePageTemplate(main, obj);
    }
    return false;
  }

  savePageTemplate(main:any, obj:any) {
    obj.category = 'saved';
    this._general.templateobj = JSON.parse(JSON.stringify(obj));
    this._general.saveHTML(this._section.sections, false, true).then(res2 =>{
      let msg = 'Page has been saved as template';
      this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
      this.dialog.closeAll();
    });
  
  }

  saveSectionTemplate(obj:any) {
    this._general._file.savesectiontemplate(obj).subscribe((resp:any)=>{
      this._general.saveDisabled = true;
      this.takePageSS('section-'+obj.uniqueid, 'section template');
      this._general.fetchSectionTemplates();
      this.dialog.closeAll();
    })
  }

  saveHeaderFooter() {
    this._general.pathError = false;
    this._general.saveHeaderFooter(this._section.sections).then(res =>{
      if(!this.autoSaving) {
        if(!res) this._general.openSnackBar(true, 'Server Error', 'OK', 'center', 'top');
        else if(res) {
          if(!this.autoSaving) this._general.saveDisabled = true;
          this.takePageSS(this._general.target.type+'-'+this._general.target.id, this._general.target.type);
        }
        else this._general.saveDisabled = false;
        clearInterval(this.askForSaveInterval);
        this.askForSaveInterval;
      }
      else this.autoSaving = false;
      this.autoSaveTrigger();
    });
  }

  saveHTML() {
    if(!this.autoSaving) this._general.savingPage = true;
    this._general.pathError = false;
    this._general.saveHTML(this._section.sections, false, false).then(res =>{
      if(!this.autoSaving) {
        if(this._general.pathError) this.openPageSetting(null);
        else if(!res) this._general.openSnackBar(true, 'Server Error', 'OK', 'center', 'top');
        else this.successMsg('Page');
        this._general.savingPage = false;
        clearInterval(this.askForSaveInterval);
        this.askForSaveInterval;
      }
      else this.autoSaving = false;
      this.autoSaveTrigger();
    });
  }

  savePage() {
    !this.ishf ? this.saveHTML() : this.saveHeaderFooter();
  }

  savePreview() {
    this._general.saveHTML(this._section.sections, true, false).then(e=>{
      if(this.initial) {
        this._general.pageSaved = true;
        this.initial = false;
      }
    });
  }

  successMsg(stxt:any) {
    var msg =  stxt.charAt(0).toUpperCase() + stxt.slice(1) +' has been '+this.trigger;
    this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
    this._general.saveDisabled = false;
    this.trigger = 'saved';
  }

  openPageSetting(event:any) {
    this._general.blockSelection = '';
    this._general.selectedBlock = this._general.main;
    this._style.blockSetting(this._general.main);
    this.openDialog();
  }

  // dialog box

  openDialog() {
      this.DialogParentToggle = !this.DialogParentToggle;
  }

  openImageDialog(e:any) {
    this.DialogImageToggle = !this.DialogImageToggle;
  }

  saveAsTemplateDialog(templateRef:any, section:any, asa:string) {
    this.saveTempAs = asa;
    this.saveTemplateSection = JSON.parse(JSON.stringify(section));
    var dialogData = this.dialog.open(templateRef);
    dialogData.afterClosed().subscribe((data:any)=>{
      this.validate.tempname.reset();
    })
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
          vm.savePage();
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
      this.trigger = 'saved'; 
      this.savePage();
    }
    else if(e == 'publish' || e == 'draft') {
      this._general.main.publish_status = e == 'publish';
      this.trigger = this._general.main.publish_status ? 'published' : 'draft';
      this.savePage();
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
        menu.content = this._element.setMenu(menu.content, appendData);
        menu.content.itemset = true;
        appendData = menu;
      }
      if(appendData.type == 'form') {
        var form = JSON.parse(JSON.stringify(this._element.elementList['form']));
        form.content = this._element.setFormId(form.content, appendData);
        form.content.itemset = true;
        appendData = form;
      }
      if(appendData.type == 'order_form') {
        var order_form = JSON.parse(JSON.stringify(this._element.elementList['order_form']));
        order_form.content = this._element.setOrderFormId(order_form.content, appendData);
        order_form.content.itemset = true;
        appendData = order_form;
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

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}

  elementDblClk(element:any) {
    if(element.content.name != 'form-component' && 
    element.content.name != 'order-form-component') this.openSetting(element);
  }

  isBlockActive(block:any) {
    return this._general.selectedBlock.id == block.id && this._general.selectedBlock.type == block.type;
  }

  openSetting(block:any) {
    this._general.blockSelection = ''; 
    this._general.selectedBlock = block; 
    this._style.blockSetting(block); 
    this.openDialog();
  }
}


