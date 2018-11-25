import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from "../../app/_services/user.service";
import {environment} from '../../environments/environment';
import {Observable, of} from "rxjs/index";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
  isLogged$: Observable<boolean>;
  user;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
  }

  checkMonth(today: Date) {
    const jwtHelper = new JwtHelperService();
    const currentMonth = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).month;

    if (currentMonth != today.getMonth() + 1) {
      return false;
    } else {
      return true;
    }
  }

  reset() {
    const jwtHelper = new JwtHelperService();
    let today = new Date();
    let id;
    id = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).sub;
    const userLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getById(id)
      .then(data => this.user = data)
      .then(() => {
        this.user.leaderBoardPoints = 0;
        this.user.leaderBoardMonth = today.getMonth() + 1;
        this.userService.update(this.user);
        userLocalStorage.leaderBoardPoints = this.user.leaderBoardPoints;
        userLocalStorage.leaderBoardMonth = this.user.leaderBoardMonth;
        localStorage.setItem('currentUser', JSON.stringify(userLocalStorage));
      });
  }


  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, {username: username, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          let today = new Date();
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          if (this.checkMonth(today)) {
          } else {
            this.reset();
          }
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.isLogged$ = of(false);
    this.router.navigate(["login"]);
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

    return permissions[0] === permission;
  }
}
