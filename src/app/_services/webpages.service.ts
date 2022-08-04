import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Variable } from '@angular/compiler/src/render3/r3_ast';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WebpagesService {

  allwebpagesApi = '/api/allwebpagesdata';
  getwebpagebypathApi = '/api/getwebpagebypath';
  createwebpagesApi = '/api/createwebpage';
  updatewebpagesApi = '/api/updatewebpage';
  getsinglewebpageApi = '/api/singlewebpagedata';

  constructor(private http: HttpClient) { }

  getWebpages(): Observable<any> {
    return this.http.get(this.allwebpagesApi);
  }

  getWebPageByPath(data:any): Observable<any> {
    return this.http.post(this.getwebpagebypathApi, data)
    .pipe(catchError(this.errorHandler));;
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

  namepathchanges(id:string, name:string, which:string):Observable<any> {
    return this.http.post("/api/namepathchangeswebsite", {
      id,
      name,
      which
    }, httpOptions);
  }

  validatepages(name: string, path:string, author:string):Observable<any> {
    return this.http.post("/api/validatepage", {
      name,
      path,
      author,
    }, httpOptions);
  }

  savequickpagesdetails(pageurl: string, seotitle:string, seodescr:string, gentags:string, seoauthor:string, quickeditid:string):Observable<any> {
    return this.http.post("/api/savequickpagesdetails", {
      pageurl,
      seotitle,
      seodescr,
      gentags,
      seoauthor,
      quickeditid,
    }, httpOptions);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

  dupldelpage(id: string, type:string):Observable<any> {
    return this.http.post("/api/dupldelpage", {
      id,
      type,
    }, httpOptions);
  }

  getarchivepages(showing:string):Observable<any> {
    return this.http.post("./api/getarchivepages", {
      showing,
    }, httpOptions);
  }

  restoredeletepage(data:any):Observable<any> {
    return this.http.post("./api/restoredeletepage", {
      data
    }, httpOptions);
  }

  pagevisibility(data:any):Observable<any> {
    return this.http.post("./api/pagevisibility", {
      data
    }, httpOptions);
  }

  querystringmanage(data:any):Observable<any> {
    return this.http.post("./api/querystringmanage", {
      data
    }, httpOptions);
  }

  shortbypaginator(data:any):Observable<any> {
    return this.http.post("./api/shortbypaginator", {
      data
    }, httpOptions);
  }

  

  


}
