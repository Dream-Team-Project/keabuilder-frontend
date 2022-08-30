import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class WistiaService {

  allMediaApi = '/api/allmedia';
  uploadMediaApi = '/api/uploadmedia';
  projectCreateApi = '/api/projectcreate';
  projectUpdateApi = '/api/projectupdate';

  constructor(private http:HttpClient) { } 

  getAllMedia(): Observable<any> {
    return this.http.get(this.allMediaApi);
  }

  uploadMedia(file:any): Observable<any> {
    return this.http.post(this.uploadMediaApi, file);
  }

  projectCreate(req:any): Observable<any> {
    // project create - request: {project_name: username}
    return this.http.post(this.projectCreateApi, req)
  }

  projectUpdate(req:any): Observable<any> {
    // project update - request: {project_id: wistia_project_id, project_name: new_username}
    return this.http.post(this.projectUpdateApi, req)
  }

}
