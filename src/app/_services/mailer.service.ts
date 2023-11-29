import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class MailerService {

  uuid:any = '';
  sendmailApi = '/api/sendmail';
  sendmailcampaignApi = '/api/sendmailcampaign';
  sendmailformApi = '/api/sendmailform';
  userfeedbackApi = '/api/addfeedback';
  

  constructor(private http:HttpClient,private tokenStorage: TokenStorageService) {  this.uuid = this.tokenStorage.getUser().uniqueid;}

  sendmail(maildata:any) {
    maildata.user_id=this.uuid;
    return this.http.post(this.sendmailApi, maildata)
    .pipe(catchError(this.errorHandler));
  }
  sendmailcampaign(maildata:any) {
    maildata.user_id=this.uuid;
    return this.http.post(this.sendmailcampaignApi, maildata)
    .pipe(catchError(this.errorHandler));
  }
  sendmailform(maildata:any) {
    maildata.user_id=this.uuid;
    return this.http.post(this.sendmailformApi, maildata)
    .pipe(catchError(this.errorHandler));
  }
  adduserfeedback(data:any) {
    data.user_id = this.uuid;
    return this.http.post(this.userfeedbackApi, data)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
}
