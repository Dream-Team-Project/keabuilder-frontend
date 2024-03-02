import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  set openSidebar(val: any) {
    if(this.connectWtParent) this.toggleSidebar = !this.toggleSidebar;
    else this.connectWtParent = true;
  }   
  bkImg:any = 'url(./assets/images/sidebar/bar-img-left.svg)';
  constructor(public router: Router) { }
  connectWtParent:boolean = false;
  toggleSidebar:boolean = true;
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
      icon_img:'./assets/images/sidebar/dashboard.svg',
      title: 'Dashboard',
      submenu:null
    },{
      0:true,
      routerlink: '/websites',
      img: 'browser.gif',
      icon: 'fas fa-desktop',
      icon_img:'./assets/images/sidebar/website.svg',
      title: 'Websites',
      submenu:[
      {
        0:true,
        routerlink: '/websites/pages',
        img: 'browser.gif',
        icon: 'far fa-window-restore',
        title: 'Pages'
      },
      // {
      //   0:true,
      //   routerlink: '/website/blog',
      //   img: 'browser.gif',
      //   icon: 'far fa-file-alt',
      //   title: 'Blog'
      // },
      {
        0:true,
        routerlink: '/websites/headers',
        img: 'browser.gif',
        icon: 'far fa-window-maximize',
        title: 'Headers'
      },
      {
        0:true,
        routerlink: '/websites/footers',
        img: 'browser.gif',
        icon: 'far fa-window-maximize kb-rev',
        title: 'Footers'
      },
      {
        0:true,
        routerlink: '/websites/navigation',
        img: 'browser.gif',
        icon: 'fas fa-stream',
        title: 'Navigation'
      },
      // {
      //   0:true,
      //   routerlink: '/websites/details',
      //   img: 'browser.gif',
      //   icon: 'fas fa-palette',
      //   title: 'Site Details'
      // },
      // {
      //   0:true,
      //   routerlink: '/websites/marketplace',
      //   img: 'browser.gif',
      //   icon: 'fas fa-store',
      //   title: 'Marketplace'
      // },
      ]
    },{
      0:true,
      routerlink: '/funnels',
      img: 'funnel.gif',
      icon_img:'./assets/images/sidebar/funnel.svg',
      icon: 'fa fa-filter',
      title: 'Funnels',
      submenu:[
        // {
        //   0:true,
        //   routerlink: '/funnels/build',
        //   img: 'funnel.gif',
        //   icon: 'far fa-plus-square',
        //   title: 'Build A Funnel'
        // },
        {
          0:true,
          routerlink: '/funnels/all',
          img: 'funnel.gif',
          icon: 'fa fa-filter',
          title: 'All Funnels'
        },
        {
          0:true,
          routerlink: '/funnels/archive',
          img: 'funnel.gif',
          icon: 'fas fa-archive',
          title: 'Archived'
        },
        // {
        //   0:true,
        //   routerlink: '/funnels/marketplace',
        //   img: 'funnel.gif',
        //   icon: 'fas fa-store',
        //   title: 'Marketplace'
        // }
      ]
    },
    {
      0:true,
      routerlink: '/membership',
      img: 'shield.gif',
      icon_img:'./assets/images/sidebar/membership.svg',
      icon: 'fas fa-shield-alt',
      title: 'Membership',
      submenu:[
        {
          0:true,
          routerlink: '/membership/reports',
          img: 'shield.gif',
          icon: 'fa fa-chart-bar',
          title: 'Reports'
        },
        {
          0:true,
          routerlink: '/membership/courses',
          img: 'shield.gif',
          icon: 'fa-regular fa-folder',
          title: 'Courses'
        },
      //   {
      //   0:true,
      //   routerlink: '/nolink',
      //   img: 'shield.gif',
      //   icon: 'fa fa-file-alt',
      //   title: 'Landing Page'
      // },
      // {
      //   0:true,
      //   routerlink: '/nolink',
      //   img: 'shield.gif',
      //   icon: 'fa fa-file-alt',
      //   title: 'Library Page'
      // },
      // {
      //   0:true,
      //   routerlink: '/membership/offers',
      //   img: 'shield.gif',
      //   icon: 'fa fa-percentage',
      //   title: 'Offers'
      // },
      // {
      //   0:true,
      //   routerlink: '/membership/coupons',
      //   img: 'shield.gif',
      //   icon: 'fa fa-percent',
      //   title: 'Coupons'
      // },
      // {
      //   0:true,
      //   routerlink: '/membership/payments',
      //   img: 'shield.gif',
      //   icon: 'fa fa-dollar-sign',
      //   title: 'Payments'
      // },
      {
        0:true,
        routerlink: '/membership/members',
        img: 'shield.gif',
        icon: 'fa fa-users',
        title: 'Members'
      },
      // {
      //   0:true,
      //   routerlink: '/membership/tags',
      //   img: 'shield.gif',
      //   icon: 'fa fa-tags',
      //   title: 'Tags'
      // },
      // {
      //   0:true,
      //   routerlink: '/membership/marketplace',
      //   img: 'shield.gif',
      //   icon: 'fa fa-shopping-cart',
      //   title: 'Marketplace'
      // },
      {
      0:true,
      routerlink: '/membership/customization',
      img: 'shield.gif',
      icon: 'fa-solid fa-gear',
      title: 'Customization',
    },
    {
      0:true,
      routerlink: '/membership/settings',
      img: 'shield.gif',
      icon: 'fa-solid fa-gears',
      title: 'Settings'
    },
      ]
    },
    // {
    //   0:true,
    //   routerlink: '/payment',
    //   img: 'payment.gif',
    //   icon: 'fa fa-dollar-sign',
    //   title: 'Payment',
    //   submenu:null
    // },
   {
      0:true,
      routerlink: '/crm',
      img: 'hacker.gif',
      icon_img:'./assets/images/sidebar/crm.svg',
      icon: 'fas fa-user-secret',
      title: 'CRM',
      submenu:[
        {
          0:true,
          routerlink: '/crm/reports',
          img: 'hacker.gif',
          icon: 'fa fa-chart-bar',
          title: 'Reports'
        },
        {
          0:true,
          routerlink: '/crm/contacts',
          img: 'hacker.gif',
          icon: 'fa fa-users',
          title: 'Contacts'
        },
        {
          0:true,
          routerlink: '/crm/forms',
          img: 'complete.gif',
          icon: 'fas fa-address-card',
          title: 'Forms',
        },
        {
          0:true,
          routerlink: '/crm/fields',
          img: 'complete.gif',
          icon: 'far fa-check-square',
          title: 'Fields',
        },
        {
          0:true,
          routerlink: '/crm/lists',
          img: 'hacker.gif',
          icon: 'fa fa-list',
          title: 'List'
        },
        {
          0:true,
          routerlink: '/crm/tags',
          img: 'hacker.gif',
          icon: 'fa fa-tags',
          title: 'Tags'
        },
        {
          0:true,
          routerlink: '/crm/automations',
          img: 'hacker.gif',
          icon: 'fa fa-random',
          title: 'Automations'
        },
        {
          0:true,
          routerlink: '/crm/campaigns',
          img: 'hacker.gif',
          icon: 'fa fa-envelope',
          title: 'Campaigns'
        },{
          0:true,
          routerlink: '/crm/emails',
          img: 'hacker.gif',
          icon: 'fa-solid fa-envelope-open-text',
          title: 'Emails'
        },
        {
          0:true,
          routerlink: '/crm/settings',
          img: 'hacker.gif',
          icon: 'fas fa-cogs',
          title: 'Settings'
        },
      ]
    },
    {
      0:true,
      routerlink: '/sales',
      img: 'payment.gif',
      icon_img:'./assets/images/sidebar/sales.svg',
      icon: 'fa fa-tags',
      title: 'Sales',
      submenu:[{
        0:true,
        routerlink: '/sales/offers',
        img: 'payment.gif',
        icon: 'fa fa-percentage',
        title: 'Offers'
      },
        {
        0:true,
        routerlink: '/sales/products',
        img: 'payment.gif',
        icon: 'fa fa-product-hunt',
        title: 'Products'
      }, {
        0:true,
        routerlink: '/sales/orderform',
        img: 'payment.gif',
        icon: 'fa fa-dolly-flatbed',
        title: 'Order Form'
      },{
        0:true,
        routerlink: '/sales/payment',
        img: 'payment.gif',
        icon: 'fa fa-dollar-sign',
        title: 'Payments'
      },
      // {
      //   0:true,
      //   routerlink: '/sales/coupons',
      //   img: 'payment.gif',
      //   icon: 'fa fa-file-alt',
      //   title: 'Coupons'
      // },
      // {
      //   0:true,
      //   routerlink: '/sales/affiliates',
      //   img: 'payment.gif',
      //   icon: 'fas fa-search-dollar',
      //   title: 'Affiliates'
      // },
    ],
  }
  // ,{
  //     0:true,
  //     routerlink: '/payment',
  //     img: 'payment.gif',
  //     icon: 'fa fa-dollar-sign',
  //     title: 'Payment',
  //     submenu:null
  //   }
  ,{
    0:true,
    routerlink: '/domain',
    img: 'worldwide.gif',
    icon_img:'./assets/images/sidebar/domain.svg',
    icon: 'fas fa-globe-americas',
    title: 'Domains',
    submenu:null
  },
    // {
    //   0:true,
    //   routerlink: '/nolink',
    //   img: 'complete.gif',
    //   icon: 'fas fa-address-card',
    //   title: 'Forms',
    //   submenu:null
    // },
    // {
    //   0:true,
    //   routerlink: '/strategies',
    //   img: 'chess.gif',
    //   icon: 'fas fa-chess-knight',
    //   title: 'Strategies',
    //   submenu:null
    // },
    {
      0:true,
      routerlink: '/heatmap',
      img: 'way.gif',
      icon_img:'./assets/images/sidebar/heatmap.svg',
      icon: 'fas fa-fire',
      title: 'HeatMap',
      submenu:null
    },
    // {
    //   0:true,
    //   routerlink: '/analytics',  
    //   img: 'growth.gif',
    //   icon: 'fas fa-chart-pie',
    //   title: 'Analytics',
    //   submenu:null
    // },
    // {
    //   0:true,
    //   routerlink: '/affiliates',
    //   img: 'money-bag.gif',
    //   icon: 'fas fa-search-dollar',
    //   title: 'Affiliates',
    //   submenu:[
    //     {
    //       0:true,
    //       routerlink: '/affiliates-users',
    //       img: 'money-bag.gif',
    //       icon: 'fa fa-users',
    //       title: 'Users'
    //     },{
    //       0:true,
    //       routerlink: '/affiliates-commission',
    //       img: 'money-bag.gif',
    //       icon: 'fas fa-hand-holding-usd',
    //       title: 'Commission Setup'
    //     },{
    //       0:true,
    //       routerlink: '/affiliates-transactions',
    //       img: 'money-bag.gif',
    //       icon: 'fas fa-credit-card',
    //       title: 'Transactions'
    //     },{
    //       0:true,
    //       routerlink: '/affiliates-share',
    //       img: 'money-bag.gif',
    //       icon: 'fas fa-share',
    //       title: 'Share Links'
    //     },{
    //       0:true,
    //       routerlink: '/affiliates-announcements',
    //       img: 'money-bag.gif',
    //       icon: 'fas fa-bullhorn',
    //       title: 'Announcements'
    //     },{
    //       0:true,
    //       routerlink: '/affiliates-exports',
    //       img: 'money-bag.gif',
    //       icon: 'fas fa-file-download',
    //       title: 'Exports'
    //     },{
    //       0:true,
    //       routerlink: '/affiliates-settings',
    //       img: 'money-bag.gif',
    //       icon: 'fas fa-cogs',
    //       title: 'Settings'
    //     }
    //   ]
    // },
    // {
    //   0:true,
    //   routerlink: '/integrations',
    //   img: 'cloud-network.gif',
    //   icon: 'fas fa-cogs',
    //   title: 'Integrations',
    //   submenu:null
    // },
    {
      0:true,
      routerlink: '/scrumboard',
      img: 'worldwide.gif',
      icon_img:'./assets/images/sidebar/scrumboard.svg',
      icon: 'fa-solid fa-chalkboard-user',
      title: 'Scrumboard',
      submenu:null,
    },
    //   submenu:[
    //     {
    //       0:true,
    //       routerlink: '/scrumboard/scrumboardlist',
    //       img: 'worldwide.gif',
    //       icon: 'fa fa-list',
    //       title: 'Scrumboard List'
    //     },
    //     {
    //       0:true,
    //       routerlink: '/scrumboard/createscrumboard',
    //       img: 'worldwide.gif',
    //       icon: 'fa-solid fa-person-chalkboard',
    //       title: 'Create Scrumboard'
    //     },
    //   ]
    // },
    {
      0:true,
      routerlink: '/account',
      img: 'shield.gif',
      icon_img:'./assets/images/sidebar/settings.svg',
      icon: 'fa-solid fa-gear',
      title: 'Account Settings',
      submenu:[
            {
              0:true,
              routerlink: '/account/settings',
              img: 'shield.gif',
              icon: 'fa-regular fa-user',
              title: 'Profile Details'
            },
            {
              0:true,
              routerlink: '/account/sign-in-security',
              img: 'shield.gif',
              icon: 'fa-solid fa-shield-halved',
              title: 'Sign in & Security'
            },
            {
              0:true,
              routerlink: '/account/billing',
              img: 'shield.gif',
              icon: 'fa-regular fa-credit-card',
              title: 'Billing'
            },
            {
              0:true,
              routerlink: '/account/viewplans',
              img: 'shield.gif',
              icon: 'far fa-eye',
              title: 'View Plans'
            },
          ]
    }

  ];
  extramenus = true;
  backme = false;

  ngOnInit(): void {  }
  
  changeFn(link: any) {

    const menuMap:any = {
      '/websites': 1,
      '/funnels': 2,
      '/membership': 3,
      '/crm': 4,
      '/sales': 5,
      // '/scrumboard': 8,
      '/account': 9,
      // '/affiliates': 10,
    };
    
    this.extramenus = false;
    
    const menuIndex = menuMap[link];
    if (menuIndex !== undefined) {

      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });

      this.allmenu[menuIndex][0] = true;
      this.allmenu[menuIndex].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }
  
    this.backme = true;
  
    if (link !== '/funnels' && link !== '/sales' && link !== '/websites' && link !== '/membership' && link !== '/crm' && link !== '/affiliates'  && link !== '/account') {
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

  gotoHelpDocs() {
    window.open('https://help.keabuilder.com','_blank');
  }

}
