import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    public userService: UserService,
    public _image: ImageService,
    ) {  }

  DialogParentToggle:boolean = false;
  scrollPosition:any = null;
  issearch = false;
  notification = false;
  offcanvasoverlay = false;
  alerts = true;
  events = false;
  logs = false;
  hiderecentnotifi = false;
  userimgpath = '/assets/images/profile/avatar.png';

  ngOnInit(): void {
    var th:any = this;
    window.addEventListener('scroll', function(){
      th.scrollPosition = window.scrollY;
    });

    
    this.userService.getUsersDetails().subscribe({
      next: data => {
        this.userService.user = {
          name: data.data[0].firstname,
          email: data.data[0].email
        }
        if(data.data[0].useravatar!='' && data.data[0].useravatar!=null && data.data[0].useravatar!=undefined){
          this.userimgpath = '/assets/uploads/images/'+data.data[0].useravatar;
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
    this.router.navigate(['/login'],{relativeTo: this.route});
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
