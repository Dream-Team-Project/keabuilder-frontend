import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { FormService } from '../_services/_builder/form.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GeneralService } from '../_services/_builder/general.service';
import { ImageService } from '../_services/image.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css','../builder-topbar/builder-topbar.component.css','../builder/builder.component.css','../builder/material.component.css']
})
export class FormBuilderComponent implements OnInit {
  @ViewChild('selection') selection!: ElementRef;

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

  constructor(
    public _form: FormService,
    public _general: GeneralService,
    public _image: ImageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  
  // dialogs

  openRenameDialog(templateRef: TemplateRef<any>) {
    this.formdialog = true;
    this.dialogData = this.dialog.open(templateRef);
    this.dialogData.afterClosed().subscribe((data:any)=>{
      this.formdialog = false;
    })
  }

  openElementDialog(templateRef: TemplateRef<any>, element:any) {
    this._form.selEle = element;
    this.dialogData = this.dialog.open(templateRef);
    this.dialogData.afterClosed().subscribe((data:any)=>{
      this._form.selEle = '';
    })
  }

  // dialogs

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this._form.formOpt, event.previousIndex, event.currentIndex);
    } else {
      this.addField(event.item.data, event.currentIndex);
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

  addField(field: any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(field));
    tempObj.id = this._form._general.createBlockId(tempObj);
    tempObj?.split?.forEach((split: any) => {
      split.id = this._form._general.createBlockId(split);
      split?.subsplit?.forEach((subsplit: any) => {
        subsplit.id = this._form._general.createBlockId(subsplit);
      })
    })
    this._form.formOpt.splice(index, 0, tempObj)
  }

}
