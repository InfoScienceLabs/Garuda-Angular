import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PropertyService } from '../../services/services';
import { Property } from '../../models/models';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaxComponent implements OnInit {

  constructor(private propertyService: PropertyService, private snackBar: MatSnackBar) { }
  public property: Property;
  public commercialTax: number;
  public residentialTax: number;
  public agricultureTax: number;
  public comm_new: boolean;
  public resi_new: boolean;
  public agri_new: boolean;

  ngOnInit() {
    this.property = new Property();
    this.getCommercialTax();
    this.getResidentialTax();
    this.getLandTax();
  }
  public taxpercentage(percent:number, type:string){
    var tax = {percent : percent, propertyType: type} ;

    this.propertyService.taxpercentage(tax).subscribe(data => {
      this.snackBar.open("Success", "Close", {
            duration: 2000,
            //panelClass: ["success"],
            verticalPosition: 'top'
          });
    })
  }
  public UpdateTaxpercentage(percent:number, type:string){
    var tax = {percent : percent, propertyType: type} ;
    this.propertyService.updateTaxPercentage(tax).subscribe(data => {
      this.snackBar.open("Updated", "Close", {
            duration: 2000,
            //panelClass: ["success"],
            verticalPosition: 'top'
          });
    })
  }
  public getCommercialTax(){
    let type='Commercial';
    this.propertyService.getTaxByType(type).subscribe((data : Property)=>{
      if (data && data.percent){
      
        this.commercialTax = data.percent;
        console.log(data);
        this.comm_new = false;
      }
      else
        this.comm_new = true;        
    });
  }
  public getResidentialTax() {
    let type='Residential';
    this.propertyService.getTaxByType(type).subscribe((data : Property)=>{
      if (data && data.percent){
        this.residentialTax = data.percent;
        this.resi_new = false;
      }
      else 
        this.resi_new = true;
    })
  }
  public getLandTax(){
    let type='Agricultural';
    this.propertyService.getTaxByType(type).subscribe((data : Property)=>{
      if (data && data.percent){
        this.agricultureTax = data.percent;
        this.agri_new = false;
      }
      else
        this.agri_new = true;
    })
  }
}





