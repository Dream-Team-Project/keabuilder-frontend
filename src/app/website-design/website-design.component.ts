import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../_services/website.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {FormControl, Validators} from '@angular/forms';
import { WebpagesService } from '../_services/webpages.service';
import { GeneralService } from '../_services/_builderService/general.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../_services/file-upload.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-website-design',
  templateUrl: './website-design.component.html',
  styleUrls: ['./website-design.component.css']
})
export class WebsiteDesignComponent implements OnInit {

  kbwebsite:any[] = [];
  webstatus:any = 'Publish';
  webicon:any = 'fas fa-check mr-2';

  poupsidebar = false;
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
                  console.log(data);
        
                  var genscrn = 'keaimage-'+data.data[0].uniqueid+'-screenshot.png';

                  this.fileuploadService.validateimg(genscrn).subscribe({
                    next: data => {
        
                     if(data.data==1){
                        this.getthumbnail = '/assets/uploads/images/'+genscrn;
                      }
        
                    }
                  });

                }
              });
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
          console.log(data);
          if(data.status==1){
            this._snackBar.open('Status Updated Successfully!', 'Close');
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
    this.poupsidebar = true;
    this.showmytemplates = false;
    this.addnewpagepopup = true;
      this.insidepagefirst = true;
      this.insidepagesecond = false;
    this.selecttemplate = false;

  }

  hidepopupsidebar(){
    this.poupsidebar = false;
  }

  onSubmit(): void {
    const { pagename, pagepath } = this.form;
    
    var author = '';
    if (this.tokenStorage.getToken()) {
      author = this.tokenStorage.getUser().username;
    }

    if(this.userFormControl.status=='VALID'){

      this.webpagesService.validatepages(pagename, pagepath, author).subscribe({
        next: data => {
          console.log(data);

          if(data.found==1){
            this.pathcheck = true;
          }

          if(data.found==0){
            var page = {
              head: '',
              body: '',
              style: '',
              folder: pagepath,
              prevFolder: pagepath
            }
            this._general.fileUploadService.createpage(page).subscribe((event:any) => {
              console.log(event);
            },
            error=>{console.log(error)});
            // create page/folder

            
            this.redirectToBuilder(data.uniqueid);
          }

        }
      });
      
    }

  }
  
  redirectToBuilder(id:any) {
      this.router.navigate(['/builder/website',id])
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
    var weblink = 'http://localhost:4200/assets/keapages/';
    window.open(weblink, '_blank')
  }

}
