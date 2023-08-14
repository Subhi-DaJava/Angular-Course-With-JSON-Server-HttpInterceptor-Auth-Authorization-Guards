import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AppStateService} from "../services/app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard { // implements CanActivate

  constructor(private appStatus: AppStateService, public router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.appStatus.authStatus.roles.includes(route.data['roles'])) { // this.appStatus.authStatus.roles.includes('ADMIN'), if two or more roles
      return true;
    } else {
      this.router.navigateByUrl('/auth/notAuthorized').then();
      return false;
    }
  }
}
