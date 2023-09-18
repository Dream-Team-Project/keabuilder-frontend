import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PageViewService {

  uuid:any = '';
  getdomain_subdomain = '/api/domainpageview';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }
  
  checkdomain_subdomain(obj:any): Observable<any> {
    obj.user_id=this.uuid;
    return this.http.post(this.getdomain_subdomain, obj);
  }

}
