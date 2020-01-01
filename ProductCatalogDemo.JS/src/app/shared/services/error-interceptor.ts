import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private notification: NzNotificationService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse, caught: Observable<any>) => {
        if (err.status === 404) {
          // tslint:disable-next-line: max-line-length
          this.notification.create('error', `Error ${err.status}`, (typeof err.message === 'string') ? err.message : err.message['message']);
        }

        return throwError(err);
      })
      );
  }
}
