import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funnel-marketplace',
  templateUrl: './funnel-marketplace.component.html',
  styleUrls: ['./funnel-marketplace.component.css']
})
export class FunnelMarketplaceComponent implements OnInit {

  automations:any[] = [
    {
      "id": 1,
      "funnel_name": "Business Mindset",
      "thumbnail": "https://i.pinimg.com/originals/22/3c/7a/223c7a6929c1cd00e7a1e54b5f8c0235.png",
      "updated_at": "May 06 2022 5:09:57 PM",
      "total_pages":'4',
    },
    {
      "id": 2,
      "funnel_name": "Lead Generate",
      "thumbnail": "https://static.wixstatic.com/media/72c0b2_507aa1ca140f42739ac20c11e99b08fe~mv2.jpg",
      "updated_at": "Jun 06 2022 5:09:57 PM",
      "total_pages":'5',
    },
    {
      "id": 3,
      "funnel_name": "Survey Special",
      "thumbnail": "https://i.pinimg.com/originals/99/75/b9/9975b9bcc43faba2ba765b94a2718158.png",
      "updated_at": "July 06 2022 5:09:57 PM",
      "total_pages":'6',
    }


  ];

  constructor() { }

  ngOnInit(): void {
  }

}
