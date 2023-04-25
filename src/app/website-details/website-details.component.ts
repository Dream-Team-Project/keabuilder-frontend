import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../_services/website.service';
import { WebpagesService } from '../_services/webpages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../_services/_builder/general.service';
import { ImageService } from '../_services/image.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-website-details',
  templateUrl: './website-details.component.html',
  styleUrls: ['./website-details.component.css']
})
export class WebsiteDetailsComponent implements OnInit {

  kbpages:any[] = [];
  kblandingpages:any[] = [];
  kbwebsite:any[] = [];
  pathselected = '';
  domainselected = '';
  pagescriptheader = '';
  pagescriptfooter = '';
  file = null;
  typeerror = '';
  typeerror2 = '';
  defaultimgpath = '/assets/images/website/default-file-upload-image.png';
  logoimg:any = this.defaultimgpath;
  faviconimg:any = this.defaultimgpath;
  logoimgname = '';
  faviconimgname = '';
  imagelogorequest = false;
  imagefaviconrequest = false;
  windoworigin = window.origin;
  tagstyle = 'Place CSS inside the style tag <style></style> and place JS inside the script tag <script></script>.';
  userid = '';
  kbdomains:any[] = [];

  defaultdomain = '';
  websiteid:any = '';
  domainconnerror = false;
  searching = false;
  defaultsubdomain = '';
  websitetitle = '';



  constructor(private websiteService: WebsiteService,
              private webpagesService: WebpagesService,
              private _snackBar: MatSnackBar,
              public _general: GeneralService,
              private imageService: ImageService,
              private router: Router,
              private route: ActivatedRoute,
              public userService: UserService) { 
                this.route.paramMap.subscribe((params: ParamMap) => {
                  // console.log(params);
                  this.websiteid = params.get('website_id');
                });
              }

