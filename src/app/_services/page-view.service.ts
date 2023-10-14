import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PageViewService {

  uuid:any = '';
  getdomain_subdomain = '/api/domainpageview';
  getmembercourses = '/api/membercourses';

  constructor(private http: HttpClient) {
    
  }
  
  fetchPageByDomain(obj:any): Observable<any> {
    return this.http.post(this.getdomain_subdomain, obj);
  }
  fetchmembercourses(obj:any): Observable<any> {
    return this.http.post(this.getmembercourses, obj);
  }
}
