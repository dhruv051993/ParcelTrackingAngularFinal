import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/JSON',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class UserparcelService {

  constructor(private http: HttpClient) { }

  getParcelDetailsUser(): Observable<any> {
    return this.http
      .get<any>(environment.baseUrl + 'getParcelDetailsUser', httpOptions)
      .pipe(tap(response => console.log(response),
      error => {
        window.alert(error.error.message);
      } ));
  }
}
