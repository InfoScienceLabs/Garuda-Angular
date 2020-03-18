import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URI_CONFIG } from '../../../config/service_url';
import { User } from '../../models/models';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const registerURL = URI_CONFIG.REGISTER_URI;
@Injectable({
  providedIn: 'root'
})

export class AdminService {


  constructor(private http : HttpClient) {
  }

  public register(user: User) {
      return this.http.post(`${registerURL}`, user);
  }
   
}
