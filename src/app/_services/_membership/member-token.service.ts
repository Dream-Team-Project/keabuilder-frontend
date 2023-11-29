import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberTokenService {

  @Output() loggedInMember: EventEmitter<any> = new EventEmitter<any>();

  private TOKEN_KEY = 'auth-member-token';
  private Member_KEY = 'auth-Member';

  constructor() { }

  membersignOut(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.localStorage.removeItem(this.Member_KEY);
    window.localStorage.removeItem(this.TOKEN_KEY);
  }

  public savememberToken(token: string): void {
    window.localStorage.removeItem(this.TOKEN_KEY);
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getmemberToken(): string | null {
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  public saveMember(Member: any): void {
    window.localStorage.removeItem(this.Member_KEY);
    window.localStorage.setItem(this.Member_KEY, btoa(JSON.stringify(Member)));
  }

  public getMember(): any {
    const Member = window.localStorage.getItem(this.Member_KEY);
    if (Member) {
      return JSON.parse(atob(Member));
    }
    return {};
  }

  public getMemberLoggedInStatus(): Observable<any> {
      return this.loggedInMember.asObservable();
    }
}

