import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {SystemPopupService} from '../components/system-popup/system-popup.service';
import {Router} from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor
{
    constructor(
      private popup: SystemPopupService,
      private router: Router
    )
    {

    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if(error.status == 401 && !error.url?.endsWith('/login'))
                {
                  this.popup.open("You have been logged out of the system, click Ok to log in again.", null, true, 'Ok').then((result: any) => {
                    if(result === true)
                    {
                      this.router.navigate(['/login']);
                    }
                  });
                }
                else if(error.status == 500)
                {
                    console.warn('SERVER ERROR: ', error);
                }
                if(error.error?.message)
                {
                  return throwError(() => {return {data: error.error?.data, message: error.error?.message}});
                }
                else
                {
                  return throwError(() => {return {data: {}, message: 'Error performing the operation'}});
                }
            }));
    }
}