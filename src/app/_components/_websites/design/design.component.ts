import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { WebsiteService } from 'src/app/_services/website.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { WebpagesService } from 'src/app/_services/webpages.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { FileUploadService } from 'src/app/_services/file-upload.service';

@Component({
  selector: 'app-website-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css']
})
export class WebsiteDesignComponent implements OnInit {

  kbwebsite:any[] = [];
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  webstatus:any = 'Publish';
  webicon:any = 'fas fa-check mr-2';

  popupsidebar = false;
  addnewpagepopup = false; 
  insidepagefirst = true;
  insidepagesecond = false;
  selecttemplate = false;
  showmytemplates = false;
  pagetemplates:any[] = [{
    id:1,
    title:'The Real Work',
    thumbnail:'https://themewagon.com/wp-content/uploads/2020/12/eflyer.jpg'
  },
  {
    id:2,
    title:'Creation Work',
    thumbnail:'https://assets-global.website-files.com/5e593fb060cf877cf875dd1f/60b6b54cca1a1af1b2a9acea_gallery01.jpeg'
  },
  {
    id:3,
    title:'Home Page',
    thumbnail:'https://freshdesignweb.com/wp-content/uploads/Personal-Website-Templates.jpg'
  },
  {
    id:4,
    title:'About',
    thumbnail:'https://www.theme-junkie.com/wp-content/uploads/Ober-wp-theme.jpg'
  },
  {
    id:5,
    title:'Survey',
    thumbnail:'https://themewagon.com/wp-content/uploads/2020/12/eflyer.jpg'
  }
  ];
  pathcheck = false;
  pathcheck2 = false;
  getthumbnail = '/assets/uploads/images/webpage_thumbnail.jpg';

  constructor(private websiteService: WebsiteService,
              private tokenStorage: TokenStorageService,
              private webpagesService: WebpagesService,
              public _general: GeneralService,
              private router: Router, 
              private route: ActivatedRoute,
              private fileuploadService: FileUploadService,
              private _snackBar: MatSnackBar,) { }

  form: any = {
    pagename: null,
    pagepath:null,
  };
  userFormControl = new FormControl('',[Validators.required]);
  userFormControl2 = new FormControl('',[Validators.required]);


  ngOnInit(): void {

    this.websiteService.getWebsite().subscribe({
      next: data => {
        // console.log(data);
        if(data?.data) {
          if(data.data[0].publish_status==1){
            this.webstatus = 'Publish';
            this.webicon = 'fas fa-check';
          }else{
            this.webstatus = 'Draft';
            this.webicon = 'fas fa-file';
          }
          if(data.data[0].homepage!=null && data.data[0].homepage!=''){
            var pathdata = {path:data.data[0].homepage};
            this.webpagesService.getWebPageByPath(pathdata).subscribe({
              next: data => {
                if(data.data.length != 0){
                  var genscrn = 'keaimage-'+data.data[0].uniqueid+'-screenshot.png';

                  this.fileuploadService.validateimg(genscrn).subscribe({
                    next: data => {
        
                     if(data.data==1){
                        this.getthumbnail = '/assets/uploads/images/'+genscrn;
                      }
        
                    }
                  });
                }
                }
              });
          }
        }
      },
      error: err => {
        console.log(err);
      }
    });

  }

  pubstatus(value:any){

    this.websiteService.setpublishstatus(value).subscribe({
      next: data => {
          // console.log(data);
          if(data.status==1){
            this._snackBar.open('Status Updated Successfully!', 'OK');
          }
      }
    });

      if(value=='publish'){
          this.webstatus = 'Publish';
          this.webicon = 'fas fa-check';
      }if(value=='draft'){
          this.webstatus = 'Draft';
          this.webicon = 'fas fa-file';
      }
  }

  addnewpage(){
    // this.popupsidebar = true;
    this.showmytemplates = false;
    this.addnewpagepopup = true;
      this.insidepagefirst = true;
      this.insidepagesecond = false;
    this.selecttemplate = false;

    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.open = false;
    },this.sidebar.animtime)
  }

  hidepopupsidebar(){
    // this.popupsidebar = false;
    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
    },this.sidebar.animtime)
  }

  onSubmit(): void {
    const { pagename, pagepath } = this.form;
    
    if(this.userFormControl.status=='VALID'){

      var gendata = {name:pagename, path: pagepath, author: '', webid: ''};

      this.webpagesService.validatepages(gendata).subscribe({
        next: data => {
          // console.log(data);

          if(data.found==1){
            this.pathcheck = true;
          }

          if(data.found==0){
            var page = {
              head: '',
              body: '',
              style: '',
              dir: 'drafts',
              folder: pagepath,
              prevFolder: pagepath
            }
            this._general._file.savePage(page).subscribe((event:any) => {
              // console.log(event);
            },
            error=>{console.log(error)});
            // create page/folder

            
            this._general.redirectToBuilder(data.uniqueid, 'website');
          }

        }
      });
      
    }

  }

  createfromscratch(){
    this.showmytemplates = false;
    this.addnewpagepopup = true;
      this.insidepagefirst = false;
      this.insidepagesecond = true;
    this.selecttemplate = false;
  }

  selectfromtemplate(){
    this.selecttemplate = true;
    this.insidepagefirst = false;
    this.insidepagesecond = true;
    this.addnewpagepopup = false;
    this.showmytemplates = true;
  }

  changemyname(event:any){
    // console.log(event.target.value);
    this.form.pagepath = (event.target.value).replaceAll(" ", "-").toLowerCase();
  }

  pathuniqueremove(){
    this.pathcheck = false;
    this.pathcheck2 = false;
  }

  usetemplate(id:any){

  } 

  webpreview(){
    var weblink = window.origin+'/assets/sites/pages/';
    window.open(weblink, '_blank')
  }

}
