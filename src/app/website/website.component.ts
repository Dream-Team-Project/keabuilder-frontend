import { Component, OnInit } from '@angular/core';
import { WebpagesService } from '../_services/webpages.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {

  constructor(private webpagesService: WebpagesService,
              private _snackBar: MatSnackBar,
              private router: Router, 
              private route: ActivatedRoute, ) { }

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
  seotitle = '';
  seodescr = '';
  seoauthor = '';
  quickeditid = '';
  errorMessage = '';
  pathcheck = false;

  ngOnInit(): void {

    this.showwebpages();

  }

  onSubmit(): void {
    const { pagename, pagepath } = this.form;

    if(this.userFormControl.status=='VALID'){

      //   this.funnelService.saveondb(funnelname, funnelfirststep, badgecolor).subscribe({
      //       next: data => {
      //           // console.log(data);
      //           this.router.navigate(['/create-funnel/'+data.data.hash+'/'+data.data.hash2],{relativeTo: this.route});
            
      //       },
      //       error: err => {
      //       this.errorMessage = err.error.message;
      //       }
      // });
      
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

  addnewpage(){
    this.poupsidebar = true;
    this.quickeditpopup = false;
    this.addnewpagepopup = true;
  }

  changepagename(id:any, title:any, type:any){

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
                
                this.pageurl = data.data[0].page_url;
                this.seotitle = data.data[0].page_title;
                this.seodescr = data.data[0].seo_descr;
                this.seoauthor = data.data[0].seo_author;

                var gettag = data.data[0].seo_keywords;
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

  redirectToBuilder(id:any) {
      this.router.navigate(['/builder/website',id])
  }

}
