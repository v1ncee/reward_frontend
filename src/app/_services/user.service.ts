import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../_models';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}/users`).toPromise();
  }

  getById(id: number) {
    return this.http.get(environment.apiUrl + "/users/" + id)
      .toPromise().then(data => {
        return data;
      });
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  update(user) {
    const url = environment.apiUrl + "/users/" + user.id;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    this.http.put(url, user, httpOptions).toPromise();
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/` + id);
  }
}
