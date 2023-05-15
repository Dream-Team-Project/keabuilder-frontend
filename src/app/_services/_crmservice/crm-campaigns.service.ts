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
export class CrmCampaignsService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  // Crm all tables data
  getAllcrmdata(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('./api/getAllcrmdata', obj,httpOptions);
  }
  getSinglecrmdata(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getSinglecrmdata/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }

  getAllcrmcampaigns(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getAllcrmcampaigns', obj)
    .pipe(catchError(this.errorHandler));
  }
  getcrmcampaign(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/getcrmcampaign/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }
  getSinglecrmcampaigns(obj:any): Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post('/api/getSinglecrmcampaigns',obj).pipe(catchError(this.errorHandler));
  }

  createcrmcampaign(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/createcrmcampaign',obj).pipe(catchError(this.errorHandler));
  }
  deletecrmcampaign(uniqueid:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/deletecrmcampaign/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }
  crmcampaignStatus(status:any): Observable<any>{
    var obj = {uuid: this.uuid};
    return this.http.post('/api/crmcampaignStatus/'+status,obj).pipe(catchError(this.errorHandler));
    
  }

  updatecrmcampaignt(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatecrmcampaign',obj)
    .pipe(catchError(this.errorHandler));
  }

  // countcrmcontacttags(uniqueid:any): Observable<any>{
  //   var obj = {uuid: this.uuid};
  //   return this.http.post('/api/countcrmcontacttags/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  // }
  filtercrmcampaigns(obj:any): Observable<any>{
  obj.uuid = this.uuid;
  return this.http.post('/api/filtercrmcampaigns',obj).pipe(catchError(this.errorHandler));
}

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}
