import { Component, OnInit } from '@angular/core';
import { User, Address } from '../../models/models';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { UserService } from 'src/app/services/services';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLinear = false;
  readOnly = true;
  loading = false;
  submitted = false;
  constructor(private authService : AuthenticationService, private userService: UserService,private snackBar: MatSnackBar) { }
  public user : User;
  public address : Address;
  ngOnInit() {
    this.readOnly = true;
    this.user = new User();
    this.address = new Address();
    this.user = this.authService.currentUser;
    this.userService.getDetailsOfUser(this.user.id).subscribe((data : User) =>{
      this.user = data[0];
      if(this.user.address) this.address =  this.user.address;
    },(err : HttpErrorResponse) =>{
       console.log(err);
    });
    
  }
  updateUser(){
    this.user.address = this.address;
    this.userService.modify_user(this.user).subscribe((data: User) => {
      this.loading = false;
      this.snackBar.open("Successfully Created", "Close", {
        duration: 2000,
        panelClass: ["snackbar-color-change"]
      });
    });
  }

}
