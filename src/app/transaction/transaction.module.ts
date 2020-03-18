import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { NetworkComponent } from './network/network.component';
import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  declarations: [TransactionComponent, NetworkComponent],
  entryComponents:[NetworkComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    FormsModule,
    SharedModule,
    ClipboardModule
  ]
})
export class TransactionModule { }
