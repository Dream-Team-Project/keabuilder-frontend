import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {

  automations:any[] = [
    {
        "id": 1,
        "automation_name": "Business Mindset",
        "automation_url": "business-mindset",
        "domain": null,
        "publish_status": 1,
        "automation_campaigns":"5",
        "thumbnail": "https://wiseher.img-us3.com/_screenshot_/679a821dafa146fd2daa614677bca468bd55e935.png",
        "updated_at": "Thu Jan 06 2022 5:09:57 PM",
        "entries":'10',
        "itemshow": false,
        "dropdownstatus": false
    },
    {
      "id": 1,
      "automation_name": "Lead Form Automation",
      "automation_url": "lead-form",
      "domain": null,
      "publish_status": 0,
      "automation_campaigns":"3",
      "thumbnail": "https://ac-image.s3.amazonaws.com/2/3/0/4/0/2/0/home/_screenshot_/92aa52b35b8f0fc713d7f07e44d174c4ce31537f.png",
      "updated_at": "Thu Jan 06 2022 5:09:57 PM",
      "entries":'2',
      "itemshow": false,
      "dropdownstatus": false
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
