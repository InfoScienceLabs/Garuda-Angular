import { Component, OnInit, SimpleChanges,Inject, ViewEncapsulation } from '@angular/core';
import { Property, Owner, Address, User,Transaction } from '../../models/models';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PropertyService, ImageService, UserService } from '../../services/services';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BuyComponent } from './buy/buy.component';
import { isObject, isString } from "util";
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { CertificateComponent } from './certificate/certificate.component';
import { NetworksComponent } from './networks/networks.component';
import { ContractsComponent } from './contracts/contracts.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Router } from '@angular/router';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-singleproperty',
  templateUrl: './singleproperty.component.html',
  styleUrls: ['./singleproperty.component.scss'],
  encapsulation : ViewEncapsulation.None

})
export class SinglepropertyComponent implements OnInit {
  displayedColumns = ['select', 'status'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
  selectedEntry;
  onSelectionChange(entry) {
    this.property.status = entry.status;
    console.log(this.property.status);
  }

  panelOpenState = false;
  current_date: Date;
  currentUser: any;
  startDate: Date;
  isNew: boolean;
  loading: boolean;
  readOnly: boolean;
  checked: Boolean;
  imageData: [];
  transaction : Transaction;
  constructor(private propertyService: PropertyService, private router: Router,private snackBar: MatSnackBar,private authService : AuthenticationService,
    private route: ActivatedRoute, public dialog: MatDialog,private userService: UserService, private imageService: ImageService, private MatRadioModule: MatRadioModule) {
      this.transaction = new Transaction();
      this.loading = false;
    this.current_date = new Date();
    this.startDate = new Date(1990, 0, 1);
  }
  cert_data : any;
     view_certificate() {
      this.propertyService.getCertificate(this.property.propertyId).subscribe((data: Property[]) => {
        console.log(data);
        this.cert_data = data;
        this.opendialog();
          //this.data.propertyId = data.propertyId;
      });
     }
     opendialog(): void { 
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = this.property;
      const dialogRef = this.dialog.open(CertificateComponent, {
        width: '60vw',
        height: '50vw',
        panelClass: 'mydialog',
        data : this.cert_data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  //

  contract_data: any;
  view_contract() {
    // this.propertyService.getContract(this.property.propertyId).subscribe((data: Property[]) => {
    //   console.log("here it is");
    //   console.log(data);
    //   this.contract_data = data;
    //   // this.opendialog();
    //   // this.data.propertyId = data.propertyId;
    // });
    this.propertyService.getContracts(this.property.propertyId).subscribe((data : any) =>{
      if(data.length >0){
        console.log(data);
        let show = 1;
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(ContractsComponent, {
          width: '60vw',
          height: '100vw',
          panelClass: 'mycontract',
          data : data
        })
      }
      else {
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(ContractsComponent, {

          data : 'There is no Contract made for this property,'
        })
      }
    }, err=>{
      const dialogConfig = new MatDialogConfig();
      const dialogRef = this.dialog.open(ContractsComponent, {
        data :  'There is no Contract made for this property,'
      })
    })
    
    //this.Opendialog();
   }

  Opendialog(): void {
    const dialogConfig = new MatDialogConfig();
    //  dialogConfig.data = this.network_data;
     const dialogRef = this.dialog.open(ContractsComponent, {
      width: '60vw',
      panelClass: 'mycontracts',
      //  data : this.network_data
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
     });
   }
   //
    network_data : any;

    view_network() {
    this.network_data = new Array();
    this.propertyService.getTransactionByID(this.property['transaction']).subscribe((data: Transaction) => {
      this.network_data = data;
      console.log(this.network_data);
      this.OpenDialog();
    });
   
   }

    OpenDialog(): void {
     const dialogConfig = new MatDialogConfig();
     dialogConfig.data = this.network_data;
     const dialogRef = this.dialog.open(NetworksComponent, {
      width: '50vw',
      panelClass: 'networkdialog',
       data : this.network_data
     });
 
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
     });
   }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.property;
    const dialogRef = this.dialog.open(BuyComponent, {
      width: '550px',
      data: this.property
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  public property: Property;
  isLinear = false;
  ngOnInit() {
    window.scrollTo(0, 0);
    this.currentUser = this.authService.currentUser;
    this.disable_stake = false;
    this.property = new Property();
    this.property.owner = [];
    this.readOnly = true;
    this.property.address = new Address();
    this.property.image = [];
    this.property.docs = [];
    this.property.location = [];
    this.userArray = [];
    this.route.url.subscribe(data => {
      console.log(data);
      // if (data[0] && data[0].path === 'create') {
      //   this.isNew = true;
      //   this.property.image = [];
      // }
      // else {
      this.isNew = false;
      this.property.propertyId = data[2].path;
      this.propertyService.getPropertyByID(this.property.propertyId).subscribe((data: Property) => {
        this.property = data;
      }, (err: HttpErrorResponse) => {
        //this.error =  err.error['message'];
      });
      // }
    });
  }



  userArray: User[];
  searchUser(event) {
    if (event.length > 2)
      this.userService.searchUserByKeyword(event).subscribe((response: User[]) => {
        this.userArray = response;
      });
  }
  disable_stake: boolean;
  staticValueForStake(i, type) {
    if (type === 'Sole propertiership') {
      this.property.owner[i].stake = 100;
      this.disable_stake = true;
    }
  }
  selectedFile: ImageSnippet;

  processWebImage(imageInput: any) {

    console.log(imageInput);
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      console.log(event);
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.property.image.push(res['url']);
        },
        (err) => {
          console.log(err);
        })
    });

    reader.readAsDataURL(file);
  }
  remove(index: number) {
    this.property.image.splice(index, 1);
  }
  length = 0;
  countingCharacters(event) {
    this.length = event.length;
  }
}
export interface Element {
  status: string;
}

const ELEMENT_DATA: Element[] = [
  { status: 'Pending' },
  { status: 'Approved' },
  { status: 'Rejected' },
];

class ImageSnippet {
  constructor(public src: string, public file: File) { }

}

export interface DialogData {
  name: string;
  price: number;
}