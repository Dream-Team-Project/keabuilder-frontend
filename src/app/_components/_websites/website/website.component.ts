import { Component, OnInit } from '@angular/core';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor(public websiteService: WebsiteService,) { }

  ngOnInit(): void {
  }
  resetwebsitename(){
    this.websiteService.websitename='';
  }

}
