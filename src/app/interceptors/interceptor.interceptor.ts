import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('login')) {
      return next.handle(this.addToken(request));
    }
    return next.handle(request);
  }

  addToken(request: HttpRequest<any>) {
    const token: string = JSON.parse(
      localStorage.getItem('user') as string
    ).token;

    return request.clone({
      setHeaders: {
        'X-Token': token,
      },
    });
  }
}
