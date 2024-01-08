import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

const API_URL = 'api/allusers/';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  
  uuid:any = '';
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  oncreatedomain(domain: any): Observable<any>{
    return this.http.post('https://api.keasolution.com/dm.php?domain='+domain+'&uniqueid='+this.uuid,{});
  }

  ongetdomainstatus(domain: any): Observable<any>{
    return this.http.post('https://api.keasolution.com/dmsts.php?domain='+domain,{});
  }
  
  oncloudAddUpdatedomain(zoneid: any, domain:any, type:any, name:any,recordid:any, content:any, action:any,proxied:any,ttl:any): Observable<any>{
    return this.http.post('https://api.keasolution.com/editdm.php?domain='+domain+'&zoneid='+zoneid+'&uniqueid='+this.uuid+'&type='+type+'&name='+name+'&content='+content+'&action='+action+'&proxied='+proxied+'&ttl='+ttl+'&recordid='+recordid,{});
  }

  onclouddeletedomain(zoneid: any, domain:any): Observable<any>{
    return this.http.post('https://api.keasolution.com/deldm.php?domain='+domain+'&zoneid='+zoneid+'&uniqueid='+this.uuid,{});
  }

  oninsertdomain(data:any):Observable<any> {
    return this.http.post("/api/insertdomaindata/"+this.uuid, {
      data,
    }, httpOptions);
  }

  getDomains(): Observable<any> {
    return this.http.get('/api/getdomaindata/'+this.uuid);
  }
  getSingleDomain(id:any): Observable<any> {
    return this.http.get('/api/getsingledomaindata/'+this.uuid+'/'+id);
  }

  updatedomaindata(data:any):Observable<any> {
    return this.http.post("/api/updatedomaindata/"+this.uuid, {
      data,
    }, httpOptions);
  }
  updatedomainnameserver(data:any):Observable<any> {
    return this.http.post("/api/updatedomainnameserver/"+this.uuid, {
      data,
    }, httpOptions);
  }

  ondeletedomain(id:any):Observable<any> {
    return this.http.post("/api/deletedomaindata/"+this.uuid, {
      id,
    }, httpOptions);
  }
  

}
