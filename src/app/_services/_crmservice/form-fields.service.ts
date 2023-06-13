import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormFieldsService {
  user_id:any = '';
  allfields = './api/allformfields';
  addfields = './api/addfield';
  deletefields = './api/deleteformfield';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.user_id = this.tokenStorage.getUser().uniqueid;
   }

  allformfields(){
    return this.http.get(this.allfields+'/'+this.user_id)
    .pipe(catchError(this.errorHandler));
  }

  addformfields(obj:any) {
    obj.user_id=this.user_id;
    return this.http.get(this.addfields+'/'+this.user_id)
    .pipe(catchError(this.errorHandler));    
  }

  deleteformfield(obj:any){
    obj.user_id=this.user_id;
    return this.http.delete(this.deletefields,obj)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}

