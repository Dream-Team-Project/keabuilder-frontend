import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router) { }

  fullsidebar = true;
  hoveropen = false;
  isOpen = false;
  isOpen2 = false;
  isOpen3 = false;

  

  allmenu:any = [
    {
      0:true,
      routerlink: '/dashboard',
      img: 'home.gif',
      icon: 'fa fa-home',
      title: 'Dashboard',
      submenu:null
    },{
      0:true,
      routerlink: '/funnels',
      img: 'funnel.gif',
      icon: 'fa fa-filter',
      title: 'Funnels',
      submenu:[{
          0:true,
          routerlink: '/funnels/build',
          img: 'funnel.gif',
          icon: 'far fa-plus-square',
          title: 'Build A Funnel'
        },
        {
          0:true,
          routerlink: '/funnels/archieve',
          img: 'funnel.gif',
          icon: 'fas fa-archive',
          title: 'Archived'
        },
        {
          0:true,
          routerlink: '/funnels/marketplace',
          img: 'funnel.gif',
          icon: 'fas fa-store',
          title: 'Marketplace'
        }]
    },{
      0:true,
      routerlink: '/website',
      img: 'browser.gif',
      icon: 'fas fa-desktop',
      title: 'Website',
      submenu:[
      {
        0:true,
        routerlink: '/website/pages',
        img: 'browser.gif',
        icon: 'far fa-window-restore',
        title: 'Pages'
      },
      {
        0:true,
        routerlink: '/nolink',
        img: 'browser.gif',
        icon: 'far fa-file-alt',
        title: 'Blog'
      },
      {
        0:true,
        routerlink: '/website/details',
        img: 'browser.gif',
        icon: 'fas fa-pencil-alt',
        title: 'Site Details'
      },{
        0:true,
        routerlink: '/nolink',
        img: 'browser.gif',
        icon: 'fas fa-store',
        title: 'Marketplace'
      },
      ]
    },{
      0:true,
      routerlink: '/membership',
      img: 'shield.gif',
      icon: 'fas fa-shield-alt',
      title: 'Membership',
      submenu:[{
        0:true,
        routerlink: '/nolink',
        img: 'browser.gif',
        icon: 'fa fa-file-alt',
        title: 'Landing Page'
      },
      {
        0:true,
        routerlink: '/nolink',
        img: 'browser.gif',
        icon: 'fa fa-file-alt',
        title: 'Library Page'
      },
      {
        0:true,
        routerlink: '/membership/offers',
        img: 'browser.gif',
        icon: 'fa fa-percentage',
        title: 'Offers'
      },
      {
        0:true,
        routerlink: '/membership/coupons',
        img: 'browser.gif',
        icon: 'fa fa-percent',
        title: 'Coupons'
      },
      {
        0:true,
        routerlink: '/membership/payments',
        img: 'browser.gif',
        icon: 'fa fa-dollar-sign',
        title: 'Payments'
      },
      {
        0:true,
        routerlink: '/membership/members',
        img: 'browser.gif',
        icon: 'fa fa-users',
        title: 'Members'
      },
      {
        0:true,
        routerlink: '/nolink',
        img: 'browser.gif',
        icon: 'fa fa-shopping-cart',
        title: 'Marketplace'
      }
      ]
    },{
      0:true,
      routerlink: '/forms',
      img: 'complete.gif',
      icon: 'fas fa-address-card',
      title: 'Forms',
      submenu:null
    },{
      0:true,
      routerlink: '/domain',
      img: 'worldwide.gif',
      icon: 'fas fa-globe-americas',
      title: 'Domains',
      submenu:null
    },{
      0:true,
      routerlink: '/crm',
      img: 'hacker.gif',
      icon: 'fas fa-user-secret',
      title: 'CRM',
      submenu:[{
          0:true,
          routerlink: '/crm',
          img: 'hacker.gif',
          icon: 'fa fa-random',
          title: 'Automations'
        },
        {
          0:true,
          routerlink: '/crm-campaigns',
          img: 'hacker.gif',
          icon: 'fa fa-envelope',
          title: 'Campaigns'
        },
        {
          0:true,
          routerlink: '/no-link',
          img: 'hacker.gif',
          icon: 'fa fa-bars',
          title: 'Pipelines'
        },{
          0:true,
          routerlink: '/crm-contacts',
          img: 'hacker.gif',
          icon: 'fa fa-users',
          title: 'Contacts'
        },{
          0:true,
          routerlink: '/crm-lists',
          img: 'hacker.gif',
          icon: 'fa fa-list',
          title: 'List'
        },{
          0:true,
          routerlink: '/crm-tags',
          img: 'hacker.gif',
          icon: 'fa fa-tags',
          title: 'Tags'
        },{
          0:true,
          routerlink: '/crm-reports',
          img: 'hacker.gif',
          icon: 'fa fa-chart-bar',
          title: 'Reports'
        }
      ]
    },{
      0:true,
      routerlink: '/strategies',
      img: 'chess.gif',
      icon: 'fas fa-chess-knight',
      title: 'Strategies',
      submenu:null
    },{
      0:true,
      routerlink: '/heatmap',
      img: 'way.gif',
      icon: 'fas fa-fire',
      title: 'HeatMap',
      submenu:null
    },{
      0:true,
      routerlink: '/analytics',  
      img: 'growth.gif',
      icon: 'fas fa-chart-pie',
      title: 'Analytics',
      submenu:null
    },{
      0:true,
      routerlink: '/affiliates',
      img: 'money-bag.gif',
      icon: 'fas fa-search-dollar',
      title: 'Affiliates',
      submenu:[
        {
          0:true,
          routerlink: '/affiliates-users',
          img: 'money-bag.gif',
          icon: 'fa fa-users',
          title: 'Users'
        },{
          0:true,
          routerlink: '/affiliates-commission',
          img: 'money-bag.gif',
          icon: 'fas fa-hand-holding-usd',
          title: 'Commission Setup'
        },{
          0:true,
          routerlink: '/affiliates-transactions',
          img: 'money-bag.gif',
          icon: 'fas fa-credit-card',
          title: 'Transactions'
        },{
          0:true,
          routerlink: '/affiliates-share',
          img: 'money-bag.gif',
          icon: 'fas fa-share',
          title: 'Share Links'
        },{
          0:true,
          routerlink: '/affiliates-announcements',
          img: 'money-bag.gif',
          icon: 'fas fa-bullhorn',
          title: 'Announcements'
        },{
          0:true,
          routerlink: '/affiliates-exports',
          img: 'money-bag.gif',
          icon: 'fas fa-file-download',
          title: 'Exports'
        },{
          0:true,
          routerlink: '/affiliates-settings',
          img: 'money-bag.gif',
          icon: 'fas fa-cogs',
          title: 'Settings'
        }
      ]
    },{
      0:true,
      routerlink: '/payment',
      img: 'payment.gif',
      icon: 'fa fa-dollar-sign',
      title: 'Payment',
      submenu:null
    },{
      0:true,
      routerlink: '/integrations',
      img: 'cloud-network.gif',
      icon: 'fas fa-cogs',
      title: 'Integrations',
      submenu:null
    }
  ];

  extramenus = true;
  backme = false;

  ngOnInit(): void {  }
  
  changeFn(event:any){

    var myhref = event.currentTarget.attributes["href"].nodeValue;

    if(myhref=='/funnels'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[1][0] = true;

      this.allmenu[1].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }else if(myhref=='/website'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[2][0] = true;

      this.allmenu[2].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }else if(myhref=='/membership'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[3][0] = true;

      this.allmenu[3].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }else if(myhref=='/crm'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[6][0] = true;

      this.allmenu[6].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }else if(myhref=='/affiliates'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[10][0] = true;

      this.allmenu[10].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }

    this.backme = true;
    
    if(myhref!='/funnels' && myhref!='/website' && myhref!='/membership' && myhref!='/crm' && myhref!='/affiliates'){
      this.backme = false;
    }

  }

  backFn(event:any){

    this.allmenu.forEach((element: any) => {
      element[0] = true;

      if(element.submenu!=null){
        element.submenu.forEach((element2: any) => {
          element2[0] = true;
        });
      }
    });
    this.extramenus = true;
    this.backme = false;

  }

}
