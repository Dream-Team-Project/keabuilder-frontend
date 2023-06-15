import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CrmListService {

  
  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  getAllcrmlists(): Observable<any> {
    var obj={uuid:this.uuid};
    return this.http.post('/api/getcrmlists',obj)
    .pipe(catchError(this.errorHandler));
  }

  getAllcrmliststagcnt(): Observable<any> {
    var obj={uuid:this.uuid};
    return this.http.post('/api/getAllcrmliststagcnt',obj)
    .pipe(catchError(this.errorHandler));
  }

  getcrmlists(uniqueid:any): Observable<any> {
    var obj={uuid:this.uuid};
    return this.http.post('/api/getcrmlist/'+uniqueid,obj).pipe(catchError(this.errorHandler));
  }

  createcrmlist(obj:any): Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post('/api/createcrmlist',obj).pipe(catchError(this.errorHandler));
  }
  deletecrmlist(uniqueid:any): Observable<any>{
    var obj={uuid:this.uuid};
    return this.http.post('/api/deletecrmlist/'+uniqueid,obj).pipe(catchError(this.errorHandler));
    
  }
  updatecrmlist(obj:any): Observable<any>{
    obj.user_id=this.uuid;
    return this.http.put('/api/updatecrmlist',obj).pipe(catchError(this.errorHandler));
    
  }
  // createlistOncontactedit(obj:any): Observable<any> {
  //   obj.user_id = this.uuid;
  //   return this.http.post('/api/createlistOncontactedit',obj).pipe(catchError(this.errorHandler));
  // }
  crmDuplicatelistcheck(list_name:any): Observable<any>{
    var obj = {uuid: this.uuid};
    // console.log(tag_name);
    return this.http.post('/api/crmDuplicatelistcheck/'+list_name,obj).pipe(catchError(this.errorHandler));
    
  }
  searchListsquery(obj:any){
    obj.user_id = this.uuid;
    return this.http.post('/api/searchListsquery',obj).pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}


