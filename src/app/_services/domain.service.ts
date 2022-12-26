import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

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
    return this.http.get('https://keabuilder.com/dm.php?domain='+domain+'&uniqueid='+this.uuid);
  }

}
