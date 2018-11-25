import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiExercisesClaimService {

  readonly URLExercises = environment.apiUrl + '/claimexercise/';

  constructor(private http: HttpClient) {
  }

  getAllExercisesClaims() {
    return this.http.get(this.URLExercises)
      .toPromise().then(data => {
        return data;
      });
  }

  getExerciseClaimById(id) {
    return this.http.get(this.URLExercises + id)
      .toPromise().then(data => {
        return data;
      });
  }

  updateExerciseClaim(id, exercise) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(this.URLExercises + id, exercise, httpOptions).toPromise();
  }

  addExerciseClaim(item) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.URLExercises, item, httpOptions).toPromise();
  }

  deleteExerciseClaim(item) {

    return this.http.delete(this.URLExercises + item.id).toPromise().then(data => console.log('verwijderd'));
  }
}
