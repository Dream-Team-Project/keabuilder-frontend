import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  uuid:any='';
  API_URL = '/api/crmreportingData/';
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }
  getcrmData(): Observable<any> {
    return this.http.get('/api/crmreportingData/'+this.uuid).pipe(catchError(this.errorHandler));
  }
  getcontactsData(obj:any): Observable<any> {
    return this.http.get('/api/crmcontactsData/'+this.uuid+'/'+obj.duration).pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
  }