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
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.scss']
})
export class NetworksComponent implements OnInit {


  constructor( public dialogRef : MatDialogRef<NetworksComponent>,
                @Inject(MAT_DIALOG_DATA) public network_data, 
                private propertyService: PropertyService,
                private snackBar: MatSnackBar, private authService: AuthService,private _clipboardService: ClipboardService) { }
  public networkTransaction : NetworkTransaction;
  displayedColumns: string[] = ['hash', 'message', 'blockNumber'];
  trx_type : any;
  message : any;
  networkObject: any;
  ngOnInit() {
    console.log('data dialog ',this.network_data);
    // this.network_data.public.receipt.gasUsed = (parseInt(this.network_data[0].public.receipt.gasUsed) / 1e9).toFixed(6);
  }
  networkDetails(){
    if(this.trx_type==='public'){
      if(this.network_data.public){
        this.networkObject = new Object();

        this.message = '';
        this.networkObject.hash = this.network_data.public.hash;
        this.networkObject.sender = this.network_data.sender;
        this.networkObject.message = this.network_data.public.message;
        this.networkObject.status = this.network_data.public.status;
        this.networkObject.url = 'https://rinkeby.etherscan.io/tx/'+this.network_data.public.hash;

      }
      else{
        delete this.networkObject;
        this.message = 'No Public Transaction for this Property';
      }
    }else{
      
        if(this.network_data.private){
          this.networkObject = new Object();
          this.message = '';
          this.networkObject.hash = this.network_data.private.hash;
          this.networkObject.sender = this.network_data.sender;
          this.networkObject.message = this.network_data.private.message;
          this.networkObject.status = this.network_data.private.status;
          this.networkObject.url = 'http://165.22.54.104:4100/transactions/'+this.network_data.private.hash;
          }
        else{
          delete this.networkObject;
          this.message = 'No Private Transaction for this Property';
        }
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


