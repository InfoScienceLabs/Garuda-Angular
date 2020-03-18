import { Component, OnInit } from '@angular/core';
import { User, Builder, Address, Property } from '../../models/models';
import {Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/services';
import { BuilderService } from '../../services/services';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { PageEvent } from '@angular/material';
import { PropertyService } from '../../services/services';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { HostListener} from "@angular/core";


export interface User {
  name: string;
}
export interface Org {
  value: string;
  viewValue: string;
}
export interface Role {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  startDate: Date;
  pageIndex: number;
  pageSize : number;
  pageEvent: PageEvent;
  dataSource:any;
  displayedColumns: string[] = ['image','ID', 'propertyName', 'location', 'Value'];
  page: number;
  loading = false;
  submitted = false;
  isNew: boolean;
  public current_date: Date;
  public user = new User();
  public address = new Address();
  public property = new Property();
  addUser(form) {
    console.log(form.value);
  }
  builder_array = new Array();
  org: Org[] = [
    { value: 'organisation', viewValue: 'Organisation' },
    { value: 'builder', viewValue: 'Builder' }
  ];
  role: Role[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'user', viewValue: 'User' },
    { value: 'builder', viewValue: 'Builder' },
    { value: 'government', viewValue: 'Government' }
  ];
  constructor(private route: ActivatedRoute, private userService: UserService, private builderService: BuilderService,
    private snackBar: MatSnackBar,private propertyService: PropertyService,private router : Router
  ) { 
    this.startDate = new Date(1990, 0, 1);
  }

  ngOnInit() {
    this.page = 1;
    // this.userId = new user.Id();
    
    this.current_date = new Date();
    this.user = new User();
    this.property = new Property();
    this.user.address = new Address();

    this.route.url.subscribe(data => {
      if (data[0] && data[0].path === 'create') {
        this.isNew = true;
      }
      else {
        this.isNew = false;
        this.user.id = data[1].path;
        this.userService.getUserById(this.user.id).subscribe((data: User) => {
          this.user = data[0];
          console.log(this.user);
          this.getUserProperties(this.page);
        }, (err: HttpErrorResponse) => {
          //this.error =  err.error['message'];
        });
      }
    });
  }
  get_builder() { }
  create_user(form) {
    console.log(this.user);
    this.userService.create_user(this.user).subscribe((data: User) => {
      this.loading = false;
      this.snackBar.open("Successfully Created", "Close", {
        duration: 2000,
        panelClass: ["snackbar-color-change"]
      });
      this.router.navigate(['/admin/users/view'])
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.submitted = false;
      this.snackBar.open(error.error['message'], "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
      });
    });
  }
  orgname_array : [];
  get_orgname(event){
    console.log(event);
    if(event.length > 2)
    this.builderService.getorgByName(event).subscribe((data : []) =>{
      this.orgname_array = data;
    })
    console.log(this.orgname_array)
  }

  getUserProperties(page : number) {
    // this.contact.push(this.propertyService.getAllUserProperties(page).subscribe(d))
    this.propertyService.getAllUserProperties(page,this.user.id).subscribe((data : Property[]) =>{
      this.dataSource = data['data'];
    }); 
  }
  onRowClicked(row){
    // console.log('./user/view/'+row.propertyId);
    let url = 'admin/property/view/'+row.propertyId;
    // console.log(url);
    // console.log(this.route.url['value'][0].path);
    this.router.navigate([url]);
  }
}
