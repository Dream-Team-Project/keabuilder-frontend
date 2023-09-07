import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutomationGeneralService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }


  fetchautomations(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/Allautomations', obj).pipe(catchError(this.errorHandler));
  }
  fetchallcrmdata(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/Allcrmdata', obj).pipe(catchError(this.errorHandler));
  }
  singleautomation(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singleautomation/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }
  addautomation(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addautomation',obj).pipe(catchError(this.errorHandler));
  }
  updateautomation(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updateautomation',obj).pipe(catchError(this.errorHandler));
  }
  changeautomationname(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/changename',obj).pipe(catchError(this.errorHandler));
  }
  deleteautomation(id:any): Observable<any>{
    // var obj = {uuid: this.uuid};
    return this.http.delete('/api/deleteautomation/'+id+'/'+this.uuid).pipe(catchError(this.errorHandler));
    
  }
  searchautomations(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchautomations',obj).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}
