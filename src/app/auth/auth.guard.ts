import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router , ActivatedRoute} from '@angular/router';
import { Observable, } from 'rxjs';
import { User } from '../models/models';
import { LOCAL_STORAGE_CONSTANTS } from 'src/config/url';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot,): Observable<boolean> | Promise<boolean> | boolean {
    console.log('reached',state);
    if(localStorage.getItem('currentUser')){
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // check if route is restricted by role
    if (next.data.roles && next.data.roles.indexOf(currentUser['roleId']) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/login']);
        
        return false;;
    }
    console.log(next.data.roles);
    // authorised so return true
      return true;
    }
    this.router.navigate(['/login'], {queryParams:{returnUrl : state.url}});
    return false;
  }
  permissions(){
    
  }
}
