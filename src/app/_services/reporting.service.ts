import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  user_id:any;
  recentContactsApi = '/api/recentcontacts/';
  monthlyContactsApi = '/api/monthlycontacts/';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.user_id = this.tokenStorage.getUser().uniqueid;
  }

  recentContacts(limit:number): Observable<any> {
    return this.http.get(this.recentContactsApi+'/'+this.user_id+'/'+limit)
    .pipe(catchError(this.errorHandler));
  }

  monthlyContacts(): Observable<any> {
    return this.http.get(this.monthlyContactsApi+'/'+this.user_id)
    .pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
}