import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { StyleService } from 'src/app/_services/_builder/style.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ElementService } from 'src/app/_services/_builder/element.service';
import { ImageService } from 'src/app/_services/image.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatMenuTrigger } from '@angular/material/menu';
import { EmailService } from 'src/app/_services/_crm/email.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgxCaptureService } from 'ngx-capture';

@Component({
  selector: 'app-crm-email-builder',
  templateUrl: './email-builder.component.html',
  styleUrls: ['./email-builder.component.css','../../_builder/builder-topbar/builder-topbar.component.css','../../_builder/builder/builder.component.css','../../material.component.css']
})
export class CrmEmailBuilderComponent implements OnInit {
  
  @ViewChild('selection') selection!: ElementRef;
  @ViewChild('element') element!: ElementRef;
  @ViewChild('settingdialog') settingdialog!: TemplateRef<any>;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  @ViewChild('emailbody', { static: false }) screen: any;

  DialogParentToggle:boolean = false;
  DialogImageToggle:boolean = false;

  contextMenuPosition = { x: '0px', y: '0px' };
  sectionObj:any = {id: '', type: 'section', setting: false,  style: {desktop:'', tablet_h:'', tablet_v:'', mobile:'', hover: ''}};
  emailElements:any = {
    section: {},
    elements: [],
  };
  emailElementList: any = {
    // heading
    heading: {
      content: {
        name: 'heading',
        html: `<h2>Heading goes here</h2>`,
        size: 38,
        editor: false,
      }, iconCls: 'fas fa-heading'
    },
    // heading
    // text
    text: {
      content: {
        name: 'text',
        html: `<p>Kea Builder is named after the parrot Kea. Kea is one of the smartest birds on earth. The Kea is a species of largest parrot in the family Nestoridae found in the forested and alpine regions of the South Island of New Zealand.</p>`,
        size: 16,
        editor: false,
      }, iconCls: 'fas fa-font'
    },
    // text
    // image
    image: { content: { name: 'image', src: '' }, iconCls: 'far fa-image' },
    // image
    // video
    video: {
      content: {
        name: 'video',
        type: 'video',
        iframe: '<iframe width="560" height="315" src="http://localhost:4200/assets/videos/movie.mp4" title="Video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
        src: 'http://localhost:4200/assets/videos/movie.mp4',
        autoplay: false,
        muted: false,
        loop: false,
        controls: true
      }, iconCls: 'fas fa-video'
    },
    // video
    // button
    button: {
      content: {
        name: 'button', size: 14, btntype: 'regular',
        text: 'Read More', subtext: '', subfont_size: '80%',
        link: '#no-link', target: '_self'
      }, iconCls: 'fas fa-toggle-off'
    },
    // button
    // divider
    divider: { content: { name: 'divider' }, iconCls: 'fas fa-minus' },
    // divider
    // icon
    icon: { content: { name: 'icon', icon_html: `<i class="fa-solid fa-icons"></i>`, size: 18 }, iconCls: 'fa-solid fa-icons' },
    // icon
    // checkout form
    // append
    // checkout form
  };
  autoSaveInterval:any;
  autosave:boolean = false;
  validate = {
    name: new FormControl('', [Validators.required]),
    subject: new FormControl('', [Validators.required]),
  }
  email:any = {
    id:'',
    uniqueid:'',
    name: '',
    subject:'',
    body:'',
    json:'',
  }
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
  rowtypes:any = [{icon: 'column', name:'All', value: ''}, {icon: 'column1', name:'Single', value: 1}, {icon: 'column2', name:'Two', value: 2}, {icon: 'column3', name:'Three', value: 3}, {icon: 'column4', name:'Four', value: 4}, {icon: 'column5', name:'Five', value: 5}, {icon: 'column6', name:'Six', value: 6}]
  searchRowFilter:any = this.rowtypes[0];
  searchText:string = '';
  seltemp:any;
  settingdialogOpen:boolean = false;
  dialogData:any;
  emailSaved:boolean = true;
  session:any = {undo: 0, redo: 0}
  sessionArr:any = [];
  initial:boolean = true;
  uniqueid:any;
  constructor(
    public _style: StyleService,
    public _general:GeneralService,
    public _element: ElementService,
    public _image:ImageService,
    private dialog: MatDialog,
    public _email:EmailService,
    private route: ActivatedRoute,
    private captureService: NgxCaptureService,
    ) {
      route.paramMap.subscribe((params: ParamMap) => {this.uniqueid=params.get('id')});
      this.createSection();
      this._element.createDefaultElements();
      _image.imagesUpdated.subscribe(value => {
        if(this.selectedTab == 'elements' && this.selectedElement == 'image') 
        setTimeout((e:any)=>this.setElementShift());
      })
      this.sessionArr = [];
      this.saveSession();
      document.addEventListener('contextmenu', event => event.preventDefault());
  }

