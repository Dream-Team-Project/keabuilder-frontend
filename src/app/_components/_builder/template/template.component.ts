import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import { ImageService } from 'src/app/_services/image.service';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit {

  @Output('closeDialog') closeDialog: EventEmitter<any> = new EventEmitter();
  @Output('createDialog') createDialog: EventEmitter<any> = new EventEmitter();

  templates:any = [];
  systemplates:any = [];
  deltemplate:any;
  templatename:any;
  website_id:any='';
  templatenameFormControl = new FormControl('', [Validators.required,Validators.minLength(3),]);
  
  constructor(private _file: FileUploadService,private websiteService: WebsiteService, public _image: ImageService, private dialog: MatDialog, private _general: GeneralService,) { }

  ngOnInit(): void {
    this.fetchTemplates();
    
  }

  fetchTemplates() {
    this._file.fetchpagetemplates().subscribe((resp:any)=>{
      if(resp.data?.length > 0) this.templates = resp.data;
      else{
        this.templates = resp.data;
      }
    })
  }
  openDialog(templateRef: TemplateRef<any>, template: any) {
    this.templatename=template.name;
    this.deltemplate=template;
    this.dialog.open(templateRef).afterClosed().subscribe((data:any) => {
    this.deltemplate=[];
    this.templatename='';
    })
  }
  deleteTemplate(){
    this._file.deletepagetemplate(this.deltemplate.id).subscribe((resp:any)=>{
      // console.log(resp)
      if(resp?.success) {
        this._file.deleteFile(this.deltemplate.uniqueid,'templates').subscribe((resp1:any)=>{
          // console.log(resp1)
          if(resp1?.success) {
            this._general.openSnackBar(false,resp?.message,'Ok','center','top');
            // this.dialog.closeAll();
            this.fetchTemplates();
          }
        })
    }

    })
  };
  updateTemplate(){
    this.deltemplate.name=this.templatename;
    this._file.updatepagetemplate(this.deltemplate).subscribe((resp:any)=>{
      if(resp.success) {
      this.fetchTemplates();
      this._general.openSnackBar(false,resp.message,'Ok','center','top');
      }
    })
  }

  templatepreview(template:any){
// this._file.getPreview()
  }
  // copytemplate(){
  //   // let 
  //   this._file.copyFile
  // }
  
}
