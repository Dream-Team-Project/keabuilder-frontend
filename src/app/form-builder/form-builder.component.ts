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
import { CrmTagsService } from '../_services/_crmservice/crm-tags.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css','../builder-topbar/builder-topbar.component.css','../builder/builder.component.css','../builder/material.component.css']
})
export class FormBuilderComponent implements OnInit {

  @ViewChild('selection') selection!: ElementRef;
  @ViewChild('settingdialog') settingdialog!: TemplateRef<any>;
  @ViewChild('actiondialog') actiondialog!: TemplateRef<any>;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  @ViewChild('form', { static: false }) screen: any;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  @ViewChild('actionDialog') actionDialog!: TemplateRef<any>;
  @ViewChild('delActionDialog') delActionDialog!: TemplateRef<any>;

  DialogParentToggle:boolean = false;
  DialogImageToggle:boolean = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];

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
  autoSaveInterval:any = [];
  lists: any = [];
  tags: any = [];
  selectedLists:any = [];
  selectedTags:any = [];
  newtags: any = [];
  filteredTempIds:any = {
    lists: [],
    tags: []
  };
  filteredOptions:any = {
    lists: [],
    tags: []
  };
  tagCtrl = new FormControl(['']);
  formlists:any=[];
  formtags:any=[];
  showEditor:boolean = true;

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
    this.fetchlists().then((resp)=>{
      this.patchlistname();
    });
    this.fetchTags().then((resp)=>{
      this.patchtagname();
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
    this._form.form.lists=this.formlists.toString();
    this._form.form.tags=this.formtags.toString();
      this._general.saveDisabled = true;
      this._form.updateForm().then((e:any)=>{
        if(e.success == 1) {
          this.tagupdate();
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
  
  // start dialogs

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

  openActionDialog(templateRef: TemplateRef<any>) {
    this.filterListData('');
    this.filterTagData('');
    this.formdialog = 'Action';
    this.dialogData = this.dialog.open(templateRef);
    this.dialogData.afterClosed().subscribe((data:any)=>{
      if(this.validate.emailsubject.errors?.['required']) {
        this._general.expPanelStep = 3;
        this.openActionDialog(this.actiondialog);
      }
      else {
        this._general.expPanelStep = 0;
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

  // end dialogs

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

  // start list actions

  filterListData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.lists = this.lists.filter((option:any) => option.list_name.toLowerCase().includes(value));
  }

  addSelectedList(event:any, searchListInp:any): void {
    this.selectedLists.push(event.option.value);
    this.filteredTempIds.lists.push(event.option.value.id);
    this.formlists.push(event.option.value.uniqueid)
    searchListInp.value = '';
    this.filterListData('');
  }

  removeSelectedList(index:number): void {
    this.selectedLists.splice(index, 1);
    this.filteredTempIds.lists.splice(index, 1);
    this.formlists.splice(index, 1);

  }

  // end list actions

  // start tag actions

  filterTagData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.tags = this.tags.filter((option:any) => option.tag_name.toLowerCase().includes(value));
  }

  addSelectedTag(event:any, searchTagInp:any): void {
    this.selectedTags.push(event.option.value);
    this.filteredTempIds.tags.push(event.option.value.id);
    this.formtags.push(event.option.value.uniqueid)
    searchTagInp.value = '';
    this.filterTagData('');
  }

  removeSelectedTag(index:number): void {
    this.selectedTags.splice(index, 1);
    this.filteredTempIds.tags.splice(index, 1);
    this.formtags.splice(index, 1);
  }
  addtag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      var obj: any = {
        uniqueid: Math.random().toString(20).slice(2),
        tag_name: event.value,
      };
      this.selectedTags.push(obj);
      this.filteredTempIds.tags.push(obj.uniqueid);
    this.formtags.push(obj.uniqueid);
    this.newtags.push(obj);
      
    }
    // Clear the input value
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  // end tag actions

  selectedTabChange(e:any) {
    this.showEditor = e.index == 0;
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': '' };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}

  tagupdate() {
    return new Promise((resolve) => {
      this.newtags.forEach((tag: any) => {
        this._crmtagService.createcrmtag(tag).subscribe((data: any) => {
          resolve(true);
        });
      });
    });
  }
  patchtagname(){
    // return new Promise((resolve) => {
    this.tags.forEach((tag: any) => {
      this._form.form.tags.split(',').forEach((tid: any) => {
        if (tid == tag.uniqueid) {
          var obj = { uniqueid: tid, tag_name: tag.tag_name };
          this.selectedTags.push(obj);
      this.filteredTempIds.tags.push(tag.id);
    this.formtags.push(obj.uniqueid);
        }
      });
    });


  }
  patchlistname(){
    // return new Promise((resolve) => {
    this.lists.forEach((list: any) => {
      this._form.form.lists.split(',').forEach((lid: any) => {
        if (lid == list.uniqueid) {
          var obj = { uniqueid: lid, list_name: list.list_name };
          this.selectedLists.push(obj);
      this.filteredTempIds.lists.push(list.id);
    this.formlists.push(obj.uniqueid);
        }
      });
    });


  }
  
}