  ngOnInit(): void {

    // Get Pages & landing page
    this.webpagesService.getWebpagesById(this.websiteid).subscribe({
      next: data => {
        // console.log(data.data);
        this.kbpages = data.data;
      },
      error: err => {
        console.log(err);
      }
    });

    var dt = {webid:this.websiteid};
    this.websiteService.getuniqwebsites(dt).subscribe({
      next: data => {
        if(data?.length != 0) {
          // console.log(data);
          data.data.forEach((element:any) => {

              this.websitetitle = '('+element.title+')';
            this.userid = element.user_id;
            this.kbwebsite.push(element);

            var elmsubd = element.subdomain+'.'+data.globalsubdomain;
            this.defaultsubdomain = elmsubd;

            this.kbdomains.push({name:elmsubd});

            if(data.alldomains?.length>0){
              data.alldomains.forEach((element:any) => {
                this.kbdomains.push(element);
              });
            }

            // console.log(element.domain);

            if(element.domain!='' && element.domain!=null){
              this.domainselected = element.domain;
              this.defaultdomain = element.domain;
            }else{
              this.domainselected = elmsubd;
              // this.kbdomains.push({name:elmsubd});
              // this.defaultdomain = element.subdomain+'.'+data.globalsubdomain;
            }

            console.log(this.domainselected);

            if(element.tracking_header!=null && element.tracking_header!=''){
              this.pagescriptheader = this._general.decodeData(element.tracking_header);
            }

            if(element.tracking_footer!=null && element.tracking_footer!=''){
              this.pagescriptfooter = this._general.decodeData(element.tracking_footer);
            }

            if(element.homepage!=null && element.homepage!=''){
              this.pathselected = element.homepage;
            }

            if(element.logo!=null && element.logo!=''){
              this.logoimgname = element.logo;
              this._general._file.validateimg(element.logo).subscribe({
                next: data => {
    
                  if(data.data==0){
                    this.logoimg = this.defaultimgpath;
                  }else if(data.data==1){
                    this.logoimg = '/assets/uploads/images/'+element.logo;
                  }
    
                }
              });
            }

            if(element.favicon!=null && element.favicon!=''){
              this.faviconimgname = element.favicon;
              this._general._file.validateimg(element.favicon).subscribe({
                next: data => {
    
                  if(data.data==0){
                    this.faviconimg = this.defaultimgpath;
                  }else if(data.data==1){
                    this.faviconimg = '/assets/uploads/images/'+element.favicon;
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

    // this.userService.getUsersDetails().subscribe({
    //   next: data => {
    //     // console.log(data);

    //     if(data.realdomain!=''){
    //       this.defaultdomain = data.realdomain;
    //     }else{
    //       this.defaultdomain = data.data[0].subdomain+'.'+data.domain;
    //     }

    //   }
    // });

  }

  viewsite(){
    var url = 'https://'+this.domainselected;
    window.open(url, '_blank');
  }

  updatepage(){
    this.searching = true;
    // console.log(this.pathselected);
    var obj = {
      homepage: this.pathselected,
      scriptheader: this._general.encodeData(this.pagescriptheader),
      scriptfooter: this._general.encodeData(this.pagescriptfooter),
      onlysite: false,
      uniqueid: this.websiteid,
      domain: this.domainselected,
      // logo: this.logoimgname,
      // favicon: this.faviconimgname,
      // checkimginput1: this.imagelogorequest,
      // checkimginput2: this.imagefaviconrequest
    }

    console.log(obj);

    this.websiteService.updatesitedetails(obj).subscribe({
      next: data => {     
        console.log('-->');
        // console.log(data);

        var splnmlogo = 'logo-'+this.websiteid+'.png';  
        var splnmfavi = 'favicon-'+this.websiteid+'.png';  
        
        var genobjlogo:any = {path:this.logoimg, name:splnmlogo};
        var genobjfavicon:any = {path:this.faviconimg, name:splnmfavi};

        if(this.logoimgname!=this.defaultimgpath && this.imagelogorequest == true ){
          this.imageService.onImageFileUpload(genobjlogo);
        }
    
        if(this.faviconimg!=this.defaultimgpath && this.imagefaviconrequest == true){
          this.imageService.onImageFileUpload(genobjfavicon);
        }

        if(data.data.length!=0){
          var obj = {
            tracking: {
              header: this.pagescriptheader,
              footer: this.pagescriptfooter,
            },
            path: data.data[0].page_path,
            website_id: this.websiteid,
            dir: 'pages'
          };
          this._general._file.updateHome(obj).subscribe({
            next: data => {
              this._snackBar.open('Details Updated Successfully!', 'OK');
            }
          });

        }else{
          this.searching = false;
          this._snackBar.open('Details Updated Successfully!', 'OK');
        }

        if(data.found==1){
          this.domainconnerror = true;
          this.searching = false;
        }else{

          if(this.defaultsubdomain!=this.domainselected && data.seldomain?.length==0){
            this.websiteService.onchangedirdomain(this.domainselected,this.websiteid).subscribe({
              next: data => {    
                this.searching = false;
              }
            });
          }else{
            this.searching = false;
          }
          this.domainconnerror = false;
        }
        


      }
    });

  }

  changeme (event:any) {
    var outsidethis:any = this;
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;

    var getname = (event.target.files[0].name);
    this.logoimgname = this.generatename(getname);

    // console.log(this.logoimgname);

    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.typeerror = '';
      var fileReader = new FileReader();
      
      fileReader.readAsDataURL(this.file);
      fileReader.addEventListener("load", function (readerEvt:any) {
        outsidethis.logoimg = this.result;
      });    
      this.imagelogorequest = true;
    }else{
      this.logoimg = this.defaultimgpath;
      this.typeerror = 'File Type Not Allow';
      this.imagelogorequest = false;
    }

  }

  generatename(value:any){
    var extn = value.split(/[. ]+/).pop();
    // var newvl = value.split('.'+extn)
    // var setname = (newvl[0].toLowerCase()).replaceAll(" ","-");
    // var unqueid = Math.random().toString(20).slice(2);
    // return setname+'-'+unqueid+'.'+extn;

    return '.'+extn;

  }

  OnOpen(){
    (<HTMLInputElement>document.getElementById('fileElemlogo')).click();
  }

  changeme2 (event:any) {
    var outsidethis:any = this;
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;

    var getname = (event.target.files[0].name);
    this.faviconimgname = this.generatename(getname);

    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.typeerror = '';
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.addEventListener("load", function () {
        outsidethis.faviconimg = this.result;
      });    
      this.imagefaviconrequest = true;
    }else{
      this.faviconimg = this.defaultimgpath;
      this.typeerror2 = 'File Type Not Allow';
      this.imagefaviconrequest = false;
    }

  }

  OnOpen2(){
    (<HTMLInputElement>document.getElementById('fileElemfavicon')).click();
  }


}
