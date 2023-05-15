import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CrmSmtpService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }
  addsmtpdetails(obj:any): Observable<any>{
    obj.uuid = this.uuid;
    return this.http.post('/api/createcrmsmtp',obj).pipe(catchError(this.errorHandler));
  }
  updatesmtpdetails(obj:any): Observable<any>{
    obj.uuid = this.uuid;
    return this.http.post('/api/updatecrmsmtp',obj).pipe(catchError(this.errorHandler));
  }
  getsmtpdetails(): Observable<any>{
    var obj = {uuid:this.uuid};
    return this.http.post('/api/getcrmsmtp',obj).pipe(catchError(this.errorHandler));
  }
  deletesmtpdetails(obj:any): Observable<any>{
    obj.uuid = this.uuid;
    return this.http.post('/api/deletecrmsmtp',obj).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }


}
