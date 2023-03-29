import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  sendmailApi = './api/sendmail';
  sendmailcampaignApi = './api/sendmailcampaign';
  

  constructor(private http:HttpClient) { }

  sendmail(maildata:any) {
    // request maildata = {tomailid: 'send to', frommailid: 'send from', subject: 'string', html: 'html body'}
    return this.http.post(this.sendmailApi, maildata)
    .pipe(catchError(this.errorHandler));
  }

  sendmailcampaign(maildata:any) {
    return this.http.post(this.sendmailcampaignApi, maildata)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
}
