import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class WistiaService {

  allMediaApi = '/api/wistia/allmedia';
  uploadMediaApi = '/api/wistia/upload';
  deleteMediaApi = '/api/wistia/delete'
  updateMediaApi = '/api/wistia/update'
  projectCreateApi = '/api/projectcreate';
  projectUpdateApi = '/api/projectupdate';

  constructor(private http:HttpClient) { } 

  getAllMedia(project_id:string): Observable<any> {
    return this.http.get(this.allMediaApi + '/' + project_id);
  }

  uploadMedia(file:any): Observable<any> {
    return this.http.post(this.uploadMediaApi, file);
  }

  deleteMedia(hashed_id:any): Observable<any> {
    return this.http.delete(this.deleteMediaApi +'/'+hashed_id);
  }

  updateMedia(media:any): Observable<any> {
    return this.http.put(this.updateMediaApi, media);
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
