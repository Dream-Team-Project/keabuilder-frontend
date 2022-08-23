import { Injectable } from '@angular/core';
import { LessonService } from '../_services/_membership/lesson.service';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {


  constructor(private fileUploadService: FileUploadService, private _lesson: LessonService) { }



saveFileOnDB(data:any) {

}
}
