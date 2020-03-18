import { Component, OnInit } from '@angular/core';
import { User, Builder, Address, Property } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/services';
import { HttpErrorResponse } from "@angular/common/http";
import { PageEvent } from '@angular/material';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-propertylisting',
  templateUrl: './propertylisting.component.html',
  styleUrls: ['./propertylisting.component.scss']
})
export class PropertylistingComponent implements OnInit {

  dataSource:any;

  pageIndex: number;

  pageSize : number;

  pageEvent: PageEvent;
  displayedColumns: string[] = ['ID', 'propertyName', 'Tax', 'Value','Status'];
  page: number;
  constructor(private route: ActivatedRoute, private propertyService: PropertyService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.page = 1;
    this.getListing(this.page);
  }
  getListing(page: number): any {
    
    this.propertyService.getallListings(page).subscribe((data: Property[]) => {
      this.dataSource = data;
    });
  }
}