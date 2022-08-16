import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../_services/_builder/general.service';
import { ImageService } from '../_services/image.service';
import { StyleService } from '../_services/_builder/style.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css', '../builder/builder.component.css']
})
export class ImageComponent implements OnInit {

  constructor(public _general:GeneralService, public _image:ImageService, public _style:StyleService) { }

  ngOnInit(): void {
  }

}
