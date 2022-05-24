import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
