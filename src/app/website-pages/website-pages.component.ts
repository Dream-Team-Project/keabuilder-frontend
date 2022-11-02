import { Component, OnInit, ViewChild } from '@angular/core';
import { WebpagesService } from '../_services/webpages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { ImageService } from '../_services/image.service';
import { FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { GeneralService } from '../_services/_builder/general.service';
import { FileUploadService } from '../_services/file-upload.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { WebsiteService } from '../_services/website.service';
import {PageEvent} from '@angular/material/paginator';

export interface WebpageData {
  page_name:string;
  created_at:string;
  archive_reason:string;
  actions:string;
}

@Component({
  selector: 'app-website-pages',
  templateUrl: './website-pages.component.html',
  styleUrls: ['./website-pages.component.css']
})
export class WebsitePagesComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'created_at','archive_reason', 'actions'];
  selection = new SelectionModel<WebpageData>(true, []);
  dataSource: MatTableDataSource<WebpageData>;
  users:any = [];
  showingcontacts = '7 DAY';
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private webpagesService: WebpagesService,
              private _snackBar: MatSnackBar,
              private router: Router, 
              private route: ActivatedRoute,
              public _image: ImageService,
              private tokenStorage: TokenStorageService,
              public _general: GeneralService,
              private fileuploadService: FileUploadService,
              private websiteService: WebsiteService,) {
                this.dataSource = new MatTableDataSource(this.users);
               }

  form: any = {
    pagename: null,
    pagepath:null,
  };
  userFormControl = new FormControl('',[Validators.required]);
  userFormControl2 = new FormControl('',[Validators.required]);

  kbpages:any[] = [];
  popupsidebar = false;
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
  oldpagepath = '';
  selstatusshow = 'all';
  toggleview1 = true;
  toggleview2 = true;
  reason = '';
  confirmarchivepage = false;
  archive_id = 0;
  showarchivemode = false;
  pagenotfound = false;
  pagegetdata = false;
  fetchdatastatus = false;

  
  // MatPaginator Inputs
  length = 100;
  pageSize = 6;
  pageSizeOptions: number[] = [6, 12, 24, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;  

  getServerData(event?:PageEvent){
    var length = event?.length;
    var pageindex = event?.pageIndex;
    var pageSize = event?.pageSize;
    var previousPageIndex = event?.previousPageIndex;
    // console.log(length+' - '+pageindex+' - '+pageSize+' - '+' - '+previousPageIndex);

    this.pageSize = 20;
    var data = {pagesize:pageSize};
    // this.webpagesService.shortbypaginator(data).subscribe({
    //   next: data => {
    //     console.log(data);
    //     // this.kbpages = [];
    //     // this.shortdata(data);

    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });

}

  ngOnInit(): void {

    this.showwebpages();

    setTimeout(() => {
        this.shortwaiting = false;
    }, 1500);

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

    this.applykbfilter();

    this.websiteService.getWebsite().subscribe({
      next: data => {
        if(data?.data) {
          if(data?.data[0]?.toggleview==1){
            this.toggleview1 = true;
          }else{
            this.toggleview1 = false;
          }
        }
      }
    });

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
    this.popupsidebar = true;
    this.showmytemplates = false;
    this.addnewpagepopup = true;
      this.insidepagefirst = true;
      this.insidepagesecond = false;
    this.quickeditpopup = false;
    this.selecttemplate = false;
    this.showpageurl = false;
    this.confirmarchivepage = false;

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
          // console.log(data);

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

  changemyname(event:any){
    // console.log(event.target.value);
    this.form.pagepath = (event.target.value).replaceAll(" ", "-").toLowerCase();
  }

  showwebpages(){
    this.webpagesService.getWebpages().subscribe({
      next: data => {
        this.kbpages = [];
        this.shortdata(data);
        // console.log(data);
      },
      error: err => {
        // console.log(err);
      }
    });
  }

  shortdata(dataA:any){
    if(dataA.success !=0 && dataA?.data?.length!=0){

      if(dataA.success == 2){
        this.pagegetdata = true;
      }else{

        this.pagegetdata = false;
        if(this.toggleview2==true ){
          this.pagenotfound = false;
        }
        this.fetchdatastatus = true;
        dataA.data.forEach((element:any) => {
              
          var mycustomdate =  new Date(element.updated_at);
          var text1 = mycustomdate.toDateString();    
          var text2 = mycustomdate.toLocaleTimeString();
          element.updated_at = text1+' '+text2;


          this.websiteService.getWebsite().subscribe({
            next: data => {
              if(data?.data[0]?.homepage==element.uniqueid){
                element.defaulthome = 1;
              }else{
                element.defaulthome = 0;

              }
              this.kbpages.push(element);
            }
          });

          

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

      }

    }else{
      this.fetchdatastatus = false;
      this.pagegetdata = true;
      // console.log(this.toggleview2);
      if(this.toggleview2==true ){
        this.pagenotfound = true;
      }
    }

  
  }

  checkpagesettings(value:any,data:any){
    if(value=='preview'){
      var url = window.location.origin+'/assets/sites/pages/'+data;
      window.open(url, '_blank')
    }
  }

  changepagename(id:any, title:any, type:any){

    if(title==''){
      this.showwebpages();
    }
      this.pageurl = '';
      this.seotitle = '';
      this.seodescr = '';
      this.seoauthor = '';
      this.keywords = [];

      this.webpagesService.namepathchanges(id,title,type).subscribe({
        next: data => {
          // console.log(data);
          // console.log(this.kbpages);

          if(data.success==1){

              if(type!='quickedit'){

                if(data.type=='name'){
                  this._snackBar.open('Name Changed Successfully!', 'OK');
                  // this.showwebpages();
                }else if(data.type=='status'){

                  if(data.name=='0'){

                    // this.showwebpages();
                    // console.log(data.id);
                    this.webpagesService.checkandmakestatus(data.id).subscribe({
                      next: data => {
                        // console.log(data);
                        if(data.success==1){
                          this.fileuploadService.createdefaulthome(data.data[0].homepage).subscribe(e=>{
                            // console.log(e);
                          })
                        }
                      }
                    });

                  }

                  this._snackBar.open('Status Changed Successfully!', 'OK');

                }

              }else if(type=='quickedit'){

                this.popupsidebar = true;
                this.showmytemplates = false;
                this.addnewpagepopup = false;
                  this.insidepagefirst = true;
                  this.insidepagesecond = false;
                this.quickeditpopup = true;
                this.selecttemplate = false;
                this.showpageurl = false;
                this.confirmarchivepage = false;
                
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
                
                this.popupsidebar = true;
                this.oldpagepath = this.pageurl;

              }

          }else{
            this._snackBar.open('Something Went Wrong!!', 'OK');
          }

        }
      });

  }

  savequickdetails(){
    // console.log(this.quickeditid);
    var gentags = this.keywords.toString();
    this.webpagesService.savequickpagesdetails(this.pageurl, this.seotitle, this.seodescr, gentags, this.seoauthor, this.quickeditid).subscribe({
      next: data => {

        // console.log(data);
        if(data.found==1){
          this.pathcheck2 = true;
        }else if(data.found==0){

          var pathobj  = {oldpath:this.oldpagepath,newpath:this.pageurl};
          this.fileuploadService.renamepage(pathobj).subscribe({
            next: data => {
              // console.log(data);
            }
          });
          this.popupsidebar = false;
          this.showwebpages();

        }

      }
    });

  }

  hidepopupsidebar(){
    this.popupsidebar = false;
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

  shortsettings(page:any, type:any, oldpath:string){
    if(type=='duplicate'){
      // console.log(id);
      this.webpagesService.dupldelpage(page.id,type).subscribe({
        next: data => {
          if(data.success==1){
            this._snackBar.open('Processing...', 'OK');
            var pathobj  = {oldpath:oldpath, newpath:data.newpath};
            this.fileuploadService.copypage(pathobj).subscribe({
              next: data => {
                this._snackBar.open('Page Duplicate Successfully!', 'OK');
                this.showwebpages();
              }
            });
            var imgobj  = {oldname:'keaimage-'+page.uniqueid+'-screenshot.png', newname:'keaimage-'+data.uniqueid+'-screenshot.png'};
            this.fileuploadService.copyimage(imgobj).subscribe({
              next: data => {
                // console.log(data);
              }
            });
            
          }else{
            this._snackBar.open('Something Went Wrong!!', 'OK');
          }

        }
      });
    }else if(type=='copyurl'){
      this.webpagesService.dupldelpage(page.id,type).subscribe({
        next: data => {
          // console.log(data);

          if(data.success==1){

            this.popupsidebar = true;
            this.showmytemplates = false;
            this.addnewpagepopup = false;
            this.insidepagefirst = true;
            this.insidepagesecond = false;
            this.quickeditpopup = false;
            this.selecttemplate = false;
            this.showpageurl = true;
            this.confirmarchivepage = false;

            this.pagebuilderurl = window.origin+'/builder/website/'+data.data[0].uniqueid;
            this.pageurl = window.origin+'/assets/sites/pages/'+data.data[0].page_path;

          }else{
            this._snackBar.open('Something Went Wrong!!', 'OK');
          }

        }
      });
    }

  }

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._snackBar.open('Successfully Copied!', 'OK');
  }

  togglepageview(){
    this.toggleview1 = !this.toggleview1;
    this.restoredeleteme('1','toggleview')
  }

  archivepages(){
    this.toggleview2 = !this.toggleview2;
    this.showarchivemode = !this.showarchivemode;
    
    if(this.fetchdatastatus==false){
      this.pagegetdata = !this.pagegetdata;
    }else{
      this.pagenotfound = !this.pagenotfound;
    }
  }

  changevisibility(value:any){
    this.webpagesService.pagevisibility(value).subscribe({
      next: data => {
        // console.log(data);
        this.kbpages = [];
        this.shortdata(data);
      }
    });
  }

  archive_popup(id:any){
    this.popupsidebar = true;
    this.showmytemplates = false;
    this.addnewpagepopup = false;
      this.insidepagefirst = true;
      this.insidepagesecond = false;
    this.quickeditpopup = false;
    this.selecttemplate = false;
    this.showpageurl = false;

    this.confirmarchivepage = true;
    this.archive_id = id;
  }

  applykbfilter(){

    this.webpagesService.getarchivepages(this.showingcontacts).subscribe({
      next: data => {
        // console.log(data); 
        this.users = data.data;
        this.dataSource = new MatTableDataSource(this.users);

      },
      error: err => {
        console.log(err);
      }
    });

  }

  datecusfilter(value:any){
    return new Date(value).toDateString();
  }

  restoredeleteme(page:any,type:any){
 
    var gendata:any = {id:page.id,type:type,reason:''};
    if(type=='archived'){
      gendata = {id:this.archive_id,type:type,reason:this.reason};
    }
    if(type=='toggleview'){
      gendata = {id:page.id,type:type,reason:this.toggleview1};
    }
    
    // console.log(gendata);
    this.webpagesService.restoredeletepage(gendata).subscribe({
      next: data => {
        // console.log(data);
        if(data.success==1){

          if(data.deleteme==0){
            this.webpagesService.checkandmakestatus(this.archive_id).subscribe({
              next: data => {
                // console.log(data);

                if(data.success==1){
                  this.fileuploadService.createdefaulthome(data.data[0].homepage).subscribe(e=>{
                    // console.log(e);
                  })
                }

              }
            });
          }

          if(data.deleteme==1){
            this.fileuploadService.deletepage(data.path).subscribe({
              next: data => {
                // console.log(data);
              }
            });
            this.fileuploadService.deleteimage('keaimage-'+page.uniqueid+'-screenshot.png').subscribe({
              next: data => {
                // console.log(data);
              }
            });
          }
          this.popupsidebar = false;
          this.showwebpages();
          this.applykbfilter();

        }

      },
      error: err => {
        // console.log(err);
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchpage(event: Event) {
    var SearchValue = (event.target as HTMLInputElement).value;
    // console.log(SearchValue);
    this.selstatusshow = 'all';

    this.webpagesService.querystringmanage(SearchValue).subscribe({
      next: data => {
        // console.log(data);
        this.kbpages = [];
        this.shortdata(data);
      }
    });

  }



}
