import { Component, OnInit, ViewChild, Inject, TemplateRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { WebpagesService } from 'src/app/_services/webpages.service';
import { ImageService } from 'src/app/_services/image.service';
import { FormControl, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { UserService } from 'src/app/_services/user.service';
import { WebsiteService } from 'src/app/_services/website.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class WebsitePagesComponent implements OnInit {
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('deldialog') deldialog!: TemplateRef<any>;
  @ViewChild('quickeditdialog') quickeditdialog!: TemplateRef<any>;
  @ViewChild('copyurldialog') copyurldialog!: TemplateRef<any>;
  @ViewChild('simpleduplicatedialog') simpleduplicatedialog!: TemplateRef<any>;
  @ViewChild('duplicatedialog') duplicatedialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

readonly separatorKeysCodes = [ENTER, COMMA] as const;
  website_id:string = '';
  spinner=false;
  delpage:any;
  hasError:boolean = false;
  showingcontacts = '7 DAY';
  actionname:any = '';
  newwebsiteid:any = '';
  websites:any = [];
  allwebsites:any = [];
  selectedweb = '';
  filteredweb:Array<any> = [];
  searchpagetxt = 'Search Pages';
  form: any = {
    pagename: null,
    pagepath:null,
    website_id:'',
  };
  userFormControl = new FormControl('',[Validators.required]);
  userFormControl2 = new FormControl('',[Validators.required]);
  kbpages:any[] = [];
  popupsidebar = false;
  quickeditpopup = true;
  addnewpagepopup = false;
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
  template:any=[];
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
  searching:boolean = false;
  author:any = '';
  searchval:any = '';
  togglestatus:any;
  datakbpage:any;
  error=false;
  errormessage:any='';
  pageslength:any;
  sortInp:any='';
  visibility:any='';
  filter:any='updated_at DESC';
  

  constructor(private webpagesService: WebpagesService,
    public dialog: MatDialog, 
    private router: Router, 
    private route: ActivatedRoute,
    public _image: ImageService,
    public _general: GeneralService,
    private websiteService: WebsiteService,
    private userService: UserService,) {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state;
      if(state) this.website_id = state['website_id'];
      this.toggleview = _general.getStorage('page_toggle');
     }

  ngOnInit(): void {
    this.author = this.userService?.user?.name;
    this.fetchData();
  }

  templateDialog(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef).afterClosed().subscribe((data:any)=>{
    });
  }

  fetchData(){
    this.getpagePages({pageIndex:0,pageSize:20});
    this.fetchallwebsites();
  // this.showwebpages();
  // this.getWebsites();
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

  createfromscratch(){
    this.showmytemplates = false;
    this.addnewpagepopup = true;
    this.insidepagefirst = false;
    this.insidepagesecond = true;
    this.quickeditpopup = false;
    this.selecttemplate = false;
  }
  
  addnewpage(event:any){
    if(event) this.template = event;
    this.dialog.closeAll();
    this.createfromscratch();
    this.dialog.open(this.adddialog);
  }

  onSubmit(): void {
    // this.spinner=true;
    const { pagename, pagepath } = this.form;
    this.hasError = false;
    this.searching = true;

    if(this.userFormControl.status=='VALID' && this.website_id){
      this.dialog.closeAll();

      var gendata = {name:pagename, path: pagepath, author: this.author, webid: this.website_id,page_json:this.template?.template ? this.template?.template : ''};
      this.webpagesService.validatepages(gendata).subscribe({
        next: data => {
          // console.log(data);

          if(data.found==0){
            if(data?.success){            
              this._general.redirectToBuilder(data.uniqueid, 'website');
              // this.dialog.closeAll();
              this.searching = false;
              this.resetobj();
            }
            else {
              this._general.openSnackBar(true, 'Server Error', 'OK', 'center', 'top');
            }
          }
          else if(data.found==1){
            this.pathcheck = true;
            // this.spinner=false;
            this.error=true;
            this.errormessage="Path already exist";
            this.dialog.open(this.adddialog);
          }
          else{
            this.searching = false;
            this.error=true;
            this.errormessage="Usage limit exceeded, Please Upgrade your Plan";
            this.dialog.open(this.adddialog);
            // this._general.openSnackBar(true,"Usage limit exceeded, Please Upgrade your Plan !", 'OK','center','top');
            this.spinner=false;

            // this.dialog.closeAll();
          }
      }
      });
    }
    else{
      // this._general.openSnackBar(true, 'Website is required', 'OK', 'center', 'top');
      this.hasError = true;
      this.error=true;
      this.errormessage= 'Website is required';
      this.dialog.open(this.adddialog);
    }
  }

  changemyname(event:any){
    this.form.pagepath = (event.target.value).replaceAll(" ", "-").toLowerCase();
  }

  shortdata(dataA:any){
    if(dataA.success !=0 && dataA?.data?.length!=0){
            this.kbpages=[];
             this.nodata = false;
             let pages=this.website_id ? dataA.data[0].pages :  dataA.data;
            //  if(this.website_id){
              // console.log(pages)
                  pages.map((element:any)=>{
                  var mycustomdate =  new Date(element.updated_at);
                  var text1 = mycustomdate.toDateString();    
                  var text2 = mycustomdate.toLocaleTimeString();
                  element.updated_at = text1+' '+text2;
                  element.defaulthome = this.website_id ? (pages[0].homepage == element.uniqueid ? 1 : 0) : (element.homepage == element.uniqueid ? 1 : 0);
                  element.thumbnail = 'keaimage-page-'+element.uniqueid+'-screenshot.png';
                  element.domain=this.website_id ? pages[0].domain : element.domain;
                  this.kbpages.push(element);
                })
        this.spinner=false;
        this.searching=false;  
    }else{
      this.nodata = true;
      this.searching = false;
      this.spinner=false;
    }
  }

  checkpagesettings(value:any,data:any){
    // console.log(data)
    if(value=='preview'){
      var url = 'https://'+data.domain+'/'+data.page_path;
      window.open(url, '_blank');
    }
  }

  changepagename(dataobj:any, title:any, type:any){

      this.pageurl = '';
      this.seotitle = '';
      this.seodescr = '';
      this.seoauthor = '';
      this.keywords = [];
    // console.log(title);
      this.webpagesService.namepathchanges(dataobj.id,title,type).subscribe({
        next: data => {
          if(data.success==1){
              if(type!='quickedit'){
                if(data.type=='name'){
                  this.getpagePages({pageIndex:0,pageSize:20});
                  this._general.openSnackBar(false,'Name Changed Successfully!', 'OK','center','top');
                  this.resetobj();
                }else if(data.type=='status'){

                  this.draftpublish(title, dataobj.page_path);
                  if(data.name=='0'){
                    this.webpagesService.checkandmakestatus(data.id).subscribe({
                      next: data => {
                        // console.log(data);
                        if(data.success==1){

                          var webobj:any = {website_id:this.website_id};
                          this._general._file.createdefaulthome(webobj).subscribe(e=>{
                            // console.log(e);
                          })

                        }
                      }
                    });
                  }

                  this._general.openSnackBar(false,'Status Changed Successfully!', 'OK','center','top');
                  this.resetobj();

                }
              }else if(type=='quickedit'){

                this.togglestatus = data.data[0].publish_status
                this.dialog.open(this.quickeditdialog)
                this.showmytemplates = false;
                this.addnewpagepopup = false;
                  this.insidepagefirst = true;
                  this.insidepagesecond = false;
                this.quickeditpopup = true;
                this.selecttemplate = false;
                this.showpageurl = false;
                this.confirmarchivepage = false;
                
                this.pageurl = data.data[0]?.page_path;
                this.seotitle = data.data[0]?.page_title;
                this.seodescr = data.data[0]?.page_description == null ? '' : data.data[0]?.page_description;
                this.seoauthor = data.data[0]?.page_author == null ? '' : data.data[0]?.page_author;

                var gettag = data.data[0]?.page_keywords;
                  if(gettag!='' && gettag!=null){
                    var crtag = gettag.split(',');
                    this.keywords = crtag; 
                  }

                  this.quickeditid = data.data[0]?.id;
                
                  // this.openSidebar();

                this.oldpagepath = this.pageurl;

              }

          }else{
            this._general.openSnackBar(false,'Something Went Wrong!!', 'OK','center','top');
            this.resetobj();
          }

        }
      });
  }

  draftpublish(status:any, page_path:any){
    var getvl = status == '0' ? 'draft' : 'publish';
    var newobjdt = {status:getvl, path:page_path, website_id:this.website_id};
    this._general._file.toggleDraft(newobjdt).subscribe((data:any)=>{
      this.resetobj();
    })
  
  }

  savequickdetails(){
    this.searching = true;
    var gentags = this.keywords.toString();
    if(this.pageurl && this.seotitle){
    this.webpagesService.savequickpagesdetails(this.pageurl, this.seotitle, this.seodescr, gentags, this.seoauthor, this.quickeditid).subscribe({
      next: data => {
        // console.log(data);
        if(data.found==1){
          this.searching = false;
          // this._general.openSnackBar(false,'Path Must Be Unique!', 'OK','center','top');
          this.error=true;
          this.errormessage='Path Must Be Unique!';
          this.dialog.open(this.quickeditdialog);
        }else if(data.found==0){
          var getvl = this.togglestatus == '0' ? 'drafts' : 'pages';
          var pathobj  = {oldpath:this.oldpagepath,newpath:this.pageurl, website_id:this.website_id, dir:getvl};
          this._general._file.renamepage(pathobj).subscribe({
            next: data => {
            }
          });          
          this.searching = false;
          
          this._general.openSnackBar(false,'Page Details Updated Successfully', 'OK','center','top');
          this.getpagePages({pageIndex:0,pageSize:20});
          this.resetobj();

        }
        else{
          this.resetobj();
        }
        
      }
    });
  }else{
    this.error=true;
    this.errormessage="Please enter required information!";
    this.dialog.open(this.quickeditdialog);
  }
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
    // console.log(page);
    var dtobj = {pageid:page.id, type:type, webid: page.website_id};
    if(type=='duplicate'){
      // console.log(id);
      this.searching = true;
      this.webpagesService.dupldelpage(dtobj).subscribe({
        next: data => {
          // console.log(data);
          if(data.success==1){
            var getvl = page.publish_status == '0' ? 'drafts' : 'pages';
            // var pathobj  = {oldpath:page.page_path,newpath:data.newpath, website_id:page.website_id, dir:getvl};
            // this._general._file.copypage(pathobj).subscribe({
            //   next: data => {
            //     this._general.openSnackBar(false,'Page Duplicate Successfully!', 'OK','center','top');
            //     this.getpagePages({pageIndex:0,pageSize:20});
            //     this.resetobj();
            //   }
            // });
            var imgobj  = {oldname:'keaimage-page-'+page.uniqueid+'-screenshot.png', newname:'keaimage-page-'+data.uniqueid+'-screenshot.png'};
            this._general._file.copyimage(imgobj).subscribe({
              next: data => {
                // console.log(data);
              }
            });
            
            this.searching = false;
            this.getpagePages({pageIndex:0,pageSize:20});
            this.resetobj();
          }else{
            this.searching = false;
            this.error=true;
            this.errormessage=data?.message;
            this.dialog.open(this.simpleduplicatedialog);
            // this._general.openSnackBar(true,data?.message, 'OK','center','top');
          }
        }
      });
    }else if(type=='copyurl'){
      
            // this.openSidebar();
            this.dialog.open(this.copyurldialog);
            this.showmytemplates = false;
            this.addnewpagepopup = false;
            this.insidepagefirst = true;
            this.insidepagesecond = false;
            this.quickeditpopup = false;
            this.selecttemplate = false;
            this.showpageurl = true;
            this.confirmarchivepage = false;

            this.pagebuilderurl = window.origin+'/builder/website/'+page.uniqueid;

            this.pageurl = 'https://'+page.domain+'/'+page.page_path;

         
        }
  }

  dupanotherdes(page:any){

    if(this.newwebsiteid!=''){

      var getvl = page.publish_status == '0' ? 'drafts' : 'pages';

      var dtobj = {type:this.actionname, newwebsiteid:this.newwebsiteid, uniqueid:page.uniqueid, newpath: page.page_path};
      this.webpagesService.movecopywebpage(dtobj).subscribe({
        next: data => {
          // console.log(data);
          var pathobj = {old_website_id:this.website_id, new_website_id:this.newwebsiteid,dir:getvl, oldpath:page.page_path, newpath:data.newpath, trigger:''};

          this.actionname=='Move' ? pathobj.trigger = 'move' : pathobj.trigger = 'copy';

          this._general._file.transferPage(pathobj).subscribe({
            next: data => {
              // console.log(data);

              this.actionname=='Move' ? this._general.openSnackBar(false,'Page Move Successfully!', 'OK','center','top'): this._general.openSnackBar(false,'Page Copy & Move Successfully!', 'OK','center','top');
              this.getpagePages({pageIndex:0,pageSize:20});
              // this.showwebpages();
              this.resetobj();
            }
          });

        }
      });

    }else{
      // this._general.openSnackBar(false,"Can't find the website!", 'OK','center','top');
      this.error=true;
      this.errormessage="Can't find the website!";
      this.dialog.open(this.duplicatedialog);
    }

  }

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._general.openSnackBar(false,'Url Successfully Copied!', 'OK','center','top');
    this.dialog.closeAll();
  }

  togglepageview(){
    this.toggleview = !this.toggleview; 
    this._general.setStorage('page_toggle',this.toggleview);
  }
  

  archivepages(){
    // console.log('test'+this.fetchdatastatus);
    this.showarchivemode = !this.showarchivemode;
    if(this.showarchivemode){
      if(this.website_id){
      this.router.navigate(['/websites/'+this.website_id+'/pages/archive'],{relativeTo: this.route});
      }
      else{
        this.router.navigate(['/websites/pages/archive'],{relativeTo: this.route});
      }
    }
  }


  archive_popup(dataobj:any){
    this.openDialog(this.deldialog,dataobj,'')
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


  searchpages(search: any, filter: any, visibility:any,sortInp:any) {
    this.searching = true;
    var obj = {
      search: search.value,
      filter: filter.value || this.filter,
      visibility: visibility.value || this.visibility,
      id:this.website_id,
      sortInp:sortInp.value || this.sortInp,
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 20,
    }
    this.webpagesService.pagevisibility(obj).subscribe({
      next: data => {
        // console.log(data)
        if(data.success){
          this.kbpages=[];
          this.searching=false;
          data.data.map((element:any)=>{
            var mycustomdate =  new Date(element.updated_at);
            var text1 = mycustomdate.toDateString();    
            var text2 = mycustomdate.toLocaleTimeString();
            element.updated_at = text1+' '+text2;
            element.defaulthome = data[0]?.homepage==element.uniqueid ? 1 : 0;
            element.thumbnail = 'keaimage-page-'+element.uniqueid+'-screenshot.png';
            element.domain=element.domain;
            this.kbpages.push(element);
          })
          
        }
        else{
          this.searching=false;
          this.kbpages=[];
        }
       
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
    
    this.searching = true;
    this.webpagesService.restoredeletepage(gendata).subscribe({
      next: data => {
        if(data.success==1){

          if(type!='delete'){
            if(type=='restore'){
              // console.log('second');
              this.draftpublish('1', page.page_path);
            }else if(this.arpageobj.publish_status==1 && type=='archived'){
              // console.log('first');
              this.draftpublish('0', this.arpageobj.page_path);
            }
          }

          if(data.deleteme==0){
            this.webpagesService.checkandmakestatus(this.archive_id).subscribe({
              next: data => {
                // console.log(data);

                if(data.success==1){
                  var webobj:any = {website_id:this.website_id};
                  this._general._file.createdefaulthome(webobj).subscribe(e=>{
                    // console.log(e);
                  })
                  this.resetobj();
                }

              }
            });
            this._general.openSnackBar(false,'Page Archived Successfully!', 'OK','center','top');
          }

          if(data.deleteme==1){
            
            var newpathobj:any = {website_id:this.website_id, path:data.path};
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
            this._general.openSnackBar(false,'Page Delete Successfully!', 'OK','center','top');

          }
          // this.hidepopupsidebar();
          // this.dialog.closeAll();
          this.searching = false;
          this.getpagePages({pageIndex:0,pageSize:20});
          // this.showwebpages();
          this.resetobj();
          // this.applykbfilter();

        }
        else{
          this.error=true;
          this.errormessage='Server Error';
          this.dialog.open(this.deldialog);
        }

      },
      error: err => {
        // console.log(err);
      }
    });

  }

  searchpage(event: Event) {
    this.searching = true;
    var SearchValue = {search:(event.target as HTMLInputElement).value, id:this.website_id};
    this.selstatusshow = 'all';

    this.webpagesService.querystringmanage(SearchValue).subscribe({
      next: data => {
        this.shortdata(data);
      }
    });
  }

  openDialog(templateRef: TemplateRef<any>, page:any , type:any): void {
    if(type=='simpleduplicate'){
      this.datakbpage = page;
      this.dialog.open(templateRef);
    }else{
      this.newwebsiteid = '';
      this.getpagePages({pageIndex:0,pageSize:20});
      var acn;
      switch(type){
        case 'move':
          acn = 'move';
        break;
        case 'copymove':
          acn = 'copy & move';
        break;
        default:
          acn = '';
      }
      this.actionname = acn;
      this.delpage = page;
      this.dialog.open(templateRef).afterClosed().subscribe((data:any)=>{
       
      });
    }

  }
  resetobj(){
    this.form.pagename='';
    this.form.pagepath='';
    this.website_id='';
    this.reason='';
    this.searching=false;
    this.spinner=false;
    this.error=false;
    this.errormessage='';
    this.dialog.closeAll();
  }
   // start all websites data actions

  fetchallwebsites(){
    this.websiteService.getWebsite().subscribe({
      next: data => {
        this.allwebsites=data.data;
        if(this.website_id){
          this.allwebsites.filter((c:any) => {
          if (c.uniqueid == this.website_id) {
            this.selectedweb = c.title;
        }
      })
    }
      },
      error: err => {
        // console.log(err);
      }
    });
  }

  filterwebData() {
    var value = this.selectedweb;
    this.filteredweb = this.allwebsites?.filter((option:any) => option?.title?.toLowerCase().includes(value?.toLowerCase()));
  }

  selectweb(event:any): void {
    let value = event.option.value;
    this.selectedweb = value.title;
    this.website_id = value.uniqueid;
  }

  resetweb() {
    this.selectedweb = '';
    this.website_id = '';
    this.filterwebData();
  }

  // end all webistes actions
  getpagePages(event:any){
    this.searching= true;
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize,website_id:this.website_id};
      this.webpagesService.getpagePages(obj).subscribe(
        (data:any) => {
          this.shortdata(data);
          this.pageslength=data?.pages;
          this.searching= false;
          // console.log(data)
    });
 }
  
}


