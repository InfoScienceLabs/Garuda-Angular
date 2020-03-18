import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../services/services';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from "@angular/material";
import { Type } from '../../models/property';
import { User, Address } from '../../models/models';

@Component({
  selector: 'app-get-wallet',
  templateUrl: './get-wallet.component.html',
  styleUrls: ['./get-wallet.component.scss']
})
export class GetWalletComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GetWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private snackBar: MatSnackBar, private authService: AuthService, private userService: UserService) { }
    public user: User;
    public address: Address;
    readOnly = true;
    public balance;

  ngOnInit() {
    console.log('data dialog ', this.data);
    this.readOnly = true;
    this.user = new User();
    this.address = new Address();
    this.user = this.authService.currentUser;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getbalance() {
    this.user = this.data;
    var Password = { password: this.user.password }
    this.userService.getBalance(Password).subscribe((data: any) => {
      this.balance = data.balance;
      //this.dialogRef.close();
      this.snackBar.open(data.message, "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
      });
    })
  }

}
