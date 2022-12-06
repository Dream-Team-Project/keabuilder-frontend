import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeneralService } from '../_services/_builder/general.service';
import { SectionService } from '../_services/_builder/section.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-builder-topbar',
  templateUrl: './builder-topbar.component.html',
  styleUrls: ['./builder-topbar.component.css', '../builder/material.component.css']
})
export class BuilderTopbarComponent implements OnInit {

  @Output('parentTrigger') parentTrigger: EventEmitter<any> = new EventEmitter();

  topBarLinks = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: 'fa fa-home'
    },
    {
      name: 'Navigation',
      link: '/website/navigation',
      icon: 'fa fa-stream'
    },
    {
      name: 'Headers',
      link: '/website/headers',
      icon: 'far fa-window-maximize'
    },
    {
      name: 'Footers',
      link: '/website/footers',
      icon: 'far fa-window-maximize kb-rev'
    },
    {
      name: 'Website',
      link: '/website',
      icon: 'fa fa-desktop'
    },
    {
      name: 'Funnels',
      link: '/funnels',
      icon: 'fa fa-filter'
    },
    {
      name: 'Membership',
      link: '/membership',
      icon: 'fa fa-shield-alt'
    },
    {
      name: 'Form',
      link: '/forms',
      icon: 'fa fa-address-card'
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
