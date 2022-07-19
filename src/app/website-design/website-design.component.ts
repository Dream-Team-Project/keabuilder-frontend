import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../_services/website.service';

@Component({
  selector: 'app-website-design',
  templateUrl: './website-design.component.html',
  styleUrls: ['./website-design.component.css']
})
export class WebsiteDesignComponent implements OnInit {

  kbwebsite:any[] = [];
  webstatus:any = 'Publish';
  webicon:any = 'fas fa-check mr-2';

  constructor(private websiteService: WebsiteService,) { }

  ngOnInit(): void {

    this.websiteService.getWebsite().subscribe({
      next: data => {
        // console.log(data);
          data.data.forEach((element:any) => {
            this.kbwebsite.push(element);
          });

      },
      error: err => {
        console.log(err);
      }
    });

  }

  pubstatus(value:any){
      if(value=='publish'){
          this.webstatus = 'Publish';
          this.webicon = 'fas fa-check';
      }if(value=='draft'){
          this.webstatus = 'Draft';
          this.webicon = 'fas fa-file';
      }
  }

}
