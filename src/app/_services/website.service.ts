import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(private http: HttpClient) { }

  getWebsite(): Observable<any> {
    return this.http.get('/api/allwebsitedata');
  }

}
