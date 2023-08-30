import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderformService {
  user_id:any = '';
  allorderforms = './api/allorderforms';
  allstripeproducts = './api/allstripeproducts';
  singleorder = './api/singleorderform';
  addorderforms = './api/addorderform';
  updateorderforms = './api/updateorderform';
  duplicateproducts = './api/duplicateproduct';
  deleteproducts = './api/deleteproduct';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.user_id = this.tokenStorage.getUser().uniqueid;
  }

  fetchorderforms(){
    return this.http.get(this.allorderforms+'/'+this.user_id)
    .pipe(catchError(this.errorHandler));
  }
  fetchstripeproducts(){
    return this.http.get(this.allstripeproducts+'/'+this.user_id)
    .pipe(catchError(this.errorHandler));
  }
  singleorderform(uniqueid:any){
    return this.http.get(this.singleorder+'/'+this.user_id+'/'+uniqueid)
    .pipe(catchError(this.errorHandler));
  }

  addorderform(obj:any) {
    obj.user_id=this.user_id;
    return this.http.post(this.addorderforms, obj)
    .pipe(catchError(this.errorHandler));    
  }

  updateorderform(obj:any){
    obj.user_id = this.user_id;
    return this.http.post(this.updateorderforms,obj)
    .pipe(catchError(this.errorHandler));
  }

  duplicateproduct(obj:any){
    obj.user_id = this.user_id;
    return this.http.post(this.duplicateproducts,obj)
    .pipe(catchError(this.errorHandler));
  }
  deleteproduct(id:any){
    return this.http.delete(this.deleteproducts+'/'+id)
    .pipe(catchError(this.errorHandler));
  }

  searchorderforms(obj:any){
    obj.user_id = this.user_id;
    return this.http.post('/api/searchorderforms',obj)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}

