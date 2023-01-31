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
  // headers
  allheadersApi = "./api/allheaders";
  getheaderApi = "./api/getheader";
  saveheaderApi = "./api/saveheader";
  updateheaderApi = "./api/updateheader";
  deleteheaderApi = "./api/deleteheader";
  // headers
  // footers
  allfootersApi = "./api/allfooters";
  getfooterApi = "./api/getfooter";
  savefooterApi = "./api/savefooter";
  updatefooterApi = "./api/updatefooter";
  deletefooterApi = "./api/deletefooter";
  // footers
  // forms
  getformApi = "./api/getform";
  formbypathApi = "./api/formbypath";
  allformsApi = "./api/allforms";
  saveformApi = "./api/saveform";
  shortupdateformApi = "./api/shortupdateform";
  updateformApi = "./api/updateform";
  duplicateformApi = './api/duplicateform';
  searchformqueryApi = './api/searchformquery';
  
  deleteformApi = "./api/deleteform";
  // forms
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
  copyfileApi = "./api/copy-file";
  fileExistApi = "./api/file-exist";
  // file
  uuid:any = '';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.uuid = this.tokenStorage.getUser().uniqueid;
  }

  // form

  fetchforms():Observable<any> {
    return this.http.get(this.allformsApi+'/'+this.uuid);
  }

  getform(uniqueid:any):Observable<any> {
    return this.http.get(this.getformApi+'/'+this.uuid+'/'+uniqueid);
  }

  formbypath(path:any):Observable<any> {
    return this.http.get(this.formbypathApi+'/'+this.uuid+'/'+path);
  }

  saveform(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.saveformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  shortupdateform(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.shortupdateformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  searchformquery(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.searchformqueryApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  duplicateform(obj:any):Observable<any> {
    return this.http.post(this.duplicateformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  updateform(obj:any):Observable<any> {
    return this.http.post(this.updateformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  deleteform(id:any):Observable<any> {
    return this.http.delete(this.deleteformApi + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  // form

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

    // headers 

    fetchheaders():Observable<any> {
      return this.http.get(this.allheadersApi+'/'+this.uuid);
    }

    getheader(uniqueid:any):Observable<any> {
      return this.http.get(this.getheaderApi+'/'+this.uuid+'/'+uniqueid);
    }
  
    saveheader(obj:any):Observable<any> {
      obj.user_id = this.uuid;
      return this.http.post(this.saveheaderApi, obj)
      .pipe(catchError(this.errorHandler));
    }
  
    updateheader(obj:any):Observable<any> {
      return this.http.post(this.updateheaderApi, obj)
      .pipe(catchError(this.errorHandler));
    }
  
    deleteheader(id:any):Observable<any> {
      return this.http.delete(this.deleteheaderApi + '/' + id)
      .pipe(catchError(this.errorHandler));
    }
  
    // headers

    
    // footers 

    fetchfooters():Observable<any> {
      return this.http.get(this.allfootersApi+'/'+this.uuid);
    }

    getfooter(uniqueid:any):Observable<any> {
      return this.http.get(this.getfooterApi+'/'+this.uuid+'/'+uniqueid);
    }
  
    savefooter(obj:any):Observable<any> {
      obj.user_id = this.uuid;
      return this.http.post(this.savefooterApi, obj)
      .pipe(catchError(this.errorHandler));
    }
  
    updatefooter(obj:any):Observable<any> {
      return this.http.post(this.updatefooterApi, obj)
      .pipe(catchError(this.errorHandler));
    }
  
    deletefooter(id:any):Observable<any> {
      return this.http.delete(this.deletefooterApi + '/' + id)
      .pipe(catchError(this.errorHandler));
    }
  
    // footers

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
  copyFile(obj:any, folder:string):Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post(this.copyfileApi+'/'+folder, obj)
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
