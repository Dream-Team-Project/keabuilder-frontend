import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  kbcourses:any[] = [
    {
        "id": 1,
        "form_name": "My New Form",
        "form_url": "new-form",
        "domain": null,
        "publish_status": 1,
        "actions":"Subscribe to a list",
        "thumbnail": "https://ac-image.s3.amazonaws.com/2/3/0/4/0/2/0/home/_screenshot_/40ba5c5853dc77ab3b1aeb465f4b929e4ca78b4e.png",
        "updated_at": "Thu Jan 06 2022 5:09:57 PM",
        "entries":'500',
        "itemshow": false,
        "dropdownstatus": false
    },
    {
      "id": 1,
      "form_name": "Contact Form",
      "form_url": "contact-form",
      "domain": null,
      "publish_status": 0,
      "actions":"Add a tag",
      "thumbnail": "https://wiseher.img-us3.com/_screenshot_/4203ac06922415b721d34b621f04e9a33e283020.png",
      "updated_at": "Thu Jan 06 2022 5:09:57 PM",
      "entries":'100',
      "itemshow": false,
      "dropdownstatus": false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
