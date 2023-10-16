import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { AutomationGeneralService } from 'src/app/_services/_crm/automation-general.service';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { LessonService } from 'src/app/_services/_membership/lesson.service';
import { MembersService } from 'src/app/_services/_membership/members.service';
import { ModuleService } from 'src/app/_services/_membership/module.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css']
})
export class ViewLessonComponent implements OnInit {

  searching=false;
  course:any = {};
  module:any = {};
  lesson:any = {};
  documents:any = [];
  audios:any = [];
  videos:any = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private memberService: MembersService, 
    public _file: FileUploadService,
    public _image: ImageService,
    public _general: GeneralService,
    public automationService :AutomationGeneralService,) { 
    route.paramMap.subscribe((params: ParamMap) => {
      var tab = params.get('tab');
      // this.selTab = tab ? tab : 0;
      this.course.uniqueid = params.get('course_id');
      this.module.uniqueid = params.get('module_id');
      this.lesson.uniqueid = params.get('lesson_id');
      this.fetchLesson();
      this.fetchCourse();  
    })
  }

  ngOnInit(): void {
  }
  fetchLesson() {
    this.searching=true;
    let obj={course_id : this.course.uniqueid,module_id : this.module.uniqueid, lesson_id : this.lesson.uniqueid}
      this.memberService.getsinglelesson(obj).subscribe((resp:any)=>{
       
        if(resp.success) {
          // console.log(resp.data[0].download)
        this.lesson=resp.data[0];
        this.lesson.content_html=this.decodeContent(resp.data[0].content);
        if(this.lesson.download && this.lesson.download != 'null') {
        this.documents=JSON.parse(this.lesson.download);  
        }
        if(this.lesson.video) this.videos =  JSON.parse(this.lesson.video);
        if(this.lesson.audio) this.audios =  JSON.parse(this.lesson.audio);
        this.searching=false;
        }
      })
  
  }
  fetchCourse() {
    this.searching=true;
    let obj={course_id : this.course.uniqueid}
      this.memberService.getsinglecourse(obj).subscribe((resp:any)=>{
        if(resp.success) {
          console.log(resp.data[0])
          this.course=resp.data[0]
        this.searching=false;
        }
      })
  
  }
  // fetchDocument() {
  //  this.searching=true;
  //   this._file.getAllDocuments1(this.lesson.uniqueid).subscribe(resp=>{
  //     // console.log(resp)
  //     if(resp.success){
  //     this.documents = [];
  //     resp.data.forEach((item:string)=>{
  //       // this.documents.push(this.getDocObj(item));
  //     })
  //      console.log(this.documents)
  //     this.searching=false;
  //   }
  //   this.searching=false;
  //   })
  // }

  // getDocObj(item:string) {
  //   var arr = item.split('.');
  //   var obj:any = new Object();
  //   obj.ext = '.'+arr.pop();
  //   obj.name = arr.join('.');
  //   return obj;
  // }
  downloadDocument(item:any){
    let url=this._file.uploadmembershipDocumentPath + this.lesson.user_id  + '/' + this.lesson.uniqueid + '/' + item.name+item.ext;
        window.open(url, '_blank');   
  }
  searchlessons(searchInp:any) {

  }
  decodeContent(blob:any) {
    return atob(blob);
  }
  Gotohref(url :any){
    window.open(url,'_self');
  }
}
