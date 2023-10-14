import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { ImageService } from 'src/app/_services/image.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-membership-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class MembershipCoursesComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  
  spinner=false;
  validate = {
    title: new FormControl('', [Validators.required]),
  }
  courses:any[] = [];
 
  file = null;
  typeerror = '';
  offers = new FormControl();
  offersList: any[] = [];
  thumbnail:any = {
    path: '',
    type: ''
  };
  offersToAdd:Array<string> = [];
  
  course:any = {
    id: '',
    uniqueid: '',
    user_id: '',
    title: '',
    subdomain: '',
    path: '',
    description: '',
    thumbnail: '',
    offers: '',
    publish_status: '',
   
  };
  update:boolean = false;
  prevTitle:string = '';

  pageurl = '';
  showmyselected = [];
  showquickoffer:any = [];
  fetching:boolean = true;
  toggleview:boolean = true;
  btndis:boolean = false;
  delcourse:any;
  error=false;
  errormessage:any='';
  subdomain:any;

  constructor(public _course: CourseService,
             public _image: ImageService, 
             private _file: FileUploadService,
             public _general: GeneralService,
             public dialog: MatDialog,
             public websiteService: WebsiteService,) {
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
    this.allCourses();
  }

  openDialog(templateRef: TemplateRef<any>, course:any ): void {
    this.delcourse = course;
    this.dialog.open(templateRef).afterClosed().subscribe((data:any)=>{
    
    });
  }
  resetobj(){
    this.error=false;
    this.errormessage='';
    this.dialog.closeAll();
    this.course.id= '';
    this.course.uniqueid= '';
    this.course.user_id= '';
    this.course.title='';
    this.course.path='';
    this.course.description= '';
    this.course.thumbnail= '';
    this.course.offers= '';
    this.course.publish_status= '';
    this.thumbnail = {
      path: '',
      type: ''
    }
  }

  allCourses() {
    this.fetching = true;
    this._course.all().subscribe((res:any)=>{
      this.courses = res.data;
      this.fetching = false;
      // console.log(this.courses)
    }); 
  }

  createCourse() {
    if(this.course.title!='' && this.thumbnail.path) {
      this.btndis = true;
      this.course.uniqueid = this._general.makeid(20);
      this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
      this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
      // this.course.offers = this.offers.value.join(',');
      this.course.subdomain=this.createsubdomainname();
      this._course.create(this.course).subscribe((res:any)=>{
      if(res.success) {
      this.websiteService.oncreatesubdomain(res.subdomain,res.uniqueid).subscribe({next: datanw => {}})
        this._image.onImageFilefaviconUpload(this.thumbnail).then(resp=>{
          this.allCourses();
          this.resetobj();
          this._general.openSnackBar(false, 'Course Created Successfully!', 'OK', 'center', 'top');
        })
      }
      })
    }
    else if(!this.thumbnail.path) {
      this.typeerror = 'Thumbnail is required';
      this.error=true;
      this.errormessage="Please enter required information"
      this.dialog.open(this.adddialog);

    }
  }

  createsubdomainname(){
    var uniqid = this._general.makeid(15);
    return this.course.title+uniqid;
  }

  duplicateCourse(course:any) {
    this.fetching = true;
    this.course.id=course.uniqueid;
    this.course.uniqueid = this._general.makeid(20);
    var oldimg =course.thumbnail;
    this.course.description=course.description;
    this.thumbnail.path=course.path;
    this.thumbnail.type= this.thumbnail.type ? this.thumbnail.type : 'png';
    this.course.path=course.path;
    this.course.title=course.title;
    this.course.publish_status=course.publish_status;
      this.btndis = true;
      this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
      this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
      // console.log(this.course)
      this.course.subdomain=this.createsubdomainname();
      this._course.duplicate(this.course).subscribe((res:any)=>{
        // console.log(res)
        if(res.success == true){
          this.websiteService.oncreatesubdomain(res.subdomain,res.uniqueid).subscribe({next: datanw => {}})
        this._file.validateimg(oldimg).subscribe({
          next: datagen => {
            // console.log(datagen)
            if(datagen.data==1){
              var imgobj  = {oldname:oldimg, newname: this.course.thumbnail};
              this._file.copyimage(imgobj).subscribe({
                next: data => {
                  this.allCourses();
                  this.resetobj();
                  this._general.openSnackBar(false, 'Duplicate Course Created Successfully!', 'OK', 'center', 'top');
                }
              });
            }else{
              this.allCourses();
              this.resetobj();
        this._general.openSnackBar(false, 'Duplicate Course Created Successfully!', 'OK', 'center', 'top');
            }
            
          }
        });
      }
      this.fetching = false;
      })
  }

  updateCourse() {
    if(this.course.title!='' && this.thumbnail.path) {
      this.btndis = true;
      this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
      this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
      if(this.offers.value!=null){
        // this.course.offers = this.offersToAdd.join(',');
        this.course.offers = this.offers.value.join(',');
      }
      this._course.update(this.course).subscribe((res:any)=>{
        if(this.thumbnail.type) {
        this._image.onImageFilefaviconUpload(this.thumbnail).then(resp=>{
          this.allCourses();
          this.resetobj();
          this._general.openSnackBar(false, 'Course Updated Successfully!', 'OK', 'center', 'top');
        })
      }
      else{
        this.allCourses();
        this.resetobj();
        this._general.openSnackBar(false, 'Course Updated Successfully!', 'OK', 'center', 'top');
      }
      })
    
    }
    else if(!this.thumbnail.path) {
      this.typeerror = 'Thumbnail is required';
      this.error=true;
      this.errormessage="Please enter required information"
      this.dialog.open(this.adddialog);
    }
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
    this.fetching = true;
    course.deleting = true;
    this._course.delete(course.uniqueid).subscribe((res:any)=>{
      if(res.success)  this.websiteService.ondeletesubdomain(res.subdomain).subscribe({next: data => { } })
      if(course.thumbnail) this._file.deleteimage(course.thumbnail).subscribe((res:any)=>{
        this._general.openSnackBar(false, 'Course Deleted Successfully!', 'OK', 'center', 'top');
        this.allCourses();
        this.resetobj();
        this.fetching = false;
      });
      else {
        this._general.openSnackBar(false, 'Course Deleted Successfully!', 'OK', 'center', 'top');
        this.allCourses();
        this.resetobj();
        this.fetching = false;
      }
    }); 
  }


  quickEdit(course:any) {
    this.course = JSON.parse(JSON.stringify(course));
    this.thumbnail.path = this._image.uploadImgPath +this.course.thumbnail;
    let chk=this.course.thumbnail.split('.');
    if(chk[1]=='image/jpeg' || chk[1]=='image/jpg' || chk[1]=='image/png'){
    this.thumbnail.type = chk[1];
    }
    this.dialog.open(this.adddialog,this.course);
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
    this._general.openSnackBar(false, 'Course Created Successfully!', 'OK', 'center', 'top');
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
    this._course.searchcoursequery(obj).subscribe((resp:any)=>{
      this.adjustdata(resp.data);
    });
  }

  adjustdata(data:any){
    this.courses = data;
    this.fetching = false;
    // this.spinner=false;
  }

  toggleView() {
    this.toggleview = !this.toggleview; 
    this._general.setStorage('course_toggle',this.toggleview);
  }

  isNotValid(val:any) {return val.touched && val.invalid && val.dirty && val.errors?.['required'];}
  
  checkpagesettings(value:any,data:any){
    if(value=='preview'){
      var url = 'https://'+data?.domain+'/membership/'+data.user_id+'/'+data.uniqueid;
      window.open(url, '_blank');
    }
  }
}
