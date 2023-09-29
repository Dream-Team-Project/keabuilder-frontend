import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private AUTH_API = '/api/member/';
  public loggedInStatus = false;

  constructor(private http: HttpClient) { }

  memberlogin(username: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin', {
      username,
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
    return this.http.post('/api/member-reset-password-email', {
      email,
      location,
      type
    }, httpOptions);
  }

  onupdatePassword(password: string, token: string): Observable<any>{
    return this.http.post('/api/update-password', {
      password,
      token
    }, httpOptions);
  }

  getActiveUser(id:number): Observable<any>{
    return this.http.get('/api/getuser/'+id);
  }

  onupdateprojectid(id: string, wistiaid: string): Observable<any>{
    return this.http.post(this.AUTH_API + 'wistiaprojectidupdate', {
      id,
      wistiaid
    }, httpOptions);
  }
  duplicatecheck(obj:any): Observable<any>{
    return this.http.post('/api/duplicateemail_username',obj);
  }
}
