import { Injectable } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  user_id:any = '';
  allemails = '/api/allemails';
  singleemail = '/api/singleemail';
  addemails = '/api/addemail';
  updateemails = '/api/updateemail';
  duplicateemails = '/api/duplicateemail';
  deleteemails = '/api/deleteemail';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.user_id = this.tokenStorage.getUser().uniqueid;
  }

  fetchemails(){
    return this.http.get(this.allemails+'/'+this.user_id)
    .pipe(catchError(this.errorHandler));
  }
  getpageemails(obj :any): Observable<any> {
    obj.uuid = this.user_id;
    return this.http.post('/api/getpageemails', obj)
    .pipe(catchError(this.errorHandler));
  }
  getsingleemail(obj:any){
    obj.user_id=obj.user_id ? obj.user_id : this.user_id;
    return this.http.get(this.singleemail+'/'+obj.user_id+'/'+obj.uniqueid)
    .pipe(catchError(this.errorHandler));
  }

  addemail(obj:any) {
    obj.user_id=this.user_id;
    return this.http.post(this.addemails, obj)
    .pipe(catchError(this.errorHandler));    
  }

  updateemail(obj:any){
    obj.user_id = this.user_id;
    return this.http.post(this.updateemails,obj)
    .pipe(catchError(this.errorHandler));
  }
  duplicateemail(obj:any) {
    obj.user_id=this.user_id;
    return this.http.post(this.duplicateemails, obj)
    .pipe(catchError(this.errorHandler));    
  }

  deleteemail(id:any){
    return this.http.delete(this.deleteemails+'/'+id)
    .pipe(catchError(this.errorHandler));
  }
  
  deleteselectedemails(emails:any): Observable<any>{
    emails.user_id=this.user_id;
    return this.http.post('/api/deleteselectedemails',emails)
    .pipe(catchError(this.errorHandler));
  }

  searchemails(obj:any){
    obj.user_id = this.user_id;
    return this.http.post('/api/searchemailquery',obj)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}