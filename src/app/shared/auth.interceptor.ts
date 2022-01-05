import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.isAuthenticated()) {
      request = request.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }
    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            this.auth.logout()
            this.router.navigate(['/admin', 'login'])
          }
          return throwError(error)
        })
      )
  }
}
