import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../_services/website.service';
import { WebpagesService } from '../_services/webpages.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor(private websiteService: WebsiteService, 
              private webpagesService: WebpagesService,
              ) { }

      firstcontainer = true;
      secondcontainer = false;
      addnewpages = true;
      addnewlandingpages = false;
      websitedesigns = false;
      livestatus = false;
      branding_logo = false;
      branding_favicon = false;
      branding_social = false;
      navmainmenu_add = false;
      navfootermenu_add = false;
      addnewautomation = false;
      addnewcampaign = false;
      kbpages:any[] = [];
      kblandingpages:any[] = [];
      navmenu_footer:any[] = [];
      navmenu_header:any[] = [];
      kbwebsite:any[] = [];
      colortheme:any[] = [];

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

  kb_design(){
    this.websitedesigns = true;
    this.addnewpages = false;
    this.addnewlandingpages = false;
    this.addnewautomation = false;
    this.addnewcampaign = false;
  }
  kb_page(){
    this.addnewpages = true;
    this.websitedesigns = false;
    this.addnewlandingpages = false;
    this.addnewautomation = false;
    this.addnewcampaign = false;
  }
  kb_landingpage(){
    this.addnewlandingpages = true;
    this.addnewpages = false;
    this.websitedesigns = false;
    this.addnewautomation = false;
    this.addnewcampaign = false;
  }
  kb_automation(){
    this.addnewautomation = true;
     this.addnewlandingpages = false;
    this.addnewpages = false;
    this.websitedesigns = false;
    this.addnewcampaign = false;
  }
  kb_campaign(){
    this.addnewautomation = false;
     this.addnewlandingpages = false;
    this.addnewpages = false;
    this.websitedesigns = false;
    this.addnewcampaign = true;
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
  backfromsitedetails(){
    this.secondcontainer = false;
    this.firstcontainer = true;

    this.websitedesigns = true;
    this.addnewpages = false;
  }
  seesitedetails(){
    this.secondcontainer = true;
    this.firstcontainer = false;
  }
  navmainmenu_fun(){
    this.navmainmenu_add = !this.navmainmenu_add;
  }
  navfootermenu_fun(){
    this.navfootermenu_add = !this.navfootermenu_add;
  }

}
