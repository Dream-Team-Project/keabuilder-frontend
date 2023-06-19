import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  fetchtags(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/alltags', obj)
    .pipe(catchError(this.errorHandler));
  }

  singletag(id:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singletag/'+id,obj)
    .pipe(catchError(this.errorHandler));
  }

  addtag(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addtag',obj)
    .pipe(catchError(this.errorHandler));
  }

  updatetag(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatetag',obj)
    .pipe(catchError(this.errorHandler));
  }

  deletetag(id:any): Observable<any>{
    return this.http.delete('/api/deletetag/'+id+'/'+this.uuid)
    .pipe(catchError(this.errorHandler));
  }

  searchtags(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchtags',obj)
    .pipe(catchError(this.errorHandler));
  }

 
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}