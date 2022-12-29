import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { GeneralService } from '../_services/_builder/general.service';
import { SectionService } from '../_services/_builder/section.service';
import { RowService } from '../_services/_builder/row.service';
import { ElementService } from '../_services/_builder/element.service';
import { ImageService } from '../_services/image.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-builder-topbar',
  templateUrl: './builder-topbar.component.html',
  styleUrls: ['./builder-topbar.component.css', '../builder/material.component.css'],
})
export class BuilderTopbarComponent implements OnInit {

  @ViewChild('selection') selection!: ElementRef;
  @ViewChild('element') element!: ElementRef;
  @Output('openImageDialog') openImageDialog: EventEmitter<any> = new EventEmitter();
  @Output('wireframeToggle') wireframeToggle: EventEmitter<any> = new EventEmitter();
  @Output('parentTrigger') parentTrigger: EventEmitter<any> = new EventEmitter();
  @Output('transferIndex') transferIndex: EventEmitter<any> = new EventEmitter();
  @Input('wftgl') wftgl:any;

  selectedTab:string = '';
  selectedElement:string = '';
  toggle = {open: false, close: false};
  slideShift:number = 0;
  shiftLen:number = 0;
  toggleElement = {open: false, close: false};
  slideElementShift:number = 0;
  shiftElementLen:number = 0;
  waitST = true;
  waitET = true;
  prevImg:string = '';
  rowtypes:any = [{name:'All', value: ''}, {name:'Single', value: 1}, {name:'Two', value: 2}, {name:'Three', value: 3}, {name:'Four', value: 4}, {name:'Five', value: 5}, {name:'Six', value: 6}]
  searchText:string = '';
  searchRowFilter:any = this.rowtypes[0];
  tempOrder:any = [{icon: 'ascending', name:'Ascending By Name', value: 'asc', type: 'name'}, {icon: 'ascending', name:'Ascending By Date', value: 'asc', type: 'id'}, {icon: 'descending', name:'Descending By Name', value: 'desc', type: 'name'}, {icon: 'descending', name:'Descending By Date', value: 'desc', type: 'id'}];
  tempOrderFilter:any = this.tempOrder[3];
  seltemp:any;
  
  constructor(
    public _general:GeneralService,
    public _section:SectionService,
    public _row: RowService,
    public _element: ElementService,
    public _image:ImageService,
    private dialog: MatDialog
    ) {
      this.createDefaultSections();
      this.createDefaultElements();
      this._general.fetchSectionTemplates();
      this._general.templatesUpdated.subscribe(value => {
        if(this.selectedTab == 'l-templates') 
        setTimeout((e:any)=>this.setShift());
      })
      this._image.imagesUpdated.subscribe(value => {
        if(this.selectedTab == 'elements' && this.selectedElement == 'image') 
        setTimeout((e:any)=>this.setElementShift());
      })
    }

  ngOnInit(): void {}

  openDialog(templateRef: TemplateRef<any>, temp:any) {
    this.seltemp = JSON.parse(JSON.stringify(temp));
    console.log('keaimage-section-'+this.seltemp.uniqueid+'-screenshot.png');
    this.dialog.open(templateRef);
  }  
  
  deleteTemplate() {
    this._general.fileUploadService.deletetemplate(this.seltemp.id).subscribe(e=>{
      this._general.fetchSectionTemplates().then(e=>{
        this.snackBar('deleted');
      });
      this._general.fileUploadService.deleteimage('keaimage-section-'+this.seltemp.uniqueid+'-screenshot.png').subscribe(e=>{});
    })
  }

  updateTemplate() {
    var temp = JSON.parse(this.seltemp.template);
    temp.name = this.seltemp.name;
    this.seltemp.template = JSON.stringify(temp);
    this._general.fileUploadService.updatetemplate(this.seltemp).subscribe(e=>{
      this._general.fetchSectionTemplates().then(e=>{
        this.snackBar('renamed');
      });
    })
  }

  snackBar(msg:string) {
    this._general.openSnackBar('Template has been '+msg, 'OK', 'center', 'top');
  }

  createDefaultSections() {
    for(var s=0; s<5; s++) {
      var obj = {type: 'section', width: 100-(s*10)+'%'};
      this._section.sectionTypes.push(obj);
    }
  }

