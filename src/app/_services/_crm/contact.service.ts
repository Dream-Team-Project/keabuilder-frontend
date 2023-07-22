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
    return this.http.post('/api/allcontacts', obj)
    .pipe(catchError(this.errorHandler));
  }

  singlecontact(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singlecontact/'+uniqueid,obj)
    .pipe(catchError(this.errorHandler));
  }

  addcontact(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addcontact',obj)
    .pipe(catchError(this.errorHandler));
  }

  updatecontact(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatecontact',obj)
    .pipe(catchError(this.errorHandler));
  }

  deletecontact(id:any): Observable<any>{
    return this.http.delete('/api/deletecontact/'+id+'/'+this.uuid)
    .pipe(catchError(this.errorHandler));
  }

  searchcontacts(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchcontact',obj)
    .pipe(catchError(this.errorHandler));
  }

  formsubmission(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/formsubmission',obj)
    .pipe(catchError(this.errorHandler));
  }
  
  getallcrmdata(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getallcrmdata', obj).pipe(catchError(this.errorHandler));
  }
  uploadcontacts(file:any) : Observable<any> {
    // const formData = new FormData();
    // formData.append('uploadedImage', file, file.filename);
    return this.http.post('/api/uploadcontacts/'+this.uuid,file).pipe(catchError(this.errorHandler));
  }
  exportcontacts(): Observable<any> {
    return this.http.get('/api/exportcontacts/'+this.uuid).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}