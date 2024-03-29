import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { TokenStorageService } from './token-storage.service';
// import { FormService } from './_crm/form.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
providedIn: 'root'
})

export class FileUploadService {
  // API url
  // user
  createuserfolderApi = "/api/create-user";
  createlogofaviApi = "/api/create-user-logofavi";
  // user
  // forms
  searchformqueryApi = '/api/searchformquery';
  getformApi = "/api/getform";
  fetchformApi = "/api/fetchform";
  allformsApi = "/api/allforms";
  saveformApi = "/api/saveform";
  updateformApi = "/api/updateform";
  duplicateformApi = '/api/duplicateform';
  deleteformApi = "/api/deleteform";
  // forms
  // document
  getAllDocumentsApi = "/api/getalldocuments";
  uploadmembershipDocumentApi = "/api/uploadmembershipdocument";
  uploadDocumentApi = "/api/uploaddocument";
  deleteDocumentApi = "/api/deletedocument";
  deleteLessonDocumentApi = "/api/deletelessondocument";
  renameDocumentApi = "/api/renamedocument";
  uploadDocumentPath = '/assets/uploads/documents/';
  uploadmembershipDocumentPath = '/assets/uploads/medias/';
  checkDocumentApi = '/api/checkdocuments';
  downloaduploadfileApi = '/api/downloaduploadfileformat';
  // document
  // media
  uploadMediaApi = "/api/uploadmedia";
  uploadMediaPath = '/assets/uploads/medias/';
  // media
  // images
  uploadScreenShotApi = "/api/uploadscreenshot";
  uploadImageApi = "/api/uploadimage";
  uploadfaviconApi = "/api/uploadfavicon_logo";
  getAllImgsApi = "/api/getallimgs";
  saveOnDBApi = "/api/saveondb";
  updateOnDBApi = "/api/updateondb";
  deleteFromDB = "/api/deletefromdb";
  copyImgApi = "/api/copyimage"
  deleteimageApi = "/api/deleteimage";
  // images

  // page templates
  savetemplatehtmlApi = "/api/savetemplatehtml"
  allpagetemplatesApi = "/api/allpagetemplates";
  alldefaulttemplatesApi = "/api/alldefaulttemplates";
  savepagetemplateApi = "/api/savepagetemplate";
  updatepagetemplateApi = "/api/updatepagetemplate";
  deletepagetemplateApi = "/api/deletepagetemplate";
  copytemplatepageApi =  "/api/copyTemplateToPage"; 
  previewtemplateApi='/api/previewtemplate';
  // page templates

  // section templates
  allsectemplatesApi = "/api/allsectiontemplates";
  savesectemplateApi = "/api/savesectiontemplate";
  updatesectemplateApi = "/api/updatesectiontemplate";
  deletesectemplateApi = "/api/deletesectiontemplate";
  // section templates
  // headers
  searchheadersApi = '/api/searchheaders';
  allheadersApi = "/api/allheaders";
  getheaderApi = "/api/singleheader";
  saveheaderApi = "/api/saveheader";
  updateheaderApi = "/api/updateheader";
  deleteheaderApi = "/api/deleteheader";
  // headers
  // footers
  searchfootersApi = '/api/searchfooters';
  allfootersApi = "/api/allfooters";
  getfooterApi = "/api/getfooter";
  savefooterApi = "/api/savefooter";
  updatefooterApi = "/api/updatefooter";
  deletefooterApi = "/api/deletefooter";
  // footers
  // website
  createwebsitefolderApi = "/api/create-website";
  renamewebsitefolderApi = "/api/rename-website";
  copywebsitefolderApi = "/api/copy-website";
  deletewebsitefolderApi = "/api/delete-website";
  // website
  // web pages
  savePageApi = "/api/savepage";
  getPageApi = "/api/getpage";
  renamePageApi = "/api/renamepage";
  copyPageApi = "/api/copypage";
  createDefaultHomeApi = '/api/default-home';
  updateHomeApi = '/api/updatehome';
  deletePageApi = '/api/deletepage';
  toggleDraftApi = '/api/toggledraft'
  transferPageApi = "/api/transferpage";
  // web pages
  // file
  fileApi = "/api/file";
  copyfileApi = "/api/copy-file";
  fileExistApi = "/api/file-exist";
  // file
copyfolderdocumentsApi = "/api/copyfolderdocuments";
deletefolderdocumentsApi = "/api/deletefolderdocuments";

