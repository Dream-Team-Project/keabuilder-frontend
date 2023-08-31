import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
      routerlink: '/websites',
      img: 'browser.gif',
      icon: 'fas fa-desktop',
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
    // {
    //   0:true,
    //   routerlink: '/membership',
    //   img: 'shield.gif',
    //   icon: 'fas fa-shield-alt',
    //   title: 'Membership',
    //   submenu:[{
    //     0:true,
    //     routerlink: '/nolink',
    //     img: 'shield.gif',
    //     icon: 'fa fa-file-alt',
    //     title: 'Landing Page'
    //   },
    //   {
    //     0:true,
    //     routerlink: '/nolink',
    //     img: 'shield.gif',
    //     icon: 'fa fa-file-alt',
    //     title: 'Library Page'
    //   },
    //   {
    //     0:true,
    //     routerlink: '/membership/offers',
    //     img: 'shield.gif',
    //     icon: 'fa fa-percentage',
    //     title: 'Offers'
    //   },
    //   {
    //     0:true,
    //     routerlink: '/membership/coupons',
    //     img: 'shield.gif',
    //     icon: 'fa fa-percent',
    //     title: 'Coupons'
    //   },
    //   {
    //     0:true,
    //     routerlink: '/membership/payments',
    //     img: 'shield.gif',
    //     icon: 'fa fa-dollar-sign',
    //     title: 'Payments'
    //   },
    //   {
    //     0:true,
    //     routerlink: '/membership/members',
    //     img: 'shield.gif',
    //     icon: 'fa fa-users',
    //     title: 'Members'
    //   },
    //   {
    //     0:true,
    //     routerlink: '/membership/tags',
    //     img: 'shield.gif',
    //     icon: 'fa fa-tags',
    //     title: 'Tags'
    //   },
    //   {
    //     0:true,
    //     routerlink: '/membership/marketplace',
    //     img: 'shield.gif',
    //     icon: 'fa fa-shopping-cart',
    //     title: 'Marketplace'
    //   }
    //   ]
    // },
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
      },{
        0:true,
        routerlink: '/sales/payment',
        img: 'payment.gif',
        icon: 'fa fa-dollar-sign',
        title: 'Payments'
      },
      {
        0:true,
        routerlink: '/sales/coupons',
        img: 'payment.gif',
        icon: 'fa fa-file-alt',
        title: 'Coupons'
      },
      {
        0:true,
        routerlink: '/sales/affiliates',
        img: 'payment.gif',
        icon: 'fas fa-search-dollar',
        title: 'Affiliates'
      },
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
    icon: 'fas fa-globe-americas',
    title: 'Domains',
    submenu:null
  },
    {
      0:true,
      routerlink: '/nolink',
      img: 'complete.gif',
      icon: 'fas fa-address-card',
      title: 'Forms',
      submenu:null
    },
    {
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
    },
    {
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
    },
    {
      0:true,
      routerlink: '/integrations',
      img: 'cloud-network.gif',
      icon: 'fas fa-cogs',
      title: 'Integrations',
      submenu:null
    },
    {
      0:true,
      routerlink: '/account',
      img: 'shield.gif',
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
          ]
    }
  ];
  extramenus = true;
  backme = false;

  ngOnInit(): void {  }
  
  changeFn(event:any){

    var myhref = event.currentTarget.attributes["href"].nodeValue;

    if(myhref=='/websites'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[1][0] = true;

      this.allmenu[1].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }else if(myhref=='/funnels'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[2][0] = true;

      this.allmenu[2].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }
    // else if(myhref=='/membership'){

    //   this.extramenus = false;
      
    //   this.allmenu.forEach((element: any) => {
    //     element[0] = false;
    //   });
      
    //   this.allmenu[3][0] = true;

    //   this.allmenu[3].submenu.forEach((element: any) => {
    //     element[0] = false;
    //   });
    // }
    else if(myhref=='/crm'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[3][0] = true;

      this.allmenu[3].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }
    else if(myhref=='/sales'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[4][0] = true;

      this.allmenu[4].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }
    // else if(myhref=='/affiliates'){

    //   this.extramenus = false;
      
    //   this.allmenu.forEach((element: any) => {
    //     element[0] = false;
    //   });
      
    //   this.allmenu[10][0] = true;

    //   this.allmenu[10].submenu.forEach((element: any) => {
    //     element[0] = false;
    //   });
    // }
    else if(myhref=='/account'){

      this.extramenus = false;
      
      this.allmenu.forEach((element: any) => {
        element[0] = false;
      });
      
      this.allmenu[6][0] = true;

      this.allmenu[6].submenu.forEach((element: any) => {
        element[0] = false;
      });
    }

    this.backme = true;
    
    if(myhref!='/funnels' && myhref!='/sales' && myhref!='/websites' && myhref!='/membership' && myhref!='/crm' && myhref!='/affiliates' && myhref!='/account'){
      this.backme = false;
    } 

    // if(myhref=='/affiliates'){
    if(myhref=='/membership' || myhref=='/affiliates'){
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
