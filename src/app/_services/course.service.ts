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
  createApi = './api/createcourse';
  updateApi = './api/updatecourse';
  deleteApi = './api/deletecourse';

  constructor(private http:HttpClient) { }

  all():Observable<any> {
    return this.http.get(this.allApi);
  }

  single(param:any):Observable<any> {
    return this.http.post(this.createApi, param);
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



}