  uuid:any = '';

  constructor(private http: HttpClient, 
    private tokenStorage: TokenStorageService, 
    // private _form: FormService
    ) {
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

  // forms

  fetchforms():Observable<any> {
    return this.http.get(this.allformsApi+'/'+this.uuid);
  }

  getpageforms(obj :any): Observable<any> {
    obj.uuid = this.uuid;
    return this.http.post('/api/getpageforms', obj)
    .pipe(catchError(this.errorHandler));
  }

  fetchform(obj:any):Observable<any> {
    return this.http.get(this.fetchformApi+'/'+obj.form_id);
  }

  getform(uniqueid:any):Observable<any> {
    return this.http.get(this.getformApi+'/'+this.uuid+'/'+uniqueid);
  }

  saveform(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.saveformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  searchformquery(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.searchformqueryApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  duplicateform(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.duplicateformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  updateform(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.updateformApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  deleteform(id:any):Observable<any> {
    return this.http.delete(this.deleteformApi+'/'+id)
    .pipe(catchError(this.errorHandler));
  }

  deleteselectedforms(forms:any): Observable<any>{
    forms.user_id=this.uuid;
    return this.http.post('/api/deleteselectedforms',forms)
    .pipe(catchError(this.errorHandler));
  }
  
  // forms

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
  copyTemplateToPage(page:any):Observable<any> {
    page.uuid = this.uuid;
    return this.http.post(this.copytemplatepageApi, page);
  }

  getPage(page:any):Observable<any> {
    page.uuid = this.uuid;
    return this.http.post(this.getPageApi, page)
    .pipe(catchError(this.errorHandler));
  }

  getPreview(page:any):Observable<any> {
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

    searchheaders(obj:any):Observable<any> {
      obj.user_id = this.uuid;
      return this.http.post(this.searchheadersApi, obj)
      .pipe(catchError(this.errorHandler));
    }

    fetchheaders():Observable<any> {
      return this.http.get(this.allheadersApi+'/'+this.uuid).pipe(catchError(this.errorHandler));
    }
    getpageheaders(obj :any): Observable<any> {
      obj.user_id = this.uuid;
      return this.http.post('/api/getpageheaders', obj);
    }

    getheader(uniqueid:any):Observable<any> {
      return this.http.get(this.getheaderApi+'/'+this.uuid+'/'+uniqueid).pipe(catchError(this.errorHandler));
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

    searchfooters(obj:any):Observable<any> {
      obj.user_id = this.uuid;
      return this.http.post(this.searchfootersApi, obj)
      .pipe(catchError(this.errorHandler));
    }

    fetchfooters():Observable<any> {
      return this.http.get(this.allfootersApi+'/'+this.uuid);
    }
    getpagefooters(obj :any): Observable<any> {
      obj.user_id = this.uuid;
      return this.http.post('/api/getpagefooters', obj);
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

  // page templates 

  savetemplatehtml(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.savetemplatehtmlApi, obj)
    .pipe(catchError(this.errorHandler));   
  }

  fetchpagetemplates():Observable<any> {
    return this.http.get(this.allpagetemplatesApi+'/'+this.uuid);
  }
  fetchdefaulttemplates(obj:any):Observable<any> {
    return this.http.post(this.alldefaulttemplatesApi,obj);
  }

  savepagetemplate(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.savepagetemplateApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  updatepagetemplate(obj:any):Observable<any> {
    return this.http.post(this.updatepagetemplateApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  deletepagetemplate(id:any):Observable<any> {
    return this.http.delete(this.deletepagetemplateApi + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  previewpagetemplate(obj:any):Observable<any> {
    return this.http.post(this.previewtemplateApi,obj)
    .pipe(catchError(this.errorHandler));
  }

  searchquerysavedtemplates(data:any):Observable<any> {
    data.user_id=this.uuid;
    return this.http.post("/api/searchquerysavedtemplates",data).pipe(catchError(this.errorHandler));
  }

  // page templates 

  // section templates 

  fetchsectiontemplates():Observable<any> {
    return this.http.get(this.allsectemplatesApi+'/'+this.uuid);
  }

  savesectiontemplate(obj:any):Observable<any> {
    obj.user_id = this.uuid;
    return this.http.post(this.savesectemplateApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  updatesectiontemplate(obj:any):Observable<any> {
    return this.http.post(this.updatesectemplateApi, obj)
    .pipe(catchError(this.errorHandler));
  }

  deletesectiontemplate(id:any):Observable<any> {
    return this.http.delete(this.deletesectemplateApi + '/' + id)
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
  uploadfavicon(file: any):Observable<any> {
    // Create form data
    const formData = new FormData();
    formData.append('uploadedImage', file, file.name);
    // Make http post request over api
    // with formData as req
    return this.http.post(this.uploadfaviconApi, formData)
    .pipe(catchError(this.errorHandler));
  }

  uploadScreenshot(file: any):Observable<any> {
    // Create form data
    const formData = new FormData();
    formData.append('uploadedScreenshot', file, file.name);
    // Make http post request over api
    // with formData as req
    return this.http.post(this.uploadScreenShotApi, formData)
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

  getAllDocuments1(folder1:string):Observable<any> {
    return this.http.get(this.getAllDocumentsApi+'/'+this.uuid+'/'+folder1)
    .pipe(catchError(this.errorHandler));
  }
  getAllDocuments(folder:string):Observable<any> {
    return this.http.get(this.getAllDocumentsApi+'/'+folder)
    .pipe(catchError(this.errorHandler));
  }
  
  getuploadfileformat():Observable<any> {
    return this.http.get(this.downloaduploadfileApi,{responseType:'blob'})
    .pipe(catchError(this.errorHandler));
  }
  
  uploadDocument(file: any, folder:string,folder1:string):Observable<any> {
    const formData = new FormData();
    formData.append('uploadedDocument', file, file.name);
    return this.http.post(this.uploadmembershipDocumentApi + '/' + folder+ '/' + folder1, formData)
    .pipe(catchError(this.errorHandler));
  }
  uploadcontactsDocument(file: any, folder:string):Observable<any> {
    const formData = new FormData();
    formData.append('uploadedDocument', file, file.filename);
    return this.http.post(this.uploadDocumentApi +'/' + folder, formData)
    .pipe(catchError(this.errorHandler));
  }

  deleteDocument(path:string, folder:string):Observable<any> {
    return this.http.delete(this.deleteDocumentApi + '/' + path + '/' + folder)
    .pipe(catchError(this.errorHandler));
  }
  deleteLessonDocument(path:string, folder:string,folder1:string):Observable<any> {
    return this.http.delete(this.deleteLessonDocumentApi + '/' + path + '/' + folder+ '/' + folder1)
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

  copyfolderDocuments(obj:any){
    return this.http.post(this.copyfolderdocumentsApi, obj)
    .pipe(catchError(this.errorHandler)); 
  }
  deletedocumentfolder(obj:any) {
    obj.user_id=this.uuid;
    return this.http.post(this.deletefolderdocumentsApi, obj)
    .pipe(catchError(this.errorHandler)); 
  }

  // document
  
  // error handler

  errorHandler(error: HttpErrorResponse) {
    return throwError(()=>error.message || "Sever Error")
  }

}
