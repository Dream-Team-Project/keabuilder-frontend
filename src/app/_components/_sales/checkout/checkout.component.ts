import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormService } from 'src/app/_services/_crm/form.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { StyleService } from 'src/app/_services/_builder/style.service';
import { ImageService } from 'src/app/_services/image.service';
import { ListService } from '../../../_services/_crm/list.service';
import { TagService } from '../../../_services/_crm/tag.service';
import { MatDialog } from '@angular/material/dialog';
import { NgxCaptureService } from 'ngx-capture';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { EmailService } from 'src/app/_services/_crm/email.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('selection') selection!: ElementRef;
  @ViewChild('settingdialog') settingdialog!: TemplateRef<any>;
  @ViewChild('actiondialog') actiondialog!: TemplateRef<any>;
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  @ViewChild('form', { static: false }) screen: any;
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
  @ViewChild('listInput') listInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fieldsdrawer') fieldsdrawer: any;

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
    // emailsubject: new FormControl('', [Validators.required]),
    // emailto:new FormControl('', [Validators.required]),
    // emailfrom:new FormControl('', [Validators.required]),
    // emailname:new FormControl('', [Validators.required]),
  }
  contextMenuPosition = { x: '0px', y: '0px' };
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
  notifyemailCtrl = new FormControl('', [Validators.email]);
  notifyemail:any=[];
  formlists:any=[];
  formtags:any=[];
  showEditor:boolean = true;
  showFilter:boolean = false;
  emailerror:boolean = false;
  emails:any=[];
  filteredemails:any=[];
  emailid:any='';

  constructor(
    private route: ActivatedRoute,
    public _form: FormService,
    public _general: GeneralService,
    public _style: StyleService,
    public _image: ImageService,
    private dialog: MatDialog,
    private captureService: NgxCaptureService,
    private _listService: ListService,
    private _tagService: TagService,
    private email:EmailService,) { 
      route.paramMap.subscribe((params: ParamMap) => {
        this._general.getAllWebPages();
        this._general.getAllFunnels();
        _general.target = {
          id: params.get('id'),
          type: 'form'
        }
        _general.loading.success = false;
        _form.getForm(_general.target.id).then((e:any)=>{
          if(e.id) {
            this._general.loading.success = true;
            _form.formSessionArr = [];
            _form.saveFormSession();
            this.selectedLists=e.temp_lists;
            this.filteredTempIds.lists=e.listid;
            this.selectedTags=e.temp_tags;
            this.filteredTempIds.tags=e.tagid;
            this.notifyemail=e.notifyemail?e.notifyemail?.split(','):this.notifyemail;
            this.emailid=e.emailid;
            this.fetchdata();
          }
          else _general.redirectToPageNotFound();
        });
        document.addEventListener('contextmenu', event => event.preventDefault());
      });
    }

  @HostListener('document:keydown.control.s', ['$event'])  
  onKeydownHandler(event:KeyboardEvent) {
    event.preventDefault();
    this.addNewTags();
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
fetchdata(){
  this.fetchlists();
  this.fetchTags();
  this.fetchEmails();
  this.fetchsingleemail();
}
fetchsingleemail(){
  if(this.emailid){
  this.email.getsingleemail({uniqueid:this.emailid}).subscribe((data:any)=>{
    if(data.success==true){
    this._form.singleemail.id=data.data[0].id;
    this._form.singleemail.uniqueid=data.data[0].uniqueid;
    this._form.singleemail.name=data.data[0].name;
    this._form.singleemail.subject=data.data[0].subject;
    this._form.singleemail.body=data.data[0].body;
    }
  })
}
}
  fetchlists(){
      this._listService.fetchlists().subscribe((data:any)=>{
        this.lists=data.data;
      })
  }

  fetchTags() {
      this._tagService.fetchtags().subscribe(
        (data) => {
          this.tags = data.data;
    });
  }
  fetchEmails(){
    this.email.fetchemails().subscribe((data:any)=>{
      this.emails=data.data;
    })
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

  addNewTags() {
    if(this.newtags.length>0){
      this.tagupdate().then((resp:any)=>this.saveForm());
    }
    else{
      this.saveForm();
    }    
  }
  
  saveForm(){
      if(this._form.form.emailenabled){
      this._form.form.notifyemail=this.notifyemail?.toString();
      this._form.form.emailid=this._form.singleemail.uniqueid;
      }
      this._form.form.lists=this.filteredTempIds.lists?.toString();
      this._form.form.tags=this.filteredTempIds.tags?.toString();
      this._general.saveDisabled = true;
      this._form.updateForm().then((e:any)=>{
        if(e.success == 1) {
          if(this._form.formField.length != 0) {
            this.captureService.getImage(this.screen.nativeElement, true).subscribe(e=>{
              var file:any = this._image.base64ToFile(e, 'form-'+this._form.form.uniqueid+'-screenshot.png');
              this._general._file.uploadScreenshot(file).subscribe(
                (event: any) => {
                  if (typeof (event) === 'object') {
                    var msg =  'Form has been saved';
                    this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
                    this._general.saveDisabled = false;
                    this._form.formSaved = true;
                    // this._form.singleemail={id:'',user_id:'',uniqueid:'',name:'',subject:'',body:''};
                  }
                })
            })
          }
          else {
            var msg =  'Form has been saved';
            this._general.openSnackBar(false, msg, 'OK', 'center', 'top');
            this._general.saveDisabled = false;
            this._form.formSaved = true;
            // this._form.singleemail={id:'',user_id:'',uniqueid:'',name:'',subject:'',body:''};
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

  openBtnDialog(templateRef: TemplateRef<any>) {
    this.dialogData = this.dialog.open(templateRef);
    this.dialogData.afterClosed().subscribe((data:any)=>{
      if(this._form.form.btntxt == '') this._form.form.btntxt = 'Submit';
    })
  }

  openSettingDialog(templateRef: TemplateRef<any>) {
    this.formdialog = 'Setting';
    this._form.form.thankyoumessage = this._form.getThankyouMsg(this._form.form);
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
      this.notifyemailCtrl.reset();
      // if(this._form.form.emailenabled && (!this.notifyemail || !this._form.singleemail.uniqueid)) {
      //   this._general.expPanelStep = 3;
      //   this.openActionDialog(this.actiondialog);
      // }
      // else {
        this._general.expPanelStep = 0;
        this.formdialog = '';
        this._form.formSaved = false;
      // }
    })
  }

  openElementDialog(templateRef: TemplateRef<any>, element:any) {
    this._form.selEle = element;
    if(element.name != 'divider' && !element.field_tag) {
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

  isDisabled(field:any) {
    var res = this._form.formField.filter(ff=>field.id == ff.id);
    return res.length != 0;
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
      if(value == 'fields' || this.fieldsdrawer.opened) this.fieldsdrawer.toggle();
      if(this.fieldsdrawer.opened) this.toggleFieldsFilter(true);
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

  toggleFieldsFilter(toggle:boolean) {
    this.showFilter = !toggle;
    if(!this.showFilter) this._form.fetchFields();
  }

  switchPreviewMode() {
    if(this.fieldsdrawer?.opened) this.selectTab('fields');
    this._form.preview = !this._form.preview;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // start list actions

  filterListData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.lists = this.lists.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedList(event:any, searchListInp:any): void {
    this.selectedLists.push(event.option.value);
    this.filteredTempIds.lists.push(event.option.value.uniqueid);
    searchListInp.value = '';
    this.filterListData('');
  }

  removeSelectedList(index:number): void {
    this.selectedLists.splice(index, 1);
    this.filteredTempIds.lists.splice(index, 1);
  }

  // end list actions

  // start tag actions

  filterTagData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredOptions.tags = this.tags.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }

  addSelectedTag(event:any, searchTagInp:any): void {
    this.selectedTags.push(event.option.value);
    this.filteredTempIds.tags.push(event.option.value.uniqueid);
    searchTagInp.value = '';
    this.filterTagData('');
  }

  removeSelectedTag(index:number): void {
    this.selectedTags.splice(index, 1);
    this.filteredTempIds.tags.splice(index, 1);
  }
  
  addtag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      var obj: any = {
        uniqueid: Math.random().toString(20).slice(2),
        name: event.value,
      };
      this.selectedTags.push(obj);
      this.filteredTempIds.tags.push(obj.uniqueid);
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


  tagupdate() {
    return new Promise((resolve) => {
      this.newtags.forEach((tag: any, index:number) => {
        this._tagService.addtag(tag).subscribe((data:any) => {
          })
          if(index==this.newtags.length-1) {resolve(true)};
        });
    });
  }

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}
 
  // notify emails
  addnotifyemail(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && this.isEmailValid(value)==true) {
      this.notifyemail.push(value); 
       // Clear the input value
      event.chipInput!.clear();
      this.notifyemailCtrl.reset();
    }
     else if(this.isEmailValid(value)==false && value){
      this.notifyemailCtrl.setValue(value);
    }
  }
  removenotifyemail(index:number): void {
    this.notifyemail.splice(index, 1);
  }
  
  // notify emails
  isEmailValid(value:any) {
    let regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return regex.test(value);
  }
  filteremailData(event:any) {
    var value = event ? event.target.value : '';
    this.filteredemails=this.emails?.filter((option:any) => option?.name?.toLowerCase().includes(value?.toLowerCase()));
  }
  getemaildata(email:any){
    if(email && this._form.form.emailenabled){
    this._form.singleemail.id=email.id;
    this._form.singleemail.uniqueid=email.uniqueid;
    this._form.singleemail.name=email.name;
    this._form.singleemail.subject=email.subject;
    this._form.singleemail.body=email.body;
    }
  }
}