import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing/listing.component';
import { TransferComponent } from './transfer/transfer.component';
import {TransferconfirmComponent} from './transferconfirm/transferconfirm.component';
import { ManageComponent } from './manage/manage.component';
const routes: Routes = [
  { path: 'listing' , component: ListingComponent },
  // { path: 'view', component  : ViewComponent },
  { path: 'listingconfirm/:id' , component: ManageComponent },
  { path: 'transfer' , component: TransferComponent },
  { path: 'transfer/:id/:id' , component: TransferconfirmComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalsRoutingModule { }
