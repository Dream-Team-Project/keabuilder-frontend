import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WebpagesService {

  allwebpagesApi = '/api/allwebpagesdata/';
  getwebpagebypathApi = '/api/getwebpagebypath/';
  createwebpagesApi = '/api/createwebpage/';
  updatewebpagesApi = '/api/updatewebpage/';
  getsinglewebpageApi = '/api/singlewebpagedata/';
  namepathchangesApi = '/api/namepathchangeswebsite/';
  validatepagesApi = '/api/validatepage/';
  savequickpagesdetailsApi = '/api/savequickpagesdetails/';
  dupldelpageApi = '/api/dupldelpage/';
  getarchivepagesApi = '/api/getarchivepages/';
  restoredeletepageApi = '/api/restoredeletepage/';
  pagevisibilityApi = '/api/pagevisibility/';
  querystringmanageApi = '/api/querystringmanage/';
  shortbypaginatorApi = '/api/shortbypaginator/';
  uniqueuserid:any = '';


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
      this.uniqueuserid = this.tokenStorage.getUser().uniqueid;
   }

  getWebpages(): Observable<any> {
    return this.http.get(this.allwebpagesApi+this.uniqueuserid);
  }

  getWebPageByPath(data:any): Observable<any> {
    return this.http.post(this.getwebpagebypathApi+this.uniqueuserid, data)
    .pipe(catchError(this.errorHandler));
  }

  getSingleWebpage(uniqueid:string): Observable<any> {
    return this.http.get(this.getsinglewebpageApi+this.uniqueuserid+'/'+uniqueid);
  }

  createWebpage(pagedata: any): Observable<any> {
    return this.http.post(this.createwebpagesApi+this.uniqueuserid, pagedata);
  }

  updateWebpage(pagedata: any): Observable<any> {
    return this.http.post(this.updatewebpagesApi+this.uniqueuserid, pagedata);
  }

  namepathchanges(id:string, name:string, which:string):Observable<any> {
    return this.http.post(this.namepathchangesApi+this.uniqueuserid, {
      id,
      name,
      which
    }, httpOptions);
  }

  validatepages(name: string, path:string, author:string):Observable<any> {
    return this.http.post(this.validatepagesApi+this.uniqueuserid, {
      name,
      path,
      author,
    }, httpOptions);
  }

  savequickpagesdetails(pageurl: string, seotitle:string, seodescr:string, gentags:string, seoauthor:string, quickeditid:string):Observable<any> {
    return this.http.post(this.savequickpagesdetailsApi+this.uniqueuserid, {
      pageurl,
      seotitle,
      seodescr,
      gentags,
      seoauthor,
      quickeditid,
    }, httpOptions);
  }

  dupldelpage(id: string, type:string):Observable<any> {
    return this.http.post(this.dupldelpageApi+this.uniqueuserid, {
      id,
      type,
    }, httpOptions);
  }

  getarchivepages(showing:string):Observable<any> {
    return this.http.post(this.getarchivepagesApi+this.uniqueuserid, {
      showing,
    }, httpOptions);
  }

  restoredeletepage(data:any):Observable<any> {
    return this.http.post(this.restoredeletepageApi+this.uniqueuserid, {
      data
    }, httpOptions);
  }

  pagevisibility(data:any):Observable<any> {
    return this.http.post(this.pagevisibilityApi+this.uniqueuserid, {
      data
    }, httpOptions);
  }

  querystringmanage(data:any):Observable<any> {
    return this.http.post(this.querystringmanageApi+this.uniqueuserid, {
      data
    }, httpOptions);
  }

  shortbypaginator(data:any):Observable<any> {
    return this.http.post(this.shortbypaginatorApi+this.uniqueuserid, {
      data
    }, httpOptions);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}
