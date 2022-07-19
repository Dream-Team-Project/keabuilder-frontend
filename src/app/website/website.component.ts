import { Component, OnInit } from '@angular/core';
import { WebpagesService } from '../_services/webpages.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private webpagesService: WebpagesService) { }

  kbpages:any[] = [];
  kblandingpages:any[] = [];

  ngOnInit(): void {

    // Get Pages & landing page
    this.webpagesService.getWebpages().subscribe({
      next: data => {
        data.data.forEach((element:any) => {
          element.itemshow = false;
          element.dropdownstatus = false;
          
          var mycustomdate =  new Date(element.updated_at);
          var text1 = mycustomdate.toDateString();    
          var text2 = mycustomdate.toLocaleTimeString();
          element.updated_at = text1+' '+text2;
             this.kbpages.push(element);

          if(element.type=='landing_page'){
             this.kblandingpages.push(element);
          }
          // console.log(this.kbpages);

        });

      },
      error: err => {
        console.log(err);
      }
    });

  }

  redirectToBuilder(id:any) {
      this.router.navigate(['/builder/website',id])
  }

}
