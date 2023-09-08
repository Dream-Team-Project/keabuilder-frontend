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
  selector: 'app-funnel-settings',
  templateUrl: './funnel-settings.component.html',
  styleUrls: ['./funnel-settings.component.css']
})
export class FunnelSettingsComponent implements OnInit {


userFormControl = new FormControl('',[Validators.required ]);

uniqueid:any = '';
uniqueidstep:any = '';
funnelname = '';
domainselected = '';
faviconurl = '';
headertracking = '';
footertracking = '';
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

constructor(private funnelService: FunnelService,
  private router: Router, 
  private route: ActivatedRoute,
  private checkoutService: CheckoutService,
  public _general: GeneralService,
  private _snackBar: MatSnackBar,
  private imageService: ImageService,
  private websiteService: WebsiteService,
  ) { 
    this.route.parent?.paramMap.subscribe((params: ParamMap) => { 
      this.uniqueid = params.get('funnel_id');
      })
      this.route.paramMap.subscribe((params: ParamMap) => {
      this.uniqueidstep = params.get('step_id');
      });
  }

ngOnInit(): void {
this.fetchfunnel();

}
fetchfunnel(){
  this.funnelService.getuniquefunnelstep(this.uniqueid,'funnelstep').subscribe({
    next: data => {
    console.log(data);
    this.funnelname = data.data2[0].name;
    this.uniqueidstep = data.data[0].uniqueid;  
    
    if(data.data?.length!=0){
    this.kbpages = data.data;
    }
    
    
    if(data.data2?.length!=0){
    data.data2.forEach((element:any) => {
      this.funnelname = element.name;
     
      this.faviconurl = element.favicon;
    
      var elmsubd = element.subdomain+'.keapages.com';
      this.defaultsubdomain = elmsubd;
    
      this.kbdomains.push({name:elmsubd});

      if(data.alldomains?.length>0){
        data.alldomains.forEach((element:any) => {
          this.kbdomains.push(element);
        });
      }
    
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
    // console.log(err);
    }
    });
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
grouptags: '',
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

if(data.data.length!=0){
  var obj = {
    tracking: {
      header: this.headertracking,
      footer: this.footertracking,
    },
    path: data.data[0].page_path,
    website_id: this.uniqueid,
    dir: 'pages'
  };
  this._general._file.updateHome(obj).subscribe({
    next: data => {
       this._general.openSnackBar(
            false,'Details Updated Successfully!', 'OK','center',
            'top');
    }
  });

}else{
  this.searching = false;
   this._general.openSnackBar(
            false,'Details Updated Successfully!', 'OK','center',
            'top');
}

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

