import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(private http: HttpClient) { }

  getWebsite(): Observable<any> {
    return this.http.get('/api/allwebsitedata');
  }

  updatesiteDetails(homepage: string, scriptheader:string, scriptfooter:string):Observable<any> {
    return this.http.post("/api/updatesitedetails", {
      homepage,
      scriptheader,
      scriptfooter,
    }, httpOptions);
  }



}
