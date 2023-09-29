import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // API url
  allApi = '/api/allcourses';
  singleApi = '/api/singlecourse';
  multipleApi = '/api/multiplecourse';
  singlebyurlApi = '/api/singlebyurlcourse';
  createApi = '/api/createcourse';
  duplicateApi = '/api/duplicatecourse';
  updateApi = '/api/updatecourse';
  deleteApi = '/api/deletecourse';
  searchcoursequeryApi = '/api/searchcoursequery';
  // API url
  uuid: any;
//  course:any={courseid:'',title:''};
 
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  all():Observable<any> {
    return this.http.get(this.allApi+'/'+this.uuid);
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

  create(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.createApi, obj);
  }
  duplicate(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.duplicateApi, obj);
  }


  update(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.put(this.updateApi, obj);
  }

  delete(param:any):Observable<any> {
    return this.http.delete(this.deleteApi + '/' + this.uuid+'/'+param)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

  // tags
  addnewtags(tags:any):Observable<any> {
    return this.http.post("/api/membership_addnewtags", {tags});
  }

  getalltags():Observable<any> {
    return this.http.get("/api/membership_alltags");
  }

  updatedeltag(data:any):Observable<any> {
    return this.http.post("/api/membership_updatedeltag", {data});
  }
  // tags

  // member
  addnewmember(data:any):Observable<any> {
    data.user_id=this.uuid;
    return this.http.post("/api/membership_addnewmember", {data});
  }

  getallmembers():Observable<any> {
    return this.http.get("/api/membership_allmembers/"+this.uuid);
  }

  updatedelmember(data:any):Observable<any> {
    data.user_id=this.uuid;
    return this.http.post("/api/membership_updatedelmember", {data});
  }

  validatecourseemail(data:any):Observable<any> {
    data.user_id=this.uuid;
    return this.http.post("/api/membership_validatecourseemail", {data});
  }
  searchmembers(data:any):Observable<any> {
    data.user_id=this.uuid;
    return this.http.post("/api/membership_searchmembers", data);
  }
  
  getcoursemembers(obj:any):Observable<any> {
    obj.user_id=this.uuid;
    return this.http.post("/api/membership_allcoursemembers",obj);
  }

  // member
  
  // coupon
  addnewcoupon(data:any):Observable<any> {
    return this.http.post("/api/membership_addnewcoupon", {data});
  }

  getallcoupons():Observable<any> {
    return this.http.get("/api/membership_allcoupons");
  }

  updatedelcoupon(data:any):Observable<any> {
    return this.http.post("/api/membership_updatedelcoupon", {data});
  }
  // coupon

   // offers

  getoffersbyids(data:any):Observable<any> {
    return this.http.post("/api/membership_getoffersbyids", {data});
  }

  addnewoffer(data:any):Observable<any> {
    return this.http.post("/api/membership_addnewoffer", {data});
  }

  getalloffers():Observable<any> {
    return this.http.get("/api/membership_alloffers");
  }

  updatedeloffer(data:any):Observable<any> {
    return this.http.post("/api/membership_updatedeloffer", {data});
  }

  filteroffer(data:any):Observable<any> {
    return this.http.post("/api/membership_filteroffer", {data});
  }

  querystringmanage(data:any):Observable<any> {
    return this.http.post("/api/membership_queryoffer", {data});
  }

  // offers

  // login

  verifyuserlogin(data:any):Observable<any> {
    return this.http.post("/api/verifyuserlogin", {data});
  }

  // login

// search & filter
searchcoursequery(obj:any):Observable<any> {
  obj.user_id = this.uuid;
  return this.http.post(this.searchcoursequeryApi, obj)
  .pipe(catchError(this.errorHandler));
}

// search & filter

}
