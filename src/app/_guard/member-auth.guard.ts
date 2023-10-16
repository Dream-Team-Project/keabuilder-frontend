import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MembersService } from '../_services/_membership/members.service';

@Injectable({
  providedIn: 'root'
})
export class MemberAuthGuard implements CanActivate {
  
  constructor(private _memberService: MembersService,
    private _router: Router) {}
    canActivate(): boolean {
      if(this._memberService.memberloggedIn()) {
        return true;
      }
      else {
        this._router.navigate(['/member/login']);
        return false;
      }
    }
  
}
