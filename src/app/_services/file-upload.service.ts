import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
providedIn: 'root'
})

export class FileUploadService {
  // API url
  // document
  getAllDocumentsApi = "./api/getalldocuments";
  uploadDocumentApi = "./api/uploaddocument";
  deleteDocumentApi = "./api/deletedocument";
  renameDocumentApi = "./api/renamedocument";
  uploadDocumentPath = '/assets/uploads/documents/';
  checkDocumentApi = '/api/checkdocuments';
  // document
  // media
  uploadMediaApi = "./api/uploadmedia";
  uploadMediaPath = '/assets/uploads/medias/';
  // media
  uploadApi = "./api/uploadfile";
  getAllImgsApi = "./api/getallimgs";
  saveOnDBApi = "./api/saveondb";
  updateOnDBApi = "./api/updateondb";
  deleteFromDB = "./api/deletefromdb";
  copyImgApi = "./api/copyimage"
  deleteimageApi = "./api/deleteimage";
  createPageApi = "./api/savepage";
  renamePageApi = "./api/renamepage";
  copyPageApi = "./api/copypage";
  getFileApi = "./api/getpage";
  createHomeApi = '/api/createhome';
  deletePageApi = '/api/deletepage';
  uniqueuserid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uniqueuserid = this.tokenStorage.getUser().uniqueid;
}
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

  copypage(pathobj:any):Observable<any> {
    return this.http.post(this.copyPageApi, pathobj);
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

  getAllDocuments(folder:string):Observable<any> {
    return this.http.get(this.getAllDocumentsApi+'/'+folder)
    .pipe(catchError(this.errorHandler));
  }

  uploadDocument(file: any, folder:string):Observable<any> {
    const formData = new FormData();
    formData.append('uploadedDocument', file, file.name);
    return this.http.post(this.uploadDocumentApi + '/' + folder, formData)
    .pipe(catchError(this.errorHandler));
  }

  deleteDocument(path:string, folder:string):Observable<any> {
    return this.http.delete(this.deleteDocumentApi + '/' + path + '/' + folder)
    .pipe(catchError(this.errorHandler));
  }

  renameDocument(pathObj:any, folder:string):Observable<any> {
    return this.http.post(this.renameDocumentApi + '/' + folder, pathObj)
    .pipe(catchError(this.errorHandler));
  }

  checkDocument(path:string, folder:string):Observable<any> {
    return this.http.get(this.checkDocumentApi + '/' + path + '/' + folder)
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
    return this.http.get(this.getAllImgsApi+'/'+this.uniqueuserid)
    .pipe(catchError(this.errorHandler));
  }

  saveondb(imagedata: any):Observable<any> {
    return this.http.post(this.saveOnDBApi+'/'+this.uniqueuserid, imagedata)
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

  deleteimage(path:any) {
    return this.http.delete(this.deleteimageApi + '/' + path)
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
