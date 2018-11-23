import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';      // (1)
import { EMPTY, Observable } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {User} from "../_models";
import {UserService} from "../_services";
import {JwtHelperService} from '../../../node_modules/@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ApidbService {

  readonly ROOT_URL = environment.apiUrl;
  user;
  constructor(private http: HttpClient, private userService: UserService,
  ) {
  }

  getOverviewPurchases() {
    const jwtHelper = new JwtHelperService();
    const userid = jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).sub;
    var lijst = [];

    return this.userService.getById(userid)
      .then(data => this.user = data)
      .then(()=> {for (var i = 0; i < this.user.purchases.length; i++) {

          this.http.get(this.ROOT_URL+ "/rewards/" + this.user.purchases[i]) //id van reward
            .toPromise().then(data => {
            lijst.push(data)

          })
        }}
      )
      .then(() => {return lijst});
  }
}
