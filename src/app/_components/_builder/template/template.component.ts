import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit {

  @Output('closeDialog') closeDialog: EventEmitter<any> = new EventEmitter();
  
  templates:any = [];

  constructor(private _file: FileUploadService, public _image: ImageService) { }

  ngOnInit(): void {
    this.fetchTemplates();
  }

  fetchTemplates() {
    this._file.fetchpagetemplates().subscribe((resp:any)=>{
      if(resp.data?.length > 0) this.templates = resp.data;
    })
  }

}
