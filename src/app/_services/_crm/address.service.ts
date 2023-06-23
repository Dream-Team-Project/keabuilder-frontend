import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }


  fetchaddress(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/Alladdress', obj).pipe(catchError(this.errorHandler));
  }
  singleaddress(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singleaddress/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }
  addaddress(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addaddress',obj).pipe(catchError(this.errorHandler));
  }
  updateaddress(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updateaddress',obj).pipe(catchError(this.errorHandler));
  }
  deleteaddress(id:any): Observable<any>{
    // var obj = {uuid: this.uuid};
    return this.http.delete('/api/deleteaddress/'+id+'/'+this.uuid).pipe(catchError(this.errorHandler));
    
  }
  searchaddress(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchaddress',obj).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}

