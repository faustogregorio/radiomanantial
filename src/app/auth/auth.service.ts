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

  login(username: string, password: string) {
    return this.http.post(`${this.url}/user/login.php`, { username: username, password: password });
  }

  authentication() {
    let token = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    } else if (this.cookieService.get('token')) {
      token = this.cookieService.get('token');
    }
    return this.http.post(`${this.url}/authenticated.php`, { token: token });
  }


}
