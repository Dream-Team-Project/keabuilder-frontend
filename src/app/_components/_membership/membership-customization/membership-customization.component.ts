import { Component, OnInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import { WebpagesService } from 'src/app/_services/webpages.service';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { CourseService } from 'src/app/_services/_membership/course.service';

@Component({
  selector: 'app-membership-customization',
  templateUrl: './membership-customization.component.html',
  styleUrls: ['./membership-customization.component.css']
})
export class MembershipCustomizationComponent implements OnInit {

 
 
  spinner=false;
  kbpages:any[] = [];
  searching:boolean = false;
  togglestatus:any;
  toggleview = true;
  nodata:any;
  domain:any;
  constructor(
    public _image: ImageService,
    public _general: GeneralService,
    public _course: CourseService,) {
      this.toggleview = _general.getStorage('page_toggle');
    
     }
  

  ngOnInit(): void {
    this.showwebpages();
  }

  showwebpages(){
    this.searching = true;
    this.spinner=true;
      this._course.getallMembershippage().subscribe({
        next: data => {
         if(data.success) {
              this.kbpages=data.data;
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
    
    togglepageview(){
      this.toggleview = !this.toggleview; 
      // this._general.setStorage('page_toggle',this.toggleview);
    }

    checkpagesettings(value:any,data:any){
      if(value=='preview'){
        var url = 'https://'+this.domain+'/'+data;
        window.open(url, '_blank');
      }
    }

    searchpages(a:any,b:any,c:any){

    }
  
}
