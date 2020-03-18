import { Component, OnInit } from '@angular/core';
import { User, Address } from '../models/models';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { UserService } from 'src/app/services/services';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig , MatSnackBar} from '@angular/material';
import { GetWalletComponent } from './get-wallet/get-wallet.component';

@Component({
  selector: 'app-adminwallet',
  templateUrl: './adminwallet.component.html',
  styleUrls: ['./adminwallet.component.scss']
})
export class AdminwalletComponent implements OnInit {
  isLinear = false;
  readOnly = true;
  public user : User;
  public address : Address;
  constructor(private authService : AuthenticationService, private userService: UserService,public dialog: MatDialog, private snackBar: MatSnackBar) { }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.user;
    const dialogRef = this.dialog.open(GetWalletComponent, {
      width: '550px',
      data : this.user
    });

    dialogRef.afterClosed().pipe().subscribe(res =>{
      console.log('this  :',res);
    })
  }
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
    // this.getbalance()
    
    
  }

  updatewallet(){
    this.userService.getwalletbalance().subscribe((data: User) => {

    }, (err : HttpErrorResponse)=>{
      this.snackBar.open('Succesfull', "Close", {
        duration: 4000,
        panelClass: ["snackbar-color-change"]
      });
    });
  }

}
