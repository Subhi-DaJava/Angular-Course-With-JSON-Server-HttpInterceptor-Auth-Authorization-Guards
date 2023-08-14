import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AppStateService} from "../services/app-state.service";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationGuard { //  implements CanActivate deprecated
  constructor(private appStatus: AppStateService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.appStatus.authStatus.isAuthenticated) {

      return true;
    } else {
      this.router.navigateByUrl("/login").then();
      return false;
    }
  }

}
