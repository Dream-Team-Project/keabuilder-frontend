import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  kbcourses:any[] = [
    {
        "id": 1,
        "page_name": "Online Course",
        "page_url": "online-course",
        "type": "course",
        "domain": null,
        "publish_status": 1,
        "thumbnail": "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/1787228/settings_images/LIp27aPmRDqDOh5iXGtw_maxresdefault_2.jpg",
        "tracking_code": null,
        "updated_at": "Thu Jan 06 2022 5:09:57 PM",
        "members":'1678',
        "itemshow": false,
        "dropdownstatus": false
    },
    {
        "id": 2,
        "page_name": "Childcare Success",
        "page_url": "childcare-success",
        "type": "page",
        "domain": null,
        "publish_status": 0,
        "thumbnail": "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/site/2147536276/products/lUCGJXzYSNCTkSHMhn67_CS-product-logo.png",
        "tracking_code": null,
        "updated_at": "Thu Jan 06 2022 5:10:00 PM",
        "members":'1050',
        "itemshow": false,
        "dropdownstatus": false
    },
    {
        "id": 2,
        "page_name": "Master Motion",
        "page_url": "master-motion",
        "type": "page",
        "domain": null,
        "publish_status": 0,
        "thumbnail": "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2148573797/settings_images/NutQYO5pQOGhp63Zplfh_main_4k_3840.jpg",
        "tracking_code": null,
        "updated_at": "Thu Jan 06 2022 5:10:00 PM",
        "members":'500',
        "itemshow": false,
        "dropdownstatus": false
    }

    
  ];
  addnewpages = true;
  poupsidebar = false;
  automationaddnewaction = false;
  file = null;
  typeerror = '';
  offers = new FormControl();
  offersList: string[] = ['Small Options Big Profits', 'Weekly Option Income Academy'];


  constructor() { }

  ngOnInit(): void {
  }

  hidepopupsidebar(){
    this.poupsidebar = false;
  }

  addnewcourse(){
    this.poupsidebar = true;
    this.automationaddnewaction = true;
  }

  OnOpen(){
    (<HTMLInputElement>document.getElementById('fileElem')).click();
  }

  compareImgRepeat(imgR1:any, imgR2:any) {
    return imgR1.value === imgR2.value && imgR1.viewValue === imgR2.viewValue;
  }
  
  changeme (event:any) {
    
    var imgPreview = (<HTMLElement>document.getElementById("img-preview"));

    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;

    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.typeerror = '';
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.addEventListener("load", function () {
        imgPreview.style.display = "block";
        imgPreview.innerHTML = '<img class="img-fluid" src="' + this.result + '" />';
      });    
    }else{
      imgPreview.innerHTML = '';
      this.typeerror = 'File Type Not Allow';
    }

  }


}