import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

@Injectable({
  providedIn: 'root'
})
export class WebpagesService {

  allwebpagesApi = '/api/allwebpagesdata';
  createwebpagesApi = '/api/createwebpage';
  updatewebpagesApi = '/api/updatewebpage';
  getsinglewebpageApi = '/api/singlewebpagedata';

  constructor(private http: HttpClient) { }

  getWebpages(): Observable<any> {
    return this.http.get(this.allwebpagesApi);
  }

  getSingleWebpage(uniqueid:string): Observable<any> {
    return this.http.get(this.getsinglewebpageApi+'/'+uniqueid);
  }

  createWebpage(pagedata: any): Observable<any> {
    return this.http.post(this.createwebpagesApi, pagedata);
  }

  updateWebpage(pagedata: any): Observable<any> {
    return this.http.post(this.updatewebpagesApi, pagedata);
  }

}
