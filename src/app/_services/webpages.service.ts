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
  checkandmakestatusApi = '/api/checkandmakestatus/';
  uuid:any = '';


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
      this.uuid = this.tokenStorage.getUser().uniqueid;
      // console.log(this.tokenStorage.getUser());
  }

  getWebpages(): Observable<any> {
    return this.http.get(this.allwebpagesApi+this.uuid);
  }

  getWebPageByPath(data:any): Observable<any> {
    return this.http.post(this.getwebpagebypathApi+this.uuid, data)
    .pipe(catchError(this.errorHandler));
  }

  getSingleWebpage(uniqueid:string): Observable<any> {
    return this.http.get(this.getsinglewebpageApi+this.uuid+'/'+uniqueid);
  }

  createWebpage(pagedata: any): Observable<any> {
    return this.http.post(this.createwebpagesApi+this.uuid, pagedata);
  }

  updateWebpage(pagedata: any): Observable<any> {
    return this.http.post(this.updatewebpagesApi+this.uuid, pagedata);
  }

  namepathchanges(id:string, name:string, which:string):Observable<any> {
    return this.http.post(this.namepathchangesApi+this.uuid, {
      id,
      name,
      which
    }, httpOptions);
  }

  validatepages(name: string, path:string, author:string):Observable<any> {
    return this.http.post(this.validatepagesApi+this.uuid, {
      name,
      path,
      author,
    }, httpOptions);
  }

  savequickpagesdetails(pageurl: string, seotitle:string, seodescr:string, gentags:string, seoauthor:string, quickeditid:string):Observable<any> {
    return this.http.post(this.savequickpagesdetailsApi+this.uuid, {
      pageurl,
      seotitle,
      seodescr,
      gentags,
      seoauthor,
      quickeditid,
    }, httpOptions);
  }

  dupldelpage(id: string, type:string):Observable<any> {
    return this.http.post(this.dupldelpageApi+this.uuid, {
      id,
      type,
    }, httpOptions);
  }

  getarchivepages(showing:string):Observable<any> {
    return this.http.post(this.getarchivepagesApi+this.uuid, {
      showing,
    }, httpOptions);
  }

  restoredeletepage(data:any):Observable<any> {
    return this.http.post(this.restoredeletepageApi+this.uuid, {
      data
    }, httpOptions);
  }

  pagevisibility(data:any):Observable<any> {
    return this.http.post(this.pagevisibilityApi+this.uuid, {
      data
    }, httpOptions);
  }

  querystringmanage(data:any):Observable<any> {
    return this.http.post(this.querystringmanageApi+this.uuid, {
      data
    }, httpOptions);
  }

  shortbypaginator(data:any):Observable<any> {
    return this.http.post(this.shortbypaginatorApi+this.uuid, {
      data
    }, httpOptions);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

  checkandmakestatus(data:any):Observable<any> {
    return this.http.post(this.checkandmakestatusApi+this.uuid, {
      data
    }, httpOptions);
  }

}
