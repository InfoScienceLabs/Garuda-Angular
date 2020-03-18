import { Injectable, forwardRef } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
// import { LogService } from './log.service';
import { Error } from '../models/models';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(private router: Router) { }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError(operation = 'operation') {
    //console.log(operation);
    return (errorResponse: any): Observable<Error> => {
      // TODO: send the error to remote logging infrastructure
      // this.authService.logout();
      //console.error(errorResponse); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log.error(
      //   `${operation} failed: ${
      //   errorResponse.error ? errorResponse.error.message : <string>errorResponse
      //   }`
      // );
      let err = new Error();
      err.statusCode = errorResponse.status;
      err.message = errorResponse.statusText;
      err.message = errorResponse.error ? errorResponse.error.message : <string>errorResponse;
      // Let the app keep running by returning an empty result.

      if (err.statusCode === 401 && err.message === 'Expired token') {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/login']);
      }
      else if (err.statusCode === 401 && err.message === 'Missing authentication') {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/login']);
      }
      return throwError(err);
    };
  }
}
