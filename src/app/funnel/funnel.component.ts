import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Options } from 'sortablejs';

@Component({
  selector: 'app-funnel',
  templateUrl: './funnel.component.html',
  styleUrls: ['./funnel.component.css']
})
export class FunnelComponent implements OnInit {

  constructor() { }

  funnels = [
    {
      id:'1',  
      name:'Marketing',
      grouptags:'',
      steps:[
          {
          title:'Facebook Campaign 😎',
          updatedat:'Feb 6',
          variation:'1',
          tag:'campaign',
          color:'success',
          img:'https://bootstrapmade.com/content/templatefiles/Reveal/Reveal-bootstrap-website-template.png',
          },
           {
          title:'Social Media Graphics',
          updatedat:'Feb 8',
          variation:'0',
          tag:'graphic, media',
          color:'warning',
          img:'https://bootstrapmade.com/content/templatefiles/OnePage/OnePage-bootstrap-website-template.png',
          },
           {
          title:'Database Management System (DBMS) is a collection of programs',
          updatedat:'Mar 6',
          variation:'1',
          tag:'DBMS, program',
          color:'info',
          img:'https://bootstrapmade.com/content/templatefiles/Bootslander/Bootslander-bootstrap-website-template.png',
          }
      ],
    },
    {
      id:'2',  
      name:'Developing',
      grouptags:'Develop',
      steps:[
          {
          title:'Sales page',
          updatedat:'Feb 6',
          variation:'1',
          tag:'campaign',
          color:'secondary',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          },
          {
          title:'Upsell 1',
          updatedat:'Feb 8',
          variation:'0',
          tag:'graphic, media',
          color:'primary',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          },
          {
          title:'Upsell 2',
          updatedat:'Mar 6',
          variation:'0',
          tag:'graphic, media',
          color:'primary',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          },
          {
          title:'Downsell 1',
          updatedat:'Feb 6',
          variation:'1',
          tag:'DBMS, program',
          color:'info',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          },
          {
          title:'Downsell 2',
          updatedat:'Feb 6',
          variation:'1',
          tag:'DBMS, program',
          color:'danger',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          },
          {
          title:'Thank you',
          updatedat:'Feb 6',
          variation:'1',
          tag:'DBMS, program',
          color:'info',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          }
      ],
    },
    {
      id:'3',  
      name:'Webinar',
      grouptags:'Extra',
      steps:[
          {
          title:'Webinar Registration',
          updatedat:'Feb 6',
          variation:'1',
          tag:'campaign',
          color:'success',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          },
           {
          title:'Webinar Confrimation',
          updatedat:'Feb 8',
          variation:'0',
          tag:'graphic, media',
          color:'primary',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          },
           {
          title:'Thank you',
          updatedat:'Mar 6',
          variation:'1',
          tag:'DBMS, program',
          color:'info',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          }
      ],
    },
    {
      id:'4',  
      name:'kea Ebook',
      grouptags:'webinars',
      steps:[
          {
          title:'kea Customer Optin',
          updatedat:'Feb 6',
          variation:'1',
          tag:'optin',
          color:'danger',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          },
           {
          title:'kea Customer Variation',
          updatedat:'Feb 8',
          variation:'0',
          tag:'variation, media',
          color:'warning',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          },
           {
          title:'Thank you',
          updatedat:'Mar 6',
          variation:'1',
          tag:'DBMS, program',
          color:'secondary',
          img:'https://storage.googleapis.com/website-production/uploads/2018/05/landing-page-wireframe-example-long.jpg',
          }
      ],
    },

]

  ngOnInit(): void {
  }

  parentOptions: Options = {
    group: 'parent',
    scroll: true,
    sort: true,
    // handle: '.kb-handle-section',
    // dragoverBubble: false,
    // fallbackOnBody: false,
    // draggable: "."+this.dragCls,
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      // console.log(event);
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  }; 
  
  childrenOptions: Options = {
    group: 'child',
    scroll: true,
    sort: true,
    // handle: '.kb-handle-section',
    // dragoverBubble: false,
    // fallbackOnBody: false,
    // draggable: "."+this.dragCls,
    scrollSensitivity: 100,
    animation: 300,
    onUpdate: (event: any) => {
      // console.log(event);
    },
    onStart: function (/**Event*/evt) {
      // console.log(evt.oldIndex);  // element index within parent
    },
    onChoose: function (/**Event*/evt) {
      // console.log(evt);
      // this.dragClass = evt.target.getAttribute('NAME');  // element index within parent
    },
  }; 

}


