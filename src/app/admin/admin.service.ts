import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from '../shared/domain';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  domain = DOMAIN;

  constructor(
    private http: HttpClient
  ) { }

  actualizarQueMostrarEnCarrusel(facebookPosts: boolean, anuncios: boolean) {
    return this.http.post(`${this.domain}/ajustes/modificarCarrusel.php`, {posts: facebookPosts, anuncios});
  }
  getAjustesDelCarrusel() {
    return this.http.get(`${this.domain}/ajustes/carrusel.php`);
  }
  updateToken(token: string, tokenCaducidad: string) {
    return this.http.post(`${this.domain}/ajustes/modificarToken.php`, {token, token_caducidad: tokenCaducidad});
  }
  getToken() {
    return this.http.get(`${this.domain}/ajustes/token.php`);
  }
}
