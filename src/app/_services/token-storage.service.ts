import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  @Output() loggedInUser: EventEmitter<any> = new EventEmitter<any>();

  private TOKEN_KEY = 'auth-token';
  private USER_KEY = 'auth-user';

  constructor() { }

  signOut(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.removeItem(this.TOKEN_KEY);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(this.TOKEN_KEY);
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.setItem(this.USER_KEY, btoa(JSON.stringify(user)));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(atob(user));
    }
    return {};
  }

  public getUserLoggedInStatus(): Observable<any> {
      return this.loggedInUser.asObservable();
    }
}
