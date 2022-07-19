import { Component, OnInit } from '@angular/core';
import { WebpagesService } from '../_services/webpages.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor(private webpagesService: WebpagesService,
              private _snackBar: MatSnackBar) { }

  kbpages:any[] = [];
  poupsidebar = false;
  firstpart = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  keywords:any[] = [];
  addOnBlur = true;
  pageurl = '';
  seotitle = '';
  seodescr = '';
  seoauthor = '';
  quickeditid = '';


  ngOnInit(): void {

    this.showwebpages();

  }

  showwebpages(){
    this.webpagesService.getWebpage().subscribe({
      next: data => {
        console.log(data);
        this.kbpages = [];

        data.data.forEach((element:any) => {
          
          var mycustomdate =  new Date(element.updatedAt);
          var text1 = mycustomdate.toDateString();    
          var text2 = mycustomdate.toLocaleTimeString();
          element.updatedAt = text1+' '+text2;

          this.kbpages.push(element);
          // console.log(this.kbpages);

        });

      },
      error: err => {
        console.log(err);
      }
    });
  }

  checkpagesettings(value:any,data:any){
    if(value=='preview'){
      var url = 'http://localhost:4200/'+data;
      window.open(url, '_blank')
    }
  }

  changepagename(id:any, title:any, type:any){

      this.webpagesService.namepathchanges(id,title,type).subscribe({
        next: data => {
          console.log(data);

          if(data.success==1){
              if(type!='quickedit'){

                if(data.type=='name'){
                  this._snackBar.open('Name Changed Successfully!', 'Close');
                }else if(data.type=='status'){
                  this._snackBar.open('Status Changed Successfully!', 'Close');
                }
    
                this.showwebpages();

              }else if(type=='quickedit'){
                
                this.pageurl = data.data[0].page_url;
                this.seotitle = data.data[0].page_title;
                this.seodescr = data.data[0].seo_descr;
                this.seoauthor = data.data[0].seo_author;

                var gettag = data.data[0].seo_keywords;
                  if(gettag!=''){
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

  hidepopupsidebar(){
    this.poupsidebar = false;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.keywords.push(value);

      var gentags = this.keywords.toString();
      // this.funnelService.addnewtags(this.selectedstep,gentags).subscribe({
      //   next: data => {
      //     console.log(data);
      //     this._snackBar.open('Successfully Tag Added!', 'Close');

      //   }
      // });

    }
  
    // Clear the input value
    event.chipInput!.clear();
  }
  remove(tags: any): void {
    const index = this.keywords.indexOf(tags);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }

    var gentags = this.keywords.toString();
    // this.funnelService.addnewtags(this.selectedstep,gentags).subscribe({
    //   next: data => {
    //     console.log(data);
    //     this._snackBar.open('Successfully Tag removed!', 'Close');

    //   }
    // });

  }

}
