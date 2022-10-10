import { Component,Input, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { EmailService } from '../_services/mailer.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  @ViewChild(TemplateRef)
  _dialogTemplate!: TemplateRef<any>;
  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;

  dragBoxAnime:any = {open: false, close: false};

  connectWtParent:boolean = false;

  feedback:any = {
    name: '',
    email: '',
    message: '',
    body: ''
  }

  @Input()
  set DialogToggle(val: any) {
    if(this.connectWtParent) {
      this.openDialog();
    }
    else this.connectWtParent = true;
  } 
  
  constructor(
    private _tokenStorage: TokenStorageService,
    private _mail: EmailService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {
    this.feedback.name = _tokenStorage.getUser().username;
    this.feedback.email = _tokenStorage.getUser().email;
   }

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

  sendFeedback() {
    var body = ''
    var maildata = {
      tomailid: 'support@keasolution.com', 
      frommailid: this.feedback.email, 
      subject: 'Kea User Feedback', 
      html: 'html body'}
    this._mail.sendmail(maildata);
  }

}
