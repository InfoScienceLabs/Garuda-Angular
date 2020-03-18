import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule }  from 'ngx-skeleton-loader';
import { ApprovalsRoutingModule } from './approvals-routing.module';
import { ListingComponent } from './listing/listing.component';
import { TransferComponent } from './transfer/transfer.component';
import { ManageComponent } from './manage/manage.component';
import { TransferconfirmComponent } from './transferconfirm/transferconfirm.component';

@NgModule({
  declarations: [ListingComponent, TransferComponent, ManageComponent, TransferconfirmComponent],
  imports: [
    CommonModule,
    ApprovalsRoutingModule,
    CommonModule,
    SharedModule,
   
    NgxSkeletonLoaderModule
  ]
})
export class ApprovalsModule { }





