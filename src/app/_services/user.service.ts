import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'api/allusers/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uuid:any = '';
  getUsersDetailsApi = '/api/getUsersDetailsdata/';
  updateuserdetailsApi = '/api/updateUsersDetailsdata/';
  user = {
    name: '',
    email: ''
  };
  prevPath = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
    // console.log(this.tokenStorage.getUser());
  }

  getUsers(): Observable<any> {
    return this.http.get(API_URL);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUsersDetails(): Observable<any> {
    return this.http.post(this.getUsersDetailsApi+this.uuid,{});
  }

  updateuserdetails(data: any): Observable<any> {
    return this.http.post(this.updateuserdetailsApi+this.uuid, data);
  }

  

  

}
