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
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(this.USER_KEY);
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getUserLoggedInStatus(): Observable<any> {
      return this.loggedInUser.asObservable();
    }
}
