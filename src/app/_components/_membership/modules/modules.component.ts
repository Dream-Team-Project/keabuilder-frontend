import { Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/_services/_membership/course.service';
import { ModuleService } from 'src/app/_services/_membership/module.service';
import { LessonService } from 'src/app/_services/_membership/lesson.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { asapScheduler } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TagService } from 'src/app/_services/_crm/tag.service';
import { ListService } from 'src/app/_services/_crm/list.service';
import { WebsiteService } from 'src/app/_services/website.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-membrship-module',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css','../../_builder/builder-setting/builder-setting.component.css']
})
export class MembershipModulesComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChildren(CdkDropList)
  public dlq: QueryList<CdkDropList>[] = [];
  
  public moddls: CdkDropList[] = [];
  public lesdls: CdkDropList[] = [];

  @ViewChild(TemplateRef)
  _dialogTemplate!: TemplateRef<any>;

  private _overlayRef!: OverlayRef;
  private _portal!: TemplatePortal;

  dragBoxAnime:any = {open: false, close: false};

  course:any = {id:0}
  fetching:any;
  post:any;
  postLoading = true;
  modules:any = []
  thumbnail:any;
  file = null;
  typeerror:string = '';
  index:any = {
    module: 0,
    lesson: 0,
  }
  prevTitle:any = {
    module: '',
    lesson: '',  
  }
  action:string = 'add';
  delReq = 0;
  respWaiting = false;
  popask = 'details';
  delAgree:boolean = false;
  offers = new FormControl();
  offersList: string[] = ['Small Options Big Profits', 'Weekly Option Income Academy'];
  offersToAdd:Array<string> = [];
  delobj:any;
  showcourseoffers:any = [];
  users:any=[];
  tags:any=[];
  lists:Array<any> = [];
  memberslength:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _course: CourseService,
    private _module: ModuleService,
    private _lesson: LessonService,
    private _file: FileUploadService,
    private _snackbar: MatSnackBar,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    public _image: ImageService,
    public _general: GeneralService,
    private _tagService: TagService,
    private _listService: ListService,
    public websiteService: WebsiteService,
    public dialog: MatDialog) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.course.uniqueid = params.get('course_id');
     this.fetchalldata();
    })
   }

  // ng events

  ngOnInit(): void {
    // this._course.single(this.course.uniqueid).subscribe(res=>{
    //     var getofferid = res.data[0].offers;
    //     if(getofferid!=''){
    //       var newob = {id:getofferid};
    //       this._course.getoffersbyids(newob).subscribe(res=>{
    //         // console.log(res);
    //         this.showcourseoffers = res.data;
    //       });
          
    //     }
    // })
    this.fetchcoursemembers();
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

  ngOnDestroy() {
    this._overlayRef.dispose();
  }
  fetchalldata(){
    this.fetchCourse();
    this.fetchPosts();
    this.fetchLists();
    this.fetchTags();
    this.resetPostData();
  }
  fetchcoursemembers(){

  this._course.getcoursemembers({course_id:this.course.uniqueid}).subscribe((data:any)=>{
    // console.log(data)
  this.users=data.data;
})
  }
  searchmembers(search: any, sortInp:any,listInp:any, tagInp:any) {
   
    this.fetching = true;
    var obj = {
      search: search.value,
      sortInp: sortInp.value,
      tagInp: tagInp.value,
      listInp: listInp.value,
      course_id:this.course.uniqueid,
    }
    this._course.searchmembers(obj).subscribe((data:any)=>{
      this.users=data.data;
      this.fetching=false;
    })
  }
  redirectToLesson(tab:number, module:any, lesson:any) {
    var lespath = './module/'+module.uniqueid+'/lesson/'+lesson.uniqueid;
    this.router.navigate([lespath+'/'+tab], {relativeTo: this.route});
  }
  
  fetchTags() {
    this._tagService.fetchtags().subscribe(
      (data) => {
        this.tags = data.data;
  });
}
fetchLists() {
  this._listService.fetchlists().subscribe(
    (data) => {
      this.lists = data.data;
});
}


  //  data fetching

   fetchCourse() {
      this._course.single(this.course.uniqueid).subscribe(res=>{
        this.course = res.data[0];
        this.overlayRefDetach();
      })
   }

   fetchPosts() {
      this.postLoading = true;
      this._module.bycourseid(this.course.uniqueid).subscribe(res=>{
        // console.log(res.data);
        this.adjustdata(res.data);
        var request = 0;
        this.modules.forEach((m:any)=>{
          var paramObj = {
            course_id: m.course_id,
            module_id: m.uniqueid,
          }
          this._lesson.bycourse_moduleid(paramObj).subscribe(res=>{
            m.lessons = res.data;
            if(request == this.modules.length - 1) {
              this.postLoading = false;
              setTimeout((e:any)=>{
                this.setDragDrop();
              })
            }
            request++;
          })
        })
        if(this.modules.length == 0) this.postLoading = false;
      })
    }

  //  data fetching

  // post methods

  resetPostData() {
    this.post = {course_id: this.course.uniqueid, type: '', title:'', description:'', thumbnail: '', publish_status: true};
    this.thumbnail = {name: '', path: '', type: ''};
  }

  addPost() {
    this.respWaiting = true;
    if(this.post.type == 'module') {
      this.addModule();
    }
    else if(this.post.type == 'lesson') {
      this.addLesson();
    }
  }

  updatePost() {
    this.respWaiting = true;
    if(this.post.type == 'module') {
      this.updateModule(this.post, 'details');
      this.modules[this.index.module] = JSON.parse(JSON.stringify(this.post));
    }
    else if(this.post.type == 'lesson') {
      this.updateLesson(this.post, 'details');
      this.modules[this.index.module].lessons[this.index.lesson] = JSON.parse(JSON.stringify(this.post));
    }
    else if(this.post.type == 'course') {
      this.updateCourse(this.post);
    }
    else this.overlayRefDetach();
  }

  deletePost(post:any, type:string, mi:number, li:number,templateRef: TemplateRef<any>) {
    this.popask = 'delete';
    this.index = {
      module: mi,
      lesson: li,
    }
    this.openDialog(post, type,templateRef);
  }

  duplicatePost(post:any, type:string,templateRef: TemplateRef<any>) {
    this.popask = 'duplicate';
    this.openDialog(post, type,templateRef);
  }

  // post methods

  // course methods

  toggleStatus(course:any,action:string) {
    if(action == 'publish')course.publish_status =1; 
    else if(action == 'draft')course.publish_status =0;
    this._course.update(course).subscribe((res:any)=>{
      this._general.openSnackBar(false,'Course has been '+(course.publish_status == 1 ? 'published' : 'draft'), 'OK', 'center', 'top');
    });
  }

  updateCourse(course:any) {
    if(this.thumbnail.type) {
      this.thumbnail.name = 'course-thumbnail-'+course.uniqueid+'.'+this.thumbnail.type;
      course.thumbnail = 'keaimage-'+this.thumbnail.name;
      this._image.timeStamp = (new Date()).getTime();
    }
    course.offers = this.offersToAdd.join(',');
    this._course.update(course).subscribe((res:any)=>{
      if(this.thumbnail.type) this._image.onImageFilefaviconUpload(this.thumbnail);
      this._general.openSnackBar(false,'Course has been updated', 'OK', 'center', 'top');
      this.fetchCourse();
    })
  }

  // course methods

    // module methods

    sortModules() {
      var pos = 0;
      this.modules.forEach((module:any)=>{
        module.sort = pos;
        this.updateModule(module, 'sort');
        pos++;
      })
    }

    updateModuleTitle(module:any) {
      if(this.prevTitle.module != module.title) {
        this.updateModule(module, 'title')
      }
    }

    updateModule(module:any, action:string) {
      if(action == 'details' && this.thumbnail.type) {
          this.thumbnail.name = 'module-thumbnail-'+module.uniqueid+'.'+this.thumbnail.type;
          module.thumbnail = 'keaimage-'+this.thumbnail.name;
      }
      else if(action == 'publish')module.publish_status =1; 
      else if(action == 'draft') module.publish_status =0;
      this._module.update(module).subscribe(res=>{
        if(action == 'details') {
          if(this.thumbnail.type) this._image.onImageFilefaviconUpload(this.thumbnail).then(resp=>{
            this.updateModuleAfterMethod();
          });
          else this.updateModuleAfterMethod();
        }
        else if(action == 'publish' || action == 'draft') {
          this._general.openSnackBar(false,'Module has been '+(module.publish_status == 1 ? 'published' : 'draft'), 'OK', 'center', 'top');
        }
        else if(action == 'title') {
          this._general.openSnackBar(false,'Module title has been updated', 'OK', 'center', 'top');
        }
        else if(action == 'publish' || action == 'draft') {
          this._general.openSnackBar(false,'Module has been '+(module.publish_status == 1 ? 'published' : 'draft'), 'OK', 'center', 'top');
        }
        this.fetchalldata();
      })
    }

    updateModuleAfterMethod() {
      this.overlayRefDetach();          
      this._general.openSnackBar(false,'Module details has been updated', 'OK', 'center', 'top');
    }

    addModule() {
      var module = JSON.parse(JSON.stringify(this.post));
      var newM = module.id ? false : true;
      module.uniqueid = this.getUID();
      module.sort =this.modules?.length > 0 ? this.modules[this.modules.length-1].sort+1 : 0;
      module.publish_status = 1;
      module.user_id=this.course.user_id;
      var imgNObj:any = null;
      if(module.thumbnail) {
        imgNObj = new Object();
        imgNObj.oldname = module.thumbnail;
        module.thumbnail = 'keaimage-module-thumbnail-'+module.uniqueid+'.'+module.thumbnail.split('.')[1];
        imgNObj.newname = module.thumbnail;
      }
      if(this.thumbnail.type) {
        this.thumbnail.name = 'module-thumbnail-'+module.uniqueid+'.'+this.thumbnail.type;
        module.thumbnail = 'keaimage-'+this.thumbnail.name;
      }
      this._module.create(module).subscribe(res=>{
        module.id = res.data.insertId;
        if(res.success) {
          if(this.thumbnail.type) this._image.onImageFilefaviconUpload(this.thumbnail).then(resp=>{
            // this.addModuleAfterMethod(module, newM);
          })
          else if(imgNObj) this._file.copyimage(imgNObj).subscribe(resp=>{
            // this.addModuleAfterMethod(module, newM);
          })
          // else this.addModuleAfterMethod(module, newM);
          this.fetchalldata();
        }
        else {
          this.overlayRefDetach();
        }
      });
    }

    addModuleAfterMethod(module:any, newM:boolean) {
      if(newM) {
        module.lessons = [];
        this.appendModule(module, this.index.module);
        this.overlayRefDetach();
        this._general.openSnackBar(false,'New module has been added', 'OK', 'center', 'top');
      }
      else {
        var request = 0;
        var sorting = 0;
        var lessons = module.lessons;
        lessons.forEach((lesson:any)=>{
          var olduniqueid= lesson.uniqueid;
          lesson.uniqueid = this.getUID();
          lesson.module_id = module.uniqueid;
          lesson.sort = sorting;
          this._lesson.create(lesson).subscribe(res=>{
            lesson.id = res.data.insertId;
            if(olduniqueid) this.duplicateDocuments(lesson.uniqueid,olduniqueid,lesson.user_id);
            if(request == lessons.length - 1) {
              this.appendModule(module, this.index.module);
              this.overlayRefDetach();
              this._general.openSnackBar(false,'Module has been duplicated', 'OK', 'center', 'top');
            }
            request++;
          });
          sorting++;
        })
        if(lessons.length == 0) {
          this.appendModule(module, this.index.module);
          this.overlayRefDetach();
          this._general.openSnackBar(false,'Module has been duplicated', 'OK', 'center', 'top');
        }
      }
    }
  
    duplicateModule(module: any) {
      this.post = JSON.parse(JSON.stringify(module));
      this.addModule();
    }
  
    deleteModule(module:any, mi:number) {
      this._module.delete(module.id).subscribe(res=>{
        if(res.success) {
          if(module.thumbnail) this._file.deleteimage(module.thumbnail);
          var lessons = module.lessons;
          lessons.forEach((lesson:any)=>{
            this.deleteLesson(module, lesson, mi, -1, lessons.length);
            this._file.deletedocumentfolder({uniqueid:lesson.uniqueid}).subscribe((resp)=>{});
          })
          if(lessons.length == 0) {
            this.modules.splice(mi, 1);
            this.sortModules();
            this.overlayRefDetach();
            this._general.openSnackBar(false,'Module has been deleted', 'OK', 'center', 'top');         
          }
        }
      });
    }
  
    appendModule(module: { id: number; type: string; lessons: never[]}, index: number) {
      var tempObj = JSON.parse(JSON.stringify(module));
      this.modules.splice(index+1, 0, tempObj);
      setTimeout((e:any)=>{
        this.setDragDrop();
        this.sortModules();
      })
      this.resetPostData();
      // this.savePageSession();
    }
  
    // module methods

  // lesson methods

  sortLessons() {
    var pos = 0;
    this.modules[this.index.module].lessons.forEach((lesson:any)=>{
      lesson.sort = pos;
      this.updateLesson(lesson, 'sort');
      pos++;
    })
  }

  updateLessonTitle(lesson:any) {
    if(this.prevTitle.lesson != lesson.title) {
      this.updateLesson(lesson, 'title')
    }
  }

  updateLesson(lesson:any, action:string) {
    if(action == 'details' && this.thumbnail.type) {
        this.thumbnail.name = 'lesson-thumbnail-'+lesson.uniqueid+'.'+this.thumbnail.type;
        lesson.thumbnail = 'keaimage-'+this.thumbnail.name;
    }
    else if(action == 'publish') lesson.publish_status = 1;
    else if(action == 'draft') lesson.publish_status = 0;
    
    this._lesson.update(lesson).subscribe(res=>{
      if(action == 'details') {
        if(this.thumbnail.type) this._image.onImageFilefaviconUpload(this.thumbnail).then(resp=>{
          this.updateLessonAfterMethod();
        });
        else this.updateLessonAfterMethod();
      }
      else if(action == 'publish' || action == 'draft') {
        this._general.openSnackBar(false,'Lesson has been '+(lesson.publish_status == 1 ? 'published' : 'draft'), 'OK', 'center', 'top');
      }
      else if(action == 'title') {
        this._general.openSnackBar(false,'Lesson title has been updated', 'OK', 'center', 'top');
      }
      this.fetchalldata();
    })
  }

  updateLessonAfterMethod() {
    this.overlayRefDetach();          
    this._general.openSnackBar(false,'Lesson details has been updated', 'OK', 'center', 'top');
  }

  addLesson() {
    var lesson = JSON.parse(JSON.stringify(this.post));
    var olduniqueid= lesson.id ? lesson.uniqueid : '';
    // console.log(olduniqueid)
    // console.log(lesson)
    var msg = lesson.id ? 'Lesson has been duplicated' : 'New lesson has been added';
    lesson.uniqueid = this.getUID();
    lesson.module_id = this.modules[this.index.module].uniqueid;
    // lesson.sort = this.index.lesson+1;
    // console.log(this.modules[this.index.module].lessons)
    // console.log(this.modules[this.index.module].lessons[this.modules[this.index.module].lessons.length - 1].sort+1)
    lesson.sort= this.modules[this.index.module].lessons?.length > 0 ? this.modules[this.index.module].lessons[this.modules[this.index.module].lessons.length - 1].sort+1 : 0;
    lesson.publish_status = 1;
    lesson.user_id=this.course.user_id;
   if(!lesson.id){
    lesson.content= '';
    lesson.video= '';
    lesson.audio='';
    lesson.download= '';
    lesson.email_subject= '';
    lesson.email_body='';
    lesson.automationid='';
   }
    var imgNObj:any = null;
    if(lesson.thumbnail) {
      imgNObj = new Object();
      imgNObj.oldname = lesson.thumbnail;
      lesson.thumbnail = 'keaimage-module-thumbnail-'+lesson.uniqueid+'.'+lesson.thumbnail.split('.')[1];
      imgNObj.newname = lesson.thumbnail;
    }
    if(this.thumbnail.type) {
      this.thumbnail.name = 'lesson-thumbnail-'+lesson.uniqueid+'.'+this.thumbnail.type;
      lesson.thumbnail = 'keaimage-'+this.thumbnail.name;
    }
    this._lesson.create(lesson).subscribe(res=>{
      lesson.id = res.data.insertId;
      if(res.success) {
        if(olduniqueid) this.duplicateDocuments(lesson.uniqueid,olduniqueid,lesson.user_id);
        if(this.thumbnail.type) this._image.onImageFilefaviconUpload(this.thumbnail).then(resp=>{
          this.addLessonAfterMedhod(lesson, msg);
        })  
        else if(imgNObj) this._file.copyimage(imgNObj).subscribe(resp=>{
          this.addLessonAfterMedhod(lesson, msg);
        })
        // else this.addLessonAfterMedhod(lesson, msg);
        this.fetchalldata();
      }
      else {
        this.overlayRefDetach();
      }
    });
  }

  addLessonAfterMedhod(lesson:any, msg:string) {
    this.appendLesson(lesson, this.index.lesson);
    this.overlayRefDetach();
    this._general.openSnackBar(false,msg, 'OK', 'center', 'top');
  }

  duplicateLesson(lesson: any) {
    this.post = JSON.parse(JSON.stringify(lesson));
    this.addLesson();
  }

  deleteLesson(module:any, lesson:any, mi:number, li:number, len:number) {
    this._lesson.delete(lesson.id).subscribe(res=>{
      if(res.success) {
        this._file.deletedocumentfolder({uniqueid:lesson.uniqueid}).subscribe((resp)=>{});
        if(lesson.thumbnail) this._file.deleteimage(lesson.thumbnail);
        if(li > -1) {
          module.lessons.splice(li, 1);
          this.sortLessons();
          this.overlayRefDetach();
          this._general.openSnackBar(false,'Lesson has been deleted', 'OK', 'center', 'top');
        }
        else if(this.delReq == len-1) {
          this.modules.splice(mi, 1);
          this.sortModules();
          this.delReq = 0;
          this.overlayRefDetach();
          this._general.openSnackBar(false,'Module has been deleted', 'OK', 'center', 'top');
        }
        else this.delReq++;
      }
    });
  }

  appendLesson(lesson: { id: number; type: string; lessons: never[]}, index: number) {
    var tempObj = JSON.parse(JSON.stringify(lesson));
    this.modules[this.index.module].lessons.splice(index+1, 0, tempObj);
    this.resetPostData();
    setTimeout((e:any)=>{
      this.setDragDrop();
      this.sortLessons();
    })
    // this.savePageSession();
  }

  // lesson methods

  // dialog methods

  overlayRefDetach() {
    this._image.timeStamp = (new Date()).getTime();
    this.respWaiting = false;
    this.dragBoxAnime.close = true;
    setTimeout(()=>{
      this._overlayRef.detach();
      this.popask = 'details';
      this.delAgree = false;
      this.resetPostData();
      this.dragBoxAnime.close = false;
    },200);
  }

  openDialog(post:any, type:string, templateRef: TemplateRef<any>,) {
    if(type=='delete') this.delobj=post;
    this.post = JSON.parse(JSON.stringify(post));
    if(this.post.thumbnail) this.thumbnail.path = this._image.uploadImgPath + this.post.thumbnail;
    this.post.type = type;
    if(this.post.offers) this.offersToAdd = this.post.offers?.split(',');
    this.dialog.open(templateRef);
    // this.dragBoxAnime.open = true;
    // this._overlayRef.attach(this._portal);
    // setTimeout(()=>{
    //   this.dragBoxAnime.open = false;
    // },200)
  }

  // dialog methods

  // drag & drop

  setDragDrop() {
    let modldls: CdkDropList[] = [];
    let lesldls: CdkDropList[] = [];
    this.dlq.forEach((dl:any) => {
      if(dl.id.split('-')[0] == 'lessongroup') {
        lesldls.push(dl);
      }
      else {
        modldls.push(dl);
      }
    });

    modldls = modldls.reverse();
    lesldls = lesldls.reverse();

    asapScheduler.schedule(() => { this.moddls = modldls; });
    asapScheduler.schedule(() => { this.lesdls = lesldls; });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      var lesson = event.previousContainer.data[event.previousIndex];
      lesson.module_id = this.modules[this.index.module].uniqueid;
      this.updateLesson(lesson, 'transfer');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    event.container.data[0]?.module_id ? this.sortLessons() : this.sortModules();
  }

  // drag & drop

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

  getUID() {
    return Math.random().toString(20).slice(2);
  }

  searchModules(search: any, filter: any,visibilityInp:any) {
    this.postLoading = true;
        var obj = {
      search: search.value,
      filter: filter.value,
      course_id: this.course.uniqueid,
      visibility:visibilityInp.value,
    }
   
    this._module.searchmodulequery(obj).subscribe((resp:any)=>{
      this.adjustdata(resp.data);
    });
  }
  adjustdata(data:any){
    this.modules = data;
    this.postLoading = false;
  }

  contactIcon(contact:any){
    var fullname = (contact.firstname ? contact.firstname : '') + (contact.lastname ? contact.lastname : '');
    var str = contact.firstname?.charAt(0) + contact.lastname?.charAt(0);
    if(str.length != 2) str = fullname ? fullname.slice(0, 2) : contact.email.slice(0, 2);
    return str.toUpperCase();
  }
  deletemember(){
    var data = {uniqueid:this.delobj.uniqueid,contactid:this.delobj.contactid,name:'',type:'delete'};
        this._course.updatedelmember(data).subscribe({
          next: data => {
            if(data.success){
              this.fetchcoursemembers();
            this._general.openSnackBar(false,'Member Deleted Successfully!', 'Close','center','top');
            }
            else{
              this._general.openSnackBar(true,'Member Not Deleted', 'Close','center','top');
            }
          }
          })
  }

  duplicateDocuments(newid:any,oldid:any,userid:any) {
    let obj={uniqueid:newid,olduniqueid:oldid,user_id:userid}
    this._file.copyfolderDocuments(obj).subscribe((data:any)=>{
      console.log(data)
  })
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
     
      this.thumbnail.name = 'course-thumbnail-'+this.course.uniqueid+'.'+this.thumbnail.type;
      this.course.thumbnail = 'keaimage-'+this.thumbnail.name;
      this.course.subdomain=this.createsubdomainname();
      // console.log(this.course)
      this._course.duplicate(this.course).subscribe((res:any)=>{
        // console.log(res)
        if(res.success==true){
          this.websiteService.oncreatesubdomain(res.subdomain,res.uniqueid).subscribe({next: datanw => {}});
        this._file.validateimg(oldimg).subscribe({
          next: datagen => {
            // console.log(datagen)
            if(datagen.data==1){
              var imgobj  = {oldname:oldimg, newname: this.course.thumbnail};
              this._file.copyimage(imgobj).subscribe({
                next: data => {
                  this._general.prevRoute();
                  this._general.openSnackBar(false, 'Duplicate Course Created Successfully!', 'OK', 'center', 'top');
                  
                }
              });
            }else{
              this._general.prevRoute();
        this._general.openSnackBar(false, 'Duplicate Course Created Successfully!', 'OK', 'center', 'top');
            }
            
          }
        });
      }
      this.fetching = false;
      })
  }
  createsubdomainname(){
    var uniqid = this._general.makeid(15);
    return this.course.title+uniqid;
  }
  GotoUrl(url:any){
    window.open(url,'_blank');
  }
}