  createDefaultElements() {
    this._element.elementList.forEach(e=>{
      if(e.content.name == 'heading') {
        var types = ['h1','h2','h3','h4','h5','h6'];
        var size = 42;
        for(var i=0; i<types.length; i++) {
          var obj = JSON.parse(JSON.stringify(e));
          obj.content.type = types[i];
          obj.content.size = size;
          obj.content.html = '<'+types[i]+'>Heading Goes Here</'+types[i]+'>';
          this._element.defaultHeadings.push(obj);
          size = size - 4;
        }
      }
      if(e.content.name == 'text') {
        var types = ['xl','l','m','s','xs'];
        var size = 22;
        for(var i=0; i<types.length; i++) {
          var obj = JSON.parse(JSON.stringify(e));
          obj.content.type = types[i];
          obj.content.size = size;
          this._element.defaultTexts.push(obj);
          size = size - 2;
        }
      }
      if(e.content.name == 'button') {
        let types:any = [{name: 'regular', subtext: false}, {name: 'regular', subtext: true}, 
        {name: 'upsell', subtext: false},  {name: 'upsell', subtext: true}, 
        {name: 'downsell', subtext: false}, {name: 'downsell', subtext: true}];
        for(var i=0; i<types.length; i++) {
          var obj = JSON.parse(JSON.stringify(e));
          obj.content.type = types[i];
          if(types[i].name == 'upsell' || types[i].name == 'downsell') {
              obj.content.btntype = types[i].name;
              obj.content.text = types[i].name[0].toUpperCase() + types[i].name.slice(1) + ' Button';
              obj.content.productid = '';
          }
          if(types[i].subtext) obj.content.subtext = 'Extra Text';
          this._element.defaultButtons.push(obj);
        }        
      }
    })
  }

  dragDataEmit(i:number) {
    this.transferIndex.emit(i);
  }

  nextSlide() {
    if(this.slideShift < this.shiftLen-1) this.slideShift++;
  }

  prevSlide() {
    if(this.slideShift > 0) this.slideShift--;
  }

  setShift() {
    if(this.selection) {
      var selection = this.selection.nativeElement.children[0];
      var len = selection?.children.length;
      var cw = selection?.children[0]?.clientWidth;
      this.shiftLen = len*cw / (this._general.screenWidth-cw);
      if(this.shiftLen < 1.1) this.shiftLen = 0;
      this.slideShift = 0;
    }
  }

  selectTab(value:string) {
    if(this.waitST) {
      this.waitST = false;
      this.selectElement(this.selectedElement);
      var temp = this.selectedTab != value;
      if(temp) {
        var isEmpty = this.selectedTab == '';
        this.selectedTab = value;
        if(isEmpty) this.toggle.open = true;
      }
      else this.toggle.close = true;
      setTimeout((e:any)=>{
        this.toggle.open = false;
        this.toggle.close = false;
        if(!temp) this.selectedTab = '';
        this.setShift();
        this.searchText = '';
        this.waitST = true;
      }, 200);
      this._section.sectionDrop = value == 'l-sections' || value == 'l-templates' ? true : false;
    }
  }

  selectFilter(obj:any) {
    this.searchRowFilter = obj;
    setTimeout(()=>{this.setShift()}, 100);
  }

  nextElementSlide() {
    if(this.slideElementShift < this.shiftElementLen-1) this.slideElementShift++;
  }

  prevElementSlide() {
    if(this.slideElementShift > 0) this.slideElementShift--;
  }

  setElementShift() {
    if(this.element) {
      var element = this.element.nativeElement.children[0];
      var len = element?.children.length;
      var cw = element?.children[0]?.clientWidth;
      this.shiftElementLen = len*cw / (this._general.screenWidth-cw);
      if(this.shiftElementLen < 1.1) this.shiftElementLen = 0;
      this.slideElementShift = 0;
    }
  }

  selectElement(value:string) {
    if(this.waitET) {
      this.waitET = false;
      var temp = this.selectedElement != value;
      if(temp) {
        var isEmpty = this.selectedElement == '';
        this.selectedElement = value;
        if(isEmpty) this.toggleElement.open = true;
      }
      else this.toggleElement.close = true;
      setTimeout((e:any)=>{
        this.toggleElement.open = false;
        this.toggleElement.close = false;
        if(!temp) this.selectedElement = '';
        this.setElementShift();
        this.searchText = '';
        this.waitET = true;
      }, 200);
    }
  }

  hideBar() {
    this.toggle.close = true;
    this.toggleElement.close = true;
    setTimeout(()=>{
      this.toggle.close = false;
      this.toggleElement.close = false;
      this.selectedTab = '';
      this.selectedElement = '';
    }, 200)
  }

  setTrigger(value:any) {
    this.parentTrigger.emit(value);
  }

  backBtn(link:string) {
    window.open(window.origin+link, '_self');
  }

  redirectToLink(link:string) {
    window.open(window.origin+link, '_blank');
  }

  openImgDialog() {
    this._image.imageSelectionAllow = false;
    this._image.imgMatTabIndex = 0;
    this.openImageDialog.emit(true);
  }

  setHeader(head:any) {
    if(head) this._general.setHeader(head).then((e:any)=>this.setTrigger('preview'));
    else {
      this._general.includeLayout.header = false;
      this.setTrigger('preview');
    }
  }

  setFooter(foot:any) {
    if(foot) this._general.setFooter(foot).then((e:any)=>this.setTrigger('preview'));
    else {
      this._general.includeLayout.footer = false;
      this.setTrigger('preview');
    }
  }

  respToggle(device:any) {
    if(device == this._general.respToggleDevice.name) device = 'desktop';
    this._general.respToggleDevice = this._general.respDevices[device];
  }

}
