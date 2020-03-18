import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { SinglepropertyComponent } from './singleproperty/singleproperty.component';
import { BuypropertComponent } from './buypropert/buypropert.component';
const routes: Routes = [
  { path: '', redirectTo: 'marketplace', pathMatch: 'full' },
  { path: '', component: MarketplaceComponent },
{ path: 'view/:id', component: SinglepropertyComponent },
{ path: 'buyproperty', component: BuypropertComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
