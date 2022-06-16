import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-settings',
  templateUrl: './crm-settings.component.html',
  styleUrls: ['./crm-settings.component.css']
})
export class CrmSettingsComponent implements OnInit {

  addnewpages = true;
  poupsidebar = false;
  automationaddnewaction = false;
  kbforsmtp = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  hidepopupsidebar(){
    this.poupsidebar = false;
  }

  addnewcourse(value:string){
    this.poupsidebar = true;
    this.automationaddnewaction = true;
    if(value=='transactional'){
      this.kbforsmtp = false;
    }else if(value=='marketing'){
      this.kbforsmtp = true;
    }
  }

}
