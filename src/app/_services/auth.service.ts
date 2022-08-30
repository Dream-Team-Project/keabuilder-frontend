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

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  loggedIn() {
    return !!sessionStorage.getItem('auth-token');
  }

  forgetPassword(email: string): Observable<any>{
    return this.http.post('/api/reset-password-email', {
      email
    }, httpOptions);
  }

  onupdatePassword(password: string, token: string): Observable<any>{
    return this.http.post('/api/update-password', {
      password,
      token
    }, httpOptions);
  }


}
