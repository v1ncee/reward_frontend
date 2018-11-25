import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import {AuthenticationService} from "../_services";
import decode from 'jwt-decode';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.auth.checkPermission(expectedRole) ||
      tokenPayload.permissions !== expectedRole
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
