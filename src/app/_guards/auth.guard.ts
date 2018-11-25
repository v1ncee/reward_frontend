import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from "rxjs/index";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  isLogged$: Observable<boolean>;

  constructor(private router: Router) {
    this.isLogged$ = of(true);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.isLogged$ = of(true);
      // logged in so return true

      // const currentUserRole = currentUser.;
      const jwtHelper = new JwtHelperService();
      const role = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).permissions;
      if (role === 'admin') {
        this.router.navigate(['/admin/applications-admin']);
      } else if (role === 'user') {
        this.router.navigate(['/user/exercises']);
      }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.isLogged$ = of(false);
    location.reload();

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
