import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from "@angular/common/http";
import { nextContext } from "@angular/core/src/render3";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Observable } from "rxjs";

import { AuthenticationService } from "../auth/authentication.service";
import { LOCAL_STORAGE_CONSTANTS } from "../../config/url";

@Injectable()
export class InterceptService implements HttpInterceptor {
  private authService: AuthenticationService;

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.token}`
        }
      }), (err : any )=>{
        if( err instanceof HttpErrorResponse){
          if(err.status === 401){
            
          }
        }
      };
    }
    return next.handle(request);

      if (this.authService.isLoggedIn) {
        const authReq = request.clone({
          headers: request.headers.set("Authorization", this.authService.token)
          // headers: req.headers.set('')
        });
        request = request.clone({
          setHeaders: {
            Authorization: `${currentUser.token}`
          }
        });
      }
      console.log(request);
      return next.handle(request);

      // catching the error

      // return next.handle(request).pipe(catchError(err =>{
      //   if(err.status == 401){
      //     // this.authService.logout();
      //     location.reload(true);
      //   }
      // }));
      // const error = err.error.message || error.statusText;
      // return throwError(error)
    }
  }

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true }
];
