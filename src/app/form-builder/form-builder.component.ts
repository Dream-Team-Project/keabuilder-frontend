import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { FormService } from '../_services/_builder/form.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css','../builder/builder.component.css','../builder/material.component.css']
})
export class FormBuilderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(TemplateRef)
  _dialogTemplate!: TemplateRef<any>;
  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;

  dragBoxAnime:any = {open: false, close: false};

  constructor(
    public _form: FormService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.backdropClick().subscribe(() => this.overlayRefDetach());
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

  openDialog() {
    this.dragBoxAnime.open = true;
    this._overlayRef.attach(this._portal);
    setTimeout(()=>{
      this.dragBoxAnime.open = false;
    },200)
  }

  overlayRefDetach() {
      this.dragBoxAnime.close = true;
      setTimeout(()=>{
        this._overlayRef.detach();
        this.dragBoxAnime.close = false;
    },200);
  }

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this._form.formOpt, event.previousIndex, event.currentIndex);
    } else {
      this.addField(event.item.data, event.currentIndex);
    }
  }

  addField(field: any, index: number) {
    var tempObj = JSON.parse(JSON.stringify(field));
    tempObj.id = this._form.createBlockId(tempObj);
    tempObj?.split?.forEach((split: any) => {
      split.id = this._form.createBlockId(split);
      split?.subsplit?.forEach((subsplit: any) => {
        subsplit.id = this._form.createBlockId(subsplit);
      })
    })
    this._form.formOpt.splice(index, 0, tempObj)
  }

}
