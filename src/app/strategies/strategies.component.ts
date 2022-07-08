import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strategies',
  templateUrl: './strategies.component.html',
  styleUrls: ['./strategies.component.css']
})
export class StrategiesComponent implements OnInit {

  strategies_arr = [{
      img: 'https://s3.amazonaws.com/thumbnails.venngage.com/template/27cb6c5b-f905-489b-a8a6-7b8fc5429582.png',
      title: 'Marketing Content',
    },{
      img: 'https://s3.amazonaws.com/thumbnails.venngage.com/template/175e8cb8-44f7-44d5-82ce-2c7e9e26f8ff.png',
      title: 'Business Planning Mind Map',
    },
    {
      img: 'https://99designs-blog.imgix.net/blog/wp-content/uploads/2019/05/pasted-image-0.png',
      title: 'Visual Content',
    },
    {
      img: 'https://community.atlassian.com/t5/image/serverpage/image-id/92624i2157455DA3220DEA/image-size/large?v=v2&px=999',
      title: 'Product Roadmap',
    },
    {
      img: 'https://thumbs.dreamstime.com/b/navigation-roadmap-infographic-timeline-concept-place-data-vector-illustration-navigation-roadmap-infographic-timeline-128813659.jpg',
      title: 'Timeline Infographic',
    },
    {
      img: 'https://thumbs.dreamstime.com/b/infographic-template-steps-modern-timeline-diagram-roadmap-business-presentation-vector-181761380.jpg',
      title: 'Ebook Funnel Strategies',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
