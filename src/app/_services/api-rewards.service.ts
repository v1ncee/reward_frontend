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

  // getAllRewards$(): Observable<any> {
  //   console.log('getAllRewards');
  //   return this.http.get(this.getAllRewards)
  //     .pipe(
  //       tap(req => console.log('get-request', req)),
  //       catchError(
  //         (error) => {
  //           console.log(error);
  //           alert(error.message);
  //           return EMPTY;
  //         }),
  //       share()
  //     );
  // }


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
