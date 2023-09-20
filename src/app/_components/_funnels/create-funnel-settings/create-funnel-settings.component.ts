import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl, Validators} from '@angular/forms';
import { FunnelService } from 'src/app/_services/funnels.service';
import { CheckoutService } from 'src/app/_services/_sales/checkout.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ImageService } from 'src/app/_services/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebsiteService } from 'src/app/_services/website.service';


@Component({
  selector: 'app-create-funnel-settings',
  templateUrl: './create-funnel-settings.component.html',
  styleUrls: ['./create-funnel-settings.component.css']
})
export class CreateFunnelSettingsComponent implements OnInit {

  constructor(private funnelService: FunnelService,
              private router: Router, 
              private route: ActivatedRoute,
              private checkoutService: CheckoutService,
              public _general: GeneralService,
              private _snackBar: MatSnackBar,
              private imageService: ImageService,
              private websiteService: WebsiteService,
              ) { }

  form: any = {
    reason: '',
  };
  userFormControl = new FormControl('',[Validators.required ]);

  uniqueid:any = '';
  uniqueidstep:any = '';
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  funnelname = '';
  domainselected = '';
  tags:any[] = [];
  faviconurl = '';
  headertracking = '';
  footertracking = '';
  popupsidebar = false;
  hidefornow = false;
  accountconnect = 'Not connnected';
  kbpages:any[] = [];
  pathselected = '';
  defaultdomain = '';
  defaultsubdomain = '';
  kbdomains:any[] = [];
  domainconnerror = false;
  tagstyle = 'Place CSS inside the style tag <style></style> and place JS inside the script tag <script></script>.';
  file = null;
  typeerror = '';
  typeerror2 = '';
  faviconimgname = '';
  imagefaviconrequest = false;
  defaultimgpath = '/assets/images/website/default-file-upload-image.png';
  logoimg:any = this.defaultimgpath;
  faviconimg:any = this.defaultimgpath;
  searching = false;

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params: ParamMap) => { 
      this.uniqueid = params.get('funnel_id');
    })
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.uniqueidstep = params.get('step_id');
    });

    this.funnelService.getuniquefunnelstep(this.uniqueid,'funnelstep').subscribe({
      next: data => {
        // console.log(data);
        this.funnelname = data.data2[0].name;
        this.uniqueidstep = data.data[0].uniqueid;  

        if(data.data?.length!=0){
          this.kbpages = data.data;
        }

        
        if(data.data2?.length!=0){
          data.data2.forEach((element:any) => {
            this.funnelname = element.name;
            var gettag = element.grouptags;
            if(gettag!=''){
              var crtag = gettag.split(',');
              this.tags = crtag; 
            }
            this.faviconurl = element.favicon;

            var elmsubd = element.subdomain+'.keapages.com';
            this.defaultsubdomain = elmsubd;

            this.kbdomains.push({name:elmsubd});

            if(element.domain!='' && element.domain!=null){
              this.domainselected = element.domain;
              this.defaultdomain = element.domain;
            }else{
              this.domainselected = elmsubd;
            }

            if(element.homepage!=null && element.homepage!=''){
              this.pathselected = element.homepage;
            }

            if(element.tracking_header!=null && element.tracking_header!=''){
              this.headertracking = this._general.decodeData(element.tracking_header);
            }

            if(element.tracking_footer!=null && element.tracking_footer!=''){
              this.footertracking = this._general.decodeData(element.tracking_footer);
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

    this.checkoutService.getpaymentinteg().subscribe({
      next: data => {
        // console.log(data);
        if(data.data.length!=0){
          this.accountconnect =  'Connected';
        }
      }
    });   


  }

  tabOpen3 = 'basic';
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }
  
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tags: any): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  kb_settingsteps(value: string) {
    this.tabOpen3 = value;
  }

  updatesetting(){

    this.searching = true;

    var obj = {
      funnelname: this.funnelname,
      homepage: this.pathselected,
      scriptheader: this._general.encodeData(this.headertracking),
      scriptfooter: this._general.encodeData(this.footertracking),
      uniqueid: this.uniqueid,
      domain: this.domainselected,
      grouptags: this.tags.toString()
    };

    // console.log(obj);
    this.funnelService.updatebasicdetails(obj).subscribe({
      next: data => {
          // console.log(data);

          this.funnelname = data.newfunnelname;
          this.funnelService.funnelname = data.newfunnelname;

          var splnmfavi = 'favicon-'+this.uniqueid+'.png';  
          
          var genobjfavicon:any = {path:this.faviconimg, name:splnmfavi};
      
          if(this.faviconimg!=this.defaultimgpath && this.imagefaviconrequest == true){
            this.imageService.onImageFileUpload(genobjfavicon);
          }
          this._general.openSnackBar(false,'Details Updated Successfully', 'OK','center','top');
  
          if(data.found==1){
            this.domainconnerror = true;
            this.searching = false;
          }else{
  
            if(this.defaultsubdomain!=this.domainselected && data.seldomain?.length==0){
              this.websiteService.onchangedirdomain(this.domainselected,this.uniqueid).subscribe({
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

  viewarchivefunnel(){
    this.router.navigate(['/funnels/archive'],{relativeTo: this.route});
  }

  showpopup(){
    this.popupsidebar = true;
  }

  onSubmit(): void {
    const { reason } = this.form;
      this.funnelService.archivefunnelstep(this.uniqueid, reason).subscribe({
        next: data => {
          // console.log(data); 
          if(data.success==1){
            this.router.navigate(['/funnel'],{relativeTo: this.route});
          }
        },
        error: err => {
          console.log(err);
        }
      });


  }

  hidepopupsidebar(){
    this.popupsidebar = false;
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

  generatename(value:any){
    var extn = value.split(/[. ]+/).pop();
    return '.'+extn;
  }

  OnOpen2(){
    (<HTMLInputElement>document.getElementById('fileElemfavicon')).click();
  }

}
