import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormService } from '../_services/_builder/form.service';
import { GeneralService } from '../_services/_builder/general.service';
import { StyleService } from '../_services/_builder/style.service';
import { ImageService } from '../_services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxCaptureService } from 'ngx-capture';
import { CrmListService } from '../_services/_crmservice/crm_list.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { CrmTagsService } from '../_services/_crmservice/crm-tags.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css','../builder-topbar/builder-topbar.component.css','../builder/builder.component.css','../builder/material.component.css']
})
export class FormBuilderComponent implements OnInit {

  @ViewChild('selection') selection!: ElementRef;
  @ViewChild('settingdialog') settingdialog!: TemplateRef<any>;
  @ViewChild('emailsetdialog') emailsetdialog!: TemplateRef<any>;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  @ViewChild('form', { static: false }) screen: any;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  @ViewChild('actionDialog') actionDialog!: TemplateRef<any>;
  @ViewChild('delActionDialog') delActionDialog!: TemplateRef<any>;

  DialogParentToggle:boolean = false;
  DialogImageToggle:boolean = false;
  selectedvalue:any;
  tags: any = [];
  newtags: any = [];
  tagarr: any[] = [];
  listarr: any[] = [];
  lists: any = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl(['']);
  listCtrl = new FormControl(['']);
  filteredTag: Observable<any>;
  filteredList: Observable<any>;
  selAct:any ;
  searchVal:string = '';
  appendIndex = 0;
  // selTrg:any = '';

  urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  validate = {
    name: new FormControl('', [Validators.required]),
    relink: new FormControl('', [Validators.pattern(this.urlPattern)]),
    emailsubject: new FormControl('', [Validators.required]),
    emailto:new FormControl('', [Validators.required]),
    emailfrom:new FormControl('', [Validators.required]),
    emailname:new FormControl('', [Validators.required]),

  }
  contextMenuPosition = { x: '0px', y: '0px' };
  dragBoxAnime:any = {open: false, close: false};
  waitST = true;
  searchText:string = '';
  selectedTab:string = '';
  toggle = {open: false, close: false};
  slideShift:number = 0;
  shiftLen:number = 0;
  autosave:boolean = false;
  formdialog:string = '';
  dialogData:any;
  drawerPos:any = 'end';
  autoSaveInterval:any;
  

