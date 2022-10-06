import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  uniqueuserid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uniqueuserid = this.tokenStorage.getUser().uniqueid;
    // console.log(this.tokenStorage.getUser());
  }

  getAllrevenue(): Observable<any> {
    return this.http.get('./api/getallrevenue/'+this.uniqueuserid);
  }


}
