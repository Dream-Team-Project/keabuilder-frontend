import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  // API url
  bycourseidApi = './api/modulebycourseid';
  allApi = './api/allmodules';
  singleApi = './api/singlemodule';
  createApi = './api/createmodule';
  updateApi = './api/updatemodule';
  deleteApi = './api/deletemodule';

  constructor(private http:HttpClient) { }

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
