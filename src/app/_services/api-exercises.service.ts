import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiExercisesService {

  readonly URLgetAllExercises = environment.apiUrl + '/exercises/';
  readonly URLgetExerciseById = environment.apiUrl + '/exercises/';

  constructor(private http: HttpClient) { }

  getAllExercises() {
    return this.http.get(this.URLgetAllExercises)
      .toPromise().then(data => {
        return data;
      })
  }

  getExerciseById(id) {
    return this.http.get(this.URLgetExerciseById + id)
      .toPromise().then(data => {
        return data;
      })
  }
}
