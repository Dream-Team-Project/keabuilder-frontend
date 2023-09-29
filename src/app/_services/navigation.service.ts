import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { TokenStorageService } from './token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  fetchNavigations(): Observable<any> {
    return this.http.get('/api/allnavigationdata/'+this.uuid)
    .pipe(catchError(this.errorHandler));
  }

  singleNavigation(obj:any): Observable<any> {
    return this.http.post('/api/singlenavigationdata',obj)
    .pipe(catchError(this.errorHandler));
  }
 

  addNavigation(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/addnavigation',obj)
    .pipe(catchError(this.errorHandler));
  }

  updateNavigation(obj:any): Observable<any>{
    obj.user_id = this.uuid;
    return this.http.put('/api/updatenavigation',obj)
    .pipe(catchError(this.errorHandler));
  }

  deleteNavigation(id:any): Observable<any>{
    return this.http.delete('/api/deletenavigation/'+id+'/'+this.uuid)
    .pipe(catchError(this.errorHandler));
  }

  searchNavigation(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchnavigation',obj)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
}
