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

}
