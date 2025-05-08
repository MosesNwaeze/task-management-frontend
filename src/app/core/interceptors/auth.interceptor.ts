import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private permissionService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    const authToken = this.permissionService.getAuthToken();
    const authReq = request.clone({
      setHeaders: {Authorization: `Bearer ${authToken}`},
    });

    console.log(authToken, 'token<>');

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError(() => error);
      })
    );


  }
}
