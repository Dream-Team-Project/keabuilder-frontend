import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../_services/website.service';

@Component({
  selector: 'app-website-design',
  templateUrl: './website-design.component.html',
  styleUrls: ['./website-design.component.css']
})
export class WebsiteDesignComponent implements OnInit {

  livestatus = false;
  kbwebsite:any[] = [];
  colortheme:any[] = [];
  navmenu_footer:any[] = [];
  navmenu_header:any[] = [];

  constructor(private websiteService: WebsiteService,) { }

  ngOnInit(): void {

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

}
