import { Component, OnInit } from '@angular/core';
import { User, Builder, Address } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/services';
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
  displayedColumns: string[] = ['ID', 'name', 'email', 'phone', 'dob'];
  page: number;
  constructor(private route: ActivatedRoute, private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.page = 1;
    this.getUser(this.page);
  }; 
  getUser(page: number):any  {
    console.log(page);
    this.userService.getallUsers(page).subscribe((data: User[]) => {
      this.pageIndex = data['lastPage'].page;

      this.pageSize = data['lastPage'].index;

      this.dataSource = data['data'];
      // this.dataSource = data['data'];
    });
  }
}
