import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiExercisesService {

  readonly URLExercises = environment.apiUrl + '/exercises/';

  constructor(private http: HttpClient) { }

  getAllExercises() {
    return this.http.get(this.URLExercises)
      .toPromise().then(data => {
        return data;
      });
  }

  getExerciseById(id) {
    return this.http.get(this.URLExercises + id)
      .toPromise().then(data => {
        return data;
      });
  }

  updateExercise(id, exercise) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    return this.http.put(this.URLExercises + id, exercise, httpOptions).toPromise().then(() => console.log('exercise updated'));
  }
  addExercise(exercise) {
    return this.http.post(this.URLExercises, exercise).toPromise().then(() => console.log('exercise added'));
  }
  deleteExercise(id) {
    console.log(id);
    return this.http.delete(this.URLExercises + id).toPromise();
  }
}
