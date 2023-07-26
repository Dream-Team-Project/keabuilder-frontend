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
export class OfferService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }


  fetchoffers(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/Alloffers', obj).pipe(catchError(this.errorHandler));
  }
  singleoffer(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singleoffer/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }
  addoffer(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addoffer',obj).pipe(catchError(this.errorHandler));
  }
  updateoffer(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updateoffer',obj).pipe(catchError(this.errorHandler));
  }
  deleteoffer(id:any): Observable<any>{
    return this.http.delete('/api/deleteoffer/'+id+'/'+this.uuid).pipe(catchError(this.errorHandler));
    
  }
  searchoffers(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchoffers',obj).pipe(catchError(this.errorHandler));
  }
  duplicateoffer(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/duplicateoffer',obj).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}