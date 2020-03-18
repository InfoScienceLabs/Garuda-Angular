import { Injectable } from '@angular/core';
import { Property } from "../models/models";
import { HttpClient } from "@angular/common/http";
import { URI_CONFIG } from "../../config/service_url";

// const login_url: string = URI_CONFIG.LOGIN_URI;
const uploadImage: string = URI_CONFIG.UPLOADIMAGE;
const uploadDoc: string = URI_CONFIG.UPLOADIMAGE;
;
@Injectable({
  providedIn: 'root'
})
export class ImageService {

 constructor(private http : HttpClient) {}

    public uploadImage(image : File){
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post(`${uploadImage}`,formData);
 }
 public uploadDoc(doc : File){
  const formData = new FormData();
  formData.append('file', doc);
  return this.http.post(`${uploadDoc}`,formData);
}
}