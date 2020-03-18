import { Component, OnInit, SimpleChanges,ViewEncapsulation } from '@angular/core';
import { Property, BidRequest, ListingStatus, Address, User } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { PropertyService,ImageService, UserService } from '../../services/services';
import { ControlContainer, NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';
import { Type } from '../../models/property';
import { ContractComponent } from './contract/contract.component';

import { isObject, isString } from "util";
import { CertificateComponent } from 'src/app/customer/singleproperty/certificate/certificate.component';


@Component({
  selector: 'app-singlepropertylisting',
  templateUrl: './singlepropertylisting.component.html',
  styleUrls: ['./singlepropertylisting.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class SinglepropertylistingComponent implements OnInit {

  displayedColumns = ['select', 'status' ];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
 selectedEntry;
 onSelectionChange(entry) {
        this.property.status = entry.status;
    }
  status_msg_dict = {0:"Unsaved",1:"Review Pending",2:"Approved",3:"Rejected",4:"Listed",5:"Sold"};

  panelOpenState = false;
  current_date: Date;
  currentUser: any;
  startDate: Date;
  isNew: boolean;
  loading  : boolean;
  readOnly : boolean;
  checked: Boolean;
  imageData :[];
  listing_details : BidRequest;
  constructor(private propertyService: PropertyService, private snackBar: MatSnackBar, public dialog: MatDialog,
    private route: ActivatedRoute, private userService: UserService, private imageService: ImageService, private MatRadioModule:MatRadioModule) { 
      this.loading = false;
    this.current_date = new Date();
    this.startDate = new Date(1990, 0, 1);
    }
    public property: Property;
    isLinear = false;
    public global_id : string;
    status = false;
  ngOnInit() {
    window.scrollTo(0, 0);
    this.disable_stake = false;
    this.property = new Property();
    this.property.owner = [];
    this.readOnly = true;
    // this.property.owner.push(new Owner());
    this.property.address = new Address();
    this.property.image = [];
    this.property.docs = [];
    this.property.location = [];
    this.userArray = [];
    // this.currentUser = this.authService.currentUser;
    // this.property.owner.forEach(element =>{
    //   element.OwnerName = this.currentUser['name'];
    //   console.log(this.currentUser['name']);
    // });
    this.route.url.subscribe(data => {
        console.log('router: ',data[2].path);
        this.isNew = false; 
        this.property.propertyId = data[1].path;
        this.global_id = data[2].path;
                
        this.propertyService.getPropertyByID(this.property.propertyId).subscribe((data : Property)=>{
          this.property = data;
          this.propertyService.getListingById(this.global_id).subscribe((data: BidRequest) => {
            this.listing_details = data;
            // this.property.seller[0] = data.seller[0];
            // this.property.buyer[0]  = data.buyer[0];
          }, (err: HttpErrorResponse) => {
            //this.error =  err.error['message'];
          });
        }, (err : HttpErrorResponse) => {
          
        });
      
      
    });
    
  }

  userArray : User[];
  searchUser(event){
    if(event.length > 2)
    this.userService.searchUserByKeyword(event).subscribe((response: User[])=>{
      this.userArray = response;
    });
  }
  disable_stake : boolean;
  staticValueForStake(i,type){
    if(type === 'Sole propertiership'){
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
  remove(index: number){
    this.property.image.splice(index,1);
  }
  length= 0;
  countingCharacters(event) {
    this.length = event.length;
  }

  propertyconfirmstatus() {
    this.property.status = this.status_msg_dict[this.property.status];    
    if(!this.property.message) this.property.message = 'approved';
    var confirm = {id : this.global_id, propertyId : this.property.propertyId, status: this.property.status, message: this.property.message};
    console.log(confirm);
    this.propertyService.propertyconfirmstatus(this.global_id, confirm).subscribe(data => {
      this.snackBar.open("Updated", "Close", {
        duration: 2000,
        panelClass: ["success"],
        verticalPosition: 'top'
      });
      this.ngOnInit();
    },(err : HttpErrorResponse) =>{
      
      this.snackBar.open("error", "Close", {
        duration: 2000,
        panelClass: ["warning"],
        verticalPosition: 'top'
      });
    });
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
  }

  view_contract() {
    this.propertyService.getContracts(this.property.propertyId).subscribe((data : any) =>{
      if(data.length >0){
        console.log(data.length);
        let show = 1;
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(ContractComponent, {
          width: '60vw',
          height: '100vw',
          panelClass: 'mycontracts',
          data : data
        })
      }
      else {
        const dialogConfig = new MatDialogConfig();
        const dialogRef = this.dialog.open(ContractComponent, {

          data : 'There is no Contract made for this property,'
        })
      }
    }, err=>{
      const dialogConfig = new MatDialogConfig();
      const dialogRef = this.dialog.open(ContractComponent, {
        data :  'There is no Contract made for this property,'
      })
    })
    
    //this.Opendialog();
   }
}
  export interface Element {
    status: string;
  }
  
  const ELEMENT_DATA: Element[] = [
    { status: 'Approved'},
    { status: 'Rejected'},
  ];

class ImageSnippet {
  constructor(public src: string, public file: File) {}

}
