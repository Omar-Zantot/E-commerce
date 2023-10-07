import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Retrieve the token from local storage
    let token: string | null = localStorage.getItem('userToken');

    // Check if the token is available
    if (token) {
      // Clone the request and add the 'token' header
      const modifiedRequest = request.clone({
        headers: request.headers.set('token', token),
      });

      // Continue with the modified request
      return next.handle(modifiedRequest);
    } else {
      // Token is not available; proceed with the original request
      return next.handle(request);
    }
  }
}
