import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { NavbarService } from './_services/navbar.service';
import { AuthService } from './_services/auth.service';
import { Router, RouterOutlet,NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';

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

  constructor(private tokenStorageService: TokenStorageService,
    private router:Router,
    public _nav: NavbarService,
    public _auth: AuthService,
    ) { 
      this._nav.show();
      this.router.events
      .subscribe(
        (event: NavigationEvent) => {
          if(event instanceof NavigationStart) {
            console.log('start');
          }
          else if(event instanceof NavigationEnd) {
            console.log('end')
          }
        });
    }

  ngBeforeOnInit(): void {
    this.changeOfRoutes();
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

