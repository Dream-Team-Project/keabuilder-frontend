import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private backendUrl = environment.apiUrl;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith('/api/')) {
      const modifiedRequest = request.clone({
        url: this.backendUrl + request.url.substring(5)
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
