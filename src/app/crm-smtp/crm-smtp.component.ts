import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-smtp',
  templateUrl: './crm-smtp.component.html',
  styleUrls: ['./crm-smtp.component.css']
})
export class CrmSmtpComponent implements OnInit {

  

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