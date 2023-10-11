import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable} from 'rxjs';


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

  getActiveUser(id:number): Observable<any>{
    return this.http.get('/api/getuser/'+id);
  }

  duplicatecheck(obj:any): Observable<any>{
    return this.http.post('/api/duplicateemail_username',obj);
  }
}
