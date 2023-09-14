import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeatmapsService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get('/api/heatget-request');
  }

  getheatdir(hash:string): Observable<any> {
    return this.http.post('/api/getheatdir',{
      hash
    });
  }

  visitorinfo(hash: string): Observable<any> {
    return this.http.post('/api/visitorinfo',{
      hash
    });
  }

  heatfetchlocrequest(url: string): Observable<any> {
    return this.http.post('/api/heatfetchloc-request',{
      url
    }, httpOptions);
  }

 

  

}
