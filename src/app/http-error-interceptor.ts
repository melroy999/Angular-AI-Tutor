import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((err) => {
      console.dir(err);
      let message = ""
      if (err.status === 0) {
        message = "A network error occurred. Please try again."
      } else if (err.status === 401) {
        message = "You must be logged in to perform this action."
      } else if (err.status >= 500) {
        message = `A ${err.status} HTTP error occurred. Please try again.`
      }
      
      if (message !== "") {
        snackBar.open(message, 'Dismiss', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      }
      throw err;
    })
  );
};
