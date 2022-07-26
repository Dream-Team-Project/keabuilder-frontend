import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NavbarService } from './_services/navbar.service';
import { AuthService } from './_services/auth.service';
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

  constructor(private tokenStorageService: TokenStorageService,
    private router:Router,
    public _nav: NavbarService,
    public _auth: AuthService,
    ) { 
      this.router.events
      .subscribe(
        (event: NavigationEvent) => {
            switch (true) {
              case event instanceof NavigationStart: {
                var e:any = event;
                if(e.url.split('/')[1] == 'builder' || e.url.split('/')[1] == 'preview') {
                  this._nav.hide();
                  document.getElementById('kb-bootstrap-stylesheet')?.removeAttribute('href');
                }
                else {
                  this._nav.show();
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
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }
  }

  changeOfRoutes() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.componetLoaded = true;
    var vm = this;
    setTimeout(()=>{
      vm.componetLoaded = false;
    },500)
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}

