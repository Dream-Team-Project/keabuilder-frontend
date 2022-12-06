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
  createuserfolderApi = "./api/create-user-folder";
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
  // images
  uploadImageApi = "./api/uploadimage";
  getAllImgsApi = "./api/getallimgs";
  saveOnDBApi = "./api/saveondb";
  updateOnDBApi = "./api/updateondb";
  deleteFromDB = "./api/deletefromdb";
  copyImgApi = "./api/copyimage"
  deleteimageApi = "./api/deleteimage";
  // images
  // web pages
  createPageApi = "./api/savepage";
  getPageApi = "./api/getpage";
  renamePageApi = "./api/renamepage";
  copyPageApi = "./api/copypage";
  createDefaultHomeApi = '/api/default-home';
  updateHomeApi = '/api/updatehome';
  deletePageApi = '/api/deletepage';
  toggleDraftApi = '/api/toggledraft'
  // web pages
  // file
  fileApi = "./api/file";
  fileExistApi = "./api/file-exist";
  // file
  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
}

  createuserfolder(uuid:any):Observable<any> {
    var obj = {uuid: uuid};
    return this.http.post(this.createuserfolderApi, obj);
  }

  // html pages

  createdefaulthome(uuid:any):Observable<any> {
    var obj = {uuid: uuid};
    return this.http.post(this.createDefaultHomeApi, obj);
  }

  createpage(page:any):Observable<any> {
    page.uuid = this.uuid;
    page.dir = 'pages';
    return this.http.post(this.createPageApi, page);
  }

  createpreview(page:any):Observable<any> {
    page.uuid = this.uuid;
    page.dir = 'previews';
    return this.http.post(this.createPageApi, page);
  }

  getPage(page:any):Observable<any> {
    page.uuid = this.uuid;
    page.dir = 'pages';
    return this.http.post(this.getPageApi, page)
    .pipe(catchError(this.errorHandler));
  }

  getPreview(page:any):Observable<any> {
    page.uuid = this.uuid;
    page.dir = 'previews';
    return this.http.post(this.getPageApi, page)
    .pipe(catchError(this.errorHandler));
  }

  deletepage(path:any):Observable<any> {
    return this.http.delete(this.deletePageApi + '/' + this.uuid + '/' + path)
    .pipe(catchError(this.errorHandler));
  }

  renamepage(path:any):Observable<any> {
    path.uuid = this.uuid;
    return this.http.post(this.renamePageApi, path);
  }

  copypage(path:any):Observable<any> {
    path.uuid = this.uuid;
    return this.http.post(this.copyPageApi, path);
  }

  updateHome(obj:any):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.updateHomeApi, obj);
  }

  toggleDraft(value:any):Observable<any> {
    var obj = {uuid: this.uuid, status: value}
    return this.http.post(this.toggleDraftApi, obj)
  }

  // fileExist(path:any):Observable<any> {
  //   var pathobj:Object = {path: path}
  //   return this.http.post(this.fileExistApi, pathobj)
  //   .pipe(catchError(this.errorHandler));
  // }

  // html pages

  // files

  fetchFiles(folder:string):Observable<any> {
    return this.http.get(this.fileApi+'s/'+this.uuid+'/'+folder)
    .pipe(catchError(this.errorHandler));
  }
  fetchFile(id:any, folder:string):Observable<any> {
    return this.http.get(this.fileApi+'/'+this.uuid+'/'+id+'/'+folder)
    .pipe(catchError(this.errorHandler));
  }
  saveFile(obj:any, folder:string):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.fileApi+'/'+folder, obj)
    .pipe(catchError(this.errorHandler));
  }
  deleteFile(id:any, folder:string):Observable<any> {
    return this.http.delete(this.fileApi+'/'+this.uuid+'/'+id+'/'+folder)
    .pipe(catchError(this.errorHandler));
  }

  // files

  // image 

  // DB

  getAllImgs():Observable<any> {
    return this.http.get(this.getAllImgsApi+'/'+this.uuid)
    .pipe(catchError(this.errorHandler));
  }

  saveondb(imagedata: any):Observable<any> {
    return this.http.post(this.saveOnDBApi+'/'+this.uuid, imagedata)
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

  // DB

  // folder

  upload(file: any):Observable<any> {
    // Create form data
    const formData = new FormData();
    formData.append('uploadedImage', file, file.name);
    // Make http post request over api
    // with formData as req
    return this.http.post(this.uploadImageApi, formData)
    .pipe(catchError(this.errorHandler));
  }

  copyimage(imgdata:any):Observable<any> {
    return this.http.post(this.copyImgApi, imgdata);
  }

  deleteimage(path:any) {
    return this.http.delete(this.deleteimageApi + '/' + path)
    .pipe(catchError(this.errorHandler));
  }

  validateimg(path:any):Observable<any> {
    return this.http.post("/api/checkvalidimg", {
      path,
    }, httpOptions);
  }

  // folder

  // image 

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

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}
