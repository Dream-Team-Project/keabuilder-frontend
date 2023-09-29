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

  constructor(private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get('/api/heatget-request');
  }

  getheatunique(data:any): Observable<any> {
    return this.http.post('/api/heatget-unique',{
      data
    });
  }

  getheatpagedata(id:any): Observable<any> {
    return this.http.get('/api/heatget-pagedata/'+id);
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

  heatfetchmourequest(url: string): Observable<any> {
    return this.http.post('/api/heatfetchmou-request',{
      url
    }, httpOptions);
  }

  heatallrequest(url: string): Observable<any> {
    return this.http.post('/api/heatall-request',{
      url
    }, httpOptions);
  }

  heatshomerequest(data:any): Observable<any> {
    return this.http.post('/api/heatshome-request',data, httpOptions);
  }

 

  

}
