import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { User, Builder, Address, Property, Transaction } from '../../models/models';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/services';
import { HttpErrorResponse } from "@angular/common/http";
import { PageEvent } from '@angular/material';
import { MatSnackBar } from "@angular/material";
import { NetworkComponent } from './network/network.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class TransactionsComponent implements OnInit {
  dataSource:any;

  pageIndex: number;
  loader =  true;
  pageSize : number;
  progress = 0;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['Transaction Id', 'Transaction Type', 'address', 'public?', 'private?', 'status', 'sender'];
  columnsToDisplay = [ 'Transaction Type', 'status', 'sender'];
  expandedElement: Transaction | null;
  page: number;
  transaction : Transaction;
  constructor(private route: ActivatedRoute,public dialog: MatDialog, private propertyService: PropertyService,
    private snackBar: MatSnackBar) {
      this.loader = true;
      this.progress = 0;
      this.transaction = new Transaction();
      if(this.progress<=100)
      setInterval(() => {
        this.progress = this.progress + 10;
      }, 100);
     }
    network_data : any;

   

    openDialog(): void {
      
     const dialogConfig = new MatDialogConfig();
     const dialogRef = this.dialog.open(NetworkComponent, {
       width: '50vw',
       panelClass: 'networkdialog',
       data :this.network_data
     });
 
     dialogRef.afterClosed().subscribe(result => {
     });
   }

   view_private_network(index, transaction,private_block: any){
    this.network_data = new Transaction();
    this.network_data.transactionId = transaction.id;
    this.network_data.status = transaction.status;
    this.network_data.address = transaction.address;
    this.network_data.private = private_block;
    this.network_data.sender =  transaction.sender;
    if(private_block)
      this.openDialog();
  }
  view_public_network(index,transaction,public_block: any){
    this.network_data = new Transaction();
    this.network_data.transactionId = transaction.id;
    this.network_data.status = transaction.status;
    this.network_data.address = transaction.address;
    this.network_data.public =  public_block;
    this.network_data.sender =  transaction.sender;
    if(public_block)
      this.openDialog();
  }
  ngOnInit() {
    this.page = 1;
    this.gettransaction(this.page);
  }
  gettransaction(page: number) :any {
    this.propertyService.getuserbasedtransactions(page).subscribe((data: Transaction[]) => {
      this.pageIndex = data['lastPage'].page;
      this.loader = false;
      this.pageSize = data['lastPage'].index;

      this.dataSource = data['data'];
    });
  }
}