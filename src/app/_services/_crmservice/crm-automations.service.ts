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
export class CrmAutomationsService {
  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }
  getAllcrmautomations(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getAllcrmautomations', obj)
    .pipe(catchError(this.errorHandler));
  }
  getcrmautomation(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getcrmautomation/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }

  createcrmautomation(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/createcrmautomation',obj).pipe(catchError(this.errorHandler));
  }
  deletecrmautomation(uniqueid:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/deletecrmautomation/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }
  crmautomationStatus(status:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/crmautomationStatus/'+status,obj).pipe(catchError(this.errorHandler));
    
  }
  searchAutomationsquery(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchAutomationquery',obj).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}
