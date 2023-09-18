import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event as NavigationEvent } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentDomain:any = window.location.hostname;
  appHost:any = environment.appHost;
  toggleSidebar:boolean = false;
  private roles: string[] = [];
  isLoggedIn:boolean = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  componetLoaded:boolean = false;
  loading:boolean = false;

  constructor(
    private router:Router,
    private title: Title,
    public _user: UserService,
    private _token: TokenStorageService
    ) { 
      router.events
      .subscribe(
        (event: NavigationEvent) => {
            switch (true) {
              case event instanceof NavigationStart: {
                var e:any = event;
                var geturl = e.url.split('/')[1];
                var isAutomation = e.url.split('/')[2] == 'automation';
                if(geturl == 'preview') {
                  let head:any = document.head;
                  head.querySelector('link').href = '';
                }
                else {
                  const link:any = document.querySelector("link[rel*='icon']") || document.createElement('link');
                  link.type = 'image/x-icon';
                  link.rel = 'icon';
                  link.href = 'favicon.ico';
                  document.getElementsByTagName('head')[0].appendChild(link);
                  this.title.setTitle('Keabuilder');
                }
                if(geturl=='fetch-orderform'){
                  _user.hideNav();
                }
                else if((geturl == 'builder' || geturl == 'preview' || geturl == 'fetch-form') && !isAutomation) {
                  _user.hideNav();
                  document.getElementById('kb-bootstrap-stylesheet')?.removeAttribute('href');
                }
                else {
                  (geturl == 'course'  || geturl == 'checkout' || isAutomation) ? _user.hideNav() : _user.showNav();
                  document.getElementById('kb-bootstrap-stylesheet')?.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css');
                }
                this.loading = true;
                this.changeOfRoutes();
                break;
              }
              case event instanceof NavigationEnd: {
                this.loading = false;
                break;
              }
              case event instanceof NavigationCancel: {
                this.loading = false;
                break;
              }
              case event instanceof NavigationError: {
                this.loading = false;
                break;
              }
              default: {
                break;
              }
            }
        });
    }

  ngBeforeOnInit(): void {
  }

  ngOnInit(): void {
    if(this.isLoggedIn) {
      const user = this._token.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }

  changeOfRoutes() {
    this.isLoggedIn = !!this._token.getToken();
    this.componetLoaded = true;
    var vm = this;
    setTimeout(()=>{
      vm.componetLoaded = false;
    },500)
  }

  logout(): void {
    this._token.signOut();
    window.location.reload();
  }

  triggerSidebar(e:boolean) {
    this.toggleSidebar = !this.toggleSidebar;
  }
}



