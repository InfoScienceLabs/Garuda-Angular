import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Transaction} from '../../../models/models';
import { PropertyService } from '../../../services/services';
import { AuthService } from 'src/app/core/auth.service';
import { MatSnackBar } from "@angular/material";
import { NetworkTransaction } from '../../../models/transaction';
import { HttpErrorResponse } from "@angular/common/http";
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit { 


  constructor( public dialogRef : MatDialogRef<NetworkComponent>,
                @Inject(MAT_DIALOG_DATA) public network_data, 
                private propertyService: PropertyService, 
                private snackBar: MatSnackBar, private authService: AuthService,private _clipboardService: ClipboardService) { }
  public networkTransaction : NetworkTransaction;
  displayedColumns: string[] = ['hash', 'message', 'blockNumber'];
  url_for_contract:  any;
  title: any;
  ngOnInit() {
    // this.networkTransaction = new NetworkTransaction();
    if(this.network_data.public) {
      this.title =  'Public';
      this.url_for_contract = 'https://rinkeby.etherscan.io/tx/'+this.network_data.public.hash;
      if(this.network_data.public.receipt && this.network_data.public.receipt) this.network_data.public.receipt['gasUsed'] = (parseInt(this.network_data.public.receipt['gasUsed']) / 1e9).toFixed(6);
    }
    else if(this.network_data.private) {
      this.title =  'Private';
      this.url_for_contract = 'http://165.22.54.104:4100/transactions/'+this.network_data.private.hash;
      if(this.network_data.private.receipt && this.network_data.private.receipt) this.network_data.private.receipt['gasUsed'] = (parseInt(this.network_data.private.receipt['gasUsed']) / 1e9).toFixed(6);
    }
  }

  onNoClick() : void {
    this.dialogRef.close();
  }
  explorer_view(){
    
  }
  copyToClipboard(){
    this.snackBar.open('Copied To Clipboard', "Close", {
      duration: 3000,
      panelClass: ["snackbar-color-change"]
    });  }
}


