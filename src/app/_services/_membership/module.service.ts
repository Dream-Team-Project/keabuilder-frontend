import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

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
  searchformqueryApi = './api/membership_searchformquery';
  uuid:any = '';
  constructor(private http:HttpClient,private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
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
 // search & filter
searchformquery(obj:any):Observable<any> {
  obj.user_id = this.uuid;
  return this.http.post(this.searchformqueryApi, obj)
  .pipe(catchError(this.errorHandler));
}

// search & filter
    
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}
