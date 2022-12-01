import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AUTH_API = '/api/auth/';
  public loggedInStatus = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, firstname:string, lastname:string, company:string, email:string, phone:string, password: string, subdomain:string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup', {
      username,
      firstname,
      lastname,
      company,
      email,
      phone,
      password,
      subdomain
    }, httpOptions);
  }

  loggedIn() {
    return !!localStorage.getItem('auth-token');
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

  oncreatesubdomain(domain: any, uniqueid: any): Observable<any>{
    return this.http.get('https://keabuilder.com/crd.php?domain='+domain+'&uniqueid='+uniqueid);
  }

  


}
