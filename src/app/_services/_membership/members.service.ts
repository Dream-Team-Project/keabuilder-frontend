import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private AUTH_API = '/api/member/';
  public loggedInStatus = false;
  memberobj:any={firstname:'',uniqueid:'',email:'',admin:false,domain:''};
  constructor(private http: HttpClient) { }

  memberlogin(email: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }
  
  memberregister(obj:any): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup',obj, httpOptions);
  }

  memberloggedIn() {
    return !!localStorage.getItem('member-auth-token');
  }

  memberforgetPassword(email: string, location:string,type:string): Observable<any>{
    return this.http.post('/api/reset-member-password-email', {
      email,
      location,
      type
    }, httpOptions);
  }

  onupdatememberPassword(password: string, token: string): Observable<any>{
    return this.http.post('/api/update-member-password', {
      password,
      token
    }, httpOptions);
  }

  getActiveUser(obj:any): Observable<any>{
    return this.http.post('/api/getmemberuser',obj);
  }

  duplicatecheck(obj:any): Observable<any>{
    return this.http.post('/api/duplicateemail_username',obj);
  }

  getsinglelesson(obj:any): Observable<any>{
    return this.http.post('/api/singlelesson', obj).pipe(catchError(this.errorHandler));
  };
  getsinglecourse(obj:any): Observable<any>{
    return this.http.post('/api/singlecourse', obj).pipe(catchError(this.errorHandler));
  };

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
}
