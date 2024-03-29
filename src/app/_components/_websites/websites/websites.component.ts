import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { WebsiteService } from 'src/app/_services/website.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploadService } from 'src/app/_services/file-upload.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/_builder/general.service';
import { ImageService } from 'src/app/_services/image.service';
import { UserService } from 'src/app/_services/user.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  @ViewChild('deldialog') deldialog!: TemplateRef<any>;
  @ViewChild('updatedialog') updatedialog!: TemplateRef<any>;
  @ViewChild('duplicatedialog') duplicatedialog!: TemplateRef<any>;
  @ViewChild('copyurldialog') copyurldialog!: TemplateRef<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  allwebsites:any = []; 
  delwebsite:any;
  website:any;
  webtitleFormControl = new FormControl('',[Validators.required]);
  subdomainFormControl = new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]);
  subdomain:any = '';
  websitetitle:any = '';
  createweb:any = true;
  duplicateweb:any = false;
  selecteduid = '';
  nodata = false;
  searching:boolean = false;
  selstatusshow = 'updated_at DESC';
  duplicatewebid  = '';
  selectedwebsite = '';
  confirmpass = '';
  pageurl:any='';
  error=false;
  errormessage:any='';

  username:any = '';
  websiteslength:any;
  pagewebsites:any;

  constructor(public websiteService: WebsiteService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private _file: FileUploadService,
              public dialog: MatDialog, 
              public _image: ImageService,
              public _general: GeneralService,
              public userService: UserService,
              ) { }

  ngOnInit(): void {
    // this.fetwebfull();
    this.userService.getUsersDetails().subscribe({
      next: data => {
        if(data.data.length>0){
          this.username = data.data[0].username;
        }
      }
    });
    this.fetchData();
  }
  fetchData(){
    this.getpageWebsites({pageIndex:0,pageSize:6}); 
  }

 
  fetweb(data:any){
    if(data.data?.length != 0) {
      this.nodata = false;
      this.pagewebsites = [];
      // this.allwebsites = [];
      data.data.forEach((element:any, index:number) => {
        var genobj = {uniqueid:'',title:'',created:'',publishpages:'',totalpage:'',thumbnail:'',subdomain:'',domain:''};

        genobj.title = element.title;
        genobj.domain = element.domain;
        var mycustomdate =  new Date(element.created_at);
        var text1 = mycustomdate.toDateString();
        var newspl = text1.split(' ');
        genobj.created = newspl[1]+' '+newspl[2];
        genobj.totalpage = data.count[index].count;

        genobj.publishpages = data.count[index].publish == null ? 0 : data.count[index].publish;

        genobj.uniqueid = element.uniqueid;
        genobj.thumbnail = 'keaimage-page-'+element.homepage+'-screenshot.png';
        genobj.subdomain = element.subdomain;

        this.pagewebsites.push(genobj);
        // this.allwebsites.push(genobj);

      });
    }else{
      this.nodata = true;
    }

    this.searching = false;

  }

  searchpage(event: Event) {
    this.searching = true;
    var SearchValue = {
      search:(event.target as HTMLInputElement).value,
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 6,};
    this.selstatusshow = 'all';
    this.websiteService.querystringmanagewebsite(SearchValue).subscribe({
      next: data => {
        this.fetweb(data);
      }
    });
  }

  applykbfilter(){
    var dt:any = {filter:this.selstatusshow,
      pageIndex:this.paginator?.pageIndex || 0,
      pageSize:this.paginator?.pageSize || 6,};
    this.websiteService.shortbypaginatorwebsite(dt).subscribe({
      next: data => {
        this.fetweb(data);
      },
      error: err => {
        // console.log(err);
      }
    });
  }
  
  createnewweb(){
    
    this.createsubdomainname();

    if(this.webtitleFormControl.status=='VALID' && this.subdomain!=''){
      
      this.searching = true;

      var genobj = {title:this.websitetitle, subdomain: this.subdomain};
      this.websiteService.createwebsite(genobj).subscribe({
        next: data => {
        // console.log(data);
        this.dialog.closeAll();

        if(data.exist ==1){
            this.searching = false;
            this.error=true;
            this.errormessage="Subdomain is in use, please use another name!";
            // this._general.openSnackBar(false,"Subdomain is in use, please use another name!", 'OK', 'center', 'top');
        }else{
          if(data?.success){
          var dataobj = {website_id:data.uniqueid};
          // this._file.createwebsitefolder(dataobj).subscribe(e=>{
          //   // console.log(e);
          // });

          this._file.createuserlogofavi(data.uniqueid).subscribe(e=>{
            // console.log(e);
          });

          this.websiteService.oncreatesubdomain(this.subdomain,data.uniqueid).subscribe({
            next: datanw => {
              
            this.searching = false;
            this.resetobj();
            this._general.openSnackBar(false,'Website Created Successfully!', 'OK', 'center', 'top');
            this.router.navigate(['/websites/'+data.uniqueid+'/pages'],{relativeTo: this.route});
            }
          });
        }else{
          this.searching = false;
          this._general.openSnackBar(true,"Usage limit exceeded, Please Upgrade your Plan !", 'OK','center','top');
          this.resetobj();
        }

        }
  
        }
      });

    }
    else{
      this.dialog.open(this.adddialog);
      this.error=true;
      this.errormessage="Something went Wrong!";
    }

  }

 

  updatenewweb(){
    if(this.websitetitle!='' && this.selecteduid!=''){
      var obj = {
        onlysite: true,
        title: this.websitetitle,
        uniqueid: this.selecteduid,
      }
      this.searching = true;
      this.websiteService.updatesitedetails(obj).subscribe({
        next: data => {  
          // console.log(data);
          this._general.openSnackBar(false,"Changes has been updated!", 'OK', 'center', 'top');
          this.fetchData();
          this.resetobj();
          this.searching = false;
        }
      });

    }else{
      // this._general.openSnackBar(false,"Website title can't be blank!", 'OK', 'center', 'top');
      this.error=true;
      this.errormessage="Website title can't be blank!";
      this.dialog.open(this.updatedialog);
    }

  }

  openDialog(templateRef: TemplateRef<any>, data:any): void {

    if(data !='add') {
      this.website=data;
      this.duplicatewebid = data.uniqueid;
      this.selectedwebsite = data.title;
      this.websitetitle = data.title;
      this.selecteduid = data.uniqueid;
    }

    this.dialog.open(templateRef).afterClosed().subscribe((data:any)=>{
     
    })
  }

  resetobj(){
    this.subdomain= '';
    this.websitetitle = '';
    this.confirmpass='';
    this.error=false;
    this.errormessage='';
    this.searching=false;
    this.subdomainFormControl.reset();
    this.webtitleFormControl.reset();
  }

  restoredeleteme(web:any){
    // console.log(web);
    if(this.confirmpass!=''){
      this.searching = true;
      var genobj = {websiteid:web.uniqueid, password:this.confirmpass};
      this.websiteService.deletewebsite(genobj).subscribe({
        next: data => {
          if(data.incorrect == 1){
            this.searching = false;
            this.error=true;
            this.errormessage="Password did't match!";
            // this._general.openSnackBar(false,"Password did't match!",'OK', 'center', 'top');
            this.dialog.open(this.deldialog);
          }else{
            // this._file.deletewebsitefolder(web.uniqueid).subscribe(e=>{
            //   // console.log(e);
            // });

              this.websiteService.ondeletesubdomain(web.subdomain).subscribe({
                next: data => {
                  this.searching = false;
                  this._general.openSnackBar(false,"Website has been successfully deleted!", 'OK', 'center', 'top');
                  this.fetchData();
                  this.resetobj();
                }
              });
             

          }

        }

      });
    }else{
      // this._general.openSnackBar(false,"Password Can't be blank!", 'OK', 'center', 'top');
      this.error=true;
      this.errormessage="Password Can't be blank!";
      this.dialog.open(this.deldialog);
    }

  }  

  createsubdomainname(){
    var uniqid = this._general.makeid(15);
    this.subdomain = this.username+uniqid;
  }

  duplicatewebsite(){
    this.createweb = false;
    this.searching = true;
    this.createsubdomainname();

      if(this.webtitleFormControl.status=='VALID' && this.subdomain!=''){

          var genobj = {title:this.websitetitle, subdomain: this.subdomain, website_id:this.duplicatewebid};
          this.websiteService.duplicatewebsite(genobj).subscribe({
            next: data => {
              // this.dialog.closeAll();

              // console.log(data);
             if(data.exist ==1){
              this.error=true;
              this.errormessage="Subdomain is in use, please use another name!";
                // this._general.openSnackBar(false,"Subdomain is in use, please use another name!", 'OK', 'center', 'top');
                this.dialog.open(this.adddialog);
             }else{
              if(data?.success){
                this._file.createuserlogofavi(data.uniqueid).subscribe(e=>{
                  // console.log(e);
                });

                // if(data.uniqueid!=''){
                //   var dataobj = {old_website_id:this.duplicatewebid, new_website_id:data.uniqueid};
                //   this._file.copywebsitefolder(dataobj).subscribe(e=>{
                //     // console.log(e);
                //   });
                // }

                this.websiteService.oncreatesubdomain(this.subdomain,data.uniqueid).subscribe({
                  next: data => {
                    // console.log(data);
                    this._general.openSnackBar(false,"Website Successfylly Duplicate!", 'OK', 'center', 'top');
                    this.fetchData();
                    this.resetobj();
                    this.searching = false;
                  }
                });
              }else{
                this.searching = false;
                this._general.openSnackBar(true,"Usage limit exceeded, Please Upgrade your Plan !", 'OK','center','top');
                this.dialog.closeAll();
                this.resetobj();
              }


             }
      
            // console.log(data);

            }
          });

      }else{
        this.error=true;
        this.errormessage="Something went Wrong!";
        this.dialog.open(this.duplicatedialog);
     }

  }

  searchStringInArray(str:any, strArray:any) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j] == str) return 0;
    }
    return 1;
}

  removespecialchar(data:any){
    var datagen = data.replace(/[^a-zA-Z0-9]/g, "");
    return datagen;
  }

  removespecialcharwithsmall(data:any){
    var datagen = this.removespecialchar(data).toLowerCase();
    return datagen;
  }

  copyurl(website:any){
    // console.log(website)
  this.pageurl = 'https://'+website?.domain;
  this.dialog.open(this.copyurldialog);
  }
  
  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.dialog.closeAll();
    this._general.openSnackBar(false,'Successfully Copied!', 'OK', 'center', 'top');
  }

  getpageWebsites(event:any){
    this.searching= true;
    let obj={pageIndex:event.pageIndex,pageSize:event.pageSize};
      this.websiteService.getpagewebsites(obj).subscribe(
        (data:any) => {
          this.fetweb(data);
          // this.allwebsites = data?.data;
          // this.pagewebsites=data?.data;
          this.websiteslength=data?.websites;
          this.searching= false;
          // console.log(data)
    });
 }

}
