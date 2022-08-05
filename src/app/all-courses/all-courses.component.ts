import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CourseService } from '../_services/course.service';
import { ImageService } from '../_services/image.service';
import { FileUploadService } from '../_services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})

export class AllCoursesComponent implements OnInit {

  allcoursesarr:any[] = [
    // dummy data
    // {
    //     "id": 1,
    //     "uniqueid": 1,
    //     "title": "Online Course",
    //     "type": "course",
    //     "domain": null,
    //     "publish_status": 1,
    //     "thumbnail": "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/1787228/settings_images/LIp27aPmRDqDOh5iXGtw_maxresdefault_2.jpg",
    //     "tracking_code": null,
    //     "updated_at": "Thu Jan 06 2022 5:09:57 PM",
    //     "members":'1678',
    // },
    // dummy data
  ];
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  file = null;
  typeerror = '';
  offers = new FormControl();
  offersList: string[] = ['Small Options Big Profits', 'Weekly Option Income Academy'];
  thumbnail:any;
  offersToAdd:Array<string> = [];
  course:any;
  update:boolean = false;
  timeStamp:any;


  constructor(private _course: CourseService, public _image: ImageService, private _snackbar: MatSnackBar,  private _file: FileUploadService) { }

  ngOnInit(): void {
    this.allCourses(false);
    this.resetCourseData();
  }

  resetCourseData() {
    this.course = {uniqueid: '', title: '', description: '', thumbnail: '', offers: ''}
    this.offersToAdd = [];
    this.thumbnail = {name: '', path: '', type: ''};
    this.update = false;
  }

  allCourses(reset:boolean) {
    this._course.all().subscribe((res:any)=>{
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
      this._snackbar.open('Course has been '+(status == 1 ? 'published' : 'drafted'), 'X');
    });
  }

  updateTitle(course:any) {
    this._course.update(course).subscribe((res:any)=>{
      this._snackbar.open('Course title updated', 'X');
    });
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
      this._file.deletefile(course.thumbnail).subscribe((res:any)=>{
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
    this.thumbnail.path = this._image.uploadImgPath + this.course.thumbnail;
    this.update = true;
    this.openSidebar();
  }

  onOpen(){
    (<HTMLInputElement>document.getElementById('fileElem')).click();
  }

  compareImgRepeat(imgR1:any, imgR2:any) {
    return imgR1.value === imgR2.value && imgR1.viewValue === imgR2.viewValue;
  }
  
  changeme (event:any) {
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
}
