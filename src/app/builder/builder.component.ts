import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ElementRef} from '@angular/core';
import { Options } from 'sortablejs';
import { NavbarService } from '../_services/navbar.service';
import { SectionService } from '../_services/_builderService/section.service';
import { RowService } from '../_services/_builderService/row.service';
import { ColumnService } from '../_services/_builderService/column.service';
import { ElementService } from '../_services/_builderService/element.service';
import { StyleService } from '../_services/_builderService/style.service';
import { GeneralService } from '../_services/_builderService/general.service';
import { ImageService } from '../_services/image.service';
import { NgxMatColorPickerInput } from '@angular-material-components/color-picker';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { WebpagesService } from '../_services/webpages.service';
import { NgxCaptureService } from 'ngx-capture';
import { FileUploadService } from '../_services/file-upload.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css','./material.component.css'],
})


export class BuilderComponent implements OnInit, AfterViewInit {

  DialogParentToggle:boolean = false;

  @ViewChild('main', { static: true }) screen: any;
  @ViewChild(NgxMatColorPickerInput) pickerInput: NgxMatColorPickerInput | any;

  showNavFrom:string = 'bottom';
  interval = setInterval((e:any)=>{
    if(this._general.file.load) {
      this._general.loading.success = false; 
      clearInterval(this.interval);
      this.setBuilder(this._general.file.html, this._general.file.css);
      this._general.file.load = false;
    }
  })


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _nav: NavbarService,
    private webPageService: WebpagesService,
    // builder services start
    public _style: StyleService,
    public _section: SectionService,
    public _row: RowService,
    public _column: ColumnService,
    public _element: ElementService,
    public _general: GeneralService,
    public _image: ImageService,
    private fileUploadService: FileUploadService,
    // builder services end
    private captureService: NgxCaptureService) {
    _section.sections = [];
    _general.loading.success = false;
    _general.loading.error = false;
      this.route.paramMap.subscribe((params: ParamMap) => {
        _general.getWebPageDetails(params.get('id'));
      })
   }

   takePageSS(main:any) {
    this._general.saveDisabled = true;
    var checkPath:any = this._general.checkExstingPath(main, this._section.sections);
    if(checkPath) {
      this.captureService.getImage(this.screen.nativeElement, true).subscribe(e=>{
        var file:any = this._image.base64ToFile(e, this._general.webpage.uniqueid+'-screenshot.png');
        this.fileUploadService.upload(file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {
                  console.log(event);
              }
          });
      })
    }
    else {
      this._general.saveDisabled = false;
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
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
    if(html.querySelectorAll('.kb-section').length != 0) {
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
        secObj.style = {
          desktop: this.filterStyle(sec.id,css,''),
          tablet_h: this.filterStyle(sec.id,css,'1024,769'),
          tablet_v: this.filterStyle(sec.id,css,'768,426'),
          mobile: this.filterStyle(sec.id,css,'426')
        }
        sec.querySelectorAll('.kb-row').forEach((row:any)=>{
          var rowObj = JSON.parse(JSON.stringify(this._row.rowObj));
          rowObj.id = row.id;
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
          rowObj.columnGap.desktop = rowObj.columnGap.desktop ? rowObj.columnGap.desktop.gap.split('rem')[0] : 0;
          rowObj.columnGap.tablet_h = rowObj.columnGap.tablet_h ? rowObj.columnGap.tablet_h.gap.split('rem')[0] : 'auto';
          rowObj.columnGap.tablet_v = rowObj.columnGap.tablet_v ? rowObj.columnGap.tablet_v.gap.split('rem')[0] : 'auto';
          rowObj.columnGap.mobile = rowObj.columnGap.mobile ? rowObj.columnGap.mobile.gap.split('rem')[0] : 'auto';
          row.querySelectorAll('.kb-column').forEach((col:any)=>{
            rowObj.rowSize = col.classList[2];
            var colObj = JSON.parse(JSON.stringify(this._row.columnObj));
            colObj.id = col.id;
            colObj.style = {
              desktop: this.filterStyle(col.id,css,''),
              tablet_h: this.filterStyle(col.id,css,'1024,769'),
              tablet_v: this.filterStyle(col.id,css,'768,426'),
              mobile: this.filterStyle(col.id,css,'426')
            }
            col.querySelectorAll('.kb-element').forEach((ele:any)=>{
              var eleSel = 'div';
              var eleObj = JSON.parse(JSON.stringify(this._element.elementObj));
              var content = ele.querySelector('.kb-element-content');
              eleObj.content.name = ele.children[0].getAttribute('ng-reflect-ng-switch');
              if(eleObj.content.name == 'heading' || eleObj.content.name == 'text') {
                eleObj.content.html = content.children[0].innerHTML;
              }
              else if(eleObj.content.name == 'image') {
                eleSel = 'img';
                eleObj.content.src = content.querySelector('IMG').src;
              }
              else if(eleObj.content.name == 'button') {
                var anchor = content.querySelector('A');
                eleSel = 'a';
                eleObj.content.text = anchor.querySelectorAll('DIV')[0].innerText;
                eleObj.content.subtext = anchor.querySelectorAll('DIV')[1].innerText;
                eleObj.content.subfont_size = anchor.querySelectorAll('DIV')[1].style['font-size'];
                eleObj.content.link = anchor.href;
                eleObj.content.target = anchor.target;
              }
              eleObj.id = ele.id;
              eleObj.style = {
                desktop: this.filterStyle(ele.id+' .kb-element-content '+eleSel,css,''),
                tablet_h: this.filterStyle(ele.id+' .kb-element-content '+eleSel,css,'1024,769'),
                tablet_v: this.filterStyle(ele.id+' .kb-element-content '+eleSel,css,'768,426'),
                mobile: this.filterStyle(ele.id+' .kb-element-content '+eleSel,css,'426')
              } 
              eleObj.content.style = JSON.parse(JSON.stringify(eleObj.style));
              colObj.elementArr.push(eleObj);
            })
            rowObj.columnArr.push(colObj);
          })
          secObj.rowArr.push(rowObj);          
        })
        this._section.sections.push(secObj);
        if(html.querySelectorAll('.kb-section').length == this._section.sections.length) this._general.loading.success = true;
      })
    }
    else {
      this._general.loading.success = true;
      this._section.addSection(0);
    }
  }

  onDragEnded(event:any) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    let parentPosition = this.getPosition(element);
    let x = boundingClientRect.x - parentPosition.left;
    let y = boundingClientRect.y - parentPosition.top;
    if(-1*y > screen.height/1.5) {
      this.showNavFrom = 'top';
    }
    else if(screen.width/2 + x < 70) {
      this.showNavFrom = 'left';
    }
    else if(screen.width/2 - x < 100) {
      this.showNavFrom = 'right';
    }
    else {
      this.showNavFrom = 'below';
    }
  }
  
  getPosition(el:any) {
    let x = 0;
    let y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  elementDblClk(element: any, event:any) {
    if(element.content.name == 'text' || element.content.name == 'heading') {
      this._general.showInlineEditor = true;
      element.content.editor = true;
      this._general.selectedBlock = element;
    }
    else {
      this._general.blockSelection = '';
      this._general.selectedBlock = element;
      this._style.blockSetting(element);
      this.openDialog(event)
    }
  }

  // drag drop box

  openDialog(e:any) {
      this.DialogParentToggle = !this.DialogParentToggle;
  }

  // drag drop box

  // builder options

  builderSectionOptions: Options = {
    group: 'section',
    scroll: true,
    sort: true,
    handle: '.kb-handle-section',
    // dragoverBubble: false,
    // fallbackOnBody: false,
    // draggable: ".class",
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      this._section.savePageSession();
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  };  

  builderRowOptions: Options = {
    group: 'row',
    scroll: true,
    sort: true,
    handle: '.kb-handle-row',
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      this._section.savePageSession();
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  };  

  builderElementOptions: Options = {
    group: 'element',
    scroll: true,
    sort: true,
    handle: '.kb-handle-element',
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      this._section.savePageSession();
    },
    onAdd: (event: any) => {
      this._section.savePageSession();
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  };  

  // builder options

}
