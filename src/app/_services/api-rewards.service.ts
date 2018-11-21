import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';


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
      });
  }

  getRewardById(id) {
    return this.http.get(this.URLgetRewardById + id)
      .toPromise().then(data => {
        return data;
      });
  }

  updateReward(id, reward) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.put(this.URLgetAllRewards + id, reward, httpOptions).toPromise().then(()=> console.log("reward geupdate"));
  }
  addReward(reward) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.post(this.URLgetAllRewards + reward.id, reward, httpOptions).toPromise();
  }
  deleteReward(id) {
    console.log(id);
    return this.http.delete(this.URLgetAllRewards + id).toPromise();
  }
}
