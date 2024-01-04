import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_API = '/api/auth/';
  private TOKEN_KEY = environment.tokenKey;
  public loggedInStatus = false;
  
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  googlelogin(email: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'googlesignin', {
      email
    }, httpOptions);
  }

  register(obj:any): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup',obj, httpOptions);
  }

  loggedIn() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  forgetPassword(email: string, location:string,type:string): Observable<any>{
    return this.http.post('/api/reset-password-email', {
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
