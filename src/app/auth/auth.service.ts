import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../shared/domain';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = DOMAIN;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  /* getAnuncios() {
    this.http.get('http://localhost:5000/api/v1/anuncios').subscribe(
      result => {
        console.log(result);
      }
    );
  } */
  login(username: string, password: string) {
    return this.http.post(`${this.url}/user/login.php`, { username: username, password: password });
  }

  authentication() {
    return this.http.get(`${this.url}/authenticated.php`);
  }
}
