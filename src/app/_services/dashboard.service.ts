import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  getAllrevenue(obj:any): Observable<any> {
    return this.http.get('/api/getallrevenue/'+this.uuid+'/'+obj);
  }

  getAllcontact(obj:any): Observable<any> {
    return this.http.get('/api/getallcontact/'+this.uuid+'/'+obj);
  }

  getconditionaldata(data:any):Observable<any> {
    return this.http.post("/api/getconditionaldata/"+this.uuid, {
      data,
    }, httpOptions);
  }

  getrecentsales(): Observable<any> {
    return this.http.get('/api/getrecentsales/'+this.uuid);
  }

  dailysales(obj:any): Observable<any> {
    return this.http.get('/api/dailysales/'+this.uuid+'/'+obj);
  }

  totalearning(): Observable<any> {
    return this.http.get('/api/totalearning/'+this.uuid);
  }

  getdashboardheat(obj:any): Observable<any> {
    return this.http.get('/api/getdashboardheat/'+this.uuid+'/'+obj);
  }

  pageview(): Observable<any> {
    return this.http.get('/api/pageview/'+this.uuid);
  }

  visitordata(type:any): Observable<any> {
    return this.http.get('/api/visitordata/'+this.uuid+'/'+type);
  }

  plandata(): Observable<any> {
    return this.http.get('/api/getplandata/'+this.uuid);
  }
}
