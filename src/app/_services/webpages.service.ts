import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WebpagesService {

  constructor(private http: HttpClient) { }

  getWebpage(): Observable<any> {
    return this.http.get('/api/allwebpagesdata');
  }

  namepathchanges(id:string, name:string, which:string):Observable<any> {
    return this.http.post("/api/namepathchangeswebsite", {
      id,
      name,
      which
    }, httpOptions);
  }




}
