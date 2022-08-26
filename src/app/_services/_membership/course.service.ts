import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // API url
  allApi = './api/allcourses';
  singleApi = './api/singlecourse';
  multipleApi = './api/multiplecourse';
  singlebyurlApi = './api/singlebyurlcourse';
  createApi = './api/createcourse';
  updateApi = './api/updatecourse';
  deleteApi = './api/deletecourse';

  constructor(private http:HttpClient) { }

  all():Observable<any> {
    return this.http.get(this.allApi);
  }

  single(param:any):Observable<any> {
    return this.http.get(this.singleApi+'/'+param);
  }

  multiple(req:any):Observable<any> {
    return this.http.post(this.multipleApi, req);
  }

  singlebyurl(param:any):Observable<any> {
    return this.http.get(this.singlebyurlApi+'/'+param);
  }

  create(req:any):Observable<any> {
    return this.http.post(this.createApi, req);
  }

  update(req:any):Observable<any> {
    return this.http.put(this.updateApi, req);
  }

  delete(param:any):Observable<any> {
    return this.http.delete(this.deleteApi + '/' + param)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

  // tags
  addnewtags(tags:any):Observable<any> {
    return this.http.post("./api/membership_addnewtags", {tags});
  }

  getalltags():Observable<any> {
    return this.http.get("./api/membership_alltags");
  }

  updatedeltag(data:any):Observable<any> {
    return this.http.post("./api/membership_updatedeltag", {data});
  }
  // tags

  // member
  addnewmember(data:any):Observable<any> {
    return this.http.post("./api/membership_addnewmember", {data});
  }

  getallmembers():Observable<any> {
    return this.http.get("./api/membership_allmembers");
  }

  updatedelmember(data:any):Observable<any> {
    return this.http.post("./api/membership_updatedelmember", {data});
  }

  validatecourseemail(data:any):Observable<any> {
    return this.http.post("./api/membership_validatecourseemail", {data});
  }

  // member
  
  // coupon
  addnewcoupon(data:any):Observable<any> {
    return this.http.post("./api/membership_addnewcoupon", {data});
  }

  getallcoupons():Observable<any> {
    return this.http.get("./api/membership_allcoupons");
  }

  updatedelcoupon(data:any):Observable<any> {
    return this.http.post("./api/membership_updatedelcoupon", {data});
  }
  // coupon

   // offers
  addnewoffer(data:any):Observable<any> {
    return this.http.post("./api/membership_addnewoffer", {data});
  }

  getalloffers():Observable<any> {
    return this.http.get("./api/membership_alloffers");
  }

  updatedeloffer(data:any):Observable<any> {
    return this.http.post("./api/membership_updatedeloffer", {data});
  }

  filteroffer(data:any):Observable<any> {
    return this.http.post("./api/membership_filteroffer", {data});
  }

  querystringmanage(data:any):Observable<any> {
    return this.http.post("./api/membership_queryoffer", {data});
  }

  // offers

  // login

  verifyuserlogin(data:any):Observable<any> {
    return this.http.post("./api/verifyuserlogin", {data});
  }

  // login



}
