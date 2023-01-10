import { Component, OnInit, TemplateRef } from '@angular/core';
import { WebsiteService } from '../_services/website.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../_services/file-upload.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  selecteduid = '';

  constructor(private websiteService: WebsiteService,
              private _snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private _file: FileUploadService,
              public dialog: MatDialog, 
              ) { }

  ngOnInit(): void {

   this.fetweb();

  }

  fetweb(){

      this.websiteService.getWebsite().subscribe({
        next: data => {
          if(data.message != 'Error') {
            // console.log(data);
            this.allwebsites = [];
            data.data.forEach((element:any, index:any) => {
              var genobj = {uniqueid:'',title:'',created:'',publishpages:'',totalpage:''};

              genobj.title = element.title;
              var mycustomdate =  new Date(element.created_at);
              var text1 = mycustomdate.toDateString();
              var newspl = text1.split(' ');
              genobj.created = newspl[1]+' '+newspl[2];
              genobj.totalpage = data.count[index].count;

              genobj.publishpages = data.count[index].publish == null ? 0 : data.count[index].publish;

              genobj.uniqueid = element.uniqueid;

              this.allwebsites.push(genobj);

            });
          }
        },
        error: err => {
          // console.log(err);
        }
      });

  }

  newwebsite(){
    this.websitetitle = '';
    this.createweb = true;
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

        var genobj = {title:this.websitetitle, subdomain: this.subdomain};
        this.websiteService.createwebsite(genobj).subscribe({
          next: data => {
    
           console.log(data);

           if(data.exist ==1){
              this._snackBar.open("Subdomain is in use, please use another name!", 'OK');
           }else{


            var dataobj = {uniqueid:data.uniqueid};
            this._file.createwebsitefolder(dataobj).subscribe(e=>{
              console.log(e);
            });


            this._file.createuserlogofavi(data.uniqueid).subscribe(e=>{
              console.log(e);
            });

            // this.websiteService.oncreatesubdomain(this.subdomain,data.uniqueid).subscribe({
            //   next: data => {
                
                console.log(data);
                this._snackBar.open('Website Created Successfully!', 'OK');
                this.router.navigate(['/websites/'+data.uniqueid],{relativeTo: this.route});

            //   }
            // });

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
          this.fetweb();

        }
      });

    }else{
      this._snackBar.open("Website title can't be blank!", 'OK');
    }

  }

  openDialog(templateRef: TemplateRef<any>, page:any): void {
    this.delwebsite = page;
    this.dialog.open(templateRef);
  }

  restoredeleteme(web:any){
 
    console.log(web);

  }

  searchStringInArray(str:any, strArray:any) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return 0;
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
