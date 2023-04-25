import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DomainService } from '../_services/domain.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  sidebar = {
    open: false,
    anim: {open: false, close: false, time: 500},
    animtime: 300,
  }

  domainname = new FormControl('', [Validators.required]);

  deldomain:any;
  gendomainname:any = '';
  domainconn = 0;
  deldomconn = 0;
  ssldomconn = 0;
  nameservers = [];
  shownamehint = false;
  alldomainsdata:any = [];
  createdatdomain:any = '';
  cldstatus = 'Pending';
  searching:boolean = false;

  constructor(private domainService: DomainService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog, 
              ) { }

  ngOnInit(): void {
    this.domainService.getDomains().subscribe({
      next: data => {
        // console.log(data);
        if(data.data.length!=0){
          data.data.forEach((element:any) => {
            this.alldomainsdata.push(element);
          });
        }
      }
    });
  }

  addnewdomain(){
    this.shownamehint = false;
    this.gendomainname = '';
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

  connectdomain(){
    // console.log(this.gendomainname);
    if(this.domainname.status=='VALID'){
      this.searching = true;
      this.domainconn++;
      // console.log(this.domainname.value);
      if(this.domainconn==1){
        this._snackBar.open('Domain is now processing... Don not close the browser until process is complete.', 'OK');

        this.domainService.oncreatedomain(this.domainname.value).subscribe({
          next: data => {
            // console.log(data);
          
            if(data.success==true){
              this.nameservers = data.nameservers.split(',');
              var objdata = {name:data.dmname,zoneid:data.zoneid, nameservers:data.nameservers, status:data.status};
              this.domainService.oninsertdomain(objdata).subscribe({
                next: data => {
                  // console.log(data);
                  this.searching = false;
                  this.domainconn = 0;
                  this._snackBar.open('Domain has been Successfully added. Please check the given nameservers and update it!', 'OK');
                  if(data.success==true){
                    this.alldomainsdata = [];
                    data.data.forEach((element:any) => {
                      this.alldomainsdata.push(element);
                    });
                      this.shownamehint = true;
                    }
                  }
                });

              }else{
                this.searching = false;
                this.domainconn = 0;
                this._snackBar.open('Something went Wrong!!', 'OK');
              }

          }
        });
      }

    }

  }

  donestep1(){
    this.hidepopupsidebar();
    setTimeout(() => {
      this.gendomainname = '';
      this.nameservers = [];
    }, 310);
  }

  verifyssl(id:any, dmname:any,event:any){
    this.searching = true;

    this.ssldomconn++;

    if(this.ssldomconn==1){

      this.domainService.ongetdomainstatus(dmname).subscribe({
        next: data => {
          // console.log(data);
          if(data.success == true && data.status == 'active'){

            var dmdata = {id:id};
            this.domainService.updatedomaindata(dmdata).subscribe({
              next: data => {
                
                this.ssldomconn = 0;
                this.searching = false;

                // console.log(data);
                if(data.success==true){
                  this.alldomainsdata[0].verifyssl=1;
                  this._snackBar.open('SSL Verified Successfully. Your domain is live now!', 'OK');
                }
              }
            });

          }else{
            this.ssldomconn = 0;
            this.searching = false;
            this._snackBar.open('Your domain is on pending State, Try again in few minutes!', 'OK');
          }
        }
      });

    }


  }

  deletedomain(delpage:any){
    var id = delpage.id;
    var zoneid = delpage.zoneid;
    var domain = delpage.name;

    this.searching = true;
    this.deldomconn++;

    if(this.deldomconn==1){

      this.domainService.onclouddeletedomain(zoneid,domain).subscribe({
            next: data => {
              // console.log(data);
              if(data.success==true){

                this.domainService.ondeletedomain(id).subscribe({
                  next: data => {
                    console.log(data);
                    this.searching = false;
                    this.deldomconn = 0; 

                    if(data.success==true){
                      this.alldomainsdata = [];
                      if(data.data?.length!=0){
                        data.data.forEach((element:any) => {
                          this.alldomainsdata.push(element);
                        });
                      }
                      this._snackBar.open('Domain has been Successfully removed!', 'OK');
                    }else{
                      this._snackBar.open('Something Went Wrong!', 'OK');
                    }
                    
                  }
                });
                
              }else{
                this.searching = false;
                this.deldomconn = 0; 
              }
          }
      });

    }
    

   
  }

  openDialog(templateRef: TemplateRef<any>, domain:any): void {
    this.deldomain = domain;
    this.dialog.open(templateRef);
  }

  viewdomain(data:any){
    // console.log(data);
    this.shownamehint = true;
    this.gendomainname = data.name;
    this.nameservers = data.nameserver.split(',');
    this.createdatdomain = data.created_at;
    this.cldstatus = data.verifyssl == 1 ? 'Active' : 'Pending';
    this.openSidebar();
  }

  removespecialchar(data:any){

    var qr = data.indexOf("www.");
    var qr2 = data.indexOf("http://");
    var qr3 = data.indexOf("https://");
    var qr4 = data.indexOf("http://www.");
    var qr5 = data.indexOf("https://www.");
    var qr6 = data.indexOf(" ");
    var dm;
    if(qr>=0 && qr==0){
      dm = data.split('www.');
      return dm[1];
    }else if(qr2>=0 && qr2==0){
      dm = data.split('http://');
      return dm[1];
    }else if(qr3>=0 && qr3==0){
      dm = data.split('https://');
      return dm[1];
    }else if(qr4>=0 && qr4==0){
      dm = data.split('http://www.');
      return dm[1];
    }else if(qr5>=0 && qr5==0){
      dm = data.split('https://www.');
      return dm[1];
    }else if(qr6>=0){
      dm = data.replace(/\s/g, "");
      return dm;
    }else{
      return data;
    }

  }

  datecusfilter(value:any){
    var dt = new Date(value);
    var text1 = dt.toDateString();    
    var text2 = dt.toLocaleTimeString();
    return text1+' '+text2;
  }



}
