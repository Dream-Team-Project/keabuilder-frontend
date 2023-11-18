import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ScrumboardService {

  user_id:any;
  createapiUrl = `/api/createBoard`;
  getallapiUrl = `/api/getAllBoards/`;
  deleteapiUrl = `/api/deleteBoard`;
  updateapiUrl = `/api/updateBoardDetails`;
  singleapiUrl = `/api/getBoardDetails`;
  getlistsapiUrl = `/api/getAllBoardList`;
  createlistapiUrl = `/api/createBoardList`;
  updatelistapiUrl = `/api/updateListItemAfterTransfer`;
  addlistapiUrl = `/api/addListItem`;
  deletelistapiUrl = `/api/deleteList`;
  updatetitleapiUrl = `/api/updateListTitle`;
  updateitemapiUrl = `/api/updateListItem`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.user_id = this.tokenStorage.getUser().uniqueid;
  }

  createBoard(data:any):Observable<any> {
    data.user_id=this.user_id;
    return this.http.post(this.createapiUrl, data);
  }

  getAllBoards(){
    return this.http.get(this.getallapiUrl+this.user_id);
  }

  deleteBoard(data: any){
    data.user_id=this.user_id;
    return this.http.post(this.deleteapiUrl, data);
  }

  updateBoardDetails(data: any){
    data.user_id=this.user_id;
    return this.http.post(this.updateapiUrl, data);
  }

  getBoardDetails(data: any){
    data.user_id=this.user_id;
    return this.http.post(this.singleapiUrl, data);
  }



  getBoardLists(data: any){
    data.user_id=this.user_id;
    return this.http.post(this.getlistsapiUrl, data);
  }

  createBoardList(data: any){
    data.user_id=this.user_id;
    return this.http.post(this.createlistapiUrl, data);
  }

  updateListItemAfterTransfer(data:any){
    data.user_id=this.user_id;
    return this.http.post(this.updatelistapiUrl, data);
  }

  addListItem(data: any){
    data.user_id=this.user_id;
    return this.http.post(this.addlistapiUrl, data);
  }

  deleteList(data: any){
    data.user_id=this.user_id;
    return this.http.post(this.deleteapiUrl, data);
  }

  updateListTitle(data: any){
    data.user_id=this.user_id;
    return this.http.post(this.updatetitleapiUrl, data);
  }

  updateListItem(data: any){
    data.user_id=this.user_id;
    return this.http.post(this.updateitemapiUrl, data);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }
}
