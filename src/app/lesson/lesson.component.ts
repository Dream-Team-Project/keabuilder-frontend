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
import { CdkDrag, CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ReadVarExpr } from '@angular/compiler';

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

  course:any = {};
  module:any = {};
  lesson:any = {};
  content_html:any;
  post:any;
  respWaiting = false;
  popask = 'details';
  delAgree:boolean = false;
  timeStamp:any; 
  thumbnail:any;
  file = null;
  typeerror:string = '';
  videoadding:boolean = false;
  videofetching:boolean = false;
  videofile:any;
  videos:any = [];
  audioadding:boolean = false;
  audiofetching:boolean = false;
  audiofile:any;
  audios:any = [];
  downloadadding:boolean = false;
  downloadfetching:boolean = false;
  downloadfile:any;
  downloads:any = [];
  activeDownloads:any = [];
  calDelAudio:any;
  calDelVideo:any;
  calDelDownload:any;
  medias:any;
  email_body:any = '<p>Your message goes here</p>';

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
    route.paramMap.subscribe((params: ParamMap) => {
      this.course.uniqueid = params.get('course_id');
      this.module.uniqueid = params.get('module_id');
      this.lesson.uniqueid = params.get('lesson_id');
      this.fetchCourse();
      this.fetchModule();
      this.fetchLesson();
      this.fetchDownloads();
      this.fetchVideos();
      this.fetchAudios();
      // this.fetchMedias();
      this.resetPostData();
    })
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: !this.respWaiting,
    });
    this._overlayRef.backdropClick().subscribe(() => {
      this.overlayRefDetach();
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
      if(this.lesson.download) this.activeDownloads = this.lesson.download.split(',-,');
      this.overlayRefDetach();
    })
  }

  // fetchMedias() {
  //   this._wistia.getAllMedia().subscribe(res=>{
  //     this.medias = JSON.parse(res.data);
  //     this.medias.forEach((item:any)=>{
  //       if(item.type == 'Video') {
  //         this.videos = [];
  //         this.videos.push(item.assets[0]);
  //       }
  //       else if(item.type == 'Audio') {
  //         this.audios = [];
  //         this.audios.push(item.assets[0]);
  //       }
  //     })
  //   })
  // }

  fetchDownloads() {
    this.downloadfetching = true;
    this._file.alldownloadfiles().subscribe((res:any)=>{
      this.downloads = res.data;
      console.log(res.data);
      this.downloadfetching = false;
    });
  }

  fetchVideos() {
    this.videofetching = true;
    this._file.allvideofiles().subscribe((res:any)=>{
      this.videos = res.data;
      this.videofetching = false;
    });
  }

  fetchAudios() {
    this.audiofetching = true;
    this._file.allaudiofiles().subscribe((res:any)=>{
      this.audios = res.data;
      this.audiofetching = false;
    });
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
        this.timeStamp = (new Date()).getTime();
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

  // video methods

  addVideo(video:any) {
    this.videoadding = true;
    this.lesson.video = video;
    this._lesson.update(this.lesson).subscribe((res:any)=>{
      var act = video ? 'updated' : 'removed';
      this.videoadding = false;
      this._snackbar.open('Video has been '+act, 'OK');
      this.fetchLesson();
    })
  }

  deleteVideo(video:any) {
    this.overlayRefDetach();
    this._file.deletevideo(video).subscribe(res=>{
      if(video == this.lesson.video) this.addVideo('');
      this._snackbar.open('Video has been deleted', 'OK');
      this.fetchVideos();
    });
  }

  videoChangeEvent(event: any): void {
    if(event.target.files && event.target.files[0]) {
        // this.videoadding = true;
        this.videofile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {reader.result;}
        reader.readAsDataURL(this.videofile);
        this._file.uploadvideo(this.videofile).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {
                // var file = {path: 'keavideo-'+event.originalname};
                // this._wistia.uploadMedia(file).subscribe((e:any)=>{
                //   console.log(JSON.parse(e.data));
                  this.addVideo('keavideo-'+event.originalname);
                  this.fetchVideos();
                // });
              }
          }
      );
    }
  }

  // video methods

  // audio methods

  addAudio(audio:any) {
    this.audioadding = true;
    this.lesson.audio = audio;
    this._lesson.update(this.lesson).subscribe((res:any)=>{
      var act = audio ? 'updated' : 'removed';
      this.audioadding = false;
      this._snackbar.open('Audio has been '+act, 'OK');
      this.fetchLesson();
    })
  }

  deleteAudio(audio:any) {
    this.overlayRefDetach();
    this._file.deleteaudio(audio).subscribe(res=>{
      if(audio == this.lesson.audio) this.addAudio('');
      this._snackbar.open('Audio has been deleted', 'OK');
      this.fetchAudios();
    });
  }

  audioChangeEvent(event: any): void {
    if(event.target.files && event.target.files[0]) {
        this.audioadding = true;
        this.audiofile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.audiofile);
        this._file.uploadaudio(this.audiofile).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {
                this.addAudio('keaaudio-'+event.originalname);
                this.fetchAudios();
              }
          }
      );
    }
  }

  // audio methods  

  // download methods

  removeActiveDownload(index:any) {
    this.activeDownloads.splice(index,1);
    this.addDownload('remove');
  }

  addDownload(download:any) {
    if(!this.checkItem(download)) {
      this.downloadadding = true;
      if(download) {
        if(download != 'remove') {
          this.activeDownloads.push(download);
        }
      }
      else {
        this.activeDownloads = [];
      }
      this.lesson.download = this.activeDownloads.join(',-,');
      this._lesson.update(this.lesson).subscribe((res:any)=>{
        var act = download ? 'updated' : 'removed';
        this.downloadadding = false;
        this._snackbar.open('Download has been '+act, 'OK');
        this.fetchLesson();
      })
    }
    else {
      this._snackbar.open('Download has already been added', 'OK');
    }
  }

  deleteDownload(download:any) {
    this.overlayRefDetach();
    this._file.deletedownload(download).subscribe(res=>{
      var index = this.activeDownloads.indexOf(download);
      if(this.checkItem(download)) this.removeActiveDownload(index);
      this._snackbar.open('Download has been deleted', 'OK');
      this.fetchDownloads();
    });
  }

  downloadChangeEvent(event: any): void {
    if(event.target.files && event.target.files[0]) {
        this.downloadadding = true;
        this.downloadfile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.downloadfile);
        this._file.uploaddownload(this.downloadfile).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {
                this.addDownload(event.originalname);
                this.fetchDownloads();
              }
          }
      );
    }
  }

  // download methods

  // dialog methods

  overlayRefDetach() {
    this.timeStamp = (new Date()).getTime();
    this.respWaiting = false;
    this.dragBoxAnime.close = true;
    setTimeout(()=>{
      this._overlayRef.detach();
      this.popask = 'details';
      this.calDelVideo = '';
      this.calDelAudio = '';
      this.calDelDownload = '';
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

  getImgPath(thumbnail:string) {
    var path = this._image.uploadImgPath + thumbnail;
      if(this.timeStamp) {
        return path + '?' + this.timeStamp;
      }
      return path;
  }

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

  dropCopy(event: any) {
    var data = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(!this.checkItem(data)) {
        this.addDownload(data);
        // copyArrayItem(
        //   event.previousContainer.data,
        //   event.container.data,
        //   event.previousIndex,
        //   event.container.data.length,
        // );
      }
    }
  }

  checkItem(item:any) {
    return this.activeDownloads.includes(item);
  }

  getUID() {
    return Math.random().toString(20).slice(2);
  }
}
