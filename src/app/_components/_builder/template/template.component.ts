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

  searching = false;
  templates:any = [];
  systemplates:any = [];
  deltemplate:any;
  templatename:any;
  website_id:string='';
  defaultcatg:string='sales';
  isActive:boolean=false;
  category:string='sales';
  allmenu:any = [
  { title: 'Sales', name : 'sales'},
  {title: 'Order',name : 'order'},
  {title: 'Upsell',name : 'upsell'},
  {title: 'Downsell',name : 'downsell'},
  { title: 'Webinar', name : 'webinar'},
  {title: 'Optin',name : 'optin'},
  {title: 'Other',name : 'other',},
  ]
  templatenameFormControl = new FormControl('', [Validators.required,Validators.minLength(3),]);
  
  constructor(private _file: FileUploadService,private websiteService: WebsiteService, public _image: ImageService, private dialog: MatDialog, public _general: GeneralService,) { }

  ngOnInit(): void {
    this.fetchTemplates();
    this.fetchsystemTemplates(this.category);
    
  }

  fetchTemplates() {
    this._file.fetchpagetemplates().subscribe((resp:any)=>{
      if(resp.data?.length > 0) this.templates = resp.data;
      else{
        this.templates = resp.data;
      }
    })
  }
  fetchsystemTemplates(value:string) {
    let obj={category  : value};
    this._file.fetchdefaulttemplates(obj).subscribe((resp:any)=>{
      this.category=value;
      if(resp.data?.length > 0)  this.systemplates = resp.data; 
      else{
        this.systemplates = resp.data;
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
      if(resp?.success) {
        this._file.deleteFile(this.deltemplate.uniqueid,'templates').subscribe((resp1:any)=>{
          // console.log(resp1)
          this._general.openSnackBar(false,resp?.message,'Ok','center','top');
          // this.dialog.closeAll();
          this.fetchTemplates();
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

  searchsavedtemplates(search: any, filter: any) {
    this.searching = true;
    var obj = {
      search: search.value,
      filter: filter.value,
      // unique_id:this.unique_id,
    }
    this._file.searchquerysavedtemplates(obj).subscribe((data:any) => {
      this.searching = false;
        if(data.success){ 
          this.templates = data?.data;
        }
        else{
          this.templates=[];
        }
        
    });
    
  }

}
