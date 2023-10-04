import { Component, OnInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import { WebpagesService } from 'src/app/_services/webpages.service';
import { ImageService } from 'src/app/_services/image.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';






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
  
  constructor(private webpagesService: WebpagesService,
    public _image: ImageService,
    public _general: GeneralService,) {
      this.toggleview = _general.getStorage('page_toggle');
    
     }
  

  ngOnInit(): void {
    this.showwebpages();
  }

  showwebpages(){
    this.searching = true;
    this.spinner=true;
      this.webpagesService.getWebpages().subscribe({
        next: data => {
         if(data?.data?.length > 0) {
          data.data.forEach((element :any) => {
            element.pages.map((page:any) => {
              this.kbpages.push(page);
            })
            
          })
        }
        else{
          this.nodata=true;
        }
         
          this.searching = false;
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

    searchpages(a:any,b:any,c:any){

    }
  
}
