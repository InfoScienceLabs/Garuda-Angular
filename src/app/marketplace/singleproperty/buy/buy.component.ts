
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Property} from '../../../models/models';
import { PropertyService } from '../../../services/services';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from "@angular/material";
import { Type } from '../../../models/property';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  constructor( public dialogRef : MatDialogRef<BuyComponent>,
                @Inject(MAT_DIALOG_DATA) public data : Property, private propertyService: PropertyService,
                private snackBar: MatSnackBar, private authService: AuthService) { }
  public property : Property;
  ngOnInit() {
    console.log('data dialog ',this.data);
    this.property = new Property();
    this.gettax();
    this.property = this.data;
  }

  onNoClick() : void {
    this.dialogRef.close();
  }

  sendPropertyToGov(){
    this.property =  this.data;
    // this.property.type = this.property.type;
    // this.property.type = Type['Buy'];
    this.property.type = Type.Buy;
    this.property.id = this.property.propertyId;
    console.log("1111" + this.property.type);
    // this.property['buyer'][0] =  this.authService.currentUser.id; 
    var buy = {propertyId : this.property.propertyId, type: this.property.type, value: this.property.value, percent: this.property.percent};

    this.propertyService.listingType('Buy',buy).subscribe(data =>{
      this.dialogRef.close();
      this.snackBar.open('Succesfully sent to Govt', "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
      });   
     })
  }

  gettax(): any {
    this.propertyService.getTaxByType(this.data.propertyType).subscribe((data: Property) => {
        this.data.percent = data.percent;
        this.data.tax = data.percent;
    });
  }


}


