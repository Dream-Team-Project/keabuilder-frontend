import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    ) {  }

  DialogParentToggle:boolean = false;
  scrollPosition:any = null;
  issearch = false;
  notification = false;
  bwname = '';
  bwemail = '';
  offcanvasoverlay = false;
  alerts = true;
  events = false;
  logs = false;
  hiderecentnotifi = false;
  defaultimgpath = '/assets/images/profile/avatar.png';


  ngOnInit(): void {

    // if (this.tokenStorage.getToken()) {
    //   this.bwname = this.tokenStorage.getUser().username;
    //   this.bwemail = this.tokenStorage.getUser().email;
    // }
    var th:any = this;
    window.addEventListener('scroll', function(){
      th.scrollPosition = window.scrollY;
    });

    
    this.userService.getUsersDetails().subscribe({
      next: data => {

        this.bwname = data.data[0].firstname
        this.bwemail = data.data[0].email;

        if(data.data[0].useravatar!='' && data.data[0].useravatar!=null && data.data[0].useravatar!=undefined){
          this.defaultimgpath = '/assets/uploads/images/'+data.data[0].useravatar;
        }
      }
    });

  }

  updateScroll(){
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
      this.notification = false;
    }

  logout(): void {
    this.tokenStorage.signOut();

    localStorage.removeItem("kbcourselogin");

    this.offcanvasoverlay=false;
    this.router.navigate(['/'],{relativeTo: this.route});
  }

  gotouser(){
    this.router.navigate(['/profile'],{relativeTo: this.route});
    this.offcanvasoverlay=false;
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

    // drag drop box

    openDialog() {
      this.DialogParentToggle = !this.DialogParentToggle;
  }

  // drag drop box



}
