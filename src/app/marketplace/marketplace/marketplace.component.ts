import { Component, OnInit } from '@angular/core';
import { Property, User, Address } from '../../models/models';
import { DataSource } from '@angular/cdk/collections';
import { PropertyService, UserService } from '../../services/services';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { PageEvent } from '@angular/material';
import { HostListener } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
 selector: 'app-marketplace',
 templateUrl: './marketplace.component.html',
 styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

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
     console.log(max, pos);
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
   console.log(row);
   let url = 'admin/marketplace/view/' + row.propertyId;
   this.router.navigate([url]);
 }
 getUserProperties(page: number): any {
   this.loading = true;
   this.propertyService.getWorldmarketplace(page, this.currentUser.id).subscribe((response: Property[]) => {
     console.log(this.currentUser);
     this.pageSize = response['lastPage'].page;
     if (response['data'].length > 0)
       response['data'].forEach(element => {
         this.dataSource.push(element);
       });
     this.loading = false;
   });
 }
 Delist(property) {
  var marketplace = { propertyId: property.propertyId };
  // this.propertyService.usermarketplace(marketplace).subscribe(data => {
  // })
  this.propertyService.delistmarketplace(marketplace).subscribe(data => {
    
    this.loading = false;
    this.snackBar.open("Successfully De-Listed from Marketplace", "Close", {
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
getPage(page: number) {
  this.pageIndex++;
  this.getUserProperties(this.pageIndex);
}

}