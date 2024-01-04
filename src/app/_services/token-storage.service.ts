import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  @Output() loggedInUser: EventEmitter<any> = new EventEmitter<any>();

  private TOKEN_KEY = environment.tokenKey;
  private USER_KEY = environment.userKey;

  constructor() { }

  public signOut(): Promise<void> {
    return new Promise((resolve) => {
      try {
        window.localStorage.removeItem(this.USER_KEY);
        window.localStorage.removeItem(this.TOKEN_KEY);
        resolve();
      } catch (error) {
        console.error('Error during sign out:', error);
      }
    });
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(this.TOKEN_KEY);
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    const token = window.localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      return token;
    }
    else {
      this.signOut();
      return '';
    }
  }

  public saveUser(user: any): void {
    let encoded = btoa(JSON.stringify(user));
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.setItem(this.USER_KEY, encoded);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(this.USER_KEY);
    if (user) {
      let decoded = JSON.parse(atob(user));
      return decoded;
    }
    else {
      this.signOut();
      return {};
    }
  }

  public getUserLoggedInStatus(): Observable<any> {
      return this.loggedInUser.asObservable();
    }
}
