import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';      // (1)
import { EMPTY, Observable } from 'rxjs';
import { catchError, share, tap } from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApidbService {

  readonly ROOT_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getOverviewPurchases$(idUser): Observable<any> {
    const params = new HttpParams()
      .set('id', idUser);

    return this.http.get(this.ROOT_URL, {params})
      .pipe(
        tap(req => console.log('get-request', req)),
        catchError(
          (error) => {
            console.log(error);
            alert(error.message);
            return EMPTY;
          }),
        share()
      );
  }
}
