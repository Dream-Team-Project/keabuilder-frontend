import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomainService } from 'src/app/_services/domain.service';
import { GeneralService } from 'src/app/_services/_builder/general.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {

  @ViewChild('adddialog') adddialog!: TemplateRef<any>;
  
  // sidebar = {
  //   open: false,
  //   anim: {open: false, close: false, time: 500},
  //   animtime: 300,
  // }

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
  error=false;
  errormessage:any='';

  constructor(private domainService: DomainService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog, 
              public _general: GeneralService,
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
    // this.openSidebar();
    this.dialog.open(this.adddialog);
  }


  connectdomain(){
    console.log(this.gendomainname);
    // if(this.domainname.status=='VALID'){
    //   this.searching = true;
    //   this.domainconn++;
    //   // console.log(this.domainname.value);
    //   if(this.domainconn==1){
    //     this._general.openSnackBar(false,'Domain is now processing... Don not close the browser until process is complete.', 'OK','center','top');

    //     // console.log(this.domainname.value);
    //     this.domainService.oncreatedomain(this.domainname.value).subscribe({
    //       next: data => {
    //         // console.log(data);
          
    //         if(data.success==true){
    //           this.nameservers = data.nameservers.split(',');
    //           var objdata = {name:data.dmname,zoneid:data.zoneid, nameservers:data.nameservers, status:data.status};
    //           this.domainService.oninsertdomain(objdata).subscribe({
    //             next: data => {
    //               // console.log(data);
    //               this.searching = false;
    //               this.error=false;
    //               this.errormessage='';
    //               this.domainconn = 0;
    //               this._general.openSnackBar(false,'Domain has been Successfully added. Please check the given nameservers and update it!', 'OK','center','top');
    //               if(data.success==true){
    //                 this.alldomainsdata = [];
    //                 data.data.forEach((element:any) => {
    //                   this.alldomainsdata.push(element);
    //                 });
    //                   this.shownamehint = true;
    //                   this.dialog.closeAll();
    //                 }
    //               }
    //             });

    //           }else{
    //             this.searching = false;
    //             this.error=true;
    //             this.errormessage='Something went Wrong';
    //             this.domainconn = 0;
    //             this.dialog.open(this.adddialog);
    //             // this._general.openSnackBar(true,'Something went Wrong!!', 'OK','center','top');
    //           }
    //       }
    //     });
    //   }

    // }else{
    //   this.error=true;
    //   this.errormessage='Please enter required details';
    //   this.dialog.open(this.adddialog);
    // }

  }
  resetobj(){
    this.error=false;
    this.errormessage='';
    this.dialog.closeAll();
  }
  donestep1(){
    this.dialog.closeAll();
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
                  this.dialog.closeAll();
                  this._general.openSnackBar(false,'SSL Verified Successfully. Your domain is live now!', 'OK','center','top');
                }
              }
            });

          }else{
            this.ssldomconn = 0;
            this.searching = false;
            this._general.openSnackBar(true,'Your domain is on pending State, Try again in few minutes!', 'OK','center','top');
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
                    // console.log(data);
                    this.searching = false;
                    this.deldomconn = 0; 

                    if(data.success==true){
                      this.alldomainsdata = [];
                      if(data.data?.length!=0){
                        data.data.forEach((element:any) => {
                          this.alldomainsdata.push(element);
                        });
                      }
                      this._general.openSnackBar(false,'Domain has been Successfully removed!', 'OK','center','top');
                    }else{
                      this._general.openSnackBar(true,'Something Went Wrong!', 'OK','center','top');
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
    // this.openSidebar();
    this.dialog.open(this.adddialog);
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
