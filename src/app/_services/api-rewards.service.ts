import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';


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
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.URLRewards + id, reward, httpOptions).toPromise();
  }

  addReward(reward) {
    return this.http.post(this.URLRewards, reward).toPromise().then(data => {
      return data;
    });
  }

  deleteReward(id) {
    return this.http.delete(this.URLRewards + id).toPromise();
  }
}
