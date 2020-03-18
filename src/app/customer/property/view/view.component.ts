import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Property, User } from '../../../models/models';
import { PropertyService, UserService } from '../../../services/services';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { PageEvent } from '@angular/material';
import { HostListener } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  dataSource: any;
  pageIndex: number;
  pageSize: number;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['image', 'propertyId', 'name', 'value', 'addedBy', 'state', 'country'];
  page: number;
  content: any[];
  status_msg_dict = { 0: "Unsaved", 1: "Review Pending", 2: "Approved", 3: "Rejected", 4: "Listed", 5: "Sold" };
  constructor(private propertyService: PropertyService, private snackBar: MatSnackBar, private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute) {

  }
  @HostListener("window:scroll", [])
  onWindowScroll() {

    if (this.page < this.pageSize) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      if (pos >= max) {

        this.page = this.page + 1;
        this.getUserProperties(this.page);
      }
    }

  }
  currentUser: User;
  loading: boolean;
  public property: Property;
  ngOnInit() {
    this.property = new Property();
    this.loading = true;
    this.currentUser = this.authService.currentUser;
    this.page = 1;
    this.content = [];
    this.dataSource = [];
    this.getUserProperties(this.page);
  }
  onRowClicked(row) {
    let url = 'user/property/view/' + row.propertyId;
    this.router.navigate([url]);
  }
  getUserProperties(page: number) {
    this.loading = true;
    this.propertyService.getAllUserProperties(page, this.currentUser.id).subscribe((response: Property[]) => {
      this.pageSize = response['lastPage'].page;
      if (response['data'].length > 0)
        response['data'].forEach(element => {
          this.dataSource.push(element);
        });
      this.loading = false;
    });
  }
  usermarketplace(property) {
    console.log(property);
    property.listingType = 'sell';
    var marketplace = { propertyId: property.propertyId, value: property.value, listingType: property.listingType };
    console.log(marketplace);
    // this.propertyService.usermarketplace(marketplace).subscribe(data => {
    // })
    this.propertyService.usermarketplace(marketplace).subscribe(data => {
      
      this.loading = false;
      this.snackBar.open("Successfully Listed to Marketplace", "Close", {
            duration: 2000,
            panelClass: ["snackbar-color-change"],
          });
       this.ngOnInit()
    },(error : HttpErrorResponse)=>{
      this.loading = false;
      // this.submitted = false;
      this.snackBar.open(error.error['message'], "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
      });
    });

  }
  
  Deleteproperty(row){
    
    // this.propertyService.deleteproperty(row.propertyId).subscribe((data: Property) => {
    //   this.property = data;
    // }, (err: HttpErrorResponse) => {
    //   //this.error =  err.error['message'];
    // });
    this.propertyService.deleteproperty(row.propertyId).subscribe((data: Property) =>{
      this.property = data;
      this.loading = false;
      this.snackBar.open("Successfully Deleted", "Close", {
            duration: 2000,
            panelClass: ["snackbar-color-change"],
          });
       this.ngOnInit()
    },(error : HttpErrorResponse)=>{
      this.loading = false;
      // this.submitted = false;
      this.snackBar.open(error.error['message'], "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
      });
    });
  }

  filterproperty(page: number) {
    this.page = 1;
    this.loading = true;
    this.propertyService.getAllBoughtProperties(page, this.currentUser.id).subscribe((response: Property[]) => {
      this.pageSize = response['lastPage'].page;
      if (response['data'].length > 0)
        response['data'].forEach(element => {
          this.dataSource.push(element);
        });
      this.loading = false;
    });
  }
}

