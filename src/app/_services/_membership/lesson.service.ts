import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  // API url
  bycourse_moduleidApi = './api/bycourse-moduleid';
  bycourseidApi = './api/lessonbycourseid';
  onlybycourseidApi = './api/onlymodulebyid';
  allApi = './api/alllessons';
  singleApi = './api/singlelesson';
  createApi = './api/createlesson';
  updateApi = './api/updatelesson';
  deleteApi = './api/deletelesson';

  constructor(private http:HttpClient) { }

  bycourse_moduleid(paramObj:any):Observable<any> {
    return this.http.get(this.bycourse_moduleidApi+'/'+paramObj.course_id+'/'+paramObj.module_id);
  }
  
  onlymodulebyid(param:any):Observable<any> {
    return this.http.get(this.onlybycourseidApi+'/'+param);
  }

  bycourseid(param:any):Observable<any> {
    return this.http.get(this.bycourseidApi+'/'+param);
  }

  all():Observable<any> {
    return this.http.get(this.allApi);
  }

  single(param:any):Observable<any> {
    return this.http.get(this.singleApi+'/'+param);
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

}
