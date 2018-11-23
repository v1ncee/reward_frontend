import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
      if(localStorage.getItem('currentUser')) {
        if (JSON.parse(localStorage.getItem('currentUser')).token !== null) {return true} else {return false}
      }else {
        return false;
      }
    }

    checkPermission(permission: string) {
      if(!this.isLoggedIn()) {
        return false;
      }

      const jwtHelper = new JwtHelperService();
      const permissions = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).permissions;

      console.log(permissions[0]);
      return permissions[0] === permission;
    }
}
