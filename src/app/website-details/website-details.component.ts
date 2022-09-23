import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../_services/website.service';
import { WebpagesService } from '../_services/webpages.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from '../_services/file-upload.service';
import { ImageService } from '../_services/image.service';
import { ConnectableObservable } from 'rxjs';

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
  pagescriptheader = '';
  pagescriptfooter = '';
  pagetrackingstyle = '';
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

  constructor(private websiteService: WebsiteService,
              private webpagesService: WebpagesService,
              private _snackBar: MatSnackBar,
              private fileUploadService: FileUploadService,
              private imageService: ImageService) { }

  ngOnInit(): void {

    // Get Pages & landing page
    this.webpagesService.getWebpages().subscribe({
      next: data => {
        console.log(data);

        this.kbpages = data.data;

      },
      error: err => {
        console.log(err);
      }
    });

    this.websiteService.getWebsite().subscribe({
      next: data => {
        console.log(data);
          data.data.forEach((element:any) => {
            this.kbwebsite.push(element);

            if(element.tracking_header!=null && element.tracking_header!=''){
              this.pagescriptheader = atob(element.tracking_header);
            }

            if(element.tracking_footer!=null && element.tracking_footer!=''){
              this.pagescriptfooter = atob(element.tracking_footer);
            }

            if(element.tracking_style!=null && element.tracking_style!=''){
              this.pagetrackingstyle = atob(element.tracking_style);
            }

            if(element.homepage!=null && element.homepage!=''){
              this.pathselected = element.homepage;
            }

            if(element.logo!=null && element.logo!=''){
              this.logoimgname = element.logo;
              this.fileUploadService.validateimg(element.logo).subscribe({
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
              this.fileUploadService.validateimg(element.favicon).subscribe({
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
      },
      error: err => {
        console.log(err);
      }
    });

  }

  updatepage(){

    var obj = {
      homepage: this.pathselected,
      scriptheader: btoa(this.pagescriptheader),
      scriptfooter: btoa(this.pagescriptfooter),
      trackingstyle: btoa(this.pagetrackingstyle),
      logo: this.logoimgname,
      favicon: this.faviconimgname,
      checkimginput1: this.imagelogorequest,
      checkimginput2: this.imagefaviconrequest
    }
    console.log(obj);
    this.websiteService.updatesitedetails(obj).subscribe({
      next: data => {     
        // console.log('-->');
        // console.log(data);

        var splnmlogo = data.genlogo.split('keaimage-');  
        var splnmfavi = data.genfavicon.split('keaimage-');  
        
        var genobjlogo:any = {path:this.logoimg, name:splnmlogo[1]};
        var genobjfavicon:any = {path:this.faviconimg, name:splnmfavi[1]};
        // console.log(genobjlogo);
        // console.log(genobjfavicon);
        if(this.logoimgname!=this.defaultimgpath && this.imagelogorequest == true ){
          this.imageService.onImageFileUpload(genobjlogo);
        }
    
        if(this.faviconimg!=this.defaultimgpath && this.imagefaviconrequest == true){
          this.imageService.onImageFileUpload(genobjfavicon);
        }

        if(data.data.length!=0){
          var obj = {
            tracking: {
              header: this.pagetrackingstyle+this.pagescriptheader,
              footer: this.pagescriptfooter,
            },
            path: data.data[0].page_path
          };
          this.fileUploadService.updateHome(obj).subscribe({
            next: data => {}
          });
        }
        this._snackBar.open('Data Updated Successfully!!', 'OK');
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
    var newvl = value.split('.'+extn)
    var setname = (newvl[0].toLowerCase()).replaceAll(" ","-");
    var unqueid = Math.random().toString(20).slice(2);
    return setname+'-'+unqueid+'.'+extn;
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
