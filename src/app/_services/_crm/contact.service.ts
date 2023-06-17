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
export class ContactService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  fetchcontacts(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getAllcrmcontacts', obj)
    .pipe(catchError(this.errorHandler));
  }

  singlecontact(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getsinglecrmcontact/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }

  createcontact(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/createcrmcontact',obj).pipe(catchError(this.errorHandler));
  }

  deletecontact(uniqueid:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/deletecrmcontact/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }

  updatecontact(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatecrmcontact',obj)
    .pipe(catchError(this.errorHandler));
  }

  searchcontacts(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchContactsquery',obj)
    .pipe(catchError(this.errorHandler));
  }
  
  getallcrmdata(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getallcrmdata', obj).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
  
}