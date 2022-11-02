import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { CourseService } from '../_services/_membership/course.service';
import { ModuleService } from '../_services/_membership/module.service';
import { LessonService } from '../_services/_membership/lesson.service';
import { FileUploadService } from '../_services/file-upload.service';
import { ImageService } from '../_services/image.service';
import { WistiaService } from '../_services/wistia.service';
import { GeneralService } from '../_services/_builder/general.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Options } from 'sortablejs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css','../builder-setting/builder-setting.component.css']
})
export class LessonComponent implements OnInit {

  @ViewChild(TemplateRef)
  _dialogTemplate!: TemplateRef<any>;

  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;

  dragBoxAnime:any = {open: false, close: false};

  prevMediaName = '';
  wistia_project_id:string = '';
  course:any = {};
  module:any = {};
  lesson:any = {};
  content_html:any;
  post:any;
  respWaiting = false;
  popask = 'details';
  delAgree:boolean = false;
  thumbnail:any;
  file = null;
  typeerror:string = '';
  videoadding:boolean = false;
  audioadding:boolean = false;
  documentfetching:boolean = false;
  mediafetching:boolean = false;
  mediafile:any;
  videos:any = [];
  audios:any = [];
  documents:any = [];
  usedDocuments:any = [];
  delMedia:any;
  delDocument:any;
  medias:any;
  email_body:any = '<p>Your message goes here</p>';
  videoLink:any = '';
  audioLink:any = '';
  videoLinkInp = new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?.(?:mov|mpg|avi|flv|f4v|mp4|m4v|asf|wmv|vob|mod|3gp|mkv|divx|xvid|webm)')]);
  audioLinkInp = new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?.(?:mp3|wav|aif|au|m4a)')]);
  selTab:any = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _course: CourseService,
    private _module: ModuleService,
    private _lesson: LessonService,
    public _file: FileUploadService,
    private _snackbar: MatSnackBar,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    public _image: ImageService,
    public _wistia: WistiaService,
    public _general: GeneralService,
  ) {
    _general.authService.getActiveUser(_general.tokenStorageService.getUser().id).subscribe((res:any)=>{
      this.wistia_project_id = res.data[0].wistia_project_id;
      this.fetchMedia();
      this.fetchDocument();
    });
    route.paramMap.subscribe((params: ParamMap) => {
      var tab = params.get('tab');
      this.selTab = tab ? tab : 0;
      this.course.uniqueid = params.get('course_id');
      this.module.uniqueid = params.get('module_id');
      this.lesson.uniqueid = params.get('lesson_id');
      this.fetchCourse();
      this.fetchModule();
      this.fetchLesson();
      this.resetPostData();
    })
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.backdropClick().subscribe(() => {
      if(!this.respWaiting) this.overlayRefDetach();
    });
  }
  
  //  data fetching

  fetchCourse() {
    this._course.single(this.course.uniqueid).subscribe(res=>{
      this.course = res.data[0];
      // this.overlayRefDetach();
    })
  }

  fetchModule() {
    this._module.single(this.module.uniqueid).subscribe(res=>{
      this.module = res.data[0];
      // this.overlayRefDetach();
    })
  }

  fetchLesson() {
    this._lesson.single(this.lesson.uniqueid).subscribe(res=>{
      this.lesson = res.data[0];
      if(this.lesson.content) this.content_html = this._lesson.decodeContent(this.lesson.content);
      if(this.lesson.email_body) this.email_body = this._lesson.decodeContent(this.lesson.email_body);
      if(this.lesson.download && this.lesson.download != 'null') {
        this.usedDocuments = JSON.parse(this.lesson.download);
      }
      this.overlayRefDetach();
    })
  }

  fetchMedia() {
    this.mediafetching = true;
    this._wistia.getAllMedia(this.wistia_project_id).subscribe(res=>{
      this.medias = res.data;
      this.videos = [];
      this.audios = [];
      this.medias.forEach((item:any)=>{
        if(item.hashed_id) {
          var media = item.assets[0];
          media.hashed_id = item.hashed_id;
          media.name = item.name;
          media.type = item.type;
          if(item.type == 'Video') {
            this.videos.push(media);
          }
          else if(item.type == 'Audio') {
            this.audios.push(media);
          }
        }
        else this.fetchMedia();
      })
      this.mediafetching = false;
    })
  }

  fetchDocument() {
    this.documentfetching = true;
    this._file.getAllDocuments(this.wistia_project_id).subscribe(resp=>{
      this.documents = [];
      resp.data.forEach((item:string)=>{
        this.documents.push(this.getDocObj(item));
      })
      this.documentfetching = false;
    })
  }

  getDocObj(item:string) {
    var arr = item.split('.');
    var obj:any = new Object();
    obj.ext = '.'+arr.pop();
    obj.name = arr.join('.');
    return obj;
  }

  //  data fetching

  // post methods

    toggleStatus(lesson:any) {
      lesson.publish_status = lesson.publish_status ? 1: 0;
      this._lesson.update(lesson).subscribe((res:any)=>{
        this._snackbar.open('Lesson has been '+(lesson.publish_status == 1 ? 'published' : 'drafted'), 'OK');
      });
    }

    updateLesson() {
      this.respWaiting = true;
      var lesson = this.post;
      if(this.thumbnail.type) {
        this.thumbnail.name = 'lesson-thumbnail-'+lesson.uniqueid+'.'+this.thumbnail.type;
        lesson.thumbnail = 'keaimage-'+this.thumbnail.name;
        this._image.timeStamp = (new Date()).getTime();
      }
      this._lesson.update(lesson).subscribe((res:any)=>{
        if(this.thumbnail.type) this._image.onImageFileUpload(this.thumbnail);
        this._snackbar.open('Lesson has been updated', 'OK');
        this.fetchLesson();
      })
    }

    resetPostData() {
      this.post = {course_id: this.course.uniqueid, type: '', title:'', description:'', thumbnail: '', publish_status: true};
      this.thumbnail = {name: '', path: '', type: ''};
    }

  // post methods

  // content methods

    addContent() {
      this.lesson.content = this._lesson.encodeContent(this.content_html);
      this._lesson.update(this.lesson).subscribe((res:any)=>{
        this._snackbar.open('Content has been updated', 'OK');
        this.fetchLesson();
      })
    }

  // content methods

    // automation methods

    toggleAutomation(lesson:any) {
      lesson.automation = lesson.automation ? 1: 0;
      this._lesson.update(lesson).subscribe((res:any)=>{
        this._snackbar.open('Automation has been '+(lesson.automation == 1 ? 'activated' : 'deactivated'), 'OK');
      });
    }

    addEmail() {
      this.lesson.email_body = this._lesson.encodeContent(this.email_body);
      this._lesson.update(this.lesson).subscribe((res:any)=>{
        this._snackbar.open('Automation has been updated', 'OK');
        this.fetchLesson();
      })
    }
  
    // automation methods

    // media methods
    mediaChangeEvent(event: any, type:string): void {
      if(event.target.files && event.target.files[0]) {
          this.respWaiting = true;
          this.mediafile = event.target.files[0];
          const reader = new FileReader();
          reader.onload = e => {reader.result;}
          reader.readAsDataURL(this.mediafile);
          this._file.uploadMedia(this.mediafile).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
                  this.uploadMedia(event.originalname, type);
                }
            }
        );
      }
    }

    uploadMedia(path:any, type:string) {
      this.respWaiting = true;
      var file = {project_id: this.wistia_project_id, path: path, type: type};
      this._wistia.uploadMedia(file).subscribe((resp:any)=>{
        this.overlayRefDetach();
        if(resp.success) {
          this._snackbar.open(resp.data.type+' has been uploaded', 'OK');
          this.fetchMedia();
        }
        else {
          this._snackbar.open('An error has been occured while uploading', 'OK');
        }
      });
    }

    deleteMedia(media:any) {
      this.respWaiting = true;
      this._wistia.deleteMedia(media.hashed_id).subscribe(res=>{
        if(media.url == this.lesson.video) this.addVideo('');
        else if(media.url == this.lesson.audio) this.addAudio('');
        this.overlayRefDetach();
        this._snackbar.open(media.type+' has been deleted', 'OK');
        this.fetchMedia();
      });
    }

    updateMedia(media:any) {
      if(this.prevMediaName != media.name) {
        this._wistia.updateMedia(media).subscribe(resp=>{
          this._snackbar.open(media.type+' name has been updated', 'OK');
        });
      }
    }

    // media methods

    // video methods

  addVideo(video:any) {
    if(this.lesson.video != video) {
      this.videoadding = true;
      this.lesson.video = video;
      this._lesson.update(this.lesson).subscribe((res:any)=>{
        var act = video ? 'updated' : 'removed';
        this.videoadding = false;
        this._snackbar.open('Video has been '+act, 'OK');
        this.fetchLesson();
      })
    }
    else this._snackbar.open('Video has already in use', 'OK');
  }

  // video methods

  // audio methods

  addAudio(audio:any) {
    if(this.lesson.audio != audio) {
      this.audioadding = true;
      this.lesson.audio = audio;
      this._lesson.update(this.lesson).subscribe((res:any)=>{
        var act = audio ? 'updated' : 'removed';
        this.audioadding = false;
        this._snackbar.open('Audio has been '+act, 'OK');
        this.fetchLesson();
      })
    }
    else this._snackbar.open('Audio has already in use', 'OK');
  }

  // audio methods  

  // download methods

  removeUsedDocument(index:any) {
    this.usedDocuments.splice(index,1);
    this.addDocument('sort');
  }
  
  addDocument(document:any) {
    if(!this.checkItem(document)) {
      if(document == '') this.usedDocuments = [];
      else if(document != 'sort') this.usedDocuments.push(document);
      this.lesson.download = JSON.stringify(this.usedDocuments);
      this._lesson.update(this.lesson).subscribe((res:any)=>{
        var act = document ? 'updated' : 'removed';
        this._snackbar.open('Document has been '+act, 'OK');
        this.fetchLesson();
      })
    }
    else this._snackbar.open('Document has already in use', 'OK');
  }

  deleteDocument(document:any) {
    this.respWaiting = true;
    this._file.deleteDocument(document.name+document.ext, this.wistia_project_id).subscribe(res=>{
      var index = this.usedDocuments.indexOf(document);
      if(this.checkItem(document)) this.removeUsedDocument(index);
      this.overlayRefDetach();
      this._snackbar.open('Document has been deleted', 'OK');
      this.fetchDocument();
    });
  }

  documentChangeEvent(event: any): void {
    if(event.target.files && event.target.files[0]) {
        var document = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {reader.result;}
        reader.readAsDataURL(document);
        this._file.uploadDocument(document, this.wistia_project_id).subscribe(
          (resp: any) => {
              if (typeof (resp) === 'object') {
                this.addDocument(this.getDocObj(resp.originalname));
                this.fetchDocument();
              }
          }
      );
    }
  }

  updateDocument(doc:any, i:number) {
    var prevDoc:any = this.copyObj(this.prevMediaName);
    if(JSON.stringify(prevDoc) != JSON.stringify(doc)) {
      this._file.checkDocument(doc.name+doc.ext, this.wistia_project_id).subscribe(resp=>{
        if(!resp.success) {
          var pathObj = {oldpath: prevDoc.name+prevDoc.ext, path: doc.name+doc.ext};
          this._file.renameDocument(pathObj, this.wistia_project_id).subscribe(resp=>{
            var index = 0;
            this.usedDocuments.find((item:any)=>{
              if(JSON.stringify(prevDoc) == JSON.stringify(item)) {
                this.usedDocuments[index] = this.copyObj(doc);
              }
              index++;
            })
            this.addDocument('sort');
          });
        }
        else {
          this.documents[i] = this.copyObj(prevDoc);
          this._snackbar.open('Document name already exist', 'OK');
        }
      })
    }
  }

  // download methods

  // dialog methods

  overlayRefDetach() {
    this._image.timeStamp = (new Date()).getTime();
    this.respWaiting = false;
    this.dragBoxAnime.close = true;
    setTimeout(()=>{
      this._overlayRef.detach();
      this.popask = 'details';
      this.delMedia = '';
      this.videoLink = '';
      this.videoLinkInp.reset();
      this.audioLink = '';
      this.audioLinkInp.reset();
      this.delDocument = '';
      this.delAgree = false;
      this.resetPostData();
      this.dragBoxAnime.close = false;
    },200);
  }

  openDialog(post:any, popask:string) {
    this.popask = popask;
    this.post = JSON.parse(JSON.stringify(post));
    if(this.post.thumbnail) this.thumbnail.path = this._image.uploadImgPath + this.post.thumbnail;
    this.dragBoxAnime.open = true;
    this._overlayRef.attach(this._portal);
    setTimeout(()=>{
      this.dragBoxAnime.open = false;
    },200)
  }

  // dialog methods

  // image input method

  changeImg (event:any) {
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;
    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.thumbnail.type = chktype.split('/')[1];
      this.typeerror = '';
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = e => this.thumbnail.path = fileReader.result; 
    }else{
      this.typeerror = 'File Type Not Allow';
    }

  }

  // image input method

  checkItem(item:any) {
    return this.usedDocuments.some((x:any)=>{
      return JSON.stringify(x) === JSON.stringify(item);
    });
  }

  getUID() {
    return Math.random().toString(20).slice(2);
  }

  copyObj(item:any) {
    return JSON.parse(JSON.stringify(item));
  }

  documentSortOptions: Options = {
    group: 'documents',
    scroll: true,
    sort: true,
    handle: '.kb-doc-handle',
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      this.addDocument('sort');
    },
    onAdd: (event:any) => {
      this.addDocument('sort');
    },
    onStart: function (/**Event*/) {
    },
    onChoose: function (/**Event*/) {      
    },
  }; 
}
