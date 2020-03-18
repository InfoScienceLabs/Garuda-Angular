import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { URI_CONFIG } from "../../config/service_url";
import { User } from "../models/models";
import { Router, ActivatedRoute } from "@angular/router";
import {LOCAL_STORAGE_CONSTANTS} from '../../config/url';
const login_uri: string = URI_CONFIG.LOGIN_URI;

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public state: string;
  public token: string;
  public isLoggedIn: boolean = this.checkUserLoggedIn();

  public currentUser: User;
  constructor(private http: HttpClient, private router: Router ) {
    if(localStorage.getItem("currentUser")){
      this.currentUser = new User();
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
  }
  public login(email: string, password: string) {
    return this.http.post<any>(`${login_uri}`, { email, password }).pipe(
      map((user: User) => {
        if (user) {
          console.log('user :',user);
          this.storeUserDetails(user);
          return user;
        }
        
      })
    );
  }
  
  private storeUserDetails(user: User) {
    // localStorage.setItem(LOCAL_STORAGE_CONSTANTS.TOKEN, user.token);
    // localStorage.setItem(LOCAL_STORAGE_CONSTANTS.CURRENT_LOGGED_IN_USER, JSON.stringify(user));
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.currentUser = new User();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
  private checkUserLoggedIn() : boolean {
    this.state = JSON.parse(localStorage.getItem('currentUser'));
    if (this.state === null) return false;
    else return true;
  }

  public logout() {
    // this.socketService.logout_notify();
    localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_CONSTANTS.CURRENT_LOGGED_IN_USER);
  }
}
