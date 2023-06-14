import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsService {
  user_id:any = '';
  allfields = './api/allfields';
  addfields = './api/addfield';
  updatefields = './api/updatefield';
  deletefields = './api/deletefield';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.user_id = this.tokenStorage.getUser().uniqueid;
  }

  fetchformfields(){
    return this.http.get(this.allfields+'/'+this.user_id)
    .pipe(catchError(this.errorHandler));
  }

  addformfield(obj:any) {
    obj.user_id=this.user_id;
    return this.http.post(this.addfields, obj)
    .pipe(catchError(this.errorHandler));    
  }

  updateformfield(obj:any){
    obj.user_id = this.user_id;
    return this.http.post(this.updatefields,obj)
    .pipe(catchError(this.errorHandler));
  }

  deleteformfield(id:any){
    return this.http.delete(this.deletefields+'/'+id)
    .pipe(catchError(this.errorHandler));
  }

  searchFieldsquery(obj:any){
    obj.user_id = this.user_id;
    return this.http.post('/api/searchFieldsquery',obj)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}

