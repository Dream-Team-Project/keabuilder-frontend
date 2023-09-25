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
  websitename:any='';
  website_id:any='';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { 
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  getWebsite(): Observable<any> {
    return this.http.get('/api/allwebsitedata/'+this.uuid);
  }

  getSingleWebsite(uniqueid:string): Observable<any> {
    return this.http.get('/api/getsinglewebsite/'+this.uuid+'/'+uniqueid);
  }

  getuniqwebsites(data: any):Observable<any> {
    return this.http.post("/api/getuniqwebsites/"+this.uuid, {
      data,
    }, httpOptions);
  }

  createwebsite(data: any):Observable<any> {
    return this.http.post("/api/createnewwebsite/"+this.uuid, {
      data,
    }, httpOptions);
  }

  duplicatewebsite(data: any):Observable<any> {
    return this.http.post("/api/duplicatewebsite/"+this.uuid, {
      data,
    }, httpOptions);
  }

  deletewebsite(data: any):Observable<any> {
    return this.http.post("/api/deletewebsite/"+this.uuid, {
      data,
    }, httpOptions);
  }

  updatesitedetails(obj:any):Observable<any> {
    return this.http.post("/api/updatesitedetails/"+this.uuid, obj, httpOptions);
  }

  setpublishstatus(status: any):Observable<any> {
    return this.http.post("/api/setPublishstatus/"+this.uuid, {
      status,
    }, httpOptions);
  }

  oncreatesubdomain(domain: any, uniqueid: any): Observable<any>{
    return this.http.get('https://keasolution.com/crd.php?domain='+domain+'&uniqueid='+uniqueid+'&userid='+this.uuid);
  }

  ondeletesubdomain(domain: any): Observable<any>{
    return this.http.get('https://keasolution.com/delsubdm.php?domain='+domain+'&uniqueid='+this.uuid);
  }

  onchangedirdomain(domain: any, uniqueid: any): Observable<any>{
    return this.http.get('https://keasolution.com/cngdmrt.php?domain='+domain+'&uniqueid='+uniqueid+'&userid='+this.uuid);
  }
  
  querystringmanagewebsite(data:any):Observable<any> {
    return this.http.post("/api/querystringmanagewebsite/"+this.uuid, {
      data
    }, httpOptions);
  }

  shortbypaginatorwebsite(data:any):Observable<any> {
    return this.http.post("/api/shortbypaginatorwebsite/"+this.uuid, {
      data
    }, httpOptions);
  }

}
