import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }


  fetchsetting(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/Allsetting', obj).pipe(catchError(this.errorHandler));
  }
  singlesetting(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singlesetting',obj).pipe(catchError(this.errorHandler));
  }
  addsetting(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addsetting',obj).pipe(catchError(this.errorHandler));
  }
  updatesetting(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatesetting',obj).pipe(catchError(this.errorHandler));
  }
  deletesetting(id:any): Observable<any>{
    return this.http.delete('/api/deletesetting/'+id+'/'+this.uuid).pipe(catchError(this.errorHandler)); 
  }
  globaltimezone(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.post('/api/globaltimezone',obj).pipe(catchError(this.errorHandler));
  }
 
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}