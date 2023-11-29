import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { CourseService } from 'src/app/_services/_membership/course.service';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css']
})
export class CourseSettingsComponent implements OnInit {

  
  allpages:any[] = [];
  kbpages:any;
  pagescriptheader = '';
  pagescriptfooter = '';
  file = null;
  typeerror = '';
  typeerror2 = '';
  defaultimgpath = '/assets/images/website/default-file-upload-image.png';
  logoimg:any = this.defaultimgpath;
  faviconimg:any = this.defaultimgpath;
  logoimgname = '';
  faviconimgname = '';
  imagelogorequest = false;
  imagefaviconrequest = false;
  windoworigin = window.origin;
  tagstyle = 'Place CSS inside the style tag <style></style> and place JS inside the script tag <script></script>.';
  userid = '';
  searching = false;
  websitetitle = '';
  spinner=false;
  nodata:any;
  page_path:any='';
  page:any='';


  constructor(
    public _image: ImageService,
    public _general: GeneralService,
    public _course: CourseService,) {
      this.showwebpages();
    
     }
  
     ngOnInit(): void {
    }


  showwebpages(){
    this.searching = true;
    this.spinner=true;
      this._course.getallMembershippage().subscribe({
        next: data => {
         if(data.success) {
              this.allpages=data.data;
              this.searching = false;
        }
        else{
          this.nodata=true;
          this.searching = false;
        }
         
          
        },
        error: err => {
          // console.log(err);
        }
      });
    }
    
  // viewsite(){
  //   var url = 'https://'+this.domainselected;
  //   window.open(url, '_blank');
  // }

  updatepage(){
    this.searching = true;
    if(this.kbpages?.length > 0){
      this.kbpages[0].tracking_header =this._general.encodeData(this.pagescriptheader);
      this.kbpages[0].tracking_footer=this._general.encodeData(this.pagescriptfooter);
      var splnmlogo = 'logo-'+this.kbpages[0].uniqueid+'.png';  
      var splnmfavi = 'favicon-'+this.kbpages[0].uniqueid+'.png';  
      
      var genobjlogo:any = {path:this.logoimg, name:splnmlogo};
      var genobjfavicon:any = {path:this.faviconimg, name:splnmfavi};
      this.kbpages[0].logo=splnmlogo;
      this.kbpages[0].favicon=splnmfavi;
    // console.log(this.kbpages[0])
    this._course.updatemembershiploginpage(this.kbpages[0]).subscribe({
      next: data => { 
        if(data.success){    
          this.searching = false;
        if(this.imagelogorequest == true ){
          this._image.onImageFilefaviconUpload(genobjlogo);
        }
    
        if(this.imagefaviconrequest == true){
          this._image.onImageFilefaviconUpload(genobjfavicon);
        }
        this._general.openSnackBar(false,'Details Updated Successfully', 'OK','center','top');
      }
    }
    });

  }
  else{
    this.searching = false;
    this._general.openSnackBar(true,'Please select page first', 'OK','center','top');
  }
  }
  changeme (event:any) {
    var outsidethis:any = this;
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;

    var getname = (event.target.files[0].name);
    this.logoimgname = this.generatename(getname);

    // //console.log(this.logoimgname);

    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.typeerror = '';
      var fileReader = new FileReader();
      
      fileReader.readAsDataURL(this.file);
      fileReader.addEventListener("load", function (readerEvt:any) {
        outsidethis.logoimg = this.result;
      });    
      this.imagelogorequest = true;
    }else{
      this.logoimg = this.defaultimgpath;
      this.typeerror = 'File Type Not Allow';
      this.imagelogorequest = false;
    }

  }

  generatename(value:any){
    var extn = value.split(/[. ]+/).pop();
    // var newvl = value.split('.'+extn)
    // var setname = (newvl[0].toLowerCase()).replaceAll(" ","-");
    // var unqueid = Math.random().toString(20).slice(2);
    // return setname+'-'+unqueid+'.'+extn;

    return '.'+extn;

  }

  OnOpen(){
    (<HTMLInputElement>document.getElementById('fileElemlogo')).click();
  }

  changeme2 (event:any) {
    var outsidethis:any = this;
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;

    var getname = (event.target.files[0].name);
    this.faviconimgname = this.generatename(getname);

    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.typeerror = '';
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.addEventListener("load", function () {
        outsidethis.faviconimg = this.result;
      });    
      this.imagefaviconrequest = true;
    }else{
      this.faviconimg = this.defaultimgpath;
      this.typeerror2 = 'File Type Not Allow';
      this.imagefaviconrequest = false;
    }

  }

  OnOpen2(){
    (<HTMLInputElement>document.getElementById('fileElemfavicon')).click();
  }

  selectedpage(event:any) {
    console.log(event)
    let temp=event;
    this.kbpages=[];
    this.kbpages.push(event);
    this.page_path=temp.page_path;
    this.pagescriptheader=this._general.decodeData(temp.tracking_header);
    this.pagescriptfooter=this._general.decodeData(temp.tracking_footer);
    this.faviconimg= temp.favicon ? this._image.uploadImgPath+temp.favicon : this.defaultimgpath;
    this.logoimg= temp.logo ? this._image.uploadImgPath+temp.logo : this.defaultimgpath;
    // console.log(this.faviconimg)
  }

}
