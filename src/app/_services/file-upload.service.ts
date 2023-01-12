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
  // user
  createuserfolderApi = "./api/create-user";
  createlogofaviApi = "./api/create-user-logofavi";
  // user
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
  // section templates
  alltemplatesApi = "./api/alltemplates";
  savetemplateApi = "./api/savetemplate";
  updatetemplateApi = "./api/updatetemplate";
  deletetemplateApi = "./api/deletetemplate";
  // section templates
  // website
  createwebsitefolderApi = "./api/create-website";
  renamewebsitefolderApi = "./api/rename-website";
  copywebsitefolderApi = "./api/copy-website";
  deletewebsitefolderApi = "./api/delete-website";
  // website
  // web pages
  savePageApi = "./api/savepage";
  getPageApi = "./api/getpage";
  renamePageApi = "./api/renamepage";
  copyPageApi = "./api/copypage";
  createDefaultHomeApi = '/api/default-home';
  updateHomeApi = '/api/updatehome';
  deletePageApi = '/api/deletepage';
  toggleDraftApi = '/api/toggledraft'
  transferPageApi = "./api/transferpage";
  // web pages
  // file
  fileApi = "./api/file";
  fileExistApi = "./api/file-exist";
  // file
  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  // user

  createuserfolder(uuid:any):Observable<any> {
    var obj = {uuid: uuid};
    return this.http.post(this.createuserfolderApi, obj);
  }

  createuserlogofavi(id:any):Observable<any> {
    var obj = {id: id};
    return this.http.post(this.createlogofaviApi, obj);
  }

  // user

  // website

  createwebsitefolder(obj:any):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.createwebsitefolderApi, obj);
  }

  renamewebsitefolder(obj:any):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.renamewebsitefolderApi, obj);
  }

  copywebsitefolder(obj:any):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.copywebsitefolderApi, obj);
  }

  deletewebsitefolder(website_id:string):Observable<any> {
    return this.http.delete(this.deletewebsitefolderApi+'/'+this.uuid+'/'+website_id);
  }

  // website

  // html pages

  createdefaulthome(obj:any):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.createDefaultHomeApi, obj);
  }

  savePage(page:any):Observable<any> {
    page.uuid = this.uuid;
    return this.http.post(this.savePageApi, page);
  }

  getPage(page:any):Observable<any> {
    page.uuid = this.uuid;
    return this.http.post(this.getPageApi, page)
    .pipe(catchError(this.errorHandler));
  }

  deletepage(obj:any):Observable<any> {
    return this.http.delete(this.deletePageApi + '/' + this.uuid + '/' + obj.website_id + '/' + obj.path)
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

  transferPage(obj:any):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.transferPageApi, obj);
  }

  updateHome(obj:any):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.updateHomeApi, obj);
  }

  toggleDraft(obj:any):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.toggleDraftApi, obj)
  }

  // fileExist(path:any):Observable<any> {
  //   var pathobj:Object = {path: path}
  //   return this.http.post(this.fileExistApi, pathobj)
  //   .pipe(catchError(this.errorHandler));
  // }

  // html pages

  // section templates 

  fetchtemplates():Observable<any> {
    return this.http.get(this.alltemplatesApi+'/'+this.uuid);
  }

  savetemplate(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.savetemplateApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  updatetemplate(obj:any):Observable<any> {
    return this.http.post(this.updatetemplateApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  deletetemplate(id:any):Observable<any> {
    return this.http.delete(this.deletetemplateApi + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  // section templates 

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
    return this.http.post(this.updateOnDBApi, imagedata)
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
