
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Property} from '../../../models/models';
import { PropertyService } from '../../../services/services';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from "@angular/material";


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
    this.property = new Property();
    this.property =  this.data;
    this.property.id = this.property.propertyId; 
    console.log('id ',this.property.id);
    this.gettax();
  }

  onNoClick() : void {
    this.dialogRef.close();
  }

  sendPropertyToGov(){
    // this.property['buyer'][0] =  this.authService.currentUser.id; 

    this.propertyService.listingType('Buy',this.property).subscribe(data =>{
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
    });
  }


}