  @HostListener('document:keydown.control.s', ['$event'])  
  onKeydownHandler(event:KeyboardEvent) {
    event.preventDefault();
    this.save();
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': '' };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  ngOnInit(): void {
    this.fetchsingleemail();
    var vm = this;
    window.addEventListener('beforeunload', function (e) {
      if(!vm.emailSaved) {
        e.preventDefault();
        e.returnValue = '';
      }
    });
  }
  fetchsingleemail(){
  if(this.uniqueid){
  this._email.getsingleemail({uniqueid:this.uniqueid}).subscribe((data:any)=>{
    if(data.success){
    this.email.name=data?.data[0]?.name;
    this.email.subject=data?.data[0]?.subject;
    this.email.id=data?.data[0]?.id;
    this.email.uniqueid=data?.data[0]?.uniqueid;
    this.emailElements=data?.data[0].json ? this._general.decodeJSON(data?.data[0]?.json) : this.emailElements;
    }
  });
}
  }
  createSection() {
    var tempObj = JSON.parse(JSON.stringify(this.sectionObj));
    tempObj.email = true;
    tempObj.style = {
      desktop: this._style.defaultStyling(tempObj),
      tablet_h: '',
      tablet_v: '',
      mobile: ''
    }
    tempObj.id = this._general.createBlockId(tempObj);
    this.emailElements.section = tempObj;
  }

  save() {
    if(this.email.name && this.email.subject && this.emailElements){
    var trackImg = '<img src="'+window.origin+'/api/recipient_email/'+this.email.id+'" style="display:none">';
    this.email.json=this._general.encodeJSON(this.emailElements);
    this.screen.nativeElement.style.display = 'flex';
    this.email.body=this.screen.nativeElement.outerHTML + trackImg;
    this._email.updateemail(this.email).subscribe((data:any)=>{
      if(data.success) {
        this.captureService.getImage(this.screen.nativeElement, true).subscribe(e=>{
          var file:any = this._image.base64ToFile(e, 'email-'+this.email.uniqueid+'-screenshot.png');
          this._general._file.upload(file).subscribe(
            (event: any) => {
              if (typeof (event) === 'object') {
                var msg =  'Email has been saved';
                this._general.openSnackBar(false, data?.message, 'OK', 'center', 'top');
               
              }
            })
        })
      // this._general.openSnackBar(false, data?.message, 'OK', 'center', 'top');
      }
      else{
        var msg =  'Server Error';
      this._general.openSnackBar(false, data?.message, 'OK', 'center', 'top');
      }
    })
  }else{
    var msg =  'Please Fill All Details';
  this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
  }
  }

  autoSaveTrigger(trigger:boolean) {
    clearInterval(this.autoSaveInterval);
    if(trigger) {
      this.autoSaveInterval = setInterval(()=>{
        this.save();
      }, 2000);
      this.autoSaveInterval;
    }
    this.autosave = trigger;
  }

  openSettingDialog(templateRef: TemplateRef<any>) {
    this.settingdialogOpen = true;
    this.dialogData = this.dialog.open(templateRef);
    this.dialogData.afterClosed().subscribe((data:any)=>{
      this.settingdialogOpen = false;
      if(this.validate.name.invalid) this.openSettingDialog(this.settingdialog);
    })
  }

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.saveSession();
    } else {
      this.addElement(event.item.data, event.currentIndex);
    }
  }

  addElement(element: any, index: number) {
    if(element.type == 'icon') {
      var appendIcon = JSON.parse(JSON.stringify(this.emailElementList.icon));
      appendIcon.content.icon_html = this._element.setIcon(element);
      element = appendIcon;
    }
    if(element.type == 'image') {
      var image = JSON.parse(JSON.stringify(this._element.elementList['image']));
      image.content.src = element.ext_link ? element.path : this._image.uploadImgPath+element.path;
      image.content.itemset = true;
      element = image;
    }
    if(element.content) {
      element.content.email = true;
      var tempObj = this._element.addElement(element.content);
      tempObj.id = this._general.createBlockId(tempObj);
      tempObj.setting = false;
      tempObj.email = true;
      if(tempObj) this.emailElements.elements.splice(index, 0, tempObj);
      this.saveSession();
    }
  }

  duplicateElement(element: any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(element));
    tempObj.id = this._general.createBlockId(tempObj);
    tempObj.setting = false;
    this.emailElements.elements.splice(index + 1, 0, tempObj);
    this.saveSession();
  }

  deleteElement(index:number) {
    this.emailElements.elements.splice(index, 1);
    this.saveSession();
  }

  isBlockActive(block:any) {
    return this._general.selectedBlock.id == block.id && this._general.selectedBlock.type == block.type;
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

  openDialog() {
    this.DialogParentToggle = !this.DialogParentToggle;
  }

  openImageDialog() {
    this.DialogImageToggle = !this.DialogImageToggle;
  }

  openSetting(block:any) {
    this._general.blockSelection = ''; 
    this._general.selectedBlock = block; 
    this._style.blockSetting(block); 
    this.openDialog();
  }

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}

  // session

  saveSession() {
    var sessionStr = JSON.stringify(this.emailElements).replace(/"setting":true/g, '"setting":false');
    if(this.sessionArr[this.sessionArr.length-1] != sessionStr && this.sessionArr[this.session.undo] != sessionStr) {
      this.sessionArr.push(sessionStr);
      this.session.undo = this.sessionArr.length-1; 
      this.session.redo = this.sessionArr.length; 
      if(!this.initial) this.emailSaved = false;
      else this.initial = false;
    }
  }

  undo() {
    var sObj = this.sessionArr[this.session.undo-1];
    if(sObj) {
      this.emailElements = JSON.parse(sObj);
      this.session.undo--;
      this.session.redo--;
    }
  }

  redo() {
    var sObj = this.sessionArr[this.session.redo];
    if(sObj) {
      this.emailElements = JSON.parse(sObj);
      this.session.undo++;
      this.session.redo++;
    }
  }
}
