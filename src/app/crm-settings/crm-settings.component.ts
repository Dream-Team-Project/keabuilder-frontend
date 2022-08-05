import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-settings',
  templateUrl: './crm-settings.component.html',
  styleUrls: ['./crm-settings.component.css']
})
export class CrmSettingsComponent implements OnInit {

  addnewpages = true;
  popupsidebar = false;
  automationaddnewaction = false;
  kbforsmtp = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  hidepopupsidebar(){
    this.popupsidebar = false;
  }

  addnewcourse(value:string){
    this.popupsidebar = true;
    this.automationaddnewaction = true;
    if(value=='transactional'){
      this.kbforsmtp = false;
    }else if(value=='marketing'){
      this.kbforsmtp = true;
    }
  }

}
