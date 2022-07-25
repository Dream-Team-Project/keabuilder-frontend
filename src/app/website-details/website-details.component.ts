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
          console.log(this.pathselected);
          this.fileUploadService.createhome(this.pathselected).subscribe({
            next: data => {}
          });
        }

        this._snackBar.open('Data Updated Successfully!!', 'Close');
      }
    });

  }



}
