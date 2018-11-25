import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

import {environment} from '../../environments/environment';
import {Observable, of} from "rxjs/index";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
  isLogged$: Observable<boolean>;
  times;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, {username: username, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));

          // if (user.role === 'admin') {
          //   this.router.navigate(['admin/applications-admin']);
          //   console.log('admin login');
          // } else if (user.role === 'user') {
          //   this.router.navigate(["user/exercises"]);
          //   console.log('user login');
          // }
        }

        console.log('mooi');



        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.isLogged$ = of(false);
    // if (this.times == 0) {
    this.router.navigate(["login"]);
    //location.reload();

    // } else {
    //   this.times = 0;
    // }
  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      if (JSON.parse(localStorage.getItem('currentUser')).token !== null) {
        this.isLogged$ = of(true);
        return true
      } else {
        this.isLogged$ = of(false);
        return false
      }
    } else {
      this.isLogged$ = of(false);
      return false;
    }
  }

  checkPermission(permission: string) {
    if (!this.isLoggedIn()) {
      this.isLogged$ = of(false);
      return false;
    }
    this.isLogged$ = of(true);


    const jwtHelper = new JwtHelperService();
    const permissions = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).permissions;

    console.log(permissions[0]);
    return permissions[0] === permission;
  }
}
