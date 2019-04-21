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
export class AdminDeliveryService {

  constructor(private http: HttpClient) { }

  getDeliveryDetailsAdmin(): Observable<any> {
    return this.http
      .get<any>(environment.baseUrl + 'getDeliveryDetailsAdmin', httpOptions)
      .pipe(tap(response => console.log('1'),
      error => {
        window.alert(error.error.message);
      } ));
  }
}
