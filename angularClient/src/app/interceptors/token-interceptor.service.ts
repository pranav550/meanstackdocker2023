import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { UserService } from '../services/user.service';
// import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private userservice: UserService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); //this.authService.userValue;
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: `bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {
        console.log('interceptor', err.status);
        if (err.status === 401) {
          console.log('interceptor1');
          this.userservice.logout();
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
