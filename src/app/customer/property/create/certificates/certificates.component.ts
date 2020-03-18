import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Property} from '../../../../models/models';
import { PropertyService } from '../../../../services/services';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from "@angular/material";
import { Type } from '../../../../models/property';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {


  constructor( public dialogRef : MatDialogRef<CertificatesComponent>,
                @Inject(MAT_DIALOG_DATA) public certificate_data : Property, private propertyService: PropertyService,
                private snackBar: MatSnackBar, private authService: AuthService) { }
  public property : Property;
  ngOnInit() {
    console.log('data dialog ',this.certificate_data);
    this.property = new Property();
    this.property = this.certificate_data;
    console.log("1111111111", + this.property);
  this.getcertificate()

  }

  onNoClick() : void {
    this.dialogRef.close();
  }
  getcertificate(){
    
  }
}


