import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = this.authService.userSelectedChange.value?.token as string;
    let modReq;
    if (token && req.url.indexOf(environment.baseApiUrl) > -1) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    // req.clone({
    //   params: new HttpParams().set('auth', token)
    // });
    // req = req.clone({
    //   headers: req.headers.set("Content-Type","application/x-www-form-urlencoded")
    // });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(catchError(event => {
      if (event instanceof HttpErrorResponse) {
        this.authService.logOut();
      }
      throw event;
    }));
  }}
