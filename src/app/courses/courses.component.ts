import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/_membership/course.service';
import { ImageService } from '../_services/image.service';
import { FileUploadService } from '../_services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  allcoursesarr:any[] = [];
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  file = null;
  typeerror = '';
  offers = new FormControl();
  offersList: string[] = [];
  thumbnail:any;
  offersToAdd:Array<string> = [];
  course:any;
  update:boolean = false;
  timeStamp:any;
  prevTitle:string = '';

  constructor(private _course: CourseService,
             public _image: ImageService, 
             private _snackbar: MatSnackBar,  
             private _file: FileUploadService) { }

  ngOnInit(): void {
    this._course.getalloffers().subscribe({
      next: data => {
        // console.log(data);
       data.data.forEach((element: any) => {
          this.offersList.push(element.title);
       });

      }
    });
    this.allCourses(false);
    this.resetCourseData();
  }

  resetCourseData() {
    this.course = {uniqueid: '', title: '', description: '', thumbnail: '', offers: ''};
    this.offersToAdd = [];
    this.thumbnail = {name: '', path: '', type: ''};
    this.update = false;
  }

  allCourses(reset:boolean) {
    this._course.all().subscribe((res:any)=>{
      console.log(res.data);
      this.allcoursesarr = res.data;
      if(reset) this.closeSidebar();
    }); 
  }

  duplicateCourse(course:any) {
    this.course = course;
    this.createCourse();
  }

  toggleStatus(course:any, status:number) {
    course.publish_status = status;
    this._course.update(course).subscribe((res:any)=>{
      this._snackbar.open('Course has been '+(status == 1 ? 'published' : 'drafted'), 'OK');
    });
  }

  updateTitle(course:any) {
    if(this.prevTitle != course.title) {
      this._course.update(course).subscribe((res:any)=>{
        this._snackbar.open('Course title updated', 'OK');
      });
    }
  }

  createCourse() {
    this.course.uniqueid = Math.random().toString(20).slice(2);
    if(this.thumbnail.type) {
      this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
      this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
      this.course.offers = this.offersToAdd.join(',');
    }
    this._course.create(this.course).subscribe((res:any)=>{
      if(this.thumbnail.type) this._image.onImageFileUpload(this.thumbnail)
      this.allCourses(true);
    })
  }

  updateCourse() {
    if(this.thumbnail.type) {
      this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
      this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
    }
    this.course.offers = this.offersToAdd.join(',');
    this._course.update(this.course).subscribe((res:any)=>{
      if(this.thumbnail.type) this._image.onImageFileUpload(this.thumbnail)
      this.timeStamp = (new Date()).getTime();
      this.allCourses(true);
    })
  }

  deleteCourse(course:any) {
    this._course.delete(course.id).subscribe((res:any)=>{
      if(course.thumbnail) this._file.deletefile(course.thumbnail).subscribe((res:any)=>{
        console.log(res);
      });
      this.allCourses(true);
    }); 
  }

  getImgPath(thumbnail:string) {
    var path = this._image.uploadImgPath + thumbnail;
      if(this.timeStamp) {
        return path + '?' + this.timeStamp;
      }
      return path;
  }

  closeSidebar(){
    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
      this.resetCourseData();
    },this.sidebar.animtime)
  }

  openSidebar(){
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.open = false;
    },this.sidebar.animtime)
  }

  editDetails(course:any) {
    this.course = JSON.parse(JSON.stringify(course));
    this.offersToAdd = this.course.offers.split(',');
    if(this.course.thumbnail) this.thumbnail.path = this._image.uploadImgPath + this.course.thumbnail;
    this.update = true;
    this.openSidebar();
  }

  compareImgRepeat(imgR1:any, imgR2:any) {
    return imgR1.value === imgR2.value && imgR1.viewValue === imgR2.viewValue;
  }
  
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

  modifydate(value:any){
    if(value!=''){
      var mycustomdate =  new Date(value);
      var text1 = mycustomdate.toDateString();    
      var text2 = mycustomdate.toLocaleTimeString();
      return text1+' '+text2;
    }else{
      return '';
    }
  }


}
