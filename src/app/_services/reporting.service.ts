import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  user_id:any;

  recentContactsApi = '/api/recentcontacts';
  datefilterContactsApi = '/api/datefiltercontacts';

  recentCampaignsApi = '/api/recentcampaigns';
  datefilterCampaignsApi = '/api/datefiltercampaigns';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.user_id = this.tokenStorage.getUser().uniqueid;
  }

  recentContacts(limit:number): Observable<any> {
    return this.http.get(this.recentContactsApi+'/'+this.user_id+'/'+limit)
    .pipe(catchError(this.errorHandler));
  }

  datefilterContacts(from:Date, to:Date): Observable<any> {
    return this.http.get(this.datefilterContactsApi+'/'+this.user_id+'/'+from+'/'+to)
    .pipe(catchError(this.errorHandler));
  }

  recentCampaigns(limit:number): Observable<any> {
    return this.http.get(this.recentCampaignsApi+'/'+this.user_id+'/'+limit)
    .pipe(catchError(this.errorHandler));
  }

  datefilterCampaigns(from:Date, to:Date): Observable<any> {
    return this.http.get(this.datefilterCampaignsApi+'/'+this.user_id+'/'+from+'/'+to)
    .pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
}