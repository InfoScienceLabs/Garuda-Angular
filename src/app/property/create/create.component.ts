import { Component, OnInit } from '@angular/core';
import { Property, Owner, Address, User } from '../../models/models';
import {Router, ActivatedRoute } from '@angular/router';
import { PropertyService, ImageService, UserService } from '../../services/services';
import { ControlContainer, NgForm } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { isObject, isString } from "util";
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
// import { CertificatesComponent } from './certificates/certificates.component';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],

})
export class CreateComponent implements OnInit {
  loader:boolean=false;
  load:boolean=false;
  current_date: Date;
  currentUser : any;
  startDate: Date;
  isNew : boolean;
  loading  : boolean;
  images: any;
  docimages:any;
  img: any;
  doc:any;
  imageData :[];
  constructor(private propertyService : PropertyService, private snackBar: MatSnackBar, private authService : AuthenticationService,
    private route: ActivatedRoute, public dialog: MatDialog,private imageService: ImageService, private userService : UserService, private router : Router) {
    
    this.loading = false;
    this.current_date = new Date();
    this.startDate = new Date(1990, 0, 1);
     }
    //  cert_data : any;
    //  view_certificate() {
    //   this.propertyService.getCertificate(this.property.propertyId).subscribe((data: Property[]) => {
    //     console.log(data);
    //     this.cert_data = data;
    //     this.openDialog();
    //       // this.data.propertyId = data.propertyId;
    //   });
    //  }
    //  openDialog(): void {
    //   const dialogConfig = new MatDialogConfig();
    //   dialogConfig.data = this.property;
    //   const dialogRef = this.dialog.open(CertificatesComponent, {
    //     width: '550px',
    //     data : this.cert_data
    //   });
  
    //   dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');
    //   });
    // }
  public property : Property;
  
  isLinear = false;
  ngOnInit() {
    if (this.images === undefined || this.images === null || this.images.length === 0) {
      this.images = [];
    }
    if (this.docimages === undefined || this.docimages === null || this.docimages.length === 0) {
      this.docimages = [];
    }
    this.disable_stake = false;
    this.property = new Property();
    this.property.owner = [];
    this.property.owner.push(new Owner());
    this.property.address = new Address();
    this.property.image = [];
    this.property.docs = [];
    this.property.location = [];
    this.userArray = [];
    this.currentUser = this.authService.currentUser;
    this.property.owner.forEach(element =>{
      element.OwnerName = this.currentUser['name'];
      console.log(this.currentUser['name']);
    });
    // this.currentUser = new User();
   
    this.route.url.subscribe(data=>{
      if(data[0] && data[0].path==='create'){
        this.isNew = true;
        this.property.image = [];
        this.property.docs = [];
        // this.property.addedBy = this.currentUser.roleId;  
      }
        else{
        this.isNew = false;
        this.property.propertyId =  data[1].path;
        
        this.propertyService.getPropertyByID(this.property.propertyId).subscribe((data : Property)=>{
          this.property = data;
          this.property.owner[0].OwnerName =  this.currentUser['name'];
        },(err : HttpErrorResponse) =>{
          //this.error =  err.error['message'];
        });
        /* Api call for property with ID*/
      }
    });
  }
  addProperty(){
    
    this.loading = true;
    console.log(this.property.owner[0].id);
    
    this.property.owner.forEach(element=>{
      
      element.id = this.currentUser['id'];
      if(isObject(element.buyDate)){
        let date = new Date(element.buyDate);
        element.buyDate = date.toISOString();
      }
    });
    // if (isObject(this.property.owner.buyDate))
    // this.property.owner.buyDate = this.property.owner.buyDate.toString();
    
    if(isString(this.property.value)){
      this.property.value = Number(this.property.value);
    }
    if(isString(this.property.value)){
      this.property.value = Number(this.property.value);
    }
    if(isString(this.property.area)){
      this.property.area = Number(this.property.area);
    }
    // this.property.docs[0] = 'temporary Docs';
    this.property.location[0] = 12;
    this.property.location[1] = 12;
    this.propertyService.addProperty(this.property).subscribe((data: Property) =>{
      this.loading = false;
      this.snackBar.open("Successfully Created", "Close", {
            duration: 2000,
            panelClass: ["snackbar-color-change"],
          });
          this.router.navigate(['/admin/property/view'])
    },(error : HttpErrorResponse)=>{
      this.loading = false;
      // this.submitted = false;
      this.snackBar.open(error.error['message'], "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
      });
    });
  }
  name_array: [];
  search_name(event) {
    console.log(event);
    if (event.length > 2)
      this.propertyService.getBuilderByName(event).subscribe((data: []) => {
        this.name_array = data;
      })
    console.log(this.name_array)
  }
  updateProperty(){
    this.loading = true;
    this.property.owner.forEach(element=>{
      
      element.id = this.currentUser['id'];
      if(isObject(element.buyDate)){
        let date = new Date(element.buyDate);
        element.buyDate = date.toISOString();
      }
    });
    // if (isObject(this.property.owner.buyDate))
    // this.property.owner.buyDate = this.property.owner.buyDate.toString();
    
    if(isString(this.property.value)){
      this.property.value = Number(this.property.value);
    }
    if(isString(this.property.value)){
      this.property.value = Number(this.property.value);
    }
    if(isString(this.property.area)){
      this.property.area = Number(this.property.area);
    }
    this.property.docs[0] = 'temporary Docs';
    this.property.location[0] = 12;
    this.property.location[1] = 12;
    this.propertyService.updateProperty(this.property.propertyId).subscribe((data: Property) =>{
      this.loading = false;
      this.snackBar.open("Successfully Created", "Close", {
            duration: 2000,
            panelClass: ["snackbar-color-change"],
          });
      
    },(error : HttpErrorResponse)=>{
      this.loading = false;
      // this.submitted = false;
      this.snackBar.open(error.error['message'], "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
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
    this.loader=true;
    console.log(imageInput);
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      console.log(event);
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.log(res['url']);
          this.property.image.push(res['url']);
          this.loader=false;
        },
        (err) => {
          console.log(err);
          this.loader=false;
        })
    });

    reader.readAsDataURL(file);
  }
  
  processWebDocs(docsInput: any) {
    this.load=true;
    console.log(docsInput);
    const file: File = docsInput.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      console.log(event);
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imageService.uploadDoc(this.selectedFile.file).subscribe(
        (res) => {
          this.property.docs.push(res['url']);
          this.load=false;
        },
        (err) => {
          console.log(err);
          this.load=false;
        })
    });

    reader.readAsDataURL(file);
  }

  public procesdocImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imagesData = (readerEvent.target as any).result;
      this.docimages.push(imagesData);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  public processImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.images.push(imageData);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
 
  removeImage(i){
    this.property.image.splice(i, 1);
   
   }
   removedocImage(d){
    this.property.docs.splice(d, 1);
   }
  remove(index: number){
    this.property.image.splice(index,1);
  }
  length= 0;
  countingCharacters(event) {
    this.length = event.length;
  }

  }

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}