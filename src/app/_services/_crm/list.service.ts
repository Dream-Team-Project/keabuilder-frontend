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
export class ListService {
  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  fetchlists(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/alllists', obj)
    .pipe(catchError(this.errorHandler));
  }

  singlelist(id:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singlelist/'+id,obj)
    .pipe(catchError(this.errorHandler));
  }

  addlist(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addlist',obj)
    .pipe(catchError(this.errorHandler));
  }

  updatelist(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatelist',obj)
    .pipe(catchError(this.errorHandler));
  }

  deletelist(id:any): Observable<any>{
    return this.http.delete('/api/deletelist/'+id+'/'+this.uuid)
    .pipe(catchError(this.errorHandler));
  }

  searchlists(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchlists',obj)
    .pipe(catchError(this.errorHandler));
  }

 
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}