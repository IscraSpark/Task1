import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetrepoService } from './getrepo.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('login')) {
      return next.handle(this.addtoken(request));
    }
    return next.handle(request);
  }

  addtoken(request: HttpRequest<any>) {
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
