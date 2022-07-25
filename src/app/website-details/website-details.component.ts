import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../_services/website.service';
import { WebpagesService } from '../_services/webpages.service';

@Component({
  selector: 'app-website-details',
  templateUrl: './website-details.component.html',
  styleUrls: ['./website-details.component.css']
})
export class WebsiteDetailsComponent implements OnInit {

  kbpages:any[] = [];
  kblandingpages:any[] = [];
  kbwebsite:any[] = [];
  pathselected = '';
  pagescriptheader = '';
  pagescriptfooter = '';

  constructor(private websiteService: WebsiteService,
              private webpagesService: WebpagesService,) { }

  ngOnInit(): void {

    // Get Pages & landing page
    this.webpagesService.getWebpages().subscribe({
      next: data => {
        console.log(data);

        this.kbpages = data.data;

        // data.data.forEach((element:any) => {
          
        //   var mycustomdate =  new Date(element.updated_at);
        //   var text1 = mycustomdate.toDateString();    
        //   var text2 = mycustomdate.toLocaleTimeString();
        //   element.updated_at = text1+' '+text2;

        //   this.kbpages.push(element);
          
        //   console.log(this.kbpages);

        // });

      },
      error: err => {
        console.log(err);
      }
    });

    this.websiteService.getWebsite().subscribe({
      next: data => {
        // console.log(data);
          data.data.forEach((element:any) => {
            this.kbwebsite.push(element);

            this.pagescriptheader = element.tracking_header;
            this.pagescriptfooter = element.tracking_footer;

          });
      },
      error: err => {
        console.log(err);
      }
    });

  }

  updatepage(){
    // console.log(this.pathselected);
    // console.log(this.pagescriptheader);
    // console.log(this.pagescriptfooter);

    this.websiteService.updatesiteDetails(this.pathselected, this.pagescriptheader, this.pagescriptfooter).subscribe({
      next: data => {
        console.log(data);
        
      }
    });

  }



}
