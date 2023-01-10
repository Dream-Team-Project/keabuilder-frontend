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

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { 
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  getWebsite(): Observable<any> {
    return this.http.get('/api/allwebsitedata/'+this.uuid);
  }

  getuniqwebsites(data: any):Observable<any> {
    return this.http.post("./api/getuniqwebsites/"+this.uuid, {
      data,
    }, httpOptions);
  }

  createwebsite(data: any):Observable<any> {
    return this.http.post("./api/createnewwebsite/"+this.uuid, {
      data,
    }, httpOptions);
  }

  updatesitedetails(obj:any):Observable<any> {
    return this.http.post("./api/updatesitedetails/"+this.uuid, obj, httpOptions);
  }

  setpublishstatus(status: any):Observable<any> {
    return this.http.post("./api/setPublishstatus/"+this.uuid, {
      status,
    }, httpOptions);
  }

  oncreatesubdomain(domain: any, uniqueid: any): Observable<any>{
    return this.http.get('https://keabuilder.com/crd.php?domain='+domain+'&uniqueid='+uniqueid);
  }

}
