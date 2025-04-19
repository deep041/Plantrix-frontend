import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, tap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    
    const toaster = inject(ToastrService);

    const token = localStorage.getItem('token');

    const authReq = token ? req.clone({
        setHeaders: {
            Authorization: `${token}`
        }
    }) : req;

    return next(authReq).pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.body.responseCode === 200) {
                    
                } else {
                    toaster.error(event.body.message, 'Error');
                }
            }
        }),
        catchError((err: any) => {
            // spinner.hide();
            if (err instanceof HttpErrorResponse) {
                toaster.error(err.message, 'Error');
                if (err.status === 401) {
                    // commonService.showToaster(err.error.responseMessage, 'error');
                    // commonService.clearCookies();
                    // router.navigate(['login']);
                } else if (err.status === 403) {
                    // if (isTokenExpired) {
                    //     pendingRequests.push(req);
                    // } else {
                    //     pendingRequests.push(req);
                    //     isTokenExpired = true;
                    //     refreshToken();
                    // }
                } else {
                    // commonService.showToaster(err.statusText, 'error');
                }
            } else {
                console.error('An error occurred:', err);
            }

            return throwError(() => err);
        })
    );
};
