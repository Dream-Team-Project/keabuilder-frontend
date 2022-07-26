import { Component, OnInit } from '@angular/core';
import { WebsiteService } from '../_services/website.service';
import { WebpagesService } from '../_services/webpages.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FileUploadService } from '../_services/file-upload.service';

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
  file = null;
  typeerror = '';
  typeerror2 = '';
  logoimg = '/assets/images/website/default-file-upload-image.png';
  faviconimg = '/assets/images/website/default-file-upload-image.png';
  logoimgname = '';
  faviconimgname = '';


  constructor(private websiteService: WebsiteService,
              private webpagesService: WebpagesService,
              private _snackBar: MatSnackBar,
              private fileUploadService:FileUploadService,) { }

  ngOnInit(): void {

    // Get Pages & landing page
    this.webpagesService.getWebpages().subscribe({
      next: data => {
        console.log(data);

        this.kbpages = data.data;

        // data.data.forEach((element:any) => {
          
        //   var mycustomdate =  new Date(element.updated_at);
        //   var text1 = mycustomdate.toDateString();    
        //   var text2 = mycustomdate.toLocaleTimeString();
        //   element.updated_at = text1+' '+text2;

        //   this.kbpages.push(element);
          
        //   console.log(this.kbpages);

        // });

      },
      error: err => {
        console.log(err);
      }
    });

    this.websiteService.getWebsite().subscribe({
      next: data => {
        // console.log(data);
          data.data.forEach((element:any) => {
            this.kbwebsite.push(element);

            if(element.tracking_header!=null && element.tracking_header!=''){
              this.pagescriptheader = decodeURIComponent(element.tracking_header);
            }

            if(element.tracking_footer!=null && element.tracking_footer!=''){
              this.pagescriptfooter = decodeURIComponent(element.tracking_footer);
            }

            if(element.homepage!=null && element.homepage!=''){
              this.pathselected = element.homepage;
            }

            if(element.logo!=null && element.logo!=''){
              this.pathselected = element.logo;
            }

            if(element.favicon!=null && element.favicon!=''){
              this.pathselected = element.favicon;
            }

          });
      },
      error: err => {
        console.log(err);
      }
    });

  }

  updatepage(){
    console.log(this.pathselected);
    console.log(this.pagescriptheader);
    console.log(this.pagescriptfooter);

    this.websiteService.updatesitedetails(this.pathselected, this.pagescriptheader, this.pagescriptfooter).subscribe({
      next: data => {
        console.log(data);

        
        if(this.pathselected!=''){
          var pathobj = {path:this.pathselected};
          this.fileUploadService.createhome(pathobj).subscribe({
            next: data => {}
          });
        }

        this._snackBar.open('Data Updated Successfully!!', 'Close');
      }
    });

  }

  changeme (event:any) {
    var outsidethis:any = this;
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;
    var getname = (event.target.files[0].name).split('.png');
    var setname = (getname[0].toLowerCase()).replaceAll(" ","-");
    var unqueid = Math.floor(Math.random()*8);
    var finalval = setname+'-'+unqueid;
    this.logoimgname = finalval;

    console.log(this.logoimgname);

    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.typeerror = '';
      var fileReader = new FileReader();
      
      fileReader.readAsDataURL(this.file);
      fileReader.addEventListener("load", function (readerEvt:any) {
        outsidethis.logoimg = this.result;
      });    
    }else{
      this.logoimg = '/assets/images/website/default-file-upload-image.png';
      this.typeerror = 'File Type Not Allow';
    }

  }

  OnOpen(){
    (<HTMLInputElement>document.getElementById('fileElemlogo')).click();
  }

  changeme2 (event:any) {
    var outsidethis:any = this;
    this.file = event.target.files[0];
    var chktype = event.target.files[0].type;

    if (this.file!=null && (chktype=='image/jpeg' || chktype=='image/jpg' || chktype=='image/png')) {
      this.typeerror = '';
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.addEventListener("load", function () {
        // console.log(this.result);
        outsidethis.faviconimg = this.result;
      });    
    }else{
      this.faviconimg = '/assets/images/website/default-file-upload-image.png';
      this.typeerror2 = 'File Type Not Allow';
    }

  }

  OnOpen2(){
    (<HTMLInputElement>document.getElementById('fileElemfavicon')).click();
  }


}
