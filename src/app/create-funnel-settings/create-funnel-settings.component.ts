import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-funnel-settings',
  templateUrl: './create-funnel-settings.component.html',
  styleUrls: ['./create-funnel-settings.component.css']
})
export class CreateFunnelSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mainOpen = 'settings';
  tabOpen3 = 'basic';


  kb_mainsteps(value: string) {
    this.mainOpen = value;
  }  

  kb_settingsteps(value: string) {
    this.tabOpen3 = value;
}


}
