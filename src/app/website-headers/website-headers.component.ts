import { Component, OnInit } from '@angular/core';
import { ImageService } from '../_services/image.service';
import { GeneralService } from '../_services/_builder/general.service';

@Component({
  selector: 'app-website-headers',
  templateUrl: './website-headers.component.html',
  styleUrls: ['./website-headers.component.css']
})
export class WebsiteHeadersComponent implements OnInit {

  toggleview1 = true;
  shortwaiting = true;
  kbheaders:any[] = [{
      "id": 14,
      "user_id": "gdc36j95e1507",
      "uniqueid": "eb7357dg35c",
      "page_name": "new",
      "page_title": "new",
      "page_path": "new",
      "page_description": "",
      "page_keywords": "",
      "page_author": "undefined",
      "publish_status": 1,
      "archived": 0,
      "archive_reason": "",
      "thumbnail": "keaimage-eb7357dg35c-screenshot.png",
      "tracking_code": "",
      "updated_at": "Mon Nov 07 2022 3:36:36 PM",
      "created_at": "2022-11-07T10:06:36.000Z",
      "defaulthome": 0
  },{
    "id": 14,
    "user_id": "gdc36j95e1507",
    "uniqueid": "eb7357dg35c",
    "page_name": "new",
    "page_title": "new",
    "page_path": "new",
    "page_description": "",
    "page_keywords": "",
    "page_author": "undefined",
    "publish_status": 1,
    "archived": 0,
    "archive_reason": "",
    "thumbnail": "keaimage-eb7357dg35c-screenshot.png",
    "tracking_code": "",
    "updated_at": "Mon Nov 07 2022 3:36:36 PM",
    "created_at": "2022-11-07T10:06:36.000Z",
    "defaulthome": 0
},{
  "id": 14,
  "user_id": "gdc36j95e1507",
  "uniqueid": "eb7357dg35c",
  "page_name": "new",
  "page_title": "new",
  "page_path": "new",
  "page_description": "",
  "page_keywords": "",
  "page_author": "undefined",
  "publish_status": 1,
  "archived": 0,
  "archive_reason": "",
  "thumbnail": "keaimage-eb7357dg35c-screenshot.png",
  "tracking_code": "",
  "updated_at": "Mon Nov 07 2022 3:36:36 PM",
  "created_at": "2022-11-07T10:06:36.000Z",
  "defaulthome": 0
  }];
  nodata = false;



  constructor(
        public _image: ImageService,
        public _general: GeneralService,
        ) { }

  ngOnInit(): void {
  }

  searchheader(event: Event) {
  }

  togglepageview(){
    this.toggleview1 = !this.toggleview1;
  }

}
