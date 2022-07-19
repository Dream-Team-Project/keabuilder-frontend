import { Component, OnInit } from '@angular/core';
import { WebpagesService } from '../_services/webpages.service';

@Component({
  selector: 'app-website-landingpage',
  templateUrl: './website-landingpage.component.html',
  styleUrls: ['./website-landingpage.component.css']
})
export class WebsiteLandingpageComponent implements OnInit {

  constructor(private webpagesService: WebpagesService) { }

  kbpages:any[] = [];
  kblandingpages:any[] = [];

  ngOnInit(): void {

      // Get Pages & landing page
      this.webpagesService.getWebpages().subscribe({
        next: data => {
          // console.log(data);

          data.data.forEach((element:any) => {
            element.itemshow = false;
            element.dropdownstatus = false;
            
            var mycustomdate =  new Date(element.updated_at);
            var text1 = mycustomdate.toDateString();    
            var text2 = mycustomdate.toLocaleTimeString();
            element.updated_at = text1+' '+text2;

            if(element.type=='page'){
              this.kbpages.push(element);
            }else if(element.type=='landing_page'){
              this.kblandingpages.push(element);
            }
            console.log(this.kbpages);

          });

        },
        error: err => {
          console.log(err);
        }
      });
      
  }



}
