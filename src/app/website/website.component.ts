import { Component, OnInit } from '@angular/core';
import { WebpagesService } from '../_services/webpages.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { ImageService } from '../_services/image.service';
import {FormControl, Validators} from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { GeneralService } from '../_services/_builderService/general.service';
import { FileUploadService } from '../_services/file-upload.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor(private webpagesService: WebpagesService,
              private _snackBar: MatSnackBar,
              private router: Router, 
              private route: ActivatedRoute,
              public _image: ImageService,
              private tokenStorage: TokenStorageService,
              public _general: GeneralService,
              private fileuploadService: FileUploadService ) { }

  form: any = {
    pagename: null,
    pagepath:null,
  };
  userFormControl = new FormControl('',[Validators.required ]);
  userFormControl2 = new FormControl('',[Validators.required ]);

  kbpages:any[] = [];
  poupsidebar = false;
  quickeditpopup = true;
  addnewpagepopup = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keywords:any[] = [];
  addOnBlur = true;
  pageurl = '';
  pagebuilderurl = '';
  seotitle = '';
  seodescr = '';
  seoauthor = '';
  quickeditid = '';
  errorMessage = '';
  pathcheck = false;
  pathcheck2 = false;
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
  shortwaiting = true;
  showpageurl = false;

  ngOnInit(): void {

    this.showwebpages();

    setTimeout(() => {
        this.shortwaiting = false;
    }, 1500);

  }

  pathuniqueremove(){
    this.pathcheck = false;
    this.pathcheck2 = false;
  }

  selectfromtemplate(){
    this.selecttemplate = true;
    
    this.insidepagefirst = false;
    this.insidepagesecond = true;

    this.quickeditpopup = false;
    this.addnewpagepopup = false;

    this.showmytemplates = true;
  }

  usetemplate(id:any){

  }

  createfromscratch(){
    this.showmytemplates = false;
    this.addnewpagepopup = true;
      this.insidepagefirst = false;
      this.insidepagesecond = true;
    this.quickeditpopup = false;
    this.selecttemplate = false;
  }
  
  addnewpage(){
    this.poupsidebar = true;
    this.showmytemplates = false;
    this.addnewpagepopup = true;
      this.insidepagefirst = true;
      this.insidepagesecond = false;
    this.quickeditpopup = false;
    this.selecttemplate = false;
    this.showpageurl = false;

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

  changemyname(event:any){
    // console.log(event.target.value);
    this.form.pagepath = (event.target.value).replaceAll(" ", "-").toLowerCase();
  }

  showwebpages(){
    this.webpagesService.getWebpages().subscribe({
      next: data => {
        console.log(data);
        this.kbpages = [];

        data.data.forEach((element:any) => {
          
          var mycustomdate =  new Date(element.updated_at);
          var text1 = mycustomdate.toDateString();    
          var text2 = mycustomdate.toLocaleTimeString();
          element.updated_at = text1+' '+text2;
          this.kbpages.push(element);

          var genscrn = 'keaimage-'+element.uniqueid+'-screenshot.png';

            this.fileuploadService.validateimg(genscrn).subscribe({
              next: data => {
  
                if(data.data==0){
                  element.thumbnail = 'webpage_thumbnail.jpg';
                }else if(data.data==1){
                  element.thumbnail = genscrn;
                }
  
              }
            });
  
        });

      },
      error: err => {
        console.log(err);
      }
    });
  }

  checkpagesettings(value:any,data:any){
    if(value=='preview'){
      var url = 'http://localhost:4200/assets/keapages/'+data;
      window.open(url, '_blank')
    }
  }

  changepagename(id:any, title:any, type:any){

      this.pageurl = '';
      this.seotitle = '';
      this.seodescr = '';
      this.seoauthor = '';
      this.keywords = [];

      this.webpagesService.namepathchanges(id,title,type).subscribe({
        next: data => {
          // console.log(data);

          if(data.success==1){
              if(type!='quickedit'){

                if(data.type=='name'){
                  this._snackBar.open('Name Changed Successfully!', 'Close');
                }else if(data.type=='status'){
                  this._snackBar.open('Status Changed Successfully!', 'Close');
                }
    
                this.showwebpages();

              }else if(type=='quickedit'){

                this.webpagesService.namepathchanges(id,title,type).subscribe({
                  next: data => {

                  }
                });

                this.poupsidebar = true;
                this.showmytemplates = false;
                this.addnewpagepopup = false;
                  this.insidepagefirst = true;
                  this.insidepagesecond = false;
                this.quickeditpopup = true;
                this.selecttemplate = false;
                this.showpageurl = false;
                
                this.pageurl = data.data[0].page_path;
                this.seotitle = data.data[0].page_title;
                this.seodescr = data.data[0].page_description == null ? '' : data.data[0].page_description;
                this.seoauthor = data.data[0].page_author == null ? '' : data.data[0].page_author;

                var gettag = data.data[0].page_keywords;
                  if(gettag!='' && gettag!=null){
                    var crtag = gettag.split(',');
                    this.keywords = crtag; 
                  }

                  this.quickeditid = data.data[0].id;
                
                this.poupsidebar = true;

              }
          }else{
            this._snackBar.open('Something Went Wrong!!', 'Close');
          }

        }
      });

  }

  savequickdetails(){

    var gentags = this.keywords.toString();
    this.webpagesService.savequickpagesdetails(this.pageurl, this.seotitle, this.seodescr, gentags, this.seoauthor, this.quickeditid).subscribe({
      next: data => {

        console.log(data);
        if(data.found==1){
          this.pathcheck2 = true;
        }else if(data.found==0){
          this.poupsidebar = false;
          this.showwebpages();
        }

      }
    });

  }

  hidepopupsidebar(){
    this.poupsidebar = false;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push(value);

    }
  
    event.chipInput!.clear();
  }

  remove(tags: any): void {
    const index = this.keywords.indexOf(tags);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }

  }

  redirectToBuilder(id:any) {
      this.router.navigate(['/builder/website',id])
  }

  shortsettings(id:any, type:any){

    if(type=='duplicate'){
      // console.log(id);
      this.webpagesService.dupldelpage(id,type).subscribe({
        next: data => {
          console.log(data);

          if(data.success==1){
            this._snackBar.open('Page Duplicate Successfully!', 'Close');
            this.showwebpages();

          }else{
            this._snackBar.open('Something Went Wrong!!', 'Close');
          }

        }
      });
    }else if(type=='delete'){
      this.webpagesService.dupldelpage(id,type).subscribe({
        next: data => {
          // console.log(data);

          if(data.success==1){
            this._snackBar.open('Page Delete Successfully!', 'Close');
            this.showwebpages();

          }else{
            this._snackBar.open('Something Went Wrong!!', 'Close');
          }

        }
      });
    }else if(type=='copyurl'){
      this.webpagesService.dupldelpage(id,type).subscribe({
        next: data => {
          // console.log(data);

          if(data.success==1){

            this.poupsidebar = true;
            this.showmytemplates = false;
            this.addnewpagepopup = false;
              this.insidepagefirst = true;
              this.insidepagesecond = false;
            this.quickeditpopup = false;
            this.selecttemplate = false;
            this.showpageurl = true;
            
            this.pagebuilderurl = 'http://localhost:4200/builder/website/'+data.data[0].uniqueid;
            this.pageurl = 'http://localhost:4200/'+data.data[0].page_path;

          }else{
            this._snackBar.open('Something Went Wrong!!', 'Close');
          }

        }
      });
    }

  }

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._snackBar.open('Successfully Copied!', 'Close');
  }

}
