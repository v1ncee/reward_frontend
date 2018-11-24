import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from "rxjs/index";

@Injectable()
export class AuthGuard implements CanActivate {
  isLogged$: Observable<boolean>;

  constructor(private router: Router) {
    this.isLogged$ = of(true);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      this.isLogged$ = of(true);
      console.log('user', this.isLogged$);
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.isLogged$ = of(false);
    console.log('Geen user', this.isLogged$);
    location.reload();

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
