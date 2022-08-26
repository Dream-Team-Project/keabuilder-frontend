import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class WistiaService {

  allMediaApi = '/api/allmedia';
  uploadMediaApi = '/api/uploadmedia';

  constructor(private http:HttpClient) { } 

  getAllMedia(): Observable<any> {
    return this.http.get(this.allMediaApi);
  }

  uploadMedia(file:any): Observable<any> {
    return this.http.post(this.uploadMediaApi, file);
  }

}
