import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-campaigns',
  templateUrl: './crm-campaigns.component.html',
  styleUrls: ['./crm-campaigns.component.css']
})
export class CrmCampaignsComponent implements OnInit {

  automations_campaign:any[] = [
    {
        "id": 1,
        "campaign_name": "Order Summary",
        "campaign_url": "order-summary",
        "domain": null,
        "publish_status": 1,
        "quick_status":"Sent",
        "campaign_sent":"Thu Jan 07 2022 5:09:57 PM",
        "campaign_type":"One-Time",
        "campaign_sent_to":"2,200",
        "thumbnail": "https://sendgrid.com/wp-content/uploads/2019/08/Transactional_DESKTOP.png",
        "updated_at": "Thu Jan 06 2022 5:09:57 PM",
        "entries":'10',
        "itemshow": false,
        "dropdownstatus": false
    },
    {
      "id": 1,
      "campaign_name": "Lead Form Automation",
      "campaign_url": "lead-form",
      "domain": null,
      "publish_status": 0,
      "quick_status":"Scheduled",
      "campaign_sent":"Thu Jan 08 2022 5:09:57 PM",
      "campaign_type":"One-Time",
      "campaign_sent_to":"--",
      "thumbnail": "https://www.smartinsights.com/wp-content/uploads/2014/05/maketing-campaign-plan-template-look-inside.jpg",
      "updated_at": "Thu Jan 06 2022 5:09:57 PM",
      "entries":'2',
      "itemshow": false,
      "dropdownstatus": false
    },
    {
      "id": 1,
      "campaign_name": "Order Confirm",
      "campaign_url": "order-confirm",
      "domain": null,
      "publish_status": 0,
      "quick_status":"Draft",
      "campaign_sent":"Thu Jan 16 2022 5:09:57 PM",
      "campaign_type":"One-Time",
      "campaign_sent_to":"--",
      "thumbnail": "https://stripo.email/photos/shares/Templates/529-Stripo-Pets-Trigger-newsletter-Order-Confirmation-web.png",
      "updated_at": "Thu Jan 06 2022 5:09:57 PM",
      "entries":'2',
      "itemshow": false,
      "dropdownstatus": false
    },
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
