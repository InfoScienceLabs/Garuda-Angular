import { Component, OnInit } from '@angular/core';
import { Property, Owner, Address, User } from '../../../models/models';
import { ActivatedRoute } from '@angular/router';
import { PropertyService, ImageService, UserService } from '../../../services/services';
// import { Observable } from 'rxjs';
// import { FormControl } from '@angular/forms';
// import { map, startWith } from 'rxjs/operators';
import { ControlContainer, NgForm } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { isObject, isString } from "util";
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],

})
export class CreateComponent implements OnInit {
  current_date: Date;
  currentUser : any;
  startDate: Date;
  isNew : boolean;
  loading  : boolean;
  imageData :[];
  constructor(private propertyService : PropertyService, private snackBar: MatSnackBar, private authService : AuthenticationService,
    private route: ActivatedRoute, private imageService: ImageService, private userService : UserService) {
    
    this.loading = false;
    this.current_date = new Date();
    this.startDate = new Date(1990, 0, 1);
     }
  public property : Property;
  
  isLinear = false;
  ngOnInit() {
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
    this.propertyService.addProperty(this.property).subscribe((data: Property) =>{
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

  updateProperty(){
    console.log(this.property);
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
  //  let reader = event.target.files[0];
  //   let formData = new FormData();
  //   // formData.append('file', reader);
  //   console.log(reader.onload);

  //   reader.onload = (readerEvent) =>{
      
  //     let imageData = (readerEvent.target as any).result;
  //     console.log('image')

  //     this.imageService.uploadImage(formData).subscribe(data =>{

  //       console.log(data);
  //     },err =>{
  //       console.log(err);
  //     })
  //   }
    // reader.onload = (readerEvent) => {
    //   let imageData = (readerEvent.target as any ).result;
    
    // this.coOwnService.uploadImageFromProperty(formData).subscribe(data => {
    //   this.coOwn.images.push(data['id'].toString());
    //   //   this.log.info(data);
    //   this.coOwnService.getImageOfProperty(data['id']).subscribe(data =>{
    //     this.createImageFromBlob(data);
    //   })
    //   this.spinnerService.hide();
    // }, err => {
    //   this.alert.type = 'warning';
    //   this.spinnerService.hide();
    //   this.alert.message = err.message;

    // });
  }

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}