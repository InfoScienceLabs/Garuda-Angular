import { Component, OnInit } from '@angular/core';
import { User, Builder, Address } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { BuilderService } from '../../services/services';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  dataSource: any;
  pageIndex: number;

  pageSize : number;

  pageEvent: PageEvent;
  displayedColumns: string[] = ['orgId','name', 'email', 'phone', 'gst'];
  page: number;
  constructor(private route: ActivatedRoute, private builderService: BuilderService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
     this.page = 1;
     this.getBuilder(this.page);
   }; 
   getBuilder(page: number):any {
     this.builderService.getallBuilders(page).subscribe((data: Builder[]) => {
      this.pageIndex = data['lastPage'].page;

      this.pageSize = data['lastPage'].index;

      this.dataSource = data['data'];
      //  this.dataSource = data['data'];
     });
  }
  onRowClicked(row) {
    console.log(row);
  }

}

