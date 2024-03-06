import { Component, EventEmitter,TemplateRef, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { ImageService } from 'src/app/_services/image.service';
import {MatDialog,} from '@angular/material/dialog';
import { NavbarService } from 'src/app/_services/navbar.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output('openSidebar') openSidebar: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    public userService: UserService,
    public _image: ImageService,
    public dialog: MatDialog,
    private cookieService: CookieService
    ) {  
      this.randomwelm();
    this.getTheme();
     }

  DialogParentToggle:boolean = false;
  scrollPosition:any = null;
  randomwelcome = "";
  issearch = false;
  notification = false;
  offcanvasoverlay = false;
  alerts = true;
  events = false;
  logs = false;
  hiderecentnotifi = false;
  userimgpath = '/assets/images/profile/avatar.png';
  toggleSidebar:boolean = true;
  isDarkMode: boolean = false;

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
  getTheme() {
    const theme = this.cookieService.get('theme');
    // console.log(theme)
    if (theme) {
      this.isDarkMode = theme === 'dark';
    } else {
      this.isDarkMode = false;
    }
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
    this.tokenStorage.signOut()
    .then(()=>{
      this.offcanvasoverlay=false;
      window.location.href = '/login';
      // this.router.navigate(['/login'],{relativeTo: this.route});
    });
  }

  gotouser(){
    this.router.navigate(['/account/settings'],{relativeTo: this.route});
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

  mainDialog(templateRef: TemplateRef<any>): void {
    this.dialog.open(templateRef);
  }

  // drag drop box

  triggerSidebar() {
    this.toggleSidebar = !this.toggleSidebar;
    this.openSidebar.emit(this.toggleSidebar);
  }
  randomwelm(){
    var welcomeMessages = [
      "Welcome back! We're glad to see you.",
      "Hello there! Ready to get started?",
      "Good day! Let's make it productive.",
      "Greetings! Your dashboard awaits you.",
      "Hey, it's you again! Let's dive in.",
      "Welcome! Get ready to explore a world of possibilities.",
      "Greetings! Your journey begins here.",
      "Hello! We're thrilled to have you with us.",
      "Hey there! Let's make today awesome.",
      "Welcome back! We missed you.",
      "Hello! Your presence makes us smile.",
      "Good day! Your adventure starts now.",
      "Greetings! Get ready for a fantastic experience.",
      "Hey, we hope you're ready for some exciting moments!",
      "Welcome aboard! Let's navigate this together.",
      "Hello! Your journey into our world begins now.",
      "Good to see you! Let's make today productive.",
      "Welcome back! Your presence brightens our day.",
      "Hello! We're delighted to have you here.",
      "Hey there! Let's dive into a world of possibilities.",
      "Welcome! Your adventure awaits.",
      "Greetings! Let's get started on something amazing.",
      "Hello! Your presence is the best part of our day.",
      "Good day! We're excited to have you here.",
    ];
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    this.randomwelcome = welcomeMessages[randomIndex];
  }
  setTheme(theme: string) {
    this.isDarkMode = theme === 'dark';
    this.cookieService.set('theme', theme);
    window.location.href = '/';
  }
}
