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
  // document
  getAllDocumentsApi = "./api/getalldocuments"
  uploadDocumentApi = "./api/uploaddocument"
  deleteDocumentApi = "./api/deletedocument"
  uploadDocumentPath = '/assets/uploads/documents/';
  // document
  // media
  uploadMediaApi = "./api/uploadmedia"
  uploadMediaPath = '/assets/uploads/medias/';
  // media
  uploadApi = "./api/uploadfile";
  getAllImgsApi = "./api/getallimgs";
  saveOnDBApi = "./api/saveondb";
  updateOnDBApi = "./api/updateondb";
  deleteFromDB = "./api/deletefromdb";
  copyImgApi = "./api/copyimage"
  deleteFileApi = "./api/deletefile";
  createPageApi = "./api/savepage";
  renamePageApi = "./api/renamepage";
  copyPageApi = "./api/copypage";
  getFileApi = "./api/getpage";
  createHomeApi = '/api/createhome';
  deletePageApi = '/api/deletepage';

  constructor(private http:HttpClient) { }

  deletepage(path:any):Observable<any> {
    return this.http.delete(this.deletePageApi + '/' + path)
    .pipe(catchError(this.errorHandler));
  }

  createhome(path:any):Observable<any> {
    return this.http.post(this.createHomeApi, path);
  }

  createpage(path:any):Observable<any> {
    return this.http.post(this.createPageApi, path);
  }

  renamepage(path:any):Observable<any> {
    return this.http.post(this.renamePageApi, path);
  }

  copyimage(imgname:any):Observable<any> {
    return this.http.post(this.copyImgApi, imgname);
  }

  copypage(pagename:any):Observable<any> {
    return this.http.post(this.copyPageApi, pagename);
  }

  getfile(page:any):Observable<any> {
    return this.http.post(this.getFileApi, page)
    .pipe(catchError(this.errorHandler));
  }

  // media

  uploadMedia(file: any):Observable<any> {
    const formData = new FormData();
    formData.append('uploadedMedia', file, file.name);
    return this.http.post(this.uploadMediaApi, formData)
    .pipe(catchError(this.errorHandler));
  }

  // media

  // document

  getAllDocuments():Observable<any> {
    return this.http.get(this.getAllDocumentsApi)
    .pipe(catchError(this.errorHandler));
  }

  uploadDocument(file: any):Observable<any> {
    const formData = new FormData();
    formData.append('uploadedDocument', file, file.name);
    return this.http.post(this.uploadDocumentApi, formData)
    .pipe(catchError(this.errorHandler));
  }

  deleteDocument(path:any):Observable<any> {
    return this.http.delete(this.deleteDocumentApi + '/' + path)
    .pipe(catchError(this.errorHandler));
  }

  // document

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
    return this.http.delete(this.deleteFileApi + '/' + path)
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
