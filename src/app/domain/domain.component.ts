import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { DomainService } from '../_services/domain.service';

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

  gendomainname:any = '';
  domainconn = 0;
  nameservers = [];
  shownamehint = false;

  constructor(private domainService: DomainService) { }

  ngOnInit(): void {
  }

  addnewdomain(){
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
      this.domainconn++;
      // console.log(this.domainname.value);
      if(this.domainconn==1){
        this.domainService.oncreatedomain(this.domainname.value).subscribe({
          next: data => {
            console.log(data);
            
            this.domainconn = 0;
            
              // if(data.success==true){
                var objdata = {zoneid:data.zoneid, nameservers:data.nameservers, status:data.status};
                this.domainService.oninsertdomain(objdata).subscribe({
                  next: data => {
                    console.log(data);
                    this.shownamehint = true;
                  }
                });

                // this._snackBar.open('Stripe Keys Connected Successfully!', 'OK');

              // }
          }
        });
      }

    }

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



}
