import { Component, OnInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import { WebpagesService } from '../_services/webpages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { ImageService } from '../_services/image.service';
import { FormControl, Validators } from '@angular/forms';import { TokenStorageService } from '../_services/token-storage.service';
import { GeneralService } from '../_services/_builder/general.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { WebsiteService } from '../_services/website.service';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../_services/user.service';

export interface DialogData {
  name: string;
}

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
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private webpagesService: WebpagesService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog, 
              private router: Router, 
              private route: ActivatedRoute,
              public _image: ImageService,
              private tokenStorage: TokenStorageService,
              public _general: GeneralService,
              private websiteService: WebsiteService,
              private userService: UserService,) {
                this.toggleview = _general.getStorage('page_toggle');
                this.dataSource = new MatTableDataSource(this.users);

                this.route.paramMap.subscribe((params: ParamMap) => {
                  // console.log(params);
                  this.websiteid = params.get('website_id');
                  this.websiteid=='details' ? this.router.navigate(['/websites'],{relativeTo: this.route}) : '';
                });
               }

  delpage:any;
  displayedColumns: string[] = ['name', 'created_at','archive_reason', 'actions'];
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  selection = new SelectionModel<WebpageData>(true, []);
  dataSource: MatTableDataSource<WebpageData>;
  users:any = [];
  showingcontacts = '7 DAY';
  actionname:any = '';
  newwebsiteid:any = '';
  websites:any = [];
  searchpagetxt = 'Search Pages';
  form: any = {
    pagename: null,
    pagepath:null,
  };
  userFormControl = new FormControl('',[Validators.required]);
  userFormControl2 = new FormControl('',[Validators.required]);

  websiteid:any = '';
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
  toggleview = true;
  reason = '';
  confirmarchivepage = false;
  archive_id = 0;
  arpageobj:any;
  showarchivemode = false;
  nodata = true;
  mydomain = '';
  
  // MatPaginator Inputs
  length = 100;
  pageSize = 6;
  pageSizeOptions: number[] = [6, 12, 24, 100];

  searching:boolean = false;
  author:any = '';
  searchval:any = '';

  // MatPaginator Output
  pageEvent!: PageEvent;  

  togglestatus:any;
  dialogwebsiteset = '';


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
    //     // console.log(data);
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
    }, 1000);

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);

    this.applykbfilter();

    // this.websiteService.getWebsite().subscribe({
    //   next: data => {
    //     if(data?.data) {
    //       if(data?.data[0]?.toggleview==1){
    //         this.toggleview = true;
    //       }else{
    //         this.toggleview = false;
    //       }
    //     }
    //   }
    // });

    this.userService.getUsersDetails().subscribe({
      next: data => {

        // if(data.realdomain!=''){
        //   this.mydomain = data.realdomain;
        // }else{
        //   this.mydomain = data.data[0].subdomain+'.'+data.domain;
        // }

        this.author = data.data[0].firstname;
      }
    });

    // console.log(this.toggleview);

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
    // this.showmytemplates = false;
    // this.addnewpagepopup = true;
    // this.insidepagefirst = true;
    // this.insidepagesecond = false;
    // this.quickeditpopup = false;
    // this.selecttemplate = false;
    // this.showpageurl = false;
    // this.confirmarchivepage = false;
    this.createfromscratch();
    this.openSidebar();
  }

  openSidebar(){
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.open = false;
    },this.sidebar.animtime)
  }

  onSubmit(): void {
    const { pagename, pagepath } = this.form;

    if(this.userFormControl.status=='VALID'){

      var gendata = {name:pagename, path: pagepath, author: this.author, webid: this.websiteid};
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
              dir: '/drafts',
              folder: pagepath,
              prevFolder: pagepath,
              website_id:this.websiteid, 
            }
            this._general._file.savePage(page).subscribe((event:any) => {
              console.log(event);
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
    this.searching = true;

    var id = this.websiteid;
    this.webpagesService.getWebpagesById(id).subscribe({
      next: data => {
        // console.log(data);
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
        // this.nodata = true;
        this.nodata = true;
        this.searching = false;
      }else{
        this.nodata = false;

        var dt = {webid:this.websiteid};
        this.websiteService.getuniqwebsites(dt).subscribe({
          next: data => {
    
            if(data?.length != 0) {
              // console.log(data);
              data.data.forEach((element:any) => {

                this.searchpagetxt = 'Search Pages from website: '+element.title;

                this.dialogwebsiteset = element.uniqueid;
                // console.log(this.searchpagetxt);
    
                if(element.domain!='' && element.domain!=null){
                  this.mydomain = element.domain;
                }else{
                  this.mydomain = element.subdomain+'.'+data.globalsubdomain;
                }
    
                // console.log(this.mydomain);
              });

              // console.log(data);
              var tempsearch = [];
              for(var i = 0; i < dataA.data.length; i++) {
                var element = dataA.data[i];
                var mycustomdate =  new Date(element.updated_at);
                var text1 = mycustomdate.toDateString();    
                var text2 = mycustomdate.toLocaleTimeString();
                element.updated_at = text1+' '+text2;
                element.defaulthome = data?.data[0]?.homepage==element.uniqueid ? 1 : 0;
                element.thumbnail = 'keaimage-page-'+element.uniqueid+'-screenshot.png';
                tempsearch.push(element);
                if(dataA.data.length-1 == i) {
                  this.kbpages = tempsearch;
                  this.searching = false;
                }
              }


            }
          }
        });
        
    
      }
    }else{
      this.nodata = true;
      this.searching = false;
    }

  
  }

  checkpagesettings(value:any,data:any){
    if(value=='preview'){
      // console.log(this.mydomain);
      var url = 'https://'+this.mydomain+'/'+data;
      window.open(url, '_blank');
    }
  }

  changepagename(dataobj:any, title:any, type:any){

    console.log(dataobj);
      this.pageurl = '';
      this.seotitle = '';
      this.seodescr = '';
      this.seoauthor = '';
      this.keywords = [];
    console.log(title);
      this.webpagesService.namepathchanges(dataobj.id,title,type).subscribe({
        next: data => {
          // console.log(data);
          // console.log(this.kbpages);

          if(data.success==1){
              if(type!='quickedit'){
                if(data.type=='name'){

                  this.showwebpages();
                  this._snackBar.open('Name Changed Successfully!', 'OK');
                }else if(data.type=='status'){

                  this.draftpublish(title, dataobj.page_path);

                  // this.selstatusshow = 'all';
                  if(data.name=='0'){
                    // this.showwebpages();
                    // console.log(data.id);
                    this.webpagesService.checkandmakestatus(data.id).subscribe({
                      next: data => {
                        // console.log(data);
                        if(data.success==1){

                          var webobj:any = {website_id:this.websiteid};
                          this._general._file.createdefaulthome(webobj).subscribe(e=>{
                            // console.log(e);
                          })

                        }
                      }
                    });
                  }

                  this._snackBar.open('Status Changed Successfully!', 'OK');

                }
              }else if(type=='quickedit'){

                this.togglestatus = data.data[0].publish_status;

                this.openSidebar();

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
                
                  this.openSidebar();

                this.oldpagepath = this.pageurl;

              }

          }else{
            this._snackBar.open('Something Went Wrong!!', 'OK');
          }

        }
      });
  }

  draftpublish(status:any, page_path:any){
    var getvl = status == '0' ? 'draft' : 'publish';
    var newobjdt = {status:getvl, path:page_path, website_id:this.websiteid};
    this._general._file.toggleDraft(newobjdt).subscribe((data:any)=>{
    })
  }

  savequickdetails(){

    var gentags = this.keywords.toString();
    this.webpagesService.savequickpagesdetails(this.pageurl, this.seotitle, this.seodescr, gentags, this.seoauthor, this.quickeditid).subscribe({
      next: data => {

        // console.log(data);
        if(data.found==1){
          this.pathcheck2 = true;
        }else if(data.found==0){

          var getvl = this.togglestatus == '0' ? 'drafts' : 'pages';
          var pathobj  = {oldpath:this.oldpagepath,newpath:this.pageurl, website_id:this.websiteid, dir:getvl};
          this._general._file.renamepage(pathobj).subscribe({
            next: data => {
              // console.log(data);
            }
          });
          // this.popupsidebar = false;
          this.showwebpages();

          this.hidepopupsidebar();

        }

      }
    });

  }

  hidepopupsidebar(){
    this.popupsidebar = false;
    this.pathcheck2 = false;

    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
    },this.sidebar.animtime)
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

  shortsettings(page:any, type:any){
    console.log(page);
    var dtobj = {pageid:page.id, type:type, webid: this.websiteid};
    if(type=='duplicate'){
      // console.log(id);
      this.webpagesService.dupldelpage(dtobj).subscribe({
        next: data => {
          // console.log(data);
          if(data.success==1){
            this._snackBar.open('Processing...', 'OK');

            var getvl = page.publish_status == '0' ? 'drafts' : 'pages';
            var pathobj  = {oldpath:page.page_path,newpath:data.newpath, website_id:this.websiteid, dir:getvl};
            console.log(pathobj);
         
            this._general._file.copypage(pathobj).subscribe({
              next: data => {
                this._snackBar.open('Page Duplicate Successfully!', 'OK');
                this.showwebpages();
              }
            });
            var imgobj  = {oldname:'keaimage-page-'+page.uniqueid+'-screenshot.png', newname:'keaimage-page-'+data.uniqueid+'-screenshot.png'};
            this._general._file.copyimage(imgobj).subscribe({
              next: data => {
                // console.log(data);
              }
            });

            this.showwebpages();

          }else{
            this._snackBar.open('Something Went Wrong!!', 'OK');
          }

        }
      });
    }else if(type=='copyurl'){
      this.webpagesService.dupldelpage(dtobj).subscribe({
        next: data => {
          // console.log(data);

          if(data.success==1){

            this.openSidebar();

            this.showmytemplates = false;
            this.addnewpagepopup = false;
            this.insidepagefirst = true;
            this.insidepagesecond = false;
            this.quickeditpopup = false;
            this.selecttemplate = false;
            this.showpageurl = true;
            this.confirmarchivepage = false;

            this.pagebuilderurl = window.origin+'/builder/website/'+data.data[0].uniqueid;

            this.pageurl = 'https://'+this.mydomain+'/'+data.data[0].page_path;

          }else{
            this._snackBar.open('Something Went Wrong!!', 'OK');
          }

        }
      });
    }

  }

  dupanotherdes(page:any){

    if(this.newwebsiteid!=''){

      console.log(page);
      var getvl = page.publish_status == '0' ? 'drafts' : 'pages';
      // var newpath = page.page_path+'-'+this.makeid(20);

      var dtobj = {type:this.actionname, newwebsiteid:this.newwebsiteid, uniqueid:page.uniqueid, newpath: page.page_path};
      this.webpagesService.movecopywebpage(dtobj).subscribe({
        next: data => {
          // console.log(data);
          var pathobj = {old_website_id:this.websiteid, new_website_id:this.newwebsiteid,dir:getvl, oldpath:page.page_path, newpath:data.newpath, trigger:''};

          this.actionname=='Move' ? pathobj.trigger = 'move' : pathobj.trigger = 'copy';

          this._general._file.transferPage(pathobj).subscribe({
            next: data => {
              // console.log(data);

              this.actionname=='Move' ? this._snackBar.open('Page Move Successfully!', 'OK'): this._snackBar.open('Page Copy & Move Successfully!', 'OK');
              this.showwebpages();
            }
          });

        }
      });

    }else{
      this._snackBar.open("Can't find the website!", 'OK');
    }

  }

  makeid(length:any) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._snackBar.open('Successfully Copied!', 'OK');
  }

  togglepageview(){
    this.toggleview = !this.toggleview; 
    console.log(this.toggleview);
    this._general.setStorage('page_toggle',this.toggleview);
  }
  

  archivepages(){
    // console.log('test'+this.fetchdatastatus);
    this.showarchivemode = !this.showarchivemode;
  }

  changevisibility(value:any){
    this.searching = true;
    var dt = {order:value, id:this.websiteid};
    this.webpagesService.pagevisibility(dt).subscribe({
      next: data => {
        this.shortdata(data);
      }
    });
  }

  archive_popup(dataobj:any){
    this.openSidebar();

    this.showmytemplates = false;
    this.addnewpagepopup = false;
    this.insidepagefirst = true;
    this.insidepagesecond = false;
    this.quickeditpopup = false;
    this.selecttemplate = false;
    this.showpageurl = false;

    this.confirmarchivepage = true;
    this.archive_id = dataobj.id;
    this.arpageobj = dataobj;
  }

  applykbfilter(){
    var dt:any = {showing:this.showingcontacts, webid:this.websiteid};
    this.webpagesService.getarchivepages(dt).subscribe({
      next: data => {
        this.users = data.data;
        this.dataSource = new MatTableDataSource(this.users);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  restoredeleteme(page:any,type:any){
 
    var gendata:any = {id:page.id,type:type,reason:''};
    if(type=='archived'){
      gendata = {id:this.archive_id,type:type,reason:this.reason};
    }
    if(type=='toggleview'){
      gendata = {id:page.id,type:type,reason:this.toggleview};
    }
    
    // console.log(this.arpageobj);
    console.log(gendata);
    this.webpagesService.restoredeletepage(gendata).subscribe({
      next: data => {
        // console.log(data);
        console.log(this.arpageobj);
        console.log(type);


        if(data.success==1){

          if(type!='delete'){
            if(type=='restore'){
              console.log('second');
              this.draftpublish('1', page.page_path);
            }else if(this.arpageobj.publish_status==1 && type=='archived'){
              console.log('first');
              this.draftpublish('0', this.arpageobj.page_path);
            }
          }

          if(data.deleteme==0){
            this.webpagesService.checkandmakestatus(this.archive_id).subscribe({
              next: data => {
                // console.log(data);

                if(data.success==1){
                  var webobj:any = {website_id:this.websiteid};
                  this._general._file.createdefaulthome(webobj).subscribe(e=>{
                    // console.log(e);
                  })
                }

              }
            });
          }

          if(data.deleteme==1){
            var newpathobj:any = {website_id:this.websiteid, path:data.path};
            this._general._file.deletepage(newpathobj).subscribe({
              next: data => {
                // console.log(data);
              }
            });
            this._general._file.deleteimage('keaimage-'+page.uniqueid+'-screenshot.png').subscribe({
              next: data => {
                // console.log(data);
              }
            });


          }
          this.hidepopupsidebar();
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
    this.searchval = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  searchpage(event: Event) {
    this.searching = true;
    var SearchValue = {search:(event.target as HTMLInputElement).value, id:this.websiteid};
    // console.log(SearchValue);
    this.selstatusshow = 'all';

    this.webpagesService.querystringmanage(SearchValue).subscribe({
      next: data => {
        this.shortdata(data);
      }
    });
  }

  openDialog(templateRef: TemplateRef<any>, page:any , type:any): void {

    this.newwebsiteid = '';
  
    this.websiteService.getWebsite().subscribe({
      next: webdata => {
      console.log(webdata);

      this.websites = [];
      webdata.data.forEach((element:any) => {
          var nwobj = {uniqueid:element.uniqueid,title:element.title};
          this.websites.push(nwobj)
        });

      }
    });

    if(type=='move'){
      this.actionname = 'Move';
    }else if(type=='copymove'){
      this.actionname = 'Copy & Move';
    }else{
      this.actionname = '';
    }

    this.delpage = page;
    this.dialog.open(templateRef);

  }
  
}



// @Component({
//   selector: 'tags-dialog',
//   templateUrl: '../delete-dialog/delete-dialog.html',
// })
// export class DialogOverviewExampleDialog {
//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData,
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close({event:'nothanks'});
//   }
//   onClick(){
//     this.dialogRef.close({event:'Delete'});
//   }
// }