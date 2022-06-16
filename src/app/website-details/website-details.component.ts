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
  colortheme:any[] = [];
  navmenu_footer:any[] = [];
  navmenu_header:any[] = [];
  navmainmenu_add = false;
  navfootermenu_add = false;
  branding_logo = false;
  branding_favicon = false;
  branding_social = false;

  constructor(private websiteService: WebsiteService,
              private webpagesService: WebpagesService,) { }

  ngOnInit(): void {

    // Get Pages & landing page
    this.webpagesService.getWebpage().subscribe({
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

    // Get website
    var ftmenu:any = {};
    var ftmenu2:any = {};

    this.websiteService.getWebsite().subscribe({
      next: data => {
        // console.log(data);
          data.data.forEach((element:any) => {
            this.kbwebsite.push(element);

            // colortheme
            this.colortheme = element.color_theme.split(',');

            // navmenu header
            var ttl2 = element.header.split(',');
            ttl2.forEach((element3: any) => {
              ftmenu2 = {};
              ftmenu2.title = element3;
              ftmenu2.pageorpost = 'page';
              this.navmenu_header.push(ftmenu2);
            });

            // navmenu footer
            var ttl = element.footer.split(',');
            ttl.forEach((element2: any) => {
              ftmenu = {};
              ftmenu.title = element2;
              ftmenu.pageorpost = 'page';
              this.navmenu_footer.push(ftmenu);
            });


          });
      },
      error: err => {
        console.log(err);
      }
    });

  }

  navmainmenu_fun(){
    this.navmainmenu_add = !this.navmainmenu_add;
  }
  navfootermenu_fun(){
    this.navfootermenu_add = !this.navfootermenu_add;
  }
  kb_brandinglogo(){
    this.branding_logo = !this.branding_logo;
  }
  kb_brandingfavicon(){
    this.branding_favicon = !this.branding_favicon;
  }
  kb_brandingsocial(){
    this.branding_social = !this.branding_social;
  }


}
