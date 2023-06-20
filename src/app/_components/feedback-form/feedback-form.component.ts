import { Component,Input, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { EmailService } from 'src/app/_services/mailer.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';

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
    userid: '',
    name: '',
    email: '',
    message: '',
  }

  mailStatus:any = {
    sending: false,
    error: false,
  }

  @Input()
  set DialogToggle(val: any) {
    if(this.connectWtParent) {
      this.openDialog();
    }
    else this.connectWtParent = true;
  } 
  
  constructor(
    private _general: GeneralService,
    private _mail: EmailService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.feedback.userid = this._general.user.uniqueid;
    this.feedback.name = this._general.user.name;
    this.feedback.email = this._general.user.email;
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
      this.mailStatus.sending = false;
      this.mailStatus.error = false;
      this.feedback.message = '';
    },200);
  }

  sendFeedback() {
    if(this.feedback.message) {
      this.mailStatus.error = false;
      this.mailStatus.sending = true;
      var maildata = {
        tomailid: ['support@keasolution.com', 'keabuilder@gmail.com'], 
        frommailid: 'support@keasolution.com', 
        cc: ['abhishek@dreamreflectionmedia.com', 'vikash@dreamreflectionmedia.com'],
        subject: 'Kea User Feedback', 
        html: '<div><strong>Userid: </strong>'+ this.feedback.userid +'</div>' + '<div><strong>Username: </strong>'+ this.feedback.name +'</div>' + '<div><strong>Email: </strong>'+ this.feedback.email +'</div>' + this.feedback.message
      }
      this._mail.sendmail(maildata).subscribe((data:any)=>{
        this.overlayRefDetach();
        this._general.openSnackBar(false, 'Thanks for your feedback', 'OK', 'center', 'top');
      });
    }
    else this.mailStatus.error = true;
  }
}
