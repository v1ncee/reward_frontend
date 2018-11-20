import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs/index";
import {catchError, share, tap} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiRewardsService {

  readonly getAllRewards = environment.apiUrl + '/rewards/';

  constructor(private http: HttpClient) {                           // (2)
  }

  getAllRewards$(): Observable<any> {                         // (4)
    return this.http.get(this.getAllRewards)
      .pipe(
        tap(req => console.log('get-request', req)),               // (6)
        catchError(                                                // (7)
          (error) => {
            console.log(error);
            alert(error.message);
            return EMPTY;
          }),
        share()                                                    // (8)
      );
  }
}
