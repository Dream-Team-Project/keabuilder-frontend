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
export class CrmService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  getAllcrmcontacts(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getcrmcontactsdata', obj)
    .pipe(catchError(this.errorHandler));
  }
  getcrmcontact(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getcrmcontactsdata/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }

  createcrmcontact(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/createcrmcontact',obj).pipe(catchError(this.errorHandler));
  }
  deletecrmcontact(uniqueid:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/deletecrmcontact/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }
  updatecrmcontact(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatecrmcontact',obj)
    .pipe(catchError(this.errorHandler));
  }
  updatecrmcontactGenralDeatils(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatecrmcontactGenralDeatils',obj)
    .pipe(catchError(this.errorHandler));
  }
  updatecrmcontactTags(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatecrmcontactTags',obj)
    .pipe(catchError(this.errorHandler));
  }
  updatecrmcontactLists(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatecrmcontactLists',obj)
    .pipe(catchError(this.errorHandler));
  }
  countcrmcontacttags(uniqueid:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/countcrmcontacttags/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }
  filtercrmcontactlists(uniqueid:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/filtercrmcontactlists/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }
  filtercrmcontacttags(uniqueid:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/filtercrmcontacttags/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }

  
  crmcontactCheckEmail(email:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/crmcontactCheckEmail/'+email,obj).pipe(catchError(this.errorHandler));
    
  }

  getallcrmdata(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getallcrmdata', obj).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}
