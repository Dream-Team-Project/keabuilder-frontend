import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affiliate-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class AffiliateShareComponent implements OnInit {

  sharelinks = [
    {heading:'Lead Magnet: Getting Started with Recording', subheading:'LEAD: Getting Started With Recording', linkname:'Landing Page Link' , clicks:'2351'},
    {heading:'EP Blueprint 2021 Promotion (Private)', subheading:'https://www.myrecordingrevolution.com/ep-blueprint', linkname:'Url Link' , clicks:'1414'},
    {heading:'EP Blueprint 2021 2nd Promotion (Private)', subheading:'LEAD: Getting Started With Recording', linkname:'Landing Page Link' , clicks:'28'},
    {heading:'Perfect Vocal Takes ($76) Sales Page', subheading:'https://www.keabuilder.com/perfect-vocal-takes', linkname:'Url Link' , clicks:'3'},
  ]

  redirectto = '';
  popupsidebar = false;
  affiliatesharenewaction = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  addnewcourse(){
    this.popupsidebar = true;
    this.affiliatesharenewaction = true;
  }

  hidepopupsidebar(){
    this.popupsidebar = false;
  }

}
