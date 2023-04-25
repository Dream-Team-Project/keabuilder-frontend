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
export class CrmUserAddressService {
  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }
  getAlluserAddress(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getAlluserAddress', obj)
    .pipe(catchError(this.errorHandler));
  }
  getuserAddress(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getuserAddress/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }

  createuserAddress(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/createuserAddress',obj).pipe(catchError(this.errorHandler));
  }
  deleteuserAddress(uniqueid:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/deleteuserAddress/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }
  // crmcampaignStatus(status:any): Observable<any>{
  //   var obj = {uuid: this.uuid};
  //   return this.http.post('/api/crmcampaignStatus/'+status,obj).pipe(catchError(this.errorHandler));
    
  // }


  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}
