import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affiliate-commission',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css']
})
export class AffiliateCommissionComponent implements OnInit {

  kb_aff_commission:any[] = [
    {
        "id": 1,
        "kb_commission_name": "Lead Magnet: Getting Started With Recording",
        "kb_commission_url": "lead-magnet",
        "domain": null,
        "publish_status": 0,
        "thumbnail": "https://asvs.in/wp-content/uploads/2017/08/dummy.png",
        "offer":'Free',
        "dropdownstatus": false
    },
    {
      "id": 2,
      "kb_commission_name": "Radio Ready Guide Opt In",
      "kb_commission_url": "radio-ready",
      "domain": null,
      "publish_status": 0,
      "thumbnail": "https://asvs.in/wp-content/uploads/2017/08/dummy.png",
      "offer":'$497.00',
      "dropdownstatus": false
    },
    {
      "id": 3,
      "kb_commission_name": "Songwriting + Arranging & Producing",
      "kb_commission_url": "songwriting-arranging",
      "domain": null,
      "publish_status": 0,
      "thumbnail": "https://asvs.in/wp-content/uploads/2017/08/dummy.png",
      "offer":'Free',
      "dropdownstatus": false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
