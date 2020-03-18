import { Component, OnInit } from '@angular/core';
import { User, Builder, Address } from '../../models/models';
import { ControlContainer, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BuilderService } from '../../services/services';
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";

export interface distributor {
  value: string;
  viewValue: string;
}
export interface Builder {
  name: string;
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class CreateComponent implements OnInit {

  loading = false;
  submitted = false;
  // isNew = boolean;
  isNew: boolean;
  public current_date: Date;
  public user = new User();
  public builder = new Builder();
  public address = new Address();
  addBuilder(form) {
    console.log(form.value);
  }
  constructor(private route: ActivatedRoute, private builderService: BuilderService,
    private snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.current_date = new Date();
    this.builder = new Builder();
    this.builder.address = new Address();
    this.builder.admin = [];

    // this.route.url.subscribe(data => {
    //   console.log(data);
    //   if (data[0] && data[0].path === 'create'){
    //     console.log('new');
    //     this.builder.address = new Address();
    //     this.builder.admin = [];
    //   }
    //   else
    //     console.log('old');
    // });
    this.route.url.subscribe(data => {
      if (data[0] && data[0].path === 'create') {
        this.isNew = true;
        
      }
      else {
        this.isNew = false;
        this.builder.orgID = data[1].path;
        this.builderService.getBuilderById(this.builder.orgID).subscribe((data: Builder) => {
          this.builder = data[0];
        }, (err: HttpErrorResponse) => {
          //this.error =  err.error['message'];
        });
      }
    });
  }
  addProperty(form) {
    console.log(this.builder);
  }
  create_builder(form) {
    console.log(this.builder);
    this.builderService.create_builder(this.builder).subscribe((data: Builder) => {
      this.loading = false;
      this.snackBar.open("Successfully Created", "Close", {
        duration: 2000,
        panelClass: ["snackbar-color-change"]
      });
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.submitted = false;
      this.snackBar.open(error.error['message'], "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
      });
    });
  }
  name_array : [];
  search_name(event){
    console.log(event);
    if(event.length > 2)
    this.builderService.getBuilderByName(event).subscribe((data : []) =>{
      this.name_array = data;
    })
    console.log(this.name_array)
  }
}