  constructor(
    private route: ActivatedRoute,
    public _form: FormService,
    public _general: GeneralService,
    public _style: StyleService,
    public _image: ImageService,
    private dialog: MatDialog,
    private captureService: NgxCaptureService,
    private _crmlistService: CrmListService,
    private _crmtagService: CrmTagsService,
    private _bottomSheet: MatBottomSheet,
  ) { 
   
    route.paramMap.subscribe((params: ParamMap) => {
      this._general.getAllWebPages();
      this._general.getAllFunnels();
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
    });
    this.fetchlists();
    this.fetchTags();
    this.filteredTag = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filterTag(tag) : this.tags.slice()
      )
    );
    this.filteredList = this.listCtrl.valueChanges.pipe(
      startWith(null),
      map((list: string | null) =>
        list ? this._filterList(list) : this.lists.slice()
      )
    );
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
      this._general.saveDisabled = true;
      this._form.updateForm().then((e:any)=>{
        if(e.success == 1) {
          if(this._form.formField.length != 0) {
            this.captureService.getImage(this.screen.nativeElement, true).subscribe(e=>{
              var file:any = this._image.base64ToFile(e, 'form-'+this._form.form.uniqueid+'-screenshot.png');
              this._general._file.upload(file).subscribe(
                (event: any) => {
                  if (typeof (event) === 'object') {
                    var msg =  'Form has been saved';
                    this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
                    this._general.saveDisabled = false;
                    this._form.formSaved = true;
                  }
                })
            })
          }
          else {
            var msg =  'Form has been saved';
            this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
            this._general.saveDisabled = false;
            this._form.formSaved = true;
          }
        }
        else {
          var msg =  'Server Error';
          this._general.openSnackBar(true, msg, 'OK', 'center', 'top');
          this._general.saveDisabled = false;
        };
      })
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

  openSettingDialog(templateRef: TemplateRef<any>) {
    this.formdialog = 'Setting';
    this.dialogData = this.dialog.open(templateRef);
    this.dialogData.afterClosed().subscribe((data:any)=>{
      if(this.validate.name.invalid || this.validate.relink.invalid) this.openSettingDialog(this.settingdialog);
      else {
        this.formdialog = '';
        this._form.formSaved = false;
        this.validate.name.reset();
        this.validate.relink.reset();
      }
    })
  }

  openEmailSetDialog(templateRef: TemplateRef<any>) {
    this.formdialog = 'Email setup';
    this.dialogData = this.dialog.open(templateRef);
    this.dialogData.afterClosed().subscribe((data:any)=>{
      if(this.validate.emailsubject.errors?.['required']) this.openEmailSetDialog(this.emailsetdialog);
      else {
        this.formdialog = '';
        this._form.formSaved = false;
        this.validate.emailsubject.reset();
      }
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

  switchPreviewMode() {
    this._form.preview = !this._form.preview;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': '' };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];
}

fetchlists(){
  return new Promise((resolve) => {
  this._crmlistService.getAllcrmlists().subscribe((data:any)=>{
    this.lists=data.data;
    resolve(true);
  },
  (error: any) => {
    resolve(false);
  }
);
});
}

  fetchTags() {
    return new Promise((resolve) => {
      this._crmtagService.getAllcrmtags().subscribe(
        (data) => {
          this.tags = data.data;
          resolve(true);
        },
        (error: any) => {
          resolve(false);
        }
      );
    });
  }

  addtag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      var obj: any = {
        uniqueid: Math.random().toString(20).slice(2),
        tag_name: event.value,
      };
      this.tagarr.push(obj);
      this.newtags.push(obj);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  removetag(event: string): void {
    const index = this.tagarr.indexOf(event);
    if (index >= 0) {
      this.tagarr.splice(index, 1);
      this.newtags.splice(index, 1);
    }
  }

  selectedTag(event: any): void {
    var obj: any = {
      uniqueid: event.option.value,
      tag_name: event.option.viewValue,
    };
    this.tagarr.push(obj);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
  selectedList(event: any): void {
    var obj: any = {
      uniqueid: event.option.value,
      list_name: event.option.viewValue,
    };
    this.listarr.push(obj);
    this.listInput.nativeElement.value = '';
    this.listCtrl.setValue(null);
  }
  removelist(event: string): void {
    const index = this.listarr.indexOf(event);
    if (index >= 0) {
      this.listarr.splice(index, 1);
      // this.newlists.splice(index, 1);
    }
  }
  private _filterList(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.lists.filter((list: any) =>
      list.list_name.toLowerCase().includes(filterValue)
    );
  }
  private _filterTag(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter((tag: any) =>
      tag.tag_name.toLowerCase().includes(filterValue)
    );
  }

  openActionDialog(templateRef: TemplateRef<any>, act:any) {
    this.selAct = act.id;
    console.log(this.selAct)
    this.openDialog(templateRef);
    // this.closeBottomSheet();
  }

  // toggleTrigger(trg:any) {
  //   this.selTrg = trg; 
  //   if(this.selTrg.active) this.openDialog(this.delTriggerDialog);
  //   else this.openDialog(this.triggerDialog);
  // }

  openBottomSheet(templateRef: TemplateRef<any>, index:number): void {
    var bottomSheet = this._bottomSheet.open(templateRef);
    this.appendIndex = index;
    bottomSheet.afterDismissed().subscribe((data:any)=>{
      this.searchVal = '';
      this.isFilter('action');
      // this.isFilter('trigger');
    })
  }

  closeBottomSheet(): void {
    this._bottomSheet.dismiss();
  }

  openDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
  }

  // setTrigger(value:boolean) {
  //   this.autosave = value;
  // }

  isFilter(type:string) {
    var intial = true;
    // var wrkfList = type == 'action' ? this._form.actionsList : this._form.triggersList;
    var wrkfList = this._form.actionsList ;
    for(let i = 0; i < wrkfList.length; i++) {
      for(let j = 0; j < wrkfList[i].workflows.length; j++) {
        let cond = wrkfList[i].workflows[j].name?.toLowerCase().indexOf(this.searchVal.toLowerCase()) >= 0;
        wrkfList[i].hide = !cond;
        if(cond) {
          if(intial) {
            this._general.expPanelStep = i;
            intial = false;
          }
          break;
        }
      }
    }
  }

}