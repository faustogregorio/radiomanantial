import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private cookieService: CookieService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    if (this.cookieService.get('token')) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.cookieService.get('token')}`
        )
      });
    } else if (localStorage.getItem('token')) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        )
      });
    }
    return next.handle(request);
  }
}
