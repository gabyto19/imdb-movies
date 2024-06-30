import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiKey = '3f26fc796cmsh3b57359236df64bp113c47jsn93fe65321a8f';
    const clonedRequest = request.clone({
      headers: request.headers.set('X-RapidAPI-Key', apiKey)
    });
    return next.handle(clonedRequest);
  }
}
