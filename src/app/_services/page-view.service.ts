import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PageViewService {

  uuid:any = '';
  getdomain_subdomain = '/api/domainpageview';

  constructor(private http: HttpClient) {
    
  }
  
  checkdomain_subdomain(obj:any): Observable<any> {
    return this.http.post(this.getdomain_subdomain, obj);
  }

}
