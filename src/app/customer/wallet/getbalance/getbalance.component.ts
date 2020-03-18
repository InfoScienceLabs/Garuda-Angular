import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../services/services';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from "@angular/material";
import { Type } from '../../../models/property';
import { User, Address } from '../../../models/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-getbalance',
  templateUrl: './getbalance.component.html',
  styleUrls: ['./getbalance.component.scss']
})
export class GetbalanceComponent implements OnInit {
  readOnly = true;
  constructor(public dialogRef: MatDialogRef<GetbalanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private snackBar: MatSnackBar, private authService: AuthService, private userService: UserService) { }
  public user: User;
  public address: Address;
  ngOnInit() {
    console.log('data dialog ', this.data);
    this.readOnly = true;
    this.user = new User();
    this.address = new Address();
    this.user = this.authService.currentUser;

    // this.getbalance()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
public balance;
  getbalance() {
    this.user = this.data;
    var Password = { password: this.user.password }
    this.userService.getBalance(Password).subscribe((data: User) => {
      this.balance = data.balance;
      //this.dialogRef.close();
      this.snackBar.open('Succesfull', "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
      });
    })
  }

}


