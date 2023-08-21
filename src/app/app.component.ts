import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Keabuilder';
  private roles: string[] = [];
  isLoggedIn:boolean = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  componetLoaded:boolean = false;
  loading:boolean = false;

  constructor(
    private router:Router,
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
                if((geturl == 'builder' || geturl == 'preview' || geturl == 'fetch-form') && !isAutomation) {
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
}

