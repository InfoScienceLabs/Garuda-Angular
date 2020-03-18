import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { URI_CONFIG } from "../../config/service_url";
import { HandleErrorService } from './handle-error.service'
import { catchError } from "rxjs/operators";
const login_url: string = URI_CONFIG.LOGIN_URI;
const add_user: string = URI_CONFIG.ADD_USER;
const update_user: string = URI_CONFIG.ADD_USER;
const getUser: string = URI_CONFIG.VIEW_USER;
const getUserById: string = URI_CONFIG.USERBYID;
// const getUser: string = URI_CONFIG.GETUSERBYID;
const searchUser: string = URI_CONFIG.SEARCHUSERBYKEYWORD;
const requestbalance : string = URI_CONFIG.REQUESTBALANCE;
const getbalance: string = URI_CONFIG.GETBALANCE;
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private exception: HandleErrorService) {}

  _get_all_users() {
    return this.http.get<User>(`${login_url}`)
                    .pipe(catchError(this.exception.handleError()));
  }
  getDetailsOfUser(id: string) {
    return this.http.get<User>(`${getUser}/id=${id}`)
                    .pipe(catchError(this.exception.handleError()));
  }
  public  create_user(user: User){
    return this.http.post<User>(`${add_user}`, user)
                    .pipe(catchError(this.exception.handleError()));
  }
  public  modify_user(user: User){
    return this.http.put<User>(`${update_user}`, user)
                    .pipe(catchError(this.exception.handleError()));
  }
  public  getallUsers(page: number){
    return this.http.get<User[]>(`${getUser}/page=${page}`)
                    .pipe(catchError(this.exception.handleError()));
  }
  public getUserById(id) {
    return this.http.get<User>(`${getUserById}/id=${id}`)
                    .pipe(catchError(this.exception.handleError()));
  }
  searchUserByKeyword(keyword: string){
    return this.http.get<User[]>(`${searchUser}${keyword}`)
                    .pipe(catchError(this.exception.handleError()));
  }
  getwalletbalance() {
    return this.http.get<User>(`${requestbalance}`)
                    .pipe(catchError(this.exception.handleError()));
  }
  public  getBalance(password){
    return this.http.post<User>(`${getbalance}`, password)
                    .pipe(catchError(this.exception.handleError()));
  }

}



