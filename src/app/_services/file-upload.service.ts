import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
providedIn: 'root'
})

export class FileUploadService {
  // API url
  uploadApi = "./api/uploadfile";
  getAllImgsApi = "./api/getallimgs";
  saveOnDBApi = "./api/saveondb";
  updateOnDBApi = "./api/updateondb";
  deleteFromDB = "./api/deletefromdb";
  deleteFile = "./api/deletefile";
  createPageApi = "./api/savepage";
  getFileApi = "./api/getpage";
    
  constructor(private http:HttpClient) { }

  createpage(page:any):Observable<any> {
    return this.http.post(this.createPageApi, page);
  }

  getfile(page:any):Observable<any> {
    return this.http.post(this.getFileApi, page)
    .pipe(catchError(this.errorHandler));
  }

  // Returns an observable
  upload(file: any):Observable<any> {
    // Create form data
    const formData = new FormData();
    formData.append('uploadedImage', file, file.name);
    // Make http post request over api
    // with formData as req
    return this.http.post(this.uploadApi, formData)
    .pipe(catchError(this.errorHandler));
  }

  getAllImgs():Observable<any> {
    return this.http.get(this.getAllImgsApi)
    .pipe(catchError(this.errorHandler));
  }

  saveondb(imagedata: any):Observable<any> {
    return this.http.post(this.saveOnDBApi, imagedata)
    .pipe(catchError(this.errorHandler));
  }

  updateondb(imagedata: any):Observable<any> {
    return this.http.put(this.updateOnDBApi, imagedata)
    .pipe(catchError(this.errorHandler));
  }

  deletefromdb(id:any) {
    return this.http.delete(this.deleteFromDB+'/'+id)
    .pipe(catchError(this.errorHandler));
  }

  deletefile(path:any) {
    return this.http.delete(this.deleteFile + '/' + path)
    .pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

  validateimg(path:any):Observable<any> {
    return this.http.post("/api/checkvalidimg", {
      path,
    }, httpOptions);
  }


}
