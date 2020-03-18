import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Property, User } from '../../../models/models';
import { PropertyService,UserService } from '../../../services/services';
import { Observable } from 'rxjs';
import { Router , ActivatedRoute} from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { PageEvent } from '@angular/material';
import { HostListener} from "@angular/core";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  
  dataSource:any;
  pageIndex: number;
  pageSize : number;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['image','propertyId','name','value','addedBy', 'state', 'country'] ;
  page : number;
  content: any[];
  status_msg = ["Hello 001","hello 002","hello 003","hello 004","hello 005"];
  status_msg_dict = {0:"Unsaved",1:"Review Pending",2:"Approved",3:"Rejected",4:"Listed",5:"Sold"};
  constructor(private propertyService : PropertyService, private authService : AuthenticationService,
              private router : Router, private route : ActivatedRoute) { 
  
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    
    if(this.page < this.pageSize){
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    console.log(max,pos);
    if(pos >= max )  {
      
      this.page = this.page + 1;
      this.getUserProperties(this.page);
    }
  }
    // if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    //   console.log("End");
    // }
  }
  currentUser: User;
  loading: boolean;
  ngOnInit() {
    this.loading = true;
    this.currentUser = this.authService.currentUser;
    // this.dataSource = new MatTableDataSource<Property>();
    this.page = 1;
    this.content = [];
    this.dataSource = [];
    // this.dataSource = new Array<Property>();
    this.getUserProperties(this.page);
  }
  onRowClicked(row){
    // console.log('./user/view/'+row.propertyId);
    let url = 'builder/property/view/'+row.propertyId;
    // console.log(url);
    // console.log(this.route.url['value'][0].path);
    this.router.navigate([url]);
  }
  getUserProperties(page : number) {
    this.loading = true;
    // this.contact.push(this.propertyService.getAllUserProperties(page).subscribe(d))
  
    this.propertyService.getAllUserProperties(page,this.currentUser.id).subscribe((response: Property[]) =>{
      this.pageSize = response['lastPage'].page;
      //console.log(response);
     
      if(response['data'].length > 0)
      response['data'].forEach(element => {
        this.dataSource.push(element);
        //console.log(element.status);
        
      });
      this.loading = false;
      // this.dataSource= response['data'];
    }); 
  }
  usermarketplace(property){
    console.log(property);
    property.listingType = 'sell';
    var marketplace = {propertyId : property.propertyId, value: property.value, listingType: property.listingType};
    console.log(marketplace);
    this.propertyService.usermarketplace(marketplace).subscribe(data => {
      // this.snackBar.
    })

  }
}

