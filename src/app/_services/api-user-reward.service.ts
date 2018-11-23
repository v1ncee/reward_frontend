import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiUserRewardService {

  readonly URLUserReward = environment.apiUrl + '/userreward/';

  constructor(private http: HttpClient) { }

  getUserRewardsById(id) {
    return this.http.get(this.URLUserReward + id)
      .toPromise().then(data => {
        return data;
      });
  }

  insertUserReward(userid, rewardid) {
    console.log('userreward api');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.post(this.URLUserReward, {user: userid, reward: rewardid}, httpOptions)
      .toPromise().then(data => {
        return data;
      });
  }
}
