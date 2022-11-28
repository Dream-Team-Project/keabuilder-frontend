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

  updatesitedetails(obj:any):Observable<any> {
    return this.http.post("./api/updatesitedetails/"+this.uuid, obj, httpOptions);
  }

  setpublishstatus(status: any):Observable<any> {
    return this.http.post("./api/setPublishstatus/"+this.uuid, {
      status,
    }, httpOptions);
  }

}
