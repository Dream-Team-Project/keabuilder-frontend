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
  uploadApi = "./api/uploadfile";
  getAllImgsApi = "./api/getallimgs";
  saveOnDBApi = "./api/saveondb";
  updateOnDBApi = "./api/updateondb";
  deleteFromDB = "./api/deletefromdb";
  copyImgApi = "./api/copyimage"
  deleteimageApi = "./api/deleteimage";
  // web pages
  createPageApi = "./api/savepage";
  getPageApi = "./api/getpage";
  renamePageApi = "./api/renamepage";
  copyPageApi = "./api/copypage";
  createDefaultHomeApi = '/api/default-home';
  updateHomeApi = '/api/updatehome';
  deletePageApi = '/api/deletepage';
  // web pages
  // file
  fileExistApi = "./api/file-exist";
  // file
  // menu
  getMenusApi = "./api/getmenus";
  saveMenuApi = "./api/savemenu";
  deleteMenuApi = "./api/deletemenu"
  // menu
  // tracking
  saveHeaderApi = "./api/saveheader";
  saveFooterApi = "./api/savefooter";
  getHeaderApi = "./api/getheader";
  getFooterApi = "./api/getfooter";
  // tracking
  uniqueuserid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uniqueuserid = this.tokenStorage.getUser().uniqueid;
}

  createuserfolder(uniqueuserid:any):Observable<any> {
    var obj = {uniqueuserid: uniqueuserid};
    return this.http.post(this.createuserfolderApi, obj);
  }

  // html pages

  createdefaulthome(uniqueuserid:any):Observable<any> {
    var obj = {uniqueuserid: uniqueuserid};
    return this.http.post(this.createDefaultHomeApi, obj);
  }

  createpage(path:any):Observable<any> {
    path.uniqueuserid = this.uniqueuserid;
    return this.http.post(this.createPageApi, path);
  }

  getPage(page:any):Observable<any> {
    page.uniqueuserid = this.uniqueuserid;
    return this.http.post(this.getPageApi, page)
    .pipe(catchError(this.errorHandler));
  }

  deletepage(path:any):Observable<any> {
    return this.http.delete(this.deletePageApi + '/' + this.uniqueuserid + '/' + path)
    .pipe(catchError(this.errorHandler));
  }

  renamepage(path:any):Observable<any> {
    path.uniqueuserid = this.uniqueuserid;
    return this.http.post(this.renamePageApi, path);
  }

  copypage(path:any):Observable<any> {
    path.uniqueuserid = this.uniqueuserid;
    return this.http.post(this.copyPageApi, path);
  }

  updateHome(obj:any):Observable<any> {
    obj.uniqueuserid = this.uniqueuserid;
    return this.http.post(this.updateHomeApi, obj);
  }

  fileExist(path:any):Observable<any> {
    var pathobj:Object = {path: path}
    return this.http.post(this.fileExistApi, pathobj)
    .pipe(catchError(this.errorHandler));
  }

  // html pages

  // menu

  deleteMenu(obj:any):Observable<any> {
    obj.uniqueuserid = this.uniqueuserid;
    return this.http.post(this.deleteMenuApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  getMenus():Observable<any> {
    var obj = {uniqueuserid: this.uniqueuserid};
    return this.http.post(this.getMenusApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  saveMenu(obj:any):Observable<any> {
    obj.uniqueuserid = this.uniqueuserid;
    console.log(obj);
    return this.http.post(this.saveMenuApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  // menu

  // tracking/header/footer

  saveHeader(header:any):Observable<any> {
    return this.http.post(this.saveHeaderApi, header)
    .pipe(catchError(this.errorHandler));
  }

  saveFooter(footer:any):Observable<any> {
    return this.http.post(this.saveFooterApi, footer)
    .pipe(catchError(this.errorHandler));
  }

  getHeader(header:any):Observable<any> {
    return this.http.post(this.getHeaderApi, header)
    .pipe(catchError(this.errorHandler));
  }

  getFooter(footer:any):Observable<any> {
    return this.http.post(this.getFooterApi, footer)
    .pipe(catchError(this.errorHandler));
  }

  gettrackingHTML(data:any):Observable<any> {
    return data;
  }
  // tracking/header/footer

  // image 

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

  copyimage(imgname:any):Observable<any> {
    return this.http.post(this.copyImgApi, imgname);
  }

  deletefromdb(id:any) {
    return this.http.delete(this.deleteFromDB+'/'+id)
    .pipe(catchError(this.errorHandler));
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
