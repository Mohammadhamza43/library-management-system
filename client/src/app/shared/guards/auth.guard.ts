import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {DecodeTokenService} from "../services/decode-token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authSingleton: DecodeTokenService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isLoggedIn = !this.authSingleton.isTokenExpired();

    if (!isLoggedIn && state.url.includes('/auth/login')) {
      return true;
    }

    if (!isLoggedIn) {
      this.router.navigateByUrl('/app/auth/login');
      return false
    }

    if (state.url.includes('/auth/login') && isLoggedIn) {
      this.router.navigate(['/app/admin/dashboard']);
      return false;
    }
    return true
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
