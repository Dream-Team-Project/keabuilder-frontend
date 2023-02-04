import { Component, OnInit, TemplateRef } from '@angular/core';
import { WebsiteService } from '../_services/website.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../_services/file-upload.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GeneralService } from '../_services/_builder/general.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-all-websites',
  templateUrl: './all-websites.component.html',
  styleUrls: ['./all-websites.component.css']
})
export class AllWebsitesComponent implements OnInit {

  allwebsites:any = []; 
  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }
  delwebsite:any;
  
  webtitleFormControl = new FormControl('',[Validators.required]);
  subdomainFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
  subdomain:any = '';
  websitetitle:any = '';
  createweb:any = true;
  duplicateweb:any = false;
  selecteduid = '';
  nodata = false;
  shortwaiting = true;
  searching:boolean = false;
  selstatusshow = 'all';
  duplicatewebid  = '';
  selectedwebsite = '';
  confirmpass = '';

  constructor(private websiteService: WebsiteService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private _file: FileUploadService,
              public dialog: MatDialog, 
              public _image: ImageService,
              public _general: GeneralService,
              ) { }

  ngOnInit(): void {

    this.fetwebfull();
    setTimeout(() => {
          this.shortwaiting = false;
      }, 1500);

  }

  fetwebfull(){
    this.websiteService.getWebsite().subscribe({
      next: data => {
        this.fetweb(data);
      },
      error: err => {
        // console.log(err);
      }
    });
  }

  fetweb(data:any){

    console.log(data);
    if(data.data?.length != 0) {
      this.nodata = false;
      this.allwebsites = [];
      data.data.forEach((element:any, index:any) => {
        var genobj = {uniqueid:'',title:'',created:'',publishpages:'',totalpage:'',thumbnail:'',subdomain:''};

        genobj.title = element.title;
        var mycustomdate =  new Date(element.created_at);
        var text1 = mycustomdate.toDateString();
        var newspl = text1.split(' ');
        genobj.created = newspl[1]+' '+newspl[2];
        genobj.totalpage = data.count[index].count;

        genobj.publishpages = data.count[index].publish == null ? 0 : data.count[index].publish;

        genobj.uniqueid = element.uniqueid;
        genobj.thumbnail = 'keaimage-page-'+element.homepage+'-screenshot.png';
        genobj.subdomain = element.subdomain;

        this.allwebsites.push(genobj);

      });
    }else{
      this.nodata = true;
    }

    this.searching = false;

  }

  searchpage(event: Event) {
    this.searching = true;
    var SearchValue = {search:(event.target as HTMLInputElement).value};
    // console.log(SearchValue);
    this.selstatusshow = 'all';

    this.websiteService.querystringmanagewebsite(SearchValue).subscribe({
      next: data => {

        console.log(data);
        this.fetweb(data);
        // this.shortdata(data);
      }
    });
  }

  applykbfilter(){
    var dt:any = {order:this.selstatusshow};
    this.websiteService.shortbypaginatorwebsite(dt).subscribe({
      next: data => {
        console.log(data);

        this.fetweb(data);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  newwebsite(){
    this.websitetitle = '';
    this.createweb = true;
    this.duplicateweb = false;
    this.openSidebar();
  }

  openSidebar(){
    this.sidebar.open = true;
    this.sidebar.anim.open = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.open = false;
    },this.sidebar.animtime)
  }

  hidepopupsidebar(){
    this.sidebar.anim.close = true;
    setTimeout((e:any)=>{
      this.sidebar.anim.close = false;
      this.sidebar.open = false;
    },this.sidebar.animtime)
  }

  createnewweb(){
    
    if(this.webtitleFormControl.status=='VALID' && this.subdomainFormControl.status=='VALID'){

      var nwsubdomain:any = this.subdomain.toLowerCase();
      var notusesub = ['app','test','developer','admin','kea','keabuilder','keapages','user']
      if(this.searchStringInArray(nwsubdomain,notusesub)==1){

        this.searching = true;

        var genobj = {title:this.websitetitle, subdomain: this.subdomain};
        this.websiteService.createwebsite(genobj).subscribe({
          next: data => {
    
           console.log(data);

           if(data.exist ==1){
              this.searching = false;
              this._snackBar.open("Subdomain is in use, please use another name!", 'OK');
           }else{

            var dataobj = {website_id:data.uniqueid};
            this._file.createwebsitefolder(dataobj).subscribe(e=>{
              console.log(e);
            });

            this._file.createuserlogofavi(data.uniqueid).subscribe(e=>{
              console.log(e);
            });

            this.websiteService.oncreatesubdomain(this.subdomain,data.uniqueid).subscribe({
              next: datanw => {
                
              this.searching = false;
              console.log(data);
              this._snackBar.open('Website Created Successfully!', 'OK');
              this.router.navigate(['/websites/'+data.uniqueid],{relativeTo: this.route});

              }
            });

           }
    
          }
        });

      }else{
        this._snackBar.open("Subdomain is in use, please use another name!", 'OK');
      }

    }

  }

  updatewebsite(data:any){
    console.log(data);
    this.websitetitle = data.title;
    this.selecteduid = data.uniqueid;
    this.createweb = false;
    this.openSidebar();
  }

  updatenewweb(){

    if(this.websitetitle!='' && this.selecteduid!=''){

      var obj = {
        onlysite: true,
        title: this.websitetitle,
        uniqueid: this.selecteduid,
      }
      this.websiteService.updatesitedetails(obj).subscribe({
        next: data => {  
          console.log(data);
          this._snackBar.open("Changes has been updated!", 'OK');
          this.fetwebfull();

        }
      });

    }else{
      this._snackBar.open("Website title can't be blank!", 'OK');
    }

  }

  openDialog(templateRef: TemplateRef<any>, page:any): void {
    this.confirmpass = '';
    this.delwebsite = page;
    this.dialog.open(templateRef);
  }

  restoredeleteme(web:any){
 
    console.log(web);

    if(this.confirmpass!=''){
      this.searching = true;
  
      var genobj = {websiteid:web.uniqueid, password:this.confirmpass};
      this.websiteService.deletewebsite(genobj).subscribe({
        next: data => {
          console.log(data);

          if(data.incorrect == 1){
            this.searching = false;
            this._snackBar.open("Password did't match!", 'OK');
          }else{
            this._file.deletewebsitefolder(web.uniqueid).subscribe(e=>{
              console.log(e);
            });

              this.websiteService.ondeletesubdomain(web.subdomain).subscribe({
                next: data => {
                  
                  this.searching = false;
                  this._snackBar.open("Website has been successfully deleted!", 'OK'); 
                  this.fetwebfull();

                }
              });

          }

        }

      });
    }else{
      this._snackBar.open("Password Can't be blank!", 'OK');
    }

  }

  requestdupliwebsite(data:any){
    // console.log(data);
    this.duplicatewebid = data.uniqueid;
    this.selectedwebsite = data.title;
    this.duplicateweb = true;
    this.createweb = false;
    this.websitetitle = '';
    this.subdomain = '';
    this.openSidebar();
  }

  duplicatewebsite(){
    // console.log(this.websitetitle);
    // console.log(this.subdomain);

    this.createweb = false;
    this.searching = true;

    if(this.subdomain!=''){

      if(this.webtitleFormControl.status=='VALID' && this.subdomainFormControl.status=='VALID'){

        var nwsubdomain:any = this.subdomain.toLowerCase();
        var notusesub = ['app','test','developer','admin','kea','keabuilder','keapages','user'];

        if(this.searchStringInArray(nwsubdomain,notusesub)==1){
          var genobj = {title:this.websitetitle, subdomain: this.subdomain, website_id:this.duplicatewebid};
          // console.log(genobj);

          this.websiteService.duplicatewebsite(genobj).subscribe({
            next: data => {
              console.log(data);
             if(data.exist ==1){
                this._snackBar.open("Subdomain is in use, please use another name!", 'OK');
             }else{

                this._file.createuserlogofavi(data.uniqueid).subscribe(e=>{
                  console.log(e);
                });

                if(data.uniqueid!=''){
                  var dataobj = {old_website_id:this.duplicatewebid, new_website_id:data.uniqueid};
                  this._file.copywebsitefolder(dataobj).subscribe(e=>{
                    console.log(e);
                  });
                }

                this.websiteService.oncreatesubdomain(this.subdomain,data.uniqueid).subscribe({
                  next: data => {
                    // console.log(data);
                    this._snackBar.open("Website Successfylly Duplicate!", 'OK');
                    this.fetwebfull();
                    this.hidepopupsidebar();
                    this.searching = false;
                  }
                });


             }
      
            console.log(data);

            }
          });


        }else{
          this._snackBar.open("Subdomain is in use, please use another name!", 'OK');
        }

      }

    }

   

  }

  searchStringInArray(str:any, strArray:any) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j] == str) return 0;
    }
    return 1;
``}

  removespecialchar(data:any){
    var datagen = data.replace(/[^a-zA-Z0-9]/g, "");
    return datagen;
  }

  removespecialcharwithsmall(data:any){
    var datagen = this.removespecialchar(data).toLowerCase();
    return datagen;
  }

}
