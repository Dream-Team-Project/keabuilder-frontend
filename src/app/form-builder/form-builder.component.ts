import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef, HostListener } from '@angular/core';
import { FormService } from '../_services/_builder/form.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GeneralService } from '../_services/_builder/general.service';
import { StyleService } from '../_services/_builder/style.service';
import { ImageService } from '../_services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxCaptureService } from 'ngx-capture';
import { KeyValue } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css','../builder-topbar/builder-topbar.component.css','../builder/builder.component.css','../builder/material.component.css']
})
export class FormBuilderComponent implements OnInit {
  @ViewChild('selection') selection!: ElementRef;

  private onCompare(_left: KeyValue<any, any>, _right: KeyValue<any, any>): number {
    return -1;
  }

  @ViewChild('form', { static: true }) screen: any;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;

  DialogParentToggle:boolean = false;
  DialogImageToggle:boolean = false;

  contextMenuPosition = { x: '0px', y: '0px' };
  dragBoxAnime:any = {open: false, close: false};
  waitST = true;
  searchText:string = '';
  selectedTab:string = '';
  toggle = {open: false, close: false};
  slideShift:number = 0;
  shiftLen:number = 0;
  autosave:boolean = false;
  formdialog:boolean = false;
  dialogData:any;
  drawerPos:any = 'end';
  preview:boolean = false;
  autoSaveInterval:any;

  constructor(
    private route: ActivatedRoute,
    public _form: FormService,
    public _general: GeneralService,
    public _style: StyleService,
    public _image: ImageService,
    private dialog: MatDialog,
    private captureService: NgxCaptureService
  ) { 
    route.paramMap.subscribe((params: ParamMap) => {
      _general.target = {
        id: params.get('id'),
        type: 'form'
      }
      _general.loading.success = false;
      _form.getForm(_general.target.id).then(e=>{
        this._general.loading.success = true;
        _form.formSessionArr = [];
        _form.saveFormSession();
      });
      document.addEventListener('contextmenu', event => event.preventDefault());
    })
  }

  @HostListener('document:keydown.control.s', ['$event'])  
  onKeydownHandler(event:KeyboardEvent) {
    event.preventDefault();
    this.saveForm();
  }

  ngOnInit(): void {
    var vm = this;
    window.addEventListener('beforeunload', function (e) {
      if(!vm._form.formSaved) {
        e.preventDefault();
        e.returnValue = '';
      }
    });
  }

  autoSaveTrigger(trigger:boolean) {
    clearInterval(this.autoSaveInterval);
    if(trigger) {
      this.autoSaveInterval = setInterval(()=>{
        this._form.updateForm();
      }, 2000);
      this.autoSaveInterval;
    }
    this.autosave = trigger;
  }

  saveForm() {
    if(this._form.form.name && this._form.form.path) {
      this._general.saveDisabled = true;
      this._form.updateForm().then(e=>{
        this.captureService.getImage(this.screen.nativeElement, true).subscribe(e=>{
          var file:any = this._image.base64ToFile(e, 'form-'+this._form.form.uniqueid+'-screenshot.png');
          console.log(file);
          this._general.fileUploadService.upload(file).subscribe(
            (event: any) => {
              if (typeof (event) === 'object') {
                var msg =  'Form has been saved';
                this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
                this._general.saveDisabled = false;
              }
            })
        })
      })
    }
    else {
      // this.openRenameDialog
    }
  }

  getBlockStyle(en:string) {
    var sbn = this._general.selectedBlock.content?.name;
    if(en == sbn) return this._style.getContentStyling(en);
    else if(this._form.formEleTypes[en]) return this._style.getBlockStyle(this._form.formEleTypes[en]?.content.style);
    else return {};
  }

  justifyContent(en:string) {
    var sbn = this._general.selectedBlock.content?.name;
    if(en == sbn) return this._style.getBlockParamValue(this._style.item_alignment);
    else if(this._form.formEleTypes[en]) return this._style.getBlockParamValue(this._form.formEleTypes[en]?.item_alignment);
    else return {};
  }
  
  // dialogs

  openRenameDialog(templateRef: TemplateRef<any>) {
    this.formdialog = true;
    this.dialogData = this.dialog.open(templateRef);
    this.dialogData.afterClosed().subscribe((data:any)=>{
      this._form.formSaved = false;
      this.formdialog = false;
    })
  }

  openElementDialog(templateRef: TemplateRef<any>, element:any) {
    this._form.selEle = element;
    if(element.name == 'image') {
      this.openImageDialog();
      this._form.formSaved = false;
    }
    else {
      this.dialogData = this.dialog.open(templateRef);
      this.dialogData.afterClosed().subscribe((data:any)=>{
        this._form.formSaved = false;
        this._form.selEle = '';
      })
    }
  }

  openStylingDialog(element:any) {
    this._general.selectedBlock = element;
    this._style.blockSetting(element);
    this.DialogParentToggle = !this.DialogParentToggle;
    this._form.formSaved = false;
  }

  openImageDialog() {
    this.DialogImageToggle = !this.DialogImageToggle;
  }

  // dialogs

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this._form.saveFormSession();
    } else {
      this._form.addField(event.item.data, event.currentIndex);
    }
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

  hideBar() {
    this.toggle.close = true;
    setTimeout(()=>{
      this.toggle.close = false;
      this.selectedTab = '';
    }, 200)
  }

  selectTab(value:string) {
    if(this.waitST) {
      this.waitST = false;
      this.preview = false;
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

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': '' };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  // autoSave() {

  // }
  
}