import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/_membership/course.service';
import { ImageService } from '../_services/image.service';
import { FileUploadService } from '../_services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { GeneralService } from '../_services/_builder/general.service';

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
  offersList: any[] = [];
  thumbnail:any;
  offersToAdd:Array<string> = [];
  course:any;
  update:boolean = false;
  prevTitle:string = '';

  showpageurl = false;
  pageurl = '';
  firstquickedit = true;
  editshowurl = false;
  selectedcourse = false;
  showmyselected = [];
  showquickoffer:any = [];


  constructor(private _course: CourseService,
             public _image: ImageService, 
             private _snackbar: MatSnackBar,  
             private _file: FileUploadService,
             private _snackBar: MatSnackBar,
             public _general: GeneralService,) { }

  ngOnInit(): void {
    this._course.getalloffers().subscribe({
      next: data => {

        console.log(data);
        console.log('--data');  

       data.data.forEach((element: any) => {
          var genobj = {id:element.uniqueid,text:element.title};
          this.offersList.push(genobj);
          console.log(this.offersList);
       });

      }
    });
    this.allCourses(false);
    this.resetCourseData();
  }

  resetCourseData() {
    this.course = {uniqueid: '', title: '', url:'', description: '', thumbnail: '', offers: ''};
    this.offersToAdd = [];
    this.thumbnail = {name: '', path: '', type: ''};
    this.update = false;
  }

  allCourses(reset:boolean) {
    this._course.all().subscribe((res:any)=>{
      console.log(res.data);
      res.data.forEach((element:any) => {
          element.members = 0;
      });
      this.allcoursesarr = res.data;
      if(reset) this.closeSidebar();
    }); 
  }

  changeselectcourse(event:any){
      this.selectedcourse = false;
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

    if(this.course.title!=''){
      this.course.uniqueid = Math.random().toString(20).slice(2);
      if(this.thumbnail.type) {
        this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
        this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
        // this.course.offers = this.offersToAdd.join(',');
      }
      this.course.offers = this.offers.value.join(',');
      this._course.create(this.course).subscribe((res:any)=>{
        if(this.thumbnail.type) this._image.onImageFileUpload(this.thumbnail)
        this.allCourses(true);
      })
    }

  }

  updateCourse() {

    if(this.thumbnail.type) {
      this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
      this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
    }

    console.log(this.course.offers);

    if(this.offers.value!=null){
      // this.course.offers = this.offersToAdd.join(',');
      this.course.offers = this.offers.value.join(',');
    }

    console.log(this.course);
    this._course.update(this.course).subscribe((res:any)=>{
      console.log(res);
      if(this.thumbnail.type) this._image.onImageFileUpload(this.thumbnail)
      this._image.timeStamp = (new Date()).getTime();
      this.allCourses(true);
    })

  }

  findselectedproduct(){
    this.showquickoffer = [];
    if(this.showmyselected.length!=0){
      this.offersList.forEach(element => {
        this.showmyselected.forEach(element2 => {
          if(element.id==element2){
            this.showquickoffer.push(element.text);
          }
        });
      });
    }
  }

  deleteCourse(course:any) {
    this._course.delete(course.id).subscribe((res:any)=>{
      if(course.thumbnail) this._file.deleteimage(course.thumbnail).subscribe((res:any)=>{
        console.log(res);
      });
      this.allCourses(true);
    }); 
  }

  closeSidebar(){
    this.selectedcourse = false;
    this.showmyselected  = [];
    var arselmult:any = [];
    this.offers.setValue(arselmult); 

    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
      this.resetCourseData();
    },this.sidebar.animtime)
  }

  openSidebar(){
    this.editshowurl = false;
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.open = false;
    },this.sidebar.animtime)
  }

  editDetails(course:any) {
    this.course = JSON.parse(JSON.stringify(course));
    // this.offersToAdd = this.course.offers.split(',');
    this.selectedcourse = true;
    this.showmyselected = course.offers.split(',');
    this.findselectedproduct();
    console.log(course);
    if(this.course.thumbnail) this.thumbnail.path = this._image.uploadImgPath + this.course.thumbnail;
    this.update = true;
    this.openSidebar();
    this.showpageurl = false;
    this.firstquickedit = true;
    this.editshowurl = true;
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

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._snackBar.open('Successfully Copied!', 'OK');
  }

  copyurl(url:any){
    this.pageurl = url;
    this.openSidebar();
    this.showpageurl = true;
    this.firstquickedit = false;
  }


}
