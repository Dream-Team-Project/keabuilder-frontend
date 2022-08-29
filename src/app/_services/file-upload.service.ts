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
  // audio
  uploadAudioApi = "./api/uploadaudiofile"
  allaudiofilesApi = './api/allaudiofiles';
  deleteAudioApi = "./api/deleteaudio";
  uploadAudioPath = '/assets/uploads/audios/';
  // audio
  // video
  uploadVideoApi = "./api/uploadvideofile"
  allvideofilesApi = './api/allvideofiles';
  deleteVideoApi = "./api/deletevideo";
  uploadVideoPath = '/assets/uploads/videos/';
  // video
  // download
  uploadDownloadApi = "./api/uploaddownloadfile"
  alldownloadfilesApi = './api/alldownloadfiles';
  deleteDownloadApi = "./api/deletedownload";
  uploadDownloadPath = '/assets/uploads/downloads/';
// download
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

  // audio

  uploadaudio(file: any):Observable<any> {
    // Create form data
    const formData = new FormData();
    formData.append('uploadedAudio', file, file.name);
    // Make http post request over api
    // with formData as req
    return this.http.post(this.uploadAudioApi, formData)
    .pipe(catchError(this.errorHandler));
  }

  allaudiofiles() {
    return this.http.get(this.allaudiofilesApi);
  }

  deleteaudio(path:any) {
    return this.http.delete(this.deleteAudioApi + '/' + path)
    .pipe(catchError(this.errorHandler));
  }

  // audio

  // video

  uploadvideo(file: any):Observable<any> {
    // Create form data
    const formData = new FormData();
    formData.append('uploadedVideo', file, file.name);
    // Make http post request over api
    // with formData as req
    return this.http.post(this.uploadVideoApi, formData)
    .pipe(catchError(this.errorHandler));
  }

  allvideofiles() {
    return this.http.get(this.allvideofilesApi);
  }

  deletevideo(path:any) {
    return this.http.delete(this.deleteVideoApi + '/' + path)
    .pipe(catchError(this.errorHandler));
  }

  // video

  // download

  uploaddownload(file: any):Observable<any> {
    // Create form data
    const formData = new FormData();
    formData.append('uploadedDownload', file, file.name);
    // Make http post request over api
    // with formData as req
    return this.http.post(this.uploadDownloadApi, formData)
    .pipe(catchError(this.errorHandler));
  }

  alldownloadfiles() {
    return this.http.get(this.alldownloadfilesApi);
  }

  deletedownload(path:any) {
    return this.http.delete(this.deleteDownloadApi + '/' + path)
    .pipe(catchError(this.errorHandler));
  }

  // download

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
