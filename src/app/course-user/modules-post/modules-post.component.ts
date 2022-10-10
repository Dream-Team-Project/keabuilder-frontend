import { Component, OnInit } from '@angular/core';
import { LessonService } from 'src/app/_services/_membership/lesson.service';
import { Router, ParamMap, ActivatedRoute,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-course-user-modules-post',
  templateUrl: './modules-post.component.html',
  styleUrls: ['./modules-post.component.css']
})
export class CourseUserModulesPostComponent implements OnInit {

  constructor(private router: Router,
              private _lesson:LessonService,
              private route: ActivatedRoute,) {

                router.events.subscribe((val) => {
                  if(val instanceof NavigationEnd) {
                    this.postid = this.route.snapshot.paramMap.get('postid');
                    this.showlessonspost(this.postid);
                    this.gotonextprev('all', false);
                  }
                });

              }

  videodata = '';
  audiodata = '';
  postid:any = '';
  kb_fullcontent = '';
  coursename:any = '';
  moduleid:any = '';
  nextlesson = true;
  prevlesson = true;

  ngOnInit(): void {

    this.postid = this.route.snapshot.paramMap.get('postid');
    this.coursename = this.route.snapshot.paramMap.get('name');
    this.moduleid = this.route.snapshot.paramMap.get('id');
    this.showlessonspost(this.postid);
    this.gotonextprev('all', false);

    var courselogincheck:any = localStorage.getItem("kbcourselogin");
    if(courselogincheck==null){
      this.router.navigate(['/course/login'],{relativeTo: this.route});
    }

  }

  showlessonspost(id:any){
    this._lesson.single(id).subscribe((res:any)=>{

      if(res.data.length!=0){

        if(res.data[0].video!=''){
          this.videodata = '/assets/uploads/videos/'+res.data[0].video;
        }else{
          this.videodata = '';
        }

        if(res.data[0].audio!=''){
          this.audiodata = '/assets/uploads/audios/'+res.data[0].audio;
        }else{
          this.audiodata = '';
        }

        this.kb_fullcontent = this._lesson.decodeContent(res.data[0].content);

      }else{
          this.videodata = '';
          this.audiodata = '';
          this.kb_fullcontent = '';
      }

    });
  }

  gotonextprev(value:any, navigate:any){
      var objdata = {coursename:this.coursename, lessonid:this.postid, method:value}
      this._lesson.findnextprevlesson(objdata).subscribe((res:any)=>{
        console.log(res);

          if(res.data[0].findnext==0){
            this.nextlesson = false;
          }else{
            this.nextlesson = true;
          }

          if(res.data[0].findprev==0){
            this.prevlesson = false;
          }else{
            this.prevlesson = true;
          }

          if(navigate){
            this.router.navigate(['/course/'+this.coursename+'/'+res.data[0].data.moduleid+'/posts/'+res.data[0].data.postid],{relativeTo: this.route});
          }
      });

  }



}
