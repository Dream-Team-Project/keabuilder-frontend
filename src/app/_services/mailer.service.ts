import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  sendmailApi = './api/sendmail'

  constructor(private http:HttpClient) { }

  sendmail(maildata:any) {
    return this.http.post(this.sendmailApi, maildata)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
}
