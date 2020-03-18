import { Injectable } from '@angular/core';
import { Property, Transaction } from "../models/models";
import { HttpClient } from "@angular/common/http";
import { URI_CONFIG } from "../../config/service_url";
import { HandleErrorService } from './handle-error.service';
import { catchError } from 'rxjs/operators';
import { Builder } from 'protractor';


// const login_url: string = URI_CONFIG.LOGIN_URI;

const createproperty: string = URI_CONFIG.CREATEPROPERTY_URI;
const getProperty: string = URI_CONFIG.VIEW_PROPERTY;
const getPropertyByID: string = URI_CONFIG.PROPERTYBYID;
const getUserProperties: string = URI_CONFIG.GETALLPROPERTYOFUSER;
const getUserPropertiesmarketplace: string = URI_CONFIG.GETALLPROPERTYOFUSER;
const getBuilderName: string = URI_CONFIG.GETBUILDERNAME;
const propertyconfirm: string = URI_CONFIG.PROPERTYCONFIRM;
const marketplace_url: string = URI_CONFIG.MARKETPLACE;
const tax_url: string = URI_CONFIG.TAX;
const getlistings: string = URI_CONFIG.GETListing;
const getcertificate: string = URI_CONFIG.CERTIFICATE;
const getcontract: string = URI_CONFIG.CONTRACT;
const getusertransactions: string = URI_CONFIG.GETUSERTRANSACTIONS;
const gettransactionbyid: string = URI_CONFIG.GETUSERTRANSACTIONS;
const getmarketplaceById: string = URI_CONFIG.MARKETPLACE;
const sales: string = URI_CONFIG.SALES;
const bought: string = URI_CONFIG.BOUGHT;
const contracts: string = URI_CONFIG.CONTRACTS;
const delist: string = URI_CONFIG.DELIST;


@Injectable({

  providedIn: 'root'

})
export class PropertyService {
  constructor(private http: HttpClient, private exception: HandleErrorService) { }

  public addProperty(property: Property): any {
    // return this.http.post<Property>(`${createproperty}`, property);
    let propertyObject = JSON.parse(JSON.stringify(property));
    console.log('service: ', propertyObject);
    propertyObject.owner.forEach(element => {
      delete element.OwnerName;
    });
    return this.http.post<Property>(`${createproperty}`, propertyObject)
      .pipe(catchError(this.exception.handleError()));
  }

  public updateProperty(propertyId): any {
    // return this.http.post<Property>(`${createproperty}`, property);
    // let propertyObject = Object.assign({property});
    const propertyObject = JSON.parse(JSON.stringify(propertyId));
    console.log('service: ', propertyObject);
    propertyObject.owner.forEach(element =>{
      delete element.OwnerName;
    });
    return this.http.put<Property>(`${createproperty}/${propertyId}`, propertyId)
      .pipe(catchError(this.exception.handleError()));
  }

  public propertystatus(confirm: any) {
    return this.http.put(`${propertyconfirm}`, confirm)
      .pipe(catchError(this.exception.handleError()));
  }
  public propertyconfirmstatus(id: any, confirm: any) {
    return this.http.put(`${getlistings}/confirm=${id}`, confirm)
      .pipe(catchError(this.exception.handleError()));
  }

  public usermarketplace(marketplace: any) {
    return this.http.post(`${marketplace_url}`, marketplace);
  }
  public delistmarketplace(marketplace: any) {
    return this.http.put(`${delist}`, marketplace);
  }
  public taxpercentage(tax: any) {
    return this.http.post<Property>(`${tax_url}`, tax)
      .pipe(catchError(this.exception.handleError()));
  }
  public updateTaxPercentage(tax: any) {
    return this.http.put<Property>(`${tax_url}/${tax.propertyType}`, tax)
      .pipe(catchError(this.exception.handleError()));
  }

  public getAllUserProperties(page: number, userId) {
    return this.http.get<Property[]>(`${getUserProperties}${userId}/page=${page}`)
      .pipe(catchError(this.exception.handleError()));
  }
  public getmarketplacebyid(propertyId) {
    return this.http.get<Property>(`${getmarketplaceById}/${propertyId}`)
      .pipe(catchError(this.exception.handleError()));
  }
  public deleteproperty(propertyId) {
    return this.http.delete<Property>(`${createproperty}/${propertyId}`)
      .pipe(catchError(this.exception.handleError()));
  }

  public getallProperties(page: number) {
    return this.http.get<Property[]>(`${getProperty}/page=${page}`)
      .pipe(catchError(this.exception.handleError()));
  }
  getBuilderByName(name) {
    return this.http.get(`${getBuilderName}${name}`)
      .pipe(catchError(this.exception.handleError()));
  }
  getWorldmarketplace(page: any, userId: string) {
    return this.http.get<Property[]>(`${marketplace_url}/page=${page}`)
      .pipe(catchError(this.exception.handleError()));;
  }

  getUsermarketplace(page: any, userId: string) {
    return this.http.get<Property[]>(`${marketplace_url}/user=${userId}/page=${page}`)
      .pipe(catchError(this.exception.handleError()));;
  }
  public getPropertyByID(propertyId) {
    return this.http.get<Property>(`${getPropertyByID}/${propertyId}`)
      .pipe(catchError(this.exception.handleError()));
  }

  getTaxByType(type: string) {
    return this.http.get(`${tax_url}/${type}`)
      .pipe(catchError(this.exception.handleError()));
  }
  getTax() {
    return this.http.get(`${tax_url}`)
      .pipe(catchError(this.exception.handleError()));
  }
  getallListings(page: number) {
    return this.http.get(`${getlistings}/page=${page}`)
      .pipe(catchError(this.exception.handleError()));
  }
  getListingById(id) {
    return this.http.get(`${getlistings}/${id}`)
      .pipe(catchError(this.exception.handleError()));
  }
  listingType(type: string, property: any) {
    return this.http.post(`${getlistings}/${type}`, property)
      .pipe(catchError(this.exception.handleError()));
  }
  getCertificate(propertyId) {
    return this.http.get<Property[]>(`${getcertificate}/id=${propertyId}`)
      .pipe(catchError(this.exception.handleError()));;
  }
  getContract(propertyId) {
    return this.http.get<Property[]>(`${getcontract}${propertyId}`)
      .pipe(catchError(this.exception.handleError()));;
  }
  public getuserbasedtransactions(page: any) {
    return this.http.get<Transaction[]>(`${getusertransactions}/page=${page}`)
      .pipe(catchError(this.exception.handleError()));

  }
  public getTransactionByID(id: any) {
    return this.http.get<Transaction>(`${gettransactionbyid}/id=${id}`)
      .pipe(catchError(this.exception.handleError()));
  }

  public getSaleProperties(page: number, userId) {
    return this.http.get<Property[]>(`${sales}/user=${userId}/page=${page}`)
      .pipe(catchError(this.exception.handleError()));
  }
  public getAllSaleProperties(page: number) {
    return this.http.get<Property[]>(`${sales}/page=${page}`)
      .pipe(catchError(this.exception.handleError()));
  }

  public getAllBoughtProperties(page: number, userId) {
    return this.http.get<Property[]>(`${bought}/user=${userId}/page=${page}`)
      .pipe(catchError(this.exception.handleError()));
  }
  public getContracts(id: any) {
    return this.http.get(`${contracts}${id}`)
      .pipe(catchError(this.exception.handleError()));
  }

}
