import { Component, OnInit } from '@angular/core';
import { User, Address } from '../../models/models';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { UserService } from 'src/app/services/services';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLinear = false;
  readOnly = true;
  constructor(private authService : AuthenticationService, private userService: UserService) { }
  public user : User;
  public address : Address;
  ngOnInit() {
    this.readOnly = true;
    this.user = new User();
    this.address = new Address();
    this.user = this.authService.currentUser;
    this.userService.getDetailsOfUser(this.user.id).subscribe((data : User) =>{
      
      this.user = data[0];
    },(err : HttpErrorResponse) =>{
       console.log(err);
    });
    
  }
  addUser() {}
  updateUser(){}

}
