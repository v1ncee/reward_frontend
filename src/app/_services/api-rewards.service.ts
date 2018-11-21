import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs/index";
import {catchError, share, tap} from "rxjs/internal/operators";
import {resolve} from "url";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiRewardsService {

  readonly URLgetAllRewards = environment.apiUrl + '/rewards/';
  readonly URLgetRewardById = environment.apiUrl + '/rewards/';

  constructor(private http: HttpClient) {
  }

  getAllRewards() {
    return this.http.get(this.URLgetAllRewards)
      .toPromise().then(data => {
        return data;
      })
  }

  getRewardById(id) {
    return this.http.get(this.URLgetRewardById + id)
      .toPromise().then(data => {
        return data;
      })
  }
}
