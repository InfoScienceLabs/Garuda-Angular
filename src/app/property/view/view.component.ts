import { Component, OnInit } from '@angular/core';
import { User, Builder, Address, Property } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/services';
import { HttpErrorResponse } from "@angular/common/http";
import { PageEvent } from '@angular/material';
import { MatSnackBar } from "@angular/material";

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
  displayedColumns: string[] = ['ID', 'propertyName', 'location', 'Value'];
  page: number;
  constructor(private route: ActivatedRoute, private propertyService: PropertyService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.page = 1;
    this.getProperty(this.page);
  }
  getProperty(page: number) :any {
    this.propertyService.getallProperties(page).subscribe((data: Property[]) => {
      this.pageIndex = data['lastPage'].page;

      this.pageSize = data['lastPage'].index;

      this.dataSource = data['data'];
      // this.dataSource = data['data'];
    });
  }
}

