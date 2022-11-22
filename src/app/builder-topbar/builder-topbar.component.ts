import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../_services/_builder/general.service';
import { SectionService } from '../_services/_builder/section.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-builder-topbar',
  templateUrl: './builder-topbar.component.html',
  styleUrls: ['./builder-topbar.component.css', '../builder/material.component.css']
})
export class BuilderTopbarComponent implements OnInit {

  topBarLinks = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: 'fa-home'
    },
    {
      name: 'Website',
      link: '/website',
      icon: 'fa-desktop'
    },
    {
      name: 'Funnels',
      link: '/funnels',
      icon: 'fa-filter'
    },
    {
      name: 'Membership',
      link: '/membership',
      icon: 'fa-shield-alt'
    },
    {
      name: 'Form',
      link: '/forms',
      icon: 'fa-address-card'
    },
    {
      name: 'Site Details',
      link: '/website/details',
      icon: 'fa fa-palette'
    },
  ]
  
  constructor(
    public _general:GeneralService,
    public _section:SectionService,
    public _image:ImageService,
    ) {}

  ngOnInit(): void {
  }

  redirectToLink(link:string) {
    window.open(window.origin+link, '_blank');
  }

}
