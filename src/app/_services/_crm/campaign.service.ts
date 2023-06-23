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
export class CampaignService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }


  fetchcampaigns(): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/Allcampaigns', obj).pipe(catchError(this.errorHandler));
  }
  singlecampaign(uniqueid:any): Observable<any> {
    var obj = {uuid: this.uuid};
    return this.http.post('/api/singlecampaign/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }
  addcampaign(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addcampaign',obj).pipe(catchError(this.errorHandler));
  }
  updatecampaign(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatecampaign',obj).pipe(catchError(this.errorHandler));
  }
  deletecampaign(id:any): Observable<any>{
    // var obj = {uuid: this.uuid};
    return this.http.delete('/api/deletecampaign/'+id+'/'+this.uuid).pipe(catchError(this.errorHandler));
    
  }
  searchcampaigns(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchcampaigns',obj).pipe(catchError(this.errorHandler));
  }

//   crmcampaignStatus(status:any): Observable<any>{
//     var obj = {uuid: this.uuid};
//     return this.http.post('/api/crmcampaignStatus/'+status,obj).pipe(catchError(this.errorHandler));
    
//   }
//   countcrmcontacttags(uniqueid:any): Observable<any>{
//     var obj = {uuid: this.uuid};
//     return this.http.post('/api/countcrmcontacttags/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
//   }
//   filtercrmcampaigns(obj:any): Observable<any>{
//   obj.uuid = this.uuid;
//   return this.http.post('/api/filtercrmcampaigns',obj).pipe(catchError(this.errorHandler));
// }

// getAllcrmdata(): Observable<any> {
//   var obj = {uuid: this.uuid};
//   return this.http.post('./api/getAllcrmdata', obj,httpOptions);
// }
// getSinglecrmdata(uniqueid:any): Observable<any> {
//   var obj = {uuid: this.uuid};
//   return this.http.post('/api/getSinglecrmdata/'+uniqueid,obj).pipe(catchError(this.errorHandler));
// }
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }



}