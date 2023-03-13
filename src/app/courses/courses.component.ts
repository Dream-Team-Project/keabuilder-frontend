import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../_services/_membership/course.service';
import { ImageService } from '../_services/image.service';
import { FileUploadService } from '../_services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../_services/_builder/general.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  validate = {
    title: new FormControl('', [Validators.required]),
  }
  courses:any[] = [];
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  file = null;
  typeerror = '';
  offers = new FormControl();
  offersList: any[] = [];
  thumbnail:any = {
    path: '',
    type: ''
  };
  offersToAdd:Array<string> = [];
  course = {
    id: '',
    uniqueid: '',
    user_id: '',
    title: '',
    path: '',
    description: '',
    thumbnail: '',
    offers: '',
    publish_status: ''
  };
  update:boolean = false;
  prevTitle:string = '';

  pageurl = '';
  showmyselected = [];
  showquickoffer:any = [];
  fetching:boolean = true;
  toggleview:boolean = true;
  btndis:boolean = false;

  constructor(private _course: CourseService,
             public _image: ImageService, 
             private _snackbar: MatSnackBar,  
             private _file: FileUploadService,
             private _snackBar: MatSnackBar,
             public _general: GeneralService,) {
              this.toggleview = _general.getStorage('course_toggle');
              }

  ngOnInit(): void {
    // this._course.getalloffers().subscribe({
    //   next: data => {
    //    data.data.forEach((element: any) => {
    //       var genobj = {id:element.uniqueid,text:element.title};
    //       this.offersList.push(genobj);
    //       console.log(this.offersList);
    //    });

    //   }
    // });
    this.allCourses(false);
  }

  allCourses(reset:boolean) {
    this._course.all().subscribe((res:any)=>{
      this.courses = res.data;
      if(reset) this.closeSidebar();
    }); 
  }

  createCourse() {
    if(this.course.title!='' && this.thumbnail.path) {
      this.btndis = true;
      this.course.uniqueid = this._general.makeid(20);
      this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
      this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
      // this.course.offers = this.offers.value.join(',');
      this._course.create(this.course).subscribe((res:any)=>{
        this._image.onImageFileUpload(this.thumbnail).then(resp=>{
          this._general.openSnackBar(false, 'Course Created Successfully!', 'OK', 'center', 'top');
          this.btndis = false;
        })
        this.allCourses(true);
      })
    }
    else if(!this.thumbnail.path) this.typeerror = 'Thumbnail is required';
  }

  updateCourse() {
    if(this.course.title!='' && this.thumbnail.path) {
      this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
      this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
      if(this.offers.value!=null){
        // this.course.offers = this.offersToAdd.join(',');
        this.course.offers = this.offers.value.join(',');
      }
      this._course.update(this.course).subscribe((res:any)=>{
        if(this.thumbnail.type) this._image.onImageFileUpload(this.thumbnail)
        this._image.timeStamp = (new Date()).getTime();
        this.allCourses(true);
      })
    }
    else if(!this.thumbnail.path) this.typeerror = 'Thumbnail is required';
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
    this.showmyselected  = [];
    var arselmult:any = [];
    this.offers.setValue(arselmult); 
    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
      this.course ={ 
        id: '',
        uniqueid: '',
        user_id: '',
        title: '',
        path: '',
        description: '',
        thumbnail: '',
        offers: '',
        publish_status: ''
      }
      this.thumbnail = {
        path: '',
        type: ''
      }
    },this.sidebar.animtime)
  }

  openSidebar(course:any, update:boolean){
    this.update = update;
    this.course = course;
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>this.sidebar.anim.open = false,this.sidebar.animtime);
  }

  quickEdit(course:any) {
    var temp = JSON.parse(JSON.stringify(course));
    // this.offersToAdd = this.course.offers.split(',');
    // this.showmyselected = course.offers.split(',');
    // this.findselectedproduct();
    console.log(course);
    if(temp.thumbnail) this.thumbnail.path = this._image.uploadImgPath + temp.thumbnail;
    console.log(this.thumbnail);
    this.openSidebar(temp, true);
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

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._snackBar.open('Successfully Copied!', 'OK');
  }

  // copyurl(url:any){
  //   this.pageurl = url;
  //   this.openSidebar(this.course);
  // }


  searchCourses(search: any, filter: any) {
    this.fetching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
    }
    this._file.searchformquery(obj).subscribe((resp:any)=>{
      this.adjustdata(resp.data);
    });
  }

  adjustdata(data:any){
    // this.forms = [];
    // this.nodata = data.length == 0;
    // this.forms = data;
    this.fetching = false;
  }

  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('course_toggle',this.toggleview);
  }

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}

}
