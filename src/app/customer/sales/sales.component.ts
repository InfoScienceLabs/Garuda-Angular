import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Property, User } from '../../models/models';
import { PropertyService, UserService } from '../../services/services';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../../src/app/auth/authentication.service';
import { PageEvent } from '@angular/material';
import { HostListener } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  pageIndex: number;
  pageSize: number;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['position', 'image','name', 'price','type', 'contract','transaction'];
  dataSource: any;
  
  page: number;
  content: any[];
  constructor(private propertyService: PropertyService, private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute) {

  }
  @HostListener("window:scroll", [])
  onWindowScroll() {

    if (this.page < this.pageSize) {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      if (pos >= max) {

        this.page = this.page + 1;
        this.getSalesProperties(this.page);
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
    this.getSalesProperties(this.page);
  }

  getSalesProperties(page: number) {
    this.loading = true;
    this.propertyService.getSaleProperties(page, this.currentUser.id).subscribe((response: Property[]) => {
      this.pageSize = response['lastPage'].page;
      this.dataSource = response['data'];
      // if (response['data'].length > 0)
      //   response['data'].forEach(element => {
      //     this.dataSource.push(element);
      //   });
      this.loading = false;
    });
  }
w

 
}




