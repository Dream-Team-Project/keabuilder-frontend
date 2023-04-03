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
export class CrmTagsService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  getAllcrmtags(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getcrmtags',obj)
    .pipe(catchError(this.errorHandler));
  }
  getcrmtag(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getcrmtag/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }

  createcrmtag(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/createcrmtag',obj).pipe(catchError(this.errorHandler));
  }
  deletecrmtag(uniqueid:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/deletecrmtag/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }
  updatecrmtag(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatecrmtag',obj).pipe(catchError(this.errorHandler));
    
  }
  // createtagOncontactedit(obj:any): Observable<any> {
  //   obj.user_id = this.uuid;
  //   return this.http.post('/api/createtagOncontactedit',obj).pipe(catchError(this.errorHandler));
  // }

  crmDuplicatetagcheck(tag_name:any): Observable<any>{
    var obj = {uuid: this.uuid};
    // console.log(tag_name);
    return this.http.post('/api/crmDuplicatetagcheck/'+tag_name,obj).pipe(catchError(this.errorHandler));
    
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}
