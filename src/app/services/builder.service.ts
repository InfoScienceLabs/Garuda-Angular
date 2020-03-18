import { Injectable } from '@angular/core';
import { Builder } from "../models/builder";
// import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { URI_CONFIG } from "../../config/service_url";
import { HandleErrorService } from './handle-error.service';
import { catchError } from 'rxjs/operators';

const add_builder: string = URI_CONFIG.ADD_BUILDER;
const getBuilderName: string = URI_CONFIG.GETBUILDERNAME;
const getBuilder: string = URI_CONFIG.VIEW_BUILDER;
const getBuilderById: string = URI_CONFIG.BUILDERBYID;
const getorgname: string = URI_CONFIG.GETORGNAME;
@Injectable({
  providedIn: 'root'
})
// export interface User {
//   name: string;
// }
export class BuilderService {

  constructor(private http: HttpClient, private exception: HandleErrorService ) {}
  public  create_builder(builder: Builder){
    return this.http.post<Builder>(`${add_builder}`, builder)
                    .pipe(catchError (this.exception.handleError()));
  }
  getBuilderByName(name) {
    return this.http.get<Builder[]>(`${getBuilderName}${name}`)
                    .pipe(catchError(this.exception.handleError()));
  }
  getorgByName(name) {
    return this.http.get<Builder[]>(`${getorgname}${name}`)
                    .pipe(catchError(this.exception.handleError()));
  }
  public  getallBuilders(page: number){
    return this.http.get<Builder[]>(`${getBuilder}/page=${page}`)
                    .pipe(catchError(this.exception.handleError()));
  }
  public getBuilderById(id) {
    return this.http.get<Builder>(`${getBuilderById}/id=${id}`)
                    .pipe(catchError(this.exception.handleError()));
  }
}
