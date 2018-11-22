import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Reward} from '../_models/reward';


@Injectable({
  providedIn: 'root'
})
export class ApiRewardsService {

  readonly URLRewards = environment.apiUrl + '/rewards/';

  constructor(private http: HttpClient) {
  }

  getAllRewards() {
    return this.http.get(this.URLRewards)
      .toPromise().then(data => {
        return data;
      });
  }

  getRewardById(id) {
    return this.http.get(this.URLRewards + id)
      .toPromise().then(data => {
        return data;
      });
  }

  updateReward(id, reward) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.put(this.URLRewards + id, reward, httpOptions).toPromise().then(() => console.log("reward updated"));
  }
  addReward(reward) {
    return this.http.post(this.URLRewards, reward).toPromise().then(data => {
      return data;
    });
  }
  deleteReward(id) {
    console.log(id);
    return this.http.delete(this.URLRewards + id).toPromise();
  }
}
