import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            // Unauthorized: Redirect to login page
            this.router.navigate(['/login']);
            break;
          case 403:
            // Forbidden: Show an error message
            Swal.fire({
              icon: 'error',
              title: 'Access Denied',
              text: 'You do not have permission to access this resource.'
            });
            break;
          case 404:
            // Not Found: Show an error message
            Swal.fire({
              icon: 'error',
              title: 'Not Found',
              text: 'The requested resource could not be found.'
            });
            break;
          case 500:
            // Internal Server Error: Show an error message
            Swal.fire({
              icon: 'error',
              title: 'Server Error',
              text: 'An error occurred on the server. Please try again later.'
            });
            break;
          default:
            // Handle other errors
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An unexpected error occurred. Please try again.'
            });
            break;
        }

        // Optionally, log the error to the console
        console.error('HTTP Error:', error);

        // Propagate the error
        return throwError(error);
      })
    );
  }
}
