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

  updatesitedetails(homepage: any, scriptheader:any, scriptfooter:any, logo:any, favicon:any, checkimginput1:any, checkimginput2:any):Observable<any> {
    return this.http.post("./api/updatesitedetails", {
      homepage,
      scriptheader,
      scriptfooter,
      logo,
      favicon,
      checkimginput1,
      checkimginput2,
    }, httpOptions);
  }

  setpublishstatus(status: any):Observable<any> {
    return this.http.post("./api/setPublishstatus", {
      status,
    }, httpOptions);
  }



}
