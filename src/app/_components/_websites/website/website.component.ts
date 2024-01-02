import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
   
  constructor(public websiteService: WebsiteService,public router: Router) { }

  ngOnInit(): void {
  }
  resetwebsitename(){
    this.websiteService.websitename='';
  }
  isButtonDisabled(route: string): boolean {
    return this.router.isActive(route, true);
}
}
