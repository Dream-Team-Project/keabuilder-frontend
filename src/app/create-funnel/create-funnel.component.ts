import { Component, OnInit } from '@angular/core';
import { Options } from 'sortablejs';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-create-funnel',
  templateUrl: './create-funnel.component.html',
  styleUrls: ['./create-funnel.component.css']
})
export class CreateFunnelComponent implements OnInit {
    
  constructor() {}

  createvariation = false;
  automationaddnewaction = true;
  automationaddnewemail = false;
  automationaddnewtext = false;
  poupsidebar = false;
  tabOpen = 'overview';
  tabOpen2 = 0;
  tabOpen3 = 'basic';
  enabled = true;
  steps = [{
          name: "My First Optin",
          id: 0
      },
  ];
  emailoptintemps = [{
      name:"Step 1",
      imgthumb:"/assets/images/funnelpreviewimg/preview1.jpg"
    },
    {
      name:"Blog Render",
      imgthumb:"/assets/images/funnelpreviewimg/preview1.jpg"
    },
    {
      name:"Creative Blog",
      imgthumb:"/assets/images/funnelpreviewimg/preview1.jpg"
    },
    {
      name:"Clean Leanding",
      imgthumb:"/assets/images/funnelpreviewimg/preview1.jpg"
    },
    {
      name:"Big Sale",
      imgthumb:"/assets/images/funnelpreviewimg/preview1.jpg"
    }
  ];
  id = 2;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'campaign'}, {name: 'media'}, {name: 'program'}];


  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
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

  showvariation() {
    this.createvariation = true;
  }
  hidevariation() {
      this.createvariation = false;
  }
  totalmy() {
      var thsvalue = (<HTMLInputElement>document.getElementById('kb-splittestmake')).value;
      (<HTMLInputElement>document.getElementById('kb-changemyprogress')).style.width = thsvalue + '%';

      (<HTMLElement>document.getElementById('kb-control')).innerHTML = thsvalue + '%';
      (<HTMLElement>document.getElementById('kb-variation')).innerHTML = (100 - parseInt(thsvalue)) + '%';

  }
  automation_show(value: string) {
      if (value == 'action') {
          this.automationaddnewaction = true;
          this.automationaddnewemail = false;
          this.automationaddnewtext = false;
      } else if (value == 'email') {
          this.automationaddnewaction = false;
          this.automationaddnewemail = true;
          this.automationaddnewtext = false;
      } else if (value == 'sms') {
          this.automationaddnewaction = false;
          this.automationaddnewemail = false;
          this.automationaddnewtext = true;
      }
      this.poupsidebar = true;
  }
  hidepopupsidebar() {
      this.poupsidebar = false;
  }
  kb_substeps(value: string) {
      this.tabOpen = value;
  }
  kb_substeps2(value: number) {
      this.tabOpen2 = value;
  }
  addsteps() {
      this.steps.push({
          name: "New Step",
          id: this.id++
      });
  }

}
