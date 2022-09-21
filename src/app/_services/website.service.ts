import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  uniqueuserid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { 
    this.uniqueuserid = this.tokenStorage.getUser().uniqueid;
  }

  getWebsite(): Observable<any> {
    return this.http.get('/api/allwebsitedata/'+this.uniqueuserid);
  }

  updatesitedetails(homepage: any, scriptheader:any, scriptfooter:any, logo:any, favicon:any, checkimginput1:any, checkimginput2:any):Observable<any> {
    return this.http.post("./api/updatesitedetails/"+this.uniqueuserid, {
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
    return this.http.post("./api/setPublishstatus/"+this.uniqueuserid, {
      status,
    }, httpOptions);
  }

}
