import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService) {}

  fullsidebar = true;
  scrollPosition:any = null;
  issearch = false;
  notification = false;
  bwname = '';
  bwemail = '';
  offcanvasoverlay = false;
  alerts = true;
  events = false;
  logs = false;

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.tokenStorage.getUser().roles;
    }

    window.addEventListener('scroll', this.updateScroll);

  }

  updateScroll():void{
    this.scrollPosition = window.scrollY;
  }

  showsearch(){
      this.issearch = !this.issearch;
  }

  shownotification(){
    this.notification = !this.notification;
  }

  showoffcanvasoverlay(){
    this.offcanvasoverlay = true;
  }

  hideoverlay(){
      this.offcanvasoverlay=false;
  }

  logout(){
    // this.offcanvasoverlay=false;

  }

  gotouser(){
    this.router.navigate(['/edituser'],{relativeTo: this.route});

    // this.offcanvasoverlay=false;
  }

  showNotify(value:any){
      if(value=='alerts'){
          this.alerts = true;
          this.events = false;
          this.logs = false;
      }else if(value=='events'){
        this.alerts = false;
        this.events = true;
        this.logs = false;
      }else if(value=='logs'){
        this.alerts = false;
        this.events = false;
        this.logs = true;
      }
      
  }



}
