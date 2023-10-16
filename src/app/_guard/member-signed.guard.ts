import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MembersService } from '../_services/_membership/members.service';

@Injectable({
  providedIn: 'root'
})
export class MemberSignedGuard implements CanActivate {
  constructor(private _memberService: MembersService,
    private _router: Router) {}
    canActivate(): boolean {
      if(this._memberService.memberloggedIn()) {
        this._router.navigate(['/']);
        return false;
      }
      else return true;
    }  
  
}
