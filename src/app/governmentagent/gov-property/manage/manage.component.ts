import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Property, Owner, Address, User } from '../../../models/models';
import { ActivatedRoute } from '@angular/router';
import { PropertyService,ImageService, UserService } from '../../../services/services';
import { ControlContainer, NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { MatRadioModule } from '@angular/material/radio';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import { isObject, isString } from "util";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  displayedColumns = ['select', 'status' ];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);
 selectedEntry;
 status_msg_dict = {0:"Unsaved",1:"Review Pending",2:"Approved",3:"Rejected",4:"Listed",5:"Sold"};

 onSelectionChange(entry) {
        this.property.status = entry.status;
        console.log(this.property.status);
    }

  panelOpenState = false;
  current_date: Date;
  currentUser: any;
  startDate: Date;
  isNew: boolean;
  loading  : boolean;
  readOnly : boolean;
  checked: Boolean;
  imageData :[];
  constructor(private propertyService: PropertyService, private snackBar: MatSnackBar,
    private route: ActivatedRoute, private userService: UserService, private imageService: ImageService, private MatRadioModule:MatRadioModule) { 
      this.loading = false;
    this.current_date = new Date();
    this.startDate = new Date(1990, 0, 1);
    }
    public property: Property;
    isLinear = false;
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
      if (data[0] && data[0].path === 'create') {
        this.isNew = true;
        this.property.image = [];
      }
      else {
        this.isNew = false;
        this.property.propertyId = data[1].path;
        this.propertyService.getPropertyByID(this.property.propertyId).subscribe((data: Property) => {
          this.property = data;
          if(this.property.status !='1') {
            this.status = true;
          }
        }, (err: HttpErrorResponse) => {
          //this.error =  err.error['message'];
        });
      }
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



  propertystatus() {
    this.property.status = this.status_msg_dict[this.property.status];
    if(!this.property.message) this.property.message = 'approved';
    var confirm = {propertyId : this.property.propertyId, status: this.property.status, message: this.property.message};
    this.propertyService.propertystatus(confirm).subscribe(data => {
      this.snackBar.open("Updated", "Close", {
        duration: 2000,
        //panelClass: ["success"],
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



 
  }
  export interface Element {
    status: string;
  }
  
  const ELEMENT_DATA: Element[] = [
    { status: 'Pending'},
    { status: 'Approved'},
    { status: 'Rejected'},
  ];

class ImageSnippet {
  constructor(public src: string, public file: File) {}

}
