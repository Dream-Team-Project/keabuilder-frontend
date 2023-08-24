import { Component,Input, OnInit, ViewChild, TemplateRef, AfterViewInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MailerService } from 'src/app/_services/mailer.service';
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

  @Input ('user') user:any = {};

  dragBoxAnime:any = {open: false, close: false};

  connectWtParent:boolean = false;

  feedback = {
    user_id: '',
    name: '',
    email: '',
    feedback: '',
    rating: 0
  }

  mailStatus:any = {
    sending: false,
    error: false,
  }

  stars:number[] = [1, 2, 3, 4, 5];

  @Input()
  set DialogToggle(val: any) {
    if(this.connectWtParent) {
      this.openDialog();
    }
    else this.connectWtParent = true;
  } 
  
  constructor(
    private _general: GeneralService,
    private _mail: MailerService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {}

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
    this.setFeedbackForm();
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
        this.feedback.feedback = '';
        this.feedback.rating = 0;
    },200);
  }

  sendFeedback() {
    if(this.feedback.rating != 0) {
      this.mailStatus.error = false;
      this.mailStatus.sending = true;
      var maildata = {
        tomailid: ['support@keasolution.com', 'keabuilder@gmail.com'], 
        frommailid: 'support@keasolution.com', 
        cc: ['abhishek@dreamreflectionmedia.com', 'vikash@dreamreflectionmedia.com'],
        subject: 'Kea User Feedback', 
        html: `<div><strong>User id: </strong> ${this.feedback.user_id}</div>
        <div><strong>Name: </strong> ${this.feedback.name}</div>
        <div><strong>Email: </strong> ${this.feedback.email}</div>
        <div><strong>Rating: </strong> ${this.feedback.rating}</div>
        <div><strong>Feedback: </strong> ${this.feedback.feedback}</div>`
      }
      this._mail.sendmail(maildata).subscribe((data:any)=>{
        this._mail.adduserfeedback(this.feedback).subscribe((data:any) => {
          this.overlayRefDetach();
          this._general.openSnackBar(false, 'Thanks for your feedback', 'OK', 'center', 'top');
        })
      });
    }
    else this.mailStatus.error = true;
  }

  setFeedbackForm() {
    this.feedback.user_id = this._general.user.uniqueid;
    this.feedback.name = this.user.name;
    this.feedback.email = this.user.email;
  }
  
  rate(rating: number) {
    this.feedback.rating = rating;
  }
